// Single-page app with hash routes (works on GitHub Pages: no server, relative paths only):
//   #/                 home (Teacher / Student)
//   #/teacher[/N]      password → lesson list → 50-minute plan with timer, notes
//   #/student[/N]      lesson list → warm-up, words, quiz, questions, phrases, flashcards
//   #/cards            all-words flashcards

// Not real security on a static site: it only keeps the student out of the teacher view.
const TEACHER_PASS = "a2luZXRz"; // btoa of the password

const $app = document.getElementById("app");
const $who = document.getElementById("who");
// Prefixed keys: all repos under one github.io account share the same localStorage.
const store = {
  get: (k, d) => { try { return JSON.parse(localStorage.getItem("travel:" + k)) ?? d; } catch { return d; } },
  set: (k, v) => localStorage.setItem("travel:" + k, JSON.stringify(v)),
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const lesson = (n) => LESSONS.find((l) => l.n === Number(n));
const wordsOf = (l) => l.groups.flatMap((g) => g.words);
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);

let timer = null;

function route() {
  clearInterval(timer?.tick);
  timer = null;
  const [, role, a] = location.hash.replace(/^#/, "").split("/");
  const teacher = sessionStorage.getItem("travel-teacher") === "1";
  $who.textContent = role === "teacher" ? "👩‍🏫 Teacher" : role ? "🎒 Student" : "";
  window.scrollTo(0, 0);
  if (role === "teacher") {
    if (!teacher) return renderLogin();
    return a ? renderTeacherLesson(lesson(a)) : renderList("teacher");
  }
  if (role === "student") return a ? renderStudentLesson(lesson(a)) : renderList("student");
  if (role === "cards") return renderAllCards();
  renderHome();
}
window.addEventListener("hashchange", route);
route();

function renderHome() {
  $app.innerHTML = `
    <div class="home">
      <a class="role teacher" href="#/teacher"><div class="icon">👩‍🏫</div><h2>Teacher</h2><p class="muted">Lesson plan · timer · notes</p></a>
      <a class="role student" href="#/student"><div class="icon">🎒</div><h2>Student</h2><p class="muted">Words · quiz · speaking · flashcards</p></a>
    </div>`;
}

function renderLogin() {
  $app.innerHTML = `
    <form class="login">
      <div style="font-size:56px">🔒</div>
      <h1>Teacher</h1>
      <input type="password" placeholder="Password" autofocus>
      <div class="err"></div>
      <button>Enter</button>
    </form>`;
  const form = $app.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    if (btoa(form.querySelector("input").value.trim()) === TEACHER_PASS) {
      sessionStorage.setItem("travel-teacher", "1");
      route();
    } else form.querySelector(".err").textContent = "Wrong password";
  };
}

function renderList(role) {
  const done = store.get("done", []);
  $app.innerHTML = `
    <h1>${role === "teacher" ? "Choose a lesson" : "My lessons"}</h1>
    <p class="muted">Travel English · B1 → B2 · 50 minutes each. ${role === "student" ? `<a href="#/cards">Practise all words →</a>` : `${done.length}/${LESSONS.length} done.`}</p>
    <div class="grid">
      ${LESSONS.map((l) => `
        <a class="lcard ${done.includes(l.n) ? "done" : ""}" href="#/${role}/${l.n}">
          <div class="num">Lesson ${l.n}</div>
          <div class="ttl">${esc(l.title)}</div>
          <span class="tag">✈️ ${wordsOf(l).length} words</span>
        </a>`).join("")}
    </div>`;
}

function navLinks(role, l) {
  const prev = lesson(l.n - 1), next = lesson(l.n + 1);
  return `<div class="row" style="justify-content:space-between;margin-top:24px">
    ${prev ? `<a class="btn ghost" href="#/${role}/${prev.n}">← Lesson ${prev.n}</a>` : "<span></span>"}
    <a class="btn ghost" href="#/${role}">All lessons</a>
    ${next ? `<a class="btn ghost" href="#/${role}/${next.n}">Lesson ${next.n} →</a>` : "<span></span>"}
  </div>`;
}

// ---------- Shared lesson blocks ----------

