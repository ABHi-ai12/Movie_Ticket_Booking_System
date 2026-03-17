#!/usr/bin/env python3
"""
run.py – Launcher for the Movie_Ticket_Booking_System project.

Usage
-----
  python run.py            # default: starts the food ordering website
  python run.py food       # starts the FoodieExpress food ordering website
  python run.py cinema     # runs the CineBook movie ticket booking CLI
  python run.py --help     # shows this help
"""

import os
import sys
import http.server
import socketserver
import webbrowser
import threading
import time

# ── Paths ────────────────────────────────────────────────────────────────────
ROOT        = os.path.dirname(os.path.abspath(__file__))
FOOD_DIR    = os.path.join(ROOT, "food_ordering")
CINEMA_FILE = os.path.join(ROOT, "src", "CINEBOOK.py")

# ── Helpers ──────────────────────────────────────────────────────────────────

def _find_free_port(preferred: int) -> int:
    """Return *preferred* if available, otherwise find the next free port."""
    import socket as _socket
    for port in range(preferred, preferred + 20):
        with _socket.socket(_socket.AF_INET, _socket.SOCK_STREAM) as s:
            s.setsockopt(_socket.SOL_SOCKET, _socket.SO_REUSEADDR, 1)
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                continue
    raise RuntimeError("Could not find a free port in range "
                       f"{preferred}–{preferred + 19}.")


def run_food_ordering(port: int = 8080) -> None:
    """Serve the FoodieExpress food ordering website on localhost."""
    os.chdir(FOOD_DIR)

    port = _find_free_port(port)
    handler = http.server.SimpleHTTPRequestHandler

    # Silence request logs for a cleaner console experience
    class QuietHandler(handler):
        def log_message(self, *args: object) -> None:
            pass

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", port), QuietHandler) as httpd:
        url = f"http://localhost:{port}"
        print(f"\n🍽️  FoodieExpress is running at  {url}")
        print("   Press Ctrl+C to stop the server.\n")

        # Open the browser automatically after a short delay
        def _open():
            time.sleep(0.6)
            webbrowser.open(url)

        threading.Thread(target=_open, daemon=True).start()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServer stopped. Goodbye! 👋")


def run_cinema() -> None:
    """Run the CineBook movie ticket booking CLI."""
    print("\n🎬 Starting CineBook – Movie Ticket Booking System\n")
    # Use exec so that the script runs in the same process (preserves SIGINT behaviour)
    with open(CINEMA_FILE, "r", encoding="utf-8") as fh:
        code = fh.read()
    exec(compile(code, CINEMA_FILE, "exec"), {"__name__": "__main__"})  # noqa: S102


def print_help() -> None:
    print(__doc__)


# ── Entry point ───────────────────────────────────────────────────────────────

def main() -> None:
    args = [a.lower() for a in sys.argv[1:]]

    if "--help" in args or "-h" in args:
        print_help()
        sys.exit(0)

    # Default: food ordering website
    mode = args[0] if args else "food"

    if mode in ("food", "web", "website", "foodie", "foodordering"):
        run_food_ordering()
    elif mode in ("cinema", "movie", "cinebook", "ticket"):
        run_cinema()
    else:
        print(f"Unknown mode '{mode}'. Use 'food' or 'cinema'. Run with --help for details.")
        sys.exit(1)


if __name__ == "__main__":
    main()
