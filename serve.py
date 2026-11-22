#!/usr/bin/env python3
"""Local preview server for Wanderwords.

python3 -m http.server closes the connection after every file (HTTP/1.0), so a page
with many images can reset a request mid-load in Chrome. This keeps connections alive
(HTTP/1.1), which is enough to load a lesson page smoothly.

    python3 serve.py            # http://localhost:8788
    python3 serve.py 9000       # another port
"""

import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8788


class Handler(SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def end_headers(self):
        # Preview only: never let the browser cache a half-finished edit.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", PORT), partial(Handler, directory="."))
    server.daemon_threads = True
    print(f"Wanderwords preview on http://localhost:{PORT}")
    server.serve_forever()
