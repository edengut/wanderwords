// Single-page app with hash routes (works on GitHub Pages: no server, relative paths only):
//   #/                 home (Teacher / Student)
//   #/teacher[/N]      password → lesson list → 50-minute plan with timer, notes
//   #/student[/N]      lesson list → warm-up, words, quiz, questions, phrases, flashcards
//   #/cards            all-words flashcards

// Not real security on a static site: it only keeps the student out of the teacher view.
const TEACHER_PASS = "a2luZXRz"; // btoa of the lowercase password (login ignores case)

const $app = document.getElementById("app");
const $who = document.getElementById("who");
// Prefixed keys: all repos under one github.io account share the same localStorage.
const store = {
  // Wrong-shaped values (e.g. a string where an object is expected) fall back to the default too.
  get: (k, d) => {
    try {
      const v = JSON.parse(localStorage.getItem("travel:" + k));
      return v !== null && typeof v === typeof d && Array.isArray(v) === Array.isArray(d) ? v : d;
    } catch { return d; }
  },
  // Private mode or a full quota must not break the lesson; progress is best-effort.
  set: (k, v) => { try { localStorage.setItem("travel:" + k, JSON.stringify(v)); } catch {} },
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const lesson = (n) => LESSONS.find((l) => l.n === Number(n));
const wordsOf = (l) => l.groups.flatMap((g) => g.words);
const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((p) => p[1]);

let timer = null;

// Fonts a theme needs beyond the shared set in index.html. Loaded once, on first use.
const THEME_FONTS = {
  germany: "family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800",
  future: "family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800",
  wright: "family=Rye&family=Special+Elite&family=Bitter:wght@400;600;700",
  seismic: "family=Archivo+Black&family=IBM+Plex+Mono:wght@400;600",
  vice: "family=Audiowide&family=JetBrains+Mono:wght@400;700",
};
const loadedFonts = new Set();
function loadThemeFonts(name) {
  const spec = THEME_FONTS[name];
  if (!spec || loadedFonts.has(name)) return;
  loadedFonts.add(name);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${spec}&display=swap`;
  document.head.appendChild(link);
}

// Lesson bodies load on demand: data/index.js holds the menu, the decks and the word
// lists (16 KB); data/lessons/lN.js holds one lesson's reading, tasks and phases.
const bodyCache = new Map();
function loadLessonBody(n) {
  if (bodyCache.has(n)) return bodyCache.get(n);
  const promise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `data/lessons/l${n}.js`;
    script.onload = () => {
      const body = (window.LESSON_CONTENT || {})[n];
      body ? resolve({ ...lesson(n), ...body }) : reject(new Error(`lesson ${n} has no body`));
    };
    script.onerror = () => reject(new Error(`could not load lesson ${n}`));
    document.head.appendChild(script);
  });
  bodyCache.set(n, promise);
  return promise;
}

let routeToken = 0;
async function route() {
  clearInterval(timer?.tick);
  timer = null;
  const token = ++routeToken;
  const [, role, a] = location.hash.replace(/^#/, "").split("/");
  const teacher = (() => { try { return sessionStorage.getItem("travel-teacher") === "1"; } catch { return false; } })();
  $who.textContent = role === "teacher" ? "CREW" : role ? "PASSENGER" : "BOARDING";
  window.scrollTo(0, 0);
  const theme = (a && ["teacher", "student"].includes(role) && lesson(a)?.theme) || "";
  document.body.className = theme;
  loadThemeFonts(theme);
  if (role === "teacher") {
    if (!teacher) return renderLogin();
    return a ? showLesson(a, "teacher", token) : renderList("teacher");
  }
  if (role === "student") return a ? showLesson(a, "student", token) : renderList("student");
  if (role === "cards") return renderAllCards();
  renderHome();
}

// Show one lesson: paint a light header, fetch the body, then render the full view.
async function showLesson(n, role, token) {
  const stub = lesson(n);
  if (!stub) return renderList(role);
  $app.innerHTML = `<p class="kicker">Flight WW-${String(stub.n).padStart(3, "0")}</p>
    <h1 class="page">${esc(stub.title)}</h1>
    <p class="lead">Loading the lesson…</p>`;
  try {
    const full = await loadLessonBody(stub.n);
    if (token !== routeToken) return; // the user moved on while it was loading
    role === "teacher" ? renderTeacherLesson(full) : renderStudentLesson(full);
  } catch (err) {
    if (token !== routeToken) return;
    $app.innerHTML = `<div class="box"><b>This lesson could not be loaded.</b><br>${esc(err.message)}</div>
      <div class="row" style="margin-top:12px"><a class="btn ghost" href="#/${role}">← All flights</a></div>`;
  }
}

function renderHome() {
  $app.innerHTML = `
    <section class="hero">
      <p class="kicker">Now boarding · B1 → C1</p>
      <h1>Wander<span>words</span></h1>
      <p>Your English journey, one destination at a time. Choose your seat.</p>
    </section>
    <div class="home">
      ${pass("#/teacher", "teacher", "CREW", "Teacher", "Flight plan · timer · notes", "🧑‍✈️")}
      ${pass("#/student", "student", "PASSENGER", "Student", "Words · quiz · talk · cards", "🧳")}
    </div>`;
}

// A boarding-pass link: main part + tear-off stub.
function pass(href, cls, label, title, sub, icon, from = "B1", to = "B2") {
  return `<a class="pass ${cls}" href="${href}">
    <div class="pass-main">
      <div class="pass-top"><span>${label}</span><span>WANDERWORDS AIR</span></div>
      <div class="pass-route"><b>${from}</b><span class="pass-line">✈</span><b>${to}</b></div>
      <h2>${esc(title)}</h2><p>${esc(sub)}</p>
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
    if (btoa(form.querySelector("input").value.trim().toLowerCase()) === TEACHER_PASS) {
      try { sessionStorage.setItem("travel-teacher", "1"); } catch {}
      route();
    } else form.querySelector(".err").textContent = "Access denied: wrong password";
  };
}

