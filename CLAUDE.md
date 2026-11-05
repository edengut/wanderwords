# Wanderwords: rules for adding a lesson

- Add the lesson as a new object in `data/lessons.js` (next `n`). Phases must add up to 50 minutes.
- Every lesson's words go in its `groups` (`[word, meaning, example]`), grammar lessons too (verb forms, time words). That is what puts them on the practice page.
- After each lesson, check `#/cards`: "All words" must include every word from every lesson so far, and the new lesson must have its own deck button. Never hard-code deck lists; they come from `LESSONS`.
- Make the content personal to the student (his real trips and interests), not generic.
- A lesson can have its own `theme` (a body class in `style.css`, like `italia`).
- Before pushing: `python3 -m http.server 8765`, then check `/`, `/#/student/N`, `/#/teacher/N` and `/#/cards` with no console errors.
