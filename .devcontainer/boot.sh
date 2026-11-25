#!/bin/bash
# 每次 Codespace 启动自动执行（postStartCommand）：自装出口代理 + 自愈守护
mkdir -p "$HOME/.exitproxy"
SRC="$(cd "$(dirname "$0")" && pwd)"
[ -f "$HOME/.exitproxy/http_proxy.py" ] || cp "$SRC/http_proxy.py" "$HOME/.exitproxy/http_proxy.py"
cat > "$HOME/.exitproxy/keep.sh" <<'EOF'
#!/bin/bash
cd "$HOME/.exitproxy"
while true; do python3 http_proxy.py >> proxy.log 2>&1; sleep 2; done
EOF
chmod +x "$HOME/.exitproxy/keep.sh"
pgrep -f 'kee[p]\.sh' >/dev/null || setsid nohup bash "$HOME/.exitproxy/keep.sh" </dev/null >/dev/null 2>&1 &
exit 0
