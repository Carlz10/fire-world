# 🔥 Fire World

Cooper's Fire World is a small single-page browser game. Collect wood from the trees, feed the fire, buy machines, and keep the flame alive until the rain stops.

No framework, no build step, no dependencies. It is plain HTML, CSS and JavaScript.

## How to play

1. Press **Start Game**. The trees drop a log every 2 seconds.
2. Tap a log to collect it, or press **Collect all**.
3. Tap the 🔥 or press **Feed fire** to spend 1 wood. The fire grows one size (Small → Medium → Large → Giant) and you earn **$5**.
4. Rain arrives 20 seconds after the round starts. If the rain lasts longer than the fire can survive, it's **Game Over**:

   | Fire size | Survives rain for |
   |-----------|-------------------|
   | Small     | 20 s |
   | Medium    | 20 s |
   | Large     | 30 s |
   | Giant     | 45 s |

5. **Play Again** starts a new round. Your money, wood, fire size and machines are kept.

### Machine shop

You start with **$20**.

| Machine | Cost | What it does |
|---------|------|--------------|
| ⚡ Lightning Machine | $50 | Glowing blue coil. Currently decorative only. |
| 🎆 Fireworks Machine | $75 | Tap it to fire a firework at the flame, which grows the fire one size. |

Drag a machine left or right to reposition it on the grass.

## Running locally

Open `index.html` in any modern browser. To also test the offline service worker, serve the folder over `localhost`:

```sh
python -m http.server 8000
# then visit http://localhost:8000
```

The service worker only registers on `https://` or `localhost`.

## Offline use / Add to Home Screen

A local HTML file can't create a Home Screen shortcut. To get one with offline support:

1. Publish `index.html` and `sw.js` to an HTTPS static host (for example GitHub Pages).
2. Open the published site in Safari and wait a few seconds while it caches.
3. Use **Share → Add to Home Screen**.

If you change the cached files, bump the `CACHE` name in `sw.js` (currently `fire-world-offline-v3`) so existing installs pick up the update.

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | The whole game: markup, styles and script |
| `sw.js` | Service worker. Pre-caches `./` and `./index.html`, serves network-first (cache is the offline fallback), and falls back to `index.html` when offline |
| `README.txt` | Short original note on Home Screen / offline setup |

## Notes

- Game state lives in memory only, so reloading the page resets everything.
- The Lightning Machine can be bought and moved but has no gameplay effect yet.
