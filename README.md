# Range Trainer (PWA)

A club-by-club swing trainer for the driving range — installable on Android
straight from Chrome, no app store needed.

## What's in this version

- 5 shot qualities: Great, Decent, Stinger, Topped, and **Hook/Slice**
  (struck fine, bent off line — no longer gets miscounted as Decent)
- Stats screen with three tabs: **Breakdown** (by date or all-time, per-club
  numbers), **Accuracy** (good vs. bad %, with a trend line, filterable by
  club), and **Bests** (current streak, best streak ever, best session,
  best day)
- **Backdating** — pick a past date on the club-select screen before you
  start logging, so you can backfill a day you forgot to enter
- **Backup & restore** — export everything to a JSON file, import it back
  in later (merges by ID, so re-importing never creates duplicates)
- Draggable bag editor, CSV export, undo, larger touch targets throughout

## Install on your phone

1. Host these files somewhere reachable from your phone's browser:
   - **GitHub Pages**: push this folder to a repo, enable Pages, done.
   - **Netlify / Vercel drop**: drag the folder onto their web dashboard.
   - **Quick local test**: from this folder, run `python3 -m http.server 8000`
     on your computer, then visit `http://<your-computer's-LAN-IP>:8000` from
     your phone (same Wi-Fi network).
2. Open the site in **Chrome on Android**.
3. Tap the **⋮ menu → Install app** (or use the "Add to Home screen" banner).

## Updating an already-installed app

Deploy the new files to the **same URL** you originally installed from —
your swings and bag list live in that origin's `localStorage` and are
untouched by an app-code update. Reloading (or the service worker's
background update) picks up the new version automatically; nothing needs
to be re-entered.

The one case that *does* start you from empty storage: switching to a
**different** URL/host than the one you installed from, or manually
clearing site data in Chrome. If you ever need to move hosts, export a
backup from Settings → Backup & restore on the old URL first, then import
it after installing at the new one.

`service-worker.js`'s `CACHE_NAME` is bumped with each release (currently
`range-trainer-v2`) so installed devices don't keep serving a stale
cached copy after an update.

## Notes

- All data is stored **locally on your phone** (`localStorage`) — nothing
  is sent anywhere, and it's per-device (won't sync between a phone and a
  laptop on its own — use the JSON backup for that).
- Works fully **offline** after the first load.

## Regenerating app.js

`app.js` is compiled from `app.source.jsx` via Babel
(`@babel/preset-react`, classic runtime, script mode — no bundler, no
modules). To recompile after hand-editing the source:

```
npx @babel/cli --presets @babel/preset-react app.source.jsx -o app.js
```

(with `runtime: classic` set, since `React`/`ReactDOM` are globals here,
not imports.)