function renderList(role) {
  // A lesson is landed when the data says so (data/index.js `done: true`) or when this
  // device ticked it on the lesson page. The data flag is what every device sees.
  // Landed is a data fact, not device state: data/index.js carries done: true.
  const landedSet = new Set(LESSONS.filter((l) => l.done).map((l) => l.n));
  const landed = (n) => landedSet.has(n);
  const count = landedSet.size;
  $app.innerHTML = `
    <p class="kicker">${role === "teacher" ? "Crew schedule" : "My trips"}</p>
    <h1 class="page">${role === "teacher" ? "Choose a flight" : "Where are we going?"}</h1>
    <p class="lead">50-minute lessons · B1 → C1. ${role === "student"
      ? `<a href="#/cards">Practise all words →</a>`
      : `${count}/${LESSONS.length} landed.`}</p>
    <div class="home">
      ${LESSONS.map((l) => pass(`#/${role}/${l.n}`, landed(l.n) ? "done" : "", `FLIGHT WW-${String(l.n).padStart(3, "0")}`,
        l.title, `${wordsOf(l).length} words · ${l.phaseCount || 0} gates · 50 min`, landed(l.n) ? "✅" : l.icon || "🌍", l.from, l.to)).join("")}
    </div>`;
}

function navLinks(role, l) {
  const prev = lesson(l.n - 1), next = lesson(l.n + 1);
  return `<div class="row" style="margin-top:24px">
    ${prev ? `<a class="btn ghost" href="#/${role}/${prev.n}">← Flight ${prev.n}</a>` : ""}
    <a class="btn ghost" href="#/${role}">All flights</a>
    ${next ? `<a class="btn ghost" href="#/${role}/${next.n}">Flight ${next.n} →</a>` : ""}
  </div>`;
}

// ---------- Shared lesson blocks ----------

// A photo frame that opens the full-screen viewer on tap.
const photoFrame = (src, caption, credit) => `<div class="pc-img pc-zoom" tabindex="0" role="button" aria-label="Enlarge photo: ${esc(caption)}" data-photo="${esc(src)}" data-caption="${esc(caption)}"${credit ? ` data-credit="${esc(credit)}"` : ""}><img src="${esc(src)}" alt="" loading="lazy"></div>`;

// A warm-up card: a photo (tappable to enlarge) or an emoji scene, plus its caption.
function warmupCard(p, i) {
  return `<figure class="postcard p${i}">
    ${p.img ? photoFrame(p.img, p.caption, p.credit) : `<div class="pc-img">${p.icon}</div>`}
    <figcaption><span class="pc-hand">Greetings from…</span>${esc(p.caption)}</figcaption>
    <div class="pc-stamp">${p.stamp || (i ? "🐚" : "🏛️")}</div></figure>`;
}
const warmupHtml = (l) => `<div class="postcards">${l.warmup.map(warmupCard).join("")}</div>`;

// A case-study story: real events told as a narrative, with photographs.
const storyHtml = (l) => `<div class="reading story"><h3>${esc(l.story.title)}</h3>
  ${l.story.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
  ${l.story.photos ? `<div class="story-photos">${l.story.photos.map((p) => `<figure class="story-photo">${photoFrame(p.img, p.caption, p.credit)}<figcaption>${esc(p.caption)}</figcaption></figure>`).join("")}</div>` : ""}</div>`;

// A numbered stop on the lesson's route.
const gate = (n, title, sub, body) => `<section class="gate">
  <div class="gate-no"><span>GATE</span><b>${n}</b></div>
  <div class="gate-body"><h2>${esc(title)}</h2>${sub ? `<p class="lead">${esc(sub)}</p>` : ""}${body}</div></section>`;

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

// Listening: the teacher reads the script aloud; the browser voice is the fallback.
// The transcript stays hidden until he has answered, so he listens first.
// Listening uses a real recording of the teacher, never a synthetic voice.
// Without a recording the gate asks the teacher to read the script aloud herself.
const listenHtml = (l) => `<div class="listen">
  ${l.listen.audio
    ? `<audio controls preload="metadata" src="${esc(l.listen.audio)}"></audio>
       <p class="muted listen-meta">${l.listen.seconds ? `about ${l.listen.seconds} seconds · ` : ""}listen once, without the transcript</p>`
    : `<p class="listen-meta">🎧 Your teacher reads this aloud. Put the phone down and listen.</p>`}
  <ol class="listen-qs">${l.listen.questions.map((q) => `<li>${esc(q)}</li>`).join("")}</ol>
  <details class="listen-script"><summary>Show the transcript — only after you have answered</summary>
    ${l.listen.script.map((p) => `<p>${esc(p)}</p>`).join("")}
  </details>
</div>`;

const readingHtml = (l) => `<div class="reading"><h3>${esc(l.reading.title)}</h3>
  ${l.reading.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}</div>`;

// Select quiz. sections: [{name, items: [[label, answer, options]]}]. key: where the best score is saved.
function quiz(root, sections, key) {
  let n = 0;
  root.innerHTML = `<div class="quiz passport">
    ${sections.map((g) => (g.name ? `<h3 class="group">${esc(g.name)}</h3>` : "") + g.items.map(([w, m, opts]) => `
        <div class="q" data-ans="${esc(m)}"><span>${++n}. <b>${esc(w)}</b></span>
          <select aria-label="Answer ${n}"><option value="">— choose —</option>${opts.map((o) => `<option>${esc(o)}</option>`).join("")}</select><i class="stamp"></i></div>`).join("")).join("")}
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
    best[key] = Math.max(best[key] || 0, right);
    store.set("quiz", best);
  };
  root.querySelector('[data-act="retry"]').onclick = () => quiz(root, sections, key);
}

