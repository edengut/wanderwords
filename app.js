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
  $who.textContent = role === "teacher" ? "CREW" : role ? "PASSENGER" : "BOARDING";
  window.scrollTo(0, 0);
  if (role === "teacher") {
    if (!teacher) return renderLogin();
    return a ? renderTeacherLesson(lesson(a)) : renderList("teacher");
  }
  if (role === "student") return a ? renderStudentLesson(lesson(a)) : renderList("student");
  if (role === "cards") return renderAllCards();
  renderHome();
}

function renderHome() {
  $app.innerHTML = `
    <section class="hero">
      <p class="kicker">Now boarding · B1 → B2</p>
      <h1>Wander<span>words</span></h1>
      <p>Your English journey, one destination at a time. Choose your seat.</p>
    </section>
    <div class="home">
      ${pass("#/teacher", "teacher", "CREW", "Teacher", "Flight plan · timer · notes", "🧑‍✈️")}
      ${pass("#/student", "student", "PASSENGER", "Student", "Words · quiz · talk · cards", "🧳")}
    </div>`;
}

// A boarding-pass link: main part + tear-off stub.
function pass(href, cls, label, title, sub, icon, extra = "") {
  return `<a class="pass ${cls}" href="${href}">
    <div class="pass-main">
      <div class="pass-top"><span>${label}</span><span>WANDERWORDS AIR</span></div>
      <div class="pass-route"><b>B1</b><span class="pass-line">✈</span><b>B2</b></div>
      <h2>${esc(title)}</h2><p>${esc(sub)}</p>${extra}
    </div>
    <div class="pass-stub"><div class="pass-icon">${icon}</div><div class="barcode"></div></div>
  </a>`;
}

function renderLogin() {
  $app.innerHTML = `
    <form class="login">
      <div class="login-icon">🛂</div>
      <h1>Crew only</h1>
      <p class="muted">Show your crew pass to continue.</p>
      <input type="password" placeholder="Password" autofocus>
      <div class="err"></div>
      <button>Board</button>
    </form>`;
  const form = $app.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    if (btoa(form.querySelector("input").value.trim()) === TEACHER_PASS) {
      sessionStorage.setItem("travel-teacher", "1");
      route();
    } else form.querySelector(".err").textContent = "Access denied: wrong password";
  };
}