const warmupHtml = (l) => `<div class="photos">${l.warmup.map((p) => `<figure><div class="big">${p.icon}</div><figcaption>${esc(p.caption)}</figcaption></figure>`).join("")}</div>`;

const vocabHtml = (l, hideMeaning) => l.groups.map((g) => `
  <h3>${esc(g.name)}</h3>
  <table class="vocab"><tr><th>Word / phrase</th><th>Meaning</th><th>Example</th></tr>
  ${g.words.map(([w, m, e]) => `<tr><td><b>${esc(w)}</b></td>
    <td>${hideMeaning ? `<button class="ghost reveal" data-m="${esc(m)}">Guess, then tap</button>` : esc(m)}</td>
    <td class="ex">${esc(e)}</td></tr>`).join("")}
  </table>`).join("");

const questionsHtml = (l) => l.questions.map((s) => `
  <h3>${esc(s.name)}</h3><ol class="qs">${s.qs.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>`).join("")
  + `<p class="muted">Follow-ups: ${l.followups.map(esc).join(" · ")}</p>`;

const phrasesHtml = (l) => `<ul class="phrases">${l.phrases.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;

// Matching quiz: one select per word, options = that group's meanings, shuffled.
function quiz(root, l) {
  let n = 0;
  root.innerHTML = `<div class="quiz box">
    ${l.groups.map((g) => {
      const opts = shuffle(g.words.map(([, m]) => m));
      return `<h3>${esc(g.name)}</h3>` + g.words.map(([w, m]) => `
        <div class="q" data-ans="${esc(m)}"><span>${++n}. <b>${esc(w)}</b></span>
          <select><option value="">— choose —</option>${opts.map((o) => `<option>${esc(o)}</option>`).join("")}</select></div>`).join("");
    }).join("")}
    <div class="row" style="margin-top:12px"><button data-act="check">Check answers</button><button class="ghost" data-act="retry">Try again</button><span class="score"></span></div>
  </div>`;
  root.querySelector('[data-act="check"]').onclick = () => {
    let right = 0;
    root.querySelectorAll(".q").forEach((q) => {
      const ok = q.querySelector("select").value === q.dataset.ans;
      right += ok;
      q.className = "q " + (ok ? "ok" : "bad");
    });
    root.querySelector(".score").textContent = `${right} / ${n}`;
    const best = store.get("quiz", {});
    best[l.n] = Math.max(best[l.n] || 0, right);
    store.set("quiz", best);
  };
  root.querySelector('[data-act="retry"]').onclick = () => quiz(root, l);
}

// ---------- Teacher ----------

function renderTeacherLesson(l) {
  if (!l) return renderList("teacher");
  const done = store.get("done", []);
  const notes = store.get("notes", {});
  const best = store.get("quiz", {})[l.n];
  $app.innerHTML = `
    <p class="muted">Lesson ${l.n} · Travel English B1 → B2</p>
    <h1>${esc(l.title)}</h1>
    <div class="box"><b>Goal:</b> ${esc(l.goal)}${best !== undefined ? `<br><b>Best quiz score on this device:</b> ${best} / ${wordsOf(l).length}` : ""}</div>
    <div class="timer">
      <div class="clock">50:00</div>
      <div class="now"><div class="pname">Ready</div><div class="bar">${l.phases.map((p) => `<span style="flex:${p.min}"></span>`).join("")}</div></div>
      <button data-act="toggle">▶ Start</button>
      <button data-act="next">Next ⏭</button>
      <button data-act="reset">↺</button>
    </div>
    <h2>Plan</h2>
    ${l.phases.map((p, i) => `
      <div class="phase" data-i="${i}">
        <h3><span>${i + 1}. ${esc(p.name)}</span><span class="min">${p.min} min</span></h3>
        <ul>${p.teacher.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="stu">🎒 Student sees: ${p.student.map(esc).join(" · ")}</div>
      </div>`).join("")}
    <h2>Warm-up pictures</h2>${warmupHtml(l)}
    <h2>Words (${wordsOf(l).length})</h2>${vocabHtml(l, false)}
    <h2>Questions</h2><div class="box">${questionsHtml(l)}</div>
    <h2>Useful phrases</h2><div class="box">${phrasesHtml(l)}</div>
    <div class="box"><b>⚡ If he's fast:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>My notes on this lesson</h2>
    <textarea placeholder="Errors to revisit, words he used, what to change…">${esc(notes[l.n] || "")}</textarea>
    <div class="row" style="margin-top:12px">
      <label class="task"><input type="checkbox" id="done" ${done.includes(l.n) ? "checked" : ""}><span>Lesson done</span></label>
    </div>
    ${navLinks("teacher", l)}`;

  $app.querySelector("textarea").oninput = (e) => {
    const all = store.get("notes", {});
    all[l.n] = e.target.value;
    store.set("notes", all);
  };
  $app.querySelector("#done").onchange = (e) => {
    const d = new Set(store.get("done", []));
    e.target.checked ? d.add(l.n) : d.delete(l.n);
    store.set("done", [...d]);
  };
  startTimer(l);
}

function startTimer(l) {
  const total = l.phases.reduce((s, p) => s + p.min, 0) * 60;
  const ends = l.phases.reduce((a, p) => [...a, (a.at(-1) || 0) + p.min * 60], []);
  timer = { elapsed: 0, running: false, since: 0 };
  const el = (s) => $app.querySelector(s);
  const now = () => timer.elapsed + (timer.running ? (Date.now() - timer.since) / 1000 : 0);
  const fmt = (s) => `${s < 0 ? "-" : ""}${String(Math.floor(Math.abs(s) / 60)).padStart(2, "0")}:${String(Math.floor(Math.abs(s) % 60)).padStart(2, "0")}`;

  let lastPhase = -1;
  const draw = () => {
    const t = now();
    let i = ends.findIndex((e) => t < e);
    if (i < 0) i = l.phases.length;
    el(".clock").textContent = fmt(total - t);
    el(".pname").textContent = i < l.phases.length
      ? `${i + 1}. ${l.phases[i].name} — ${fmt(ends[i] - t)} left`
      : "Time's up 🎉";
    $app.querySelectorAll(".bar span").forEach((s, k) => (s.className = k < i ? "past" : k === i && t > 0 ? "cur" : ""));
    $app.querySelectorAll(".phase").forEach((p, k) => (p.className = "phase" + (k < i ? " past" : k === i && t > 0 ? " cur" : "")));
    if (i !== lastPhase && t > 0 && i > 0 && timer.running) beep();
    lastPhase = i;
  };
  const setRunning = (on) => {
    if (on === timer.running) return;
    if (on) timer.since = Date.now();
    else timer.elapsed = now();
    timer.running = on;
    el('[data-act="toggle"]').textContent = on ? "⏸ Pause" : "▶ Start";
  };
  $app.querySelector(".timer").onclick = (e) => {
    const act = e.target.dataset.act;
    if (act === "toggle") setRunning(!timer.running);
    if (act === "next") {
      const t = now();
      const next = ends.find((x) => x > t + 0.5);
      if (next !== undefined) { timer.elapsed = next; timer.since = Date.now(); }
    }
    if (act === "reset") { setRunning(false); timer.elapsed = 0; lastPhase = -1; }
    draw();
  };
  timer.tick = setInterval(draw, 500);
  draw();
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    o.frequency.value = 880;
    o.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.25);
  } catch {}
}

// ---------- Student ----------

function renderStudentLesson(l) {
  if (!l) return renderList("student");
  const ticks = store.get("ticks", {});
  const tasks = l.phases.flatMap((p) => p.student);
  $app.innerHTML = `
    <p class="muted">Lesson ${l.n} · Travel English</p>
    <h1>${esc(l.title)}</h1>
    <div class="box"><b>🎯 Today:</b> ${esc(l.goal)}</div>
    <h2>1. Where would you rather be?</h2>${warmupHtml(l)}
    <h2>2. New words</h2>
    <p class="muted">Read the example, guess the meaning, then tap to check.</p>
    ${vocabHtml(l, true)}
    <h2>3. Quiz: match the word to its meaning</h2><div id="quiz"></div>
    <h2>4. Let's talk</h2>
    <div class="box">${questionsHtml(l)}</div>
    <h2>5. Useful phrases</h2><div class="box">${phrasesHtml(l)}</div>
    <h2>✅ Tasks</h2>
    <div class="box">
      ${tasks.map((s, i) => {
        const id = `${l.n}-${i}`;
        return `<label class="task ${ticks[id] ? "checked" : ""}"><input type="checkbox" data-id="${id}" ${ticks[id] ? "checked" : ""}><span>${esc(s)}</span></label>`;
      }).join("")}
    </div>
    <div class="box"><b>⚡ Challenge:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>🃏 Flashcards</h2><div id="cards"></div>
    ${navLinks("student", l)}`;

  $app.querySelectorAll(".reveal").forEach((b) => (b.onclick = () => b.replaceWith(b.dataset.m)));
  $app.querySelectorAll(".task input").forEach((cb) => (cb.onchange = () => {
    const all = store.get("ticks", {});
    all[cb.dataset.id] = cb.checked;
    store.set("ticks", all);
    cb.closest(".task").classList.toggle("checked", cb.checked);
  }));
  quiz($app.querySelector("#quiz"), l);
  const review = LESSONS.filter((x) => x.n < l.n).flatMap(cardsFor).filter((x) => studied(x) && isDue(x)).slice(0, 10);
  flashcards($app.querySelector("#cards"), [...cardsFor(l), ...review]);
}

const cardsFor = (l) => wordsOf(l).map(([w, m, e]) => ({ w, m, e, src: l.title }));

function renderAllCards() {
  $app.innerHTML = `
    <h1>🃏 Practise words</h1>
    <p class="muted">Cards you know come back less often. Cards you miss come back soon.</p>
    <div class="row">
      <button data-k="due">Due today</button>
      ${LESSONS.map((l) => `<button class="ghost" data-k="${l.n}">${l.n}. ${esc(l.title)}</button>`).join("")}
    </div>
    <div id="cards"></div>
    <p><a href="#/student">← My lessons</a></p>`;
  const pick = (k) => flashcards($app.querySelector("#cards"),
    k === "due" ? LESSONS.flatMap(cardsFor).filter((x) => studied(x) && isDue(x)).slice(0, 30) : cardsFor(lesson(k)));
  $app.querySelector(".row").onclick = (e) => e.target.dataset.k && pick(e.target.dataset.k);
  pick("due");
}

// Leitner boxes: box 0..5, next review after DAYS[box] days.
const DAYS = [0, 1, 2, 4, 8, 16];
const cardState = (w) => store.get("cards", {})[w] || { box: 0, due: 0 };
const isDue = (x) => cardState(x.w).due <= Date.now();
const studied = (x) => x.w in store.get("cards", {});
function grade(w, ok) {
  const all = store.get("cards", {});
  const box = ok ? Math.min((all[w]?.box ?? 0) + 1, DAYS.length - 1) : 0;
  all[w] = { box, due: Date.now() + DAYS[box] * 864e5 };
  store.set("cards", all);
}

function flashcards(root, words) {
  const deck = shuffle(words.map((x) => ({ ...x })));
  let flipped = false, right = 0;
  const total = deck.length;
  const draw = () => {
    if (!deck.length) {
      root.innerHTML = `<div class="flash"><div class="card"><div class="w">🎉</div><div class="m">${total ? `Done! ${right}/${total} right first time.` : "Nothing due right now. Learn new words in a lesson, or come back later."}</div></div></div>`;
      return;
    }
    const c = deck[0];
    root.innerHTML = `
      <div class="flash">
        <p class="muted" style="text-align:center">${deck.length} left · tap the card to flip</p>
        <div class="card">${flipped
          ? `<div class="m">${esc(c.m)}</div>${c.e ? `<div class="e">"${esc(c.e)}"</div>` : ""}`
          : `<div class="w">${esc(c.w)}</div><div class="muted">${esc(c.src)}</div>`}</div>
        ${flipped ? `<div class="fbtns"><button class="again">✗ Again</button><button class="good">✓ Got it</button></div>` : ""}
      </div>`;
    root.querySelector(".card").onclick = () => { flipped = !flipped; draw(); };
    if (flipped) {
      root.querySelector(".again").onclick = () => { grade(c.w, false); c.missed = true; deck.push(deck.shift()); flipped = false; draw(); };
      root.querySelector(".good").onclick = () => { if (!c.missed) right++; grade(c.w, true); deck.shift(); flipped = false; draw(); };
    }
  };
  draw();
}
