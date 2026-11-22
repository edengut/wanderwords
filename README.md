# Wanderwords: English journeys (B1 → C1)

A static web app for 50-minute private English lessons: eight lessons so far, each with its own look, built around real events, real photographs and one student.

- **Teacher** (password): 50-minute plan with a phase timer, teacher notes per stage, answer keys, the listening script, a flight log and a "lesson done" tick.
- **Student:** photo warm-ups, new words (guess, then tap for the meaning), reading, listening, grammar cards, gap-fill, key-word transformations, a matching quiz with a score, speaking questions, useful phrases, tasks and spaced-repetition flashcards.

Progress is saved in the browser (localStorage) on the device where it was saved. There is no build step and no server-side code.

## Run it locally

```
python3 serve.py 8788
```

Open http://localhost:8788 — the keep-alive server matters, because `python3 -m http.server` drops connections and makes photo-heavy pages flicker.

## Put it on GitHub Pages

1. Push this folder to a repository (`index.html` at the root).
2. Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
3. After about a minute the site is at `https://<username>.github.io/<repo>/`.

All paths are relative, so it works from any repo name. Anyone with the link can open the site; `noindex` asks search engines not to list it. The teacher password only hides the teacher view from the student — it is not real security, and the code is visible to anyone who can see the repo.

## How the content is stored

| Path | Holds | Loaded |
|---|---|---|
| `data/index.js` | every lesson's menu entry and word list | always (~24 KB) |
| `data/lessons/l<N>.js` | one lesson's reading, tasks, phases, homework | only when that lesson opens (4–19 KB) |
| `themes/<name>.css` | one lesson's look | always, scoped to `body.<name>` |
| `img/`, `audio/` | photographs and recordings | on demand |

## Change things

- **Add a lesson:** one object in `data/index.js` (menu + words) and one body file `data/lessons/l<N>.js`. Phases must total 50 minutes. Every word in `groups` reaches the practice page (`#/cards`) and the flashcard deck automatically.
- **Add a theme:** one file `themes/<name>.css` + one `<link>` in `index.html` + a `THEME_FONTS` entry in `app.js` if it needs new fonts. Every rule is scoped to `body.<name>`, so themes cannot leak into each other.
- **Add photos:** put the file in `img/`, then `img: "img/…"` on a `warmup` item. Tapping it opens a full-screen viewer. Keep images public-domain or CC0 (sources are listed in `img/CREDITS.md`) and under ~250 KB.
- **Add a task type:** one render function in `app.js` + one entry in the `gates` list of `renderStudentLesson`; that is all `transform` and `listen` needed.
- **Password:** `TEACHER_PASS` in `app.js` is `btoa("your password")` in lowercase (login ignores case). Run `btoa("newpass")` in the browser console to get a new value.

## Checks before pushing

```
node tools/validate-lessons.js
```

It verifies the data contract: phases add up to 50 minutes, every drill and transformation answer is among its options, referenced images/audio/theme files exist, no duplicate words, and the index matches the lesson bodies. Full checklist in `CLAUDE.md`.

## Map of the build

`architecture.svg` — one page showing the file layout, the runtime, the lesson data contract, where the course stands, what a change costs, and the known limits.