function renderList(role) {
  const done = store.get("done", []);
  $app.innerHTML = `
    <p class="kicker">${role === "teacher" ? "Crew schedule" : "My trips"}</p>
    <h1 class="page">${role === "teacher" ? "Choose a flight" : "Where are we going?"}</h1>
    <p class="lead">50-minute flights · B1 → B2. ${role === "student" ? `<a href="#/cards">Practise all words →</a>` : `${done.length}/${LESSONS.length} landed.`}</p>
    <div class="home">
      ${LESSONS.map((l) => pass(`#/${role}/${l.n}`, done.includes(l.n) ? "done" : "", `FLIGHT WW-${String(l.n).padStart(3, "0")}`,
        l.title, `${wordsOf(l).length} words · ${l.phases.length} gates · 50 min`, done.includes(l.n) ? "✅" : "🌍")).join("")}
    </div>`;
}

function navLinks(role, l) {
  const prev = lesson(l.n - 1), next = lesson(l.n + 1);
  return `<div class="row" style="justify-content:space-between;margin-top:24px">
    ${prev ? `<a class="btn ghost" href="#/${role}/${prev.n}">← Flight ${prev.n}</a>` : "<span></span>"}
    <a class="btn ghost" href="#/${role}">All flights</a>
    ${next ? `<a class="btn ghost" href="#/${role}/${next.n}">Flight ${next.n} →</a>` : "<span></span>"}
  </div>`;
}

// ---------- Shared lesson blocks ----------

const warmupHtml = (l) => `<div class="postcards">${l.warmup.map((p, i) => `
  <figure class="postcard p${i}"><div class="pc-img">${p.icon}</div>
    <figcaption><span class="pc-hand">Greetings from…</span>${esc(p.caption)}</figcaption>
    <div class="pc-stamp">${i ? "🐚" : "🏛️"}</div></figure>`).join("")}</div>`;

// A numbered stop on the lesson's route.
const gate = (n, title, sub, body) => `<section class="gate">
  <div class="gate-no"><span>GATE</span><b>${n}</b></div>
  <div class="gate-body"><h2>${title}</h2>${sub ? `<p class="lead">${sub}</p>` : ""}${body}</div></section>`;

// Words as luggage tags. hideMeaning: tap the tag to flip it and see the meaning.
const vocabHtml = (l, hideMeaning) => l.groups.map((g) => `
  <h3 class="group">${esc(g.name)}</h3>
  <div class="tags">${g.words.map(([w, m, e]) => `
    <div class="tag-card ${hideMeaning ? "" : "open"}" ${hideMeaning ? 'tabindex="0" role="button"' : ""}>
      <div class="tag-hole"></div>
      <div class="tag-w">${esc(w)}</div>
      <div class="tag-e">“${esc(e)}”</div>
      <div class="tag-m">${hideMeaning ? '<span class="tap">Guess, then tap ↻</span>' : ""}<span class="m">${esc(m)}</span></div>
    </div>`).join("")}</div>`).join("");

let qn = 0;
const questionsHtml = (l) => (qn = 0, l.questions.map((s) => `
  <h3 class="group">${esc(s.name)}</h3><div class="bubbles">${s.qs.map((q) => `<div class="bubble"><b>${++qn}</b>${esc(q)}</div>`).join("")}</div>`).join("")
  + `<div class="followups"><span>Keep going:</span>${l.followups.map((f) => `<em>${esc(f)}</em>`).join("")}</div>`);

const phrasesHtml = (l) => `<div class="phrases">${l.phrases.map((p) => `<div class="phrase">💬 ${esc(p)}</div>`).join("")}</div>`;

// Matching quiz: one select per word, options = that group's meanings, shuffled.
function quiz(root, l) {
  let n = 0;
  root.innerHTML = `<div class="quiz passport">
    ${l.groups.map((g) => {
      const opts = shuffle(g.words.map(([, m]) => m));
      return `<h3 class="group">${esc(g.name)}</h3>` + g.words.map(([w, m]) => `
        <div class="q" data-ans="${esc(m)}"><span>${++n}. <b>${esc(w)}</b></span>
          <select><option value="">— choose —</option>${opts.map((o) => `<option>${esc(o)}</option>`).join("")}</select><i class="stamp"></i></div>`).join("");
    }).join("")}
    <div class="row" style="margin-top:12px"><button data-act="check">🛂 Stamp my passport</button><button class="ghost" data-act="retry">Try again</button><span class="score"></span></div>
  </div>`;
  root.querySelector('[data-act="check"]').onclick = () => {
    let right = 0;
    root.querySelectorAll(".q").forEach((q) => {
      const ok = q.querySelector("select").value === q.dataset.ans;
      right += ok;
      q.className = "q " + (ok ? "ok" : "bad");
      q.querySelector(".stamp").textContent = ok ? "APPROVED" : "TRY AGAIN";
    });
    root.querySelector(".score").textContent = `${right} / ${n} ${right === n ? "🏆 Perfect flight!" : right >= n * 0.7 ? "✈️ Nice landing!" : "🧭 Keep exploring"}`;
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
    <p class="kicker">Flight WW-${String(l.n).padStart(3, "0")} · Crew briefing</p>
    <h1 class="page">${esc(l.title)}</h1>
    <div class="box"><b>Mission:</b> ${esc(l.goal)}${best !== undefined ? `<br><b>Best quiz score on this device:</b> ${best} / ${wordsOf(l).length}` : ""}</div>
    <div class="timer">
      <div class="clock">50:00</div>
      <div class="now"><div class="pname">Ready for take-off</div>
        <div class="flight"><div class="bar">${l.phases.map((p) => `<span style="flex:${p.min}"></span>`).join("")}</div><div class="plane">✈</div></div></div>
      <button data-act="toggle">▶ Take off</button>
      <button data-act="next">Next gate ⏭</button>
      <button data-act="reset">↺</button>
    </div>
    <h2>Flight plan</h2>
    ${l.phases.map((p, i) => `
      <div class="phase" data-i="${i}">
        <h3><span><small>GATE ${i + 1}</small> ${esc(p.name)}</span><span class="min">${p.min} min</span></h3>
        <ul>${p.teacher.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="stu">🎒 Student sees: ${p.student.map(esc).join(" · ")}</div>
      </div>`).join("")}
    <h2>Warm-up postcards</h2>${warmupHtml(l)}
    <h2>Words (${wordsOf(l).length})</h2>${vocabHtml(l, false)}
    <h2>Questions</h2>${questionsHtml(l)}
    <h2>Useful phrases</h2>${phrasesHtml(l)}
    <div class="box"><b>⚡ If he's fast:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>Flight log</h2>
    <textarea placeholder="Errors to revisit, words he used, what to change…">${esc(notes[l.n] || "")}</textarea>
    <div class="row" style="margin-top:12px">
      <label class="task"><input type="checkbox" id="done" ${done.includes(l.n) ? "checked" : ""}><span>Landed (lesson done)</span></label>
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
    el(".plane").style.left = `${Math.min(t / total, 1) * 100}%`;
    el(".pname").textContent = i < l.phases.length
      ? `${i + 1}. ${l.phases[i].name} — ${fmt(ends[i] - t)} left`
      : "Landed 🛬 Time's up!";
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
    el('[data-act="toggle"]').textContent = on ? "⏸ Hold" : "▶ Take off";
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
    <section class="ticket">
      <div class="ticket-main">
        <div class="pass-top"><span>FLIGHT WW-${String(l.n).padStart(3, "0")}</span><span>BOARDING PASS</span></div>
        <h1>${esc(l.title)}</h1>
        <div class="ticket-route"><div><small>FROM</small><b>B1</b></div><div class="pass-line">✈</div><div><small>TO</small><b>B2</b></div></div>
        <p>🎯 ${esc(l.goal)}</p>
      </div>
      <div class="ticket-stub"><div><small>DURATION</small><b>50 min</b></div><div><small>GATES</small><b>5</b></div><div><small>WORDS</small><b>${wordsOf(l).length}</b></div></div>
    </section>
    ${gate(1, "Where would you rather be?", "Look at the two postcards. Choose one and say why.", warmupHtml(l))}
    ${gate(2, "Pack your words", "Read the example on each luggage tag, guess the meaning, then tap the tag to check.", vocabHtml(l, true))}
    ${gate(3, "Passport control", "Match each word to its meaning. Every right answer gets a stamp.", '<div id="quiz"></div>')}
    ${gate(4, "Tell me about a trip", "Answer out loud. Use at least 5 new words and talk for 30–60 seconds.", questionsHtml(l))}
    ${gate(5, "Souvenir phrases", "Take these home and use them when you speak.", phrasesHtml(l))}
    <h2>✅ Check-in list</h2>
    <div class="box">
      ${tasks.map((s, i) => {
        const id = `${l.n}-${i}`;
        return `<label class="task ${ticks[id] ? "checked" : ""}"><input type="checkbox" data-id="${id}" ${ticks[id] ? "checked" : ""}><span>${esc(s)}</span></label>`;
      }).join("")}
    </div>
    <div class="box"><b>⚡ Challenge:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>🃏 Postcard flashcards</h2><div id="cards"></div>
    ${navLinks("student", l)}`;

  $app.querySelectorAll(".tag-card[role=button]").forEach((t) => {
    t.onclick = () => t.classList.toggle("open");
    t.onkeydown = (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.click());
  });
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
    <p class="kicker">Souvenir shop</p><h1 class="page">🃏 Practise words</h1>
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

// Start last, so every const above is defined before the first render.
window.addEventListener("hashchange", route);
route();
