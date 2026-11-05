# Wanderwords: English journeys (B1 → B2)

A travel-themed static web app for 50-minute private lessons, built from the materials in `Data/Eden's_Files`.

- **Teacher** (password): 50-minute plan with a phase timer, words, questions, phrases, notes and a "lesson done" tick.
- **Student:** warm-up pictures, new words (guess, then tap for the meaning), a matching quiz with a score, conversation questions, useful phrases, tasks and spaced-repetition flashcards.

Progress is saved in the browser (localStorage) on the device where it was saved.

## Run locally

```
python3 -m http.server 8000
```
Open http://localhost:8000

## Put it on GitHub Pages

1. Push this folder to a repository (`index.html` at the root).
2. On GitHub: Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)` → Save.
3. After about a minute the site is at `https://<username>.github.io/<repo>/`.
4. To let other people edit: Settings → Collaborators → Add people.

All paths are relative and there is no build step, so it works from any repo name. Anyone with the link can open the site; `noindex` asks search engines not to list it. The teacher password only hides the teacher view from the student; it is not real security, and the code is visible to anyone who can see the repo.

## Change things

- Lessons: `data/lessons.js`. Copy the lesson 1 object to add lesson 2; phases must add up to 50 minutes.
- Password: `TEACHER_PASS` in `app.js` is `btoa("your password")` in lowercase (login ignores case). Run `btoa("newpass")` in the browser console to get a new value.
