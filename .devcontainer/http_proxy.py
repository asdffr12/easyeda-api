import socket, threading, socketserver

CRLF = chr(13) + chr(10)
HEADER_END = CRLF + CRLF

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True

class Handler(socketserver.BaseRequestHandler):
    def handle(self):
        c = self.request
        c.settimeout(60)
        try:
            buf = b''
            while HEADER_END.encode() not in buf:
                d = c.recv(8192)
                if not d:
                    return
                buf += d
            line = buf.split(CRLF.encode())[0].decode('latin1')
            parts = line.split()
            if len(parts) < 3:
                return
            hp = parts[1]
            if ':' in hp:
                host, port = hp.rsplit(':', 1)
            else:
                host, port = hp, '80'
            s = socket.create_connection((host, int(port)), timeout=30)
            c.sendall(('HTTP/1.1 200 Connection Established' + HEADER_END).encode())
            rest = buf.split(HEADER_END.encode(), 1)[1]
            if rest:
                s.sendall(rest)

            def pump(a, b):
                try:
                    while True:
                        d = a.recv(65536)
                        if not d:
                            break
                        b.sendall(d)
                except Exception:
                    pass
                finally:
                    try:
                        b.shutdown(socket.SHUT_WR)
                    except Exception:
                        pass

            t1 = threading.Thread(target=pump, args=(c, s), daemon=True)
            t2 = threading.Thread(target=pump, args=(s, c), daemon=True)
            t1.start(); t2.start(); t1.join(); t2.join()
        except Exception:
            try:
                c.close()
            except Exception:
                pass

Server(('127.0.0.1', 10819), Handler).serve_forever()