// Matching: options = that group's meanings, shuffled.
const matchSections = (l) => l.groups.map((g) => {
  const opts = shuffle(g.words.map(([, m]) => m));
  return { name: g.name, items: g.words.map(([w, m]) => [w, m, opts]) };
});
const drillSections = (l) => [{ items: l.drill.map(([q, opts, a]) => [q, a, shuffle(opts)]) }];
// Key-word transformations: the prompt keeps the source sentence, the options are full rewrites.
const transformSections = (l) => [{ items: l.transform.map(([q, opts, a]) => [q, a, shuffle(opts)]) }];

const rulesHtml = (l) => `<div class="rules">${l.rules.map((r) => `
  <div class="rule"><h3>${esc(r.title)}</h3><div class="form">${esc(r.form)}</div><p>${esc(r.use)}</p>
    <ul>${r.ex.map((e) => `<li>${esc(e)}</li>`).join("")}</ul></div>`).join("")}</div>`;

const answerKey = (items) => `<ol class="box">${items.map(([q, , a]) => `<li>${esc(q)} → <b>${esc(a)}</b></li>`).join("")}</ol>`;

// ---------- Teacher ----------

function renderTeacherLesson(l) {
  if (!l) return renderList("teacher");
  const notes = store.get("notes", {});
  const best = store.get("quiz", {})[l.n];
  $app.innerHTML = `
    <p class="kicker">Flight WW-${String(l.n).padStart(3, "0")} · Crew briefing</p>
    <h1 class="page">${esc(l.title)}</h1>
    <div class="box"><b>Mission:</b> ${esc(l.goal)}${best !== undefined ? `<br><b>Best matching score on this device:</b> ${best} / ${wordsOf(l).length}` : ""}</div>
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
    ${l.reading ? `<h2>Reading text</h2>${readingHtml(l)}` : ""}
    ${l.story ? `<h2>Case study story</h2>${storyHtml(l)}` : ""}
    ${l.listen ? `<h2>Listening script</h2><div class="box">${l.listen.script.map((p) => `<p>${esc(p)}</p>`).join("")}</div>` : ""}
    ${l.rules ? `<h2>Grammar</h2>${rulesHtml(l)}` : ""}
    ${l.drill ? `<h2>Gap-fill answers</h2>${answerKey(l.drill)}` : ""}
    ${l.transform ? `<h2>Transformation answers</h2>${answerKey(l.transform)}` : ""}
    <h2>Words (${wordsOf(l).length})</h2>${vocabHtml(l, false)}
    <h2>Questions</h2>${questionsHtml(l)}
    <h2>Useful phrases</h2>${phrasesHtml(l)}
    <div class="box"><b>⚡ If he's fast:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>Flight log</h2>
    <textarea placeholder="Errors to revisit, words he used, what to change…">${esc(notes[l.n] || "")}</textarea>
    ${l.done ? `<div class="box"><b>✅ Landed.</b> Set by <code>done: true</code> in <code>data/index.js</code>.</div>` : ""}
    ${navLinks("teacher", l)}`;

  $app.querySelector("textarea").oninput = (e) => {
    const all = store.get("notes", {});
    all[l.n] = e.target.value;
    store.set("notes", all);
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
  const g = (k, t, sub) => l.gates?.[k] || [t, sub];
  const gates = [
    [...g("warmup", "Where would you rather be?", "Look at the two postcards. Choose one and say why."), warmupHtml(l)],
    l.reading && [...g("reading", "Reading", "Read once fast, then read again for details."), readingHtml(l)],
    l.story && [...g("story", "Case study", "Read the story. What exactly happened, and why?"), storyHtml(l)],
    l.listen && [...g("listen", "Listening", "Put the phone down and listen once. Then answer, and only then open the transcript."), listenHtml(l)],
    l.rules && [...g("rules", "Grammar check-in", "Read each card and the examples. Notice when we use each form."), rulesHtml(l)],
    [...g("words", "Pack your words", "Read the example on each luggage tag, guess the meaning, then tap the tag to check."), vocabHtml(l, true)],
    l.drill && [...g("drill", "Fill the gaps", "Choose the right form for each sentence. Every right answer gets a stamp."), '<div id="drill"></div>'],
    l.transform && [...g("transform", "Rewrite it", "Same meaning, new shape. Choose the rewrite that keeps the meaning."), '<div id="transform"></div>'],
    [...g("quiz", "Passport control", "Match each word to its meaning. Every right answer gets a stamp."), '<div id="quiz"></div>'],
    [...g("speak", "Tell me about a trip", "Answer out loud. Use at least 5 new words and talk for 30–60 seconds."), questionsHtml(l)],
    [l.labels?.phrases || "Souvenir phrases", "Take these home and use them when you speak.", phrasesHtml(l)],
  ].filter(Boolean);
  $app.innerHTML = `
    <section class="ticket">
      <div class="ticket-main">
        <div class="pass-top"><span>FLIGHT WW-${String(l.n).padStart(3, "0")}</span><span>BOARDING PASS</span></div>
        <h1>${esc(l.title)}</h1>
        <div class="ticket-route"><div><small>FROM</small><b>${l.from || "B1"}</b></div><div class="pass-line">✈</div><div><small>TO</small><b>${l.to || "B2"}</b></div></div>
        <p>🎯 ${esc(l.goal)}</p>
      </div>
      <div class="ticket-stub"><div><small>DURATION</small><b>50 min</b></div><div><small>GATES</small><b>${gates.length}</b></div><div><small>WORDS</small><b>${wordsOf(l).length}</b></div></div>
    </section>
    ${gates.map(([t, sub, body], i) => gate(i + 1, t, sub, body)).join("")}
    <h2>✅ Check-in list</h2>
    <div class="box">
      ${tasks.map((s, i) => {
        const id = `${l.n}-${i}`;
        return `<label class="task ${ticks[id] ? "checked" : ""}"><input type="checkbox" data-id="${id}" ${ticks[id] ? "checked" : ""}><span>${esc(s)}</span></label>`;
      }).join("")}
    </div>
    <div class="box"><b>⚡ Challenge:</b> ${esc(l.challenge)}</div>
    <div class="box"><b>🏠 Homework:</b> ${esc(l.homework)}</div>
    <h2>${l.labels?.cards || "🃏 Postcard flashcards"}</h2><div id="cards"></div>
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
  quiz($app.querySelector("#quiz"), matchSections(l), l.n);
  if (l.drill) quiz($app.querySelector("#drill"), drillSections(l), `${l.n}-drill`);
  if (l.transform) quiz($app.querySelector("#transform"), transformSections(l), `${l.n}-transform`);
  const review = LESSONS.filter((x) => x.n < l.n).flatMap(cardsFor).filter((x) => studied(x) && isDue(x)).slice(0, 10);
  flashcards($app.querySelector("#cards"), [...cardsFor(l), ...review]);
}

const cardsFor = (l) => wordsOf(l).map(([w, m, e]) => ({ w, m, e, src: l.title }));

function renderAllCards() {
  $app.innerHTML = `
    <p class="kicker">Souvenir shop</p><h1 class="page">🃏 Practise words</h1>
    <p class="muted">Cards you know come back less often. Cards you miss come back soon.</p>
    <div class="row">
      <button data-k="all">All words</button>
      <button class="ghost" data-k="due">Due today</button>
      ${LESSONS.map((l) => `<button class="ghost" data-k="${l.n}">${l.n}. ${esc(l.title)}</button>`).join("")}
    </div>
    <div id="cards"></div>
    <div class="row" style="margin-top:24px"><a class="btn ghost" href="#/student">← My lessons</a></div>`;
  const due = () => LESSONS.flatMap(cardsFor).filter((x) => studied(x) && isDue(x)).slice(0, 30);
  const pick = (k) => {
    $app.querySelectorAll(".row button").forEach((b) => b.classList.toggle("ghost", b.dataset.k !== k));
    flashcards($app.querySelector("#cards"), k === "all" ? LESSONS.flatMap(cardsFor) : k === "due" ? due() : cardsFor(lesson(k)));
  };
  $app.querySelector(".row").onclick = (e) => e.target.dataset.k && pick(e.target.dataset.k);
  pick(due().length ? "due" : "all");
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
        <div class="card" role="button" tabindex="0" aria-label="Flip card">${flipped
          ? `<div class="m">${esc(c.m)}</div>${c.e ? `<div class="e">"${esc(c.e)}"</div>` : ""}`
          : `<div class="w">${esc(c.w)}</div><div class="muted">${esc(c.src)}</div>`}</div>
        <div class="fbtns"${flipped ? "" : " hidden"}><button class="again">✗ Again</button><button class="good">✓ Got it</button></div>
      </div>`;
    root.querySelector(".card").onclick = () => { flipped = !flipped; draw(); root.querySelector(".card")?.focus({ preventScroll: true }); };
    root.querySelector(".card").onkeydown = (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.target.click());
    if (flipped) {
      root.querySelector(".again").onclick = () => { grade(c.w, false); c.missed = true; deck.push(deck.shift()); flipped = false; draw(); root.querySelector(".card")?.focus({ preventScroll: true }); };
      root.querySelector(".good").onclick = () => { if (!c.missed) right++; grade(c.w, true); deck.shift(); flipped = false; draw(); root.querySelector(".card")?.focus({ preventScroll: true }); };
    }
  };
  draw();
}

