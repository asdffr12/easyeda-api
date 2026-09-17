/**
 * Integration tests for the EasyEDA WebSocket bridge.
 *
 * These boot the real server on an isolated port range and drive it with a
 * real WebSocket client, plus a fake EDA client that answers `execute`
 * messages. Nothing is mocked at the protocol level — if the wire format
 * changes, these tests fail.
 *
 * Run with: npm test
 */

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SERVER = path.join(ROOT, 'scripts', 'bridge-server.mjs');

// A range that will not collide with a bridge the user already has running
// on the default 49620-49629.
const PORT_START = 49700;
const PORT_END = 49709;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let child;
let port;

/** Wait until the server prints its banner and report the chosen port. */
function waitForPort(proc) {
  return new Promise((resolve, reject) => {
    let buf = '';
    const timer = setTimeout(() => {
      cleanup();
      reject(new Error(`timed out waiting for the server to pick a port.\n--- output ---\n${buf}`));
    }, 15000);

    const onData = (d) => {
      buf += d.toString();
      const m = /Port:\s+(\d+)/.exec(buf);
      if (m) {
        cleanup();
        resolve(Number(m[1]));
      }
    };
    const onExit = (code) => {
      cleanup();
      reject(new Error(`server exited early (code ${code}).\n--- output ---\n${buf}`));
    };
    const cleanup = () => {
      clearTimeout(timer);
      proc.stdout.off('data', onData);
      proc.off('exit', onExit);
    };

    proc.stdout.on('data', onData);
    proc.on('exit', onExit);
  });
}

/** A WebSocket client that queues incoming messages so tests never race. */
function connect(url) {
  const ws = new WebSocket(url);
  const queue = [];
  const waiters = [];

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    const waiter = waiters.shift();
    if (waiter) waiter(msg);
    else queue.push(msg);
  });

  return {
    ws,
    ready: () => once(ws, 'open'),
    next: (timeoutMs = 5000) =>
      new Promise((resolve, reject) => {
        if (queue.length) return resolve(queue.shift());
        const t = setTimeout(() => reject(new Error('timed out waiting for a WebSocket message')), timeoutMs);
        waiters.push((m) => {
          clearTimeout(t);
          resolve(m);
        });
      }),
    send: (obj) => ws.send(JSON.stringify(obj)),
    close: () => ws.close(),
  };
}

const health = () => fetch(`http://127.0.0.1:${port}/health`);
const postJson = (route, body) =>
  fetch(`http://127.0.0.1:${port}${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

before(async () => {
  child = spawn(process.execPath, [SERVER], {
    env: {
      ...process.env,
      EASYEDA_BRIDGE_PORT_START: String(PORT_START),
      EASYEDA_BRIDGE_PORT_END: String(PORT_END),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stderr.on('data', (d) => process.stderr.write(`[server] ${d}`));
  port = await waitForPort(child);
});

after(() => {
  if (child && !child.killed) child.kill();
});

test('server starts inside the configured port range', () => {
  assert.ok(port >= PORT_START && port <= PORT_END, `port ${port} outside ${PORT_START}-${PORT_END}`);
});

test('GET /health identifies the service', async () => {
  const res = await health();
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.equal(body.service, 'easyeda-bridge');
  assert.equal(body.status, 'ok');
  assert.equal(body.edaConnected, false, 'no EDA client should be attached yet');
  assert.equal(body.edaWindowCount, 0);
});

test('GET /health reports the EDA connection once one attaches', async () => {
  const eda = connect(`ws://127.0.0.1:${port}/eda`);
  await eda.ready();

  const handshake = await eda.next();
  assert.equal(handshake.type, 'handshake');
  assert.equal(handshake.service, 'easyeda-bridge');
  assert.equal(handshake.clientType, 'eda');

  eda.send({ type: 'register', windowId: 'health-check-window' });
  await sleep(150);

  const body = await (await health()).json();
  assert.equal(body.edaConnected, true);
  assert.equal(body.edaWindowCount, 1);
  assert.equal(body.activeWindowId, 'health-check-window');

  eda.close();
  await sleep(150);

  const afterClose = await (await health()).json();
  assert.equal(afterClose.edaConnected, false, 'window should be removed on disconnect');
});

test('POST /execute returns 503 when no EDA window is connected', async () => {
  const res = await postJson('/execute', { code: 'return 1;' });
  assert.equal(res.status, 503);

  const body = await res.json();
  assert.equal(body.success, false);
  assert.match(body.error, /not connected|No EDA window/i);
});

test('POST /execute rejects a request without a code string', async () => {
  const res = await postJson('/execute', { nope: true });
  assert.equal(res.status, 400);

  const body = await res.json();
  assert.match(body.error, /code/i);
});

test('unknown routes return 404 JSON', async () => {
  const res = await fetch(`http://127.0.0.1:${port}/definitely-not-a-route`);
  assert.equal(res.status, 404);

  const body = await res.json();
  assert.equal(body.error, 'Not found');
});

test('execute → result round trip against a fake EDA client', async () => {
  const eda = connect(`ws://127.0.0.1:${port}/eda`);
  await eda.ready();
  await eda.next(); // handshake
  eda.send({ type: 'register', windowId: 'round-trip-window' });

  // The fake EDA answers every execute with an echo.
  eda.ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.type === 'execute') {
      eda.send({ type: 'result', id: msg.id, result: { echo: msg.code, windowId: msg.windowId } });
    }
  });

  await sleep(150);

  const res = await postJson('/execute', { code: 'return 1 + 1;' });
  assert.equal(res.status, 200);

  const body = await res.json();
  assert.equal(body.success, true);
  assert.deepEqual(body.result, { echo: 'return 1 + 1;', windowId: 'round-trip-window' });
  assert.equal(body.windowId, 'round-trip-window');

  eda.close();
  await sleep(150);
});

test('an EDA error reply propagates as a 500 with the original message', async () => {
  const eda = connect(`ws://127.0.0.1:${port}/eda`);
  await eda.ready();
  await eda.next(); // handshake
  eda.send({ type: 'register', windowId: 'error-window' });

  eda.ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.type === 'execute') {
      eda.send({ type: 'error', id: msg.id, error: 'boom from EDA' });
    }
  });

  await sleep(150);

  const res = await postJson('/execute', { code: 'throw new Error("boom");' });
  assert.equal(res.status, 500);

  const body = await res.json();
  assert.equal(body.success, false);
  assert.match(body.error, /boom from EDA/);

  eda.close();
  await sleep(150);
});

test('GET /eda-windows lists attached windows and their active flag', async () => {
  const eda = connect(`ws://127.0.0.1:${port}/eda`);
  await eda.ready();
  await eda.next(); // handshake
  eda.send({ type: 'register', windowId: 'list-window' });
  await sleep(150);

  const body = await (await fetch(`http://127.0.0.1:${port}/eda-windows`)).json();
  assert.equal(body.count, 1);
  assert.equal(body.activeWindowId, 'list-window');
  assert.deepEqual(body.windows, [{ windowId: 'list-window', connected: true, active: true }]);

  eda.close();
  await sleep(150);
});

test('POST /eda-windows/select rejects an unknown window', async () => {
  const res = await postJson('/eda-windows/select', { windowId: 'ghost' });
  assert.equal(res.status, 404);

  const body = await res.json();
  assert.match(body.error, /not found/i);
});