// Tap a postcard photo to open it full-screen; tap again (or press Esc) to close.
function openPhoto(src, caption, credit) {
  if (document.querySelector(".lightbox")) return;
  const opener = document.activeElement;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", caption || "Photo");
  box.tabIndex = -1;
  box.innerHTML = `<button class="lb-close" type="button" aria-label="Close photo">✕</button>
    <figure><img src="${esc(src)}" alt=""><figcaption>${esc(caption)}<span>${credit ? `${esc(credit)} · ` : ""}TAP OR CLICK TO CLOSE</span></figcaption></figure>`;
  const close = () => {
    if (!box.isConnected) return;
    box.remove();
    document.documentElement.classList.remove("zoomed");
    document.removeEventListener("keydown", onKey);
    if (opener && opener.focus) opener.focus({ preventScroll: true });
  };
  const onKey = (e) => e.key === "Escape" && close();
  box.onclick = close; // tap anywhere, including the photo, closes it
  document.addEventListener("keydown", onKey);
  document.documentElement.classList.add("zoomed");
  document.body.appendChild(box);
  box.querySelector(".lb-close").focus({ preventScroll: true });
}

document.addEventListener("click", (e) => {
  const z = e.target.closest && e.target.closest(".pc-zoom");
  if (z && z.dataset.photo) { e.preventDefault(); openPhoto(z.dataset.photo, z.dataset.caption, z.dataset.credit); }
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const z = document.activeElement && document.activeElement.closest && document.activeElement.closest(".pc-zoom");
  if (z && z.dataset.photo) { e.preventDefault(); openPhoto(z.dataset.photo, z.dataset.caption, z.dataset.credit); }
});

// Start last, so every const above is defined before the first render.
window.addEventListener("hashchange", route);
route();
