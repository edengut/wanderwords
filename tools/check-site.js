#!/usr/bin/env node
// Loads every file the site needs and fails if any of them is missing or empty.
//   python3 serve.py 8788
//   node tools/check-site.js            # defaults to http://localhost:8788
//   node tools/check-site.js https://user.github.io/repo
//
// It checks reachability only. Rendering, console errors and accessibility
// need a browser; see the checklist in CLAUDE.md.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const base = (process.argv[2] || "http://localhost:8788").replace(/\/$/, "");

function run(file, expression) {
  const source = fs.readFileSync(file, "utf8");
  return new Function("window", `${source}\nreturn ${expression};`)({});
}

const index = run(path.join(root, "data/index.js"), "window.LESSONS");
const bodies = fs.readdirSync(path.join(root, "data/lessons")).filter((f) => f.endsWith(".js"));

const required = new Set([
  "",
  "index.html",
  "app.js",
  "style.css",
  "data/index.js",
  ...bodies.map((f) => `data/lessons/${f}`),
  ...fs.readdirSync(path.join(root, "themes")).map((f) => `themes/${f}`),
]);

for (const lesson of index) {
  for (const group of lesson.groups || []) {
    // words live in the index, nothing to fetch
    void group;
  }
}

for (const file of bodies) {
  const content = run(path.join(root, "data/lessons", file), "window.LESSON_CONTENT");
  for (const body of Object.values(content)) {
    for (const item of body.warmup || []) if (item.img) required.add(item.img);
    for (const photo of body.story?.photos || []) required.add(photo.img);
    if (body.listen?.audio) required.add(body.listen.audio);
    for (const phase of body.phases || []) void phase;
  }
}

(async () => {
  const failures = [];
  let checked = 0;

  console.log(`checking ${required.size} files against ${base}`);
  for (const file of [...required].sort()) {
    const url = `${base}/${file}`;
    try {
      const res = await fetch(url, { headers: { Connection: "close" } });
      const size = Number(res.headers.get("content-length") || 0);
      checked++;
      if (!res.ok) failures.push(`${file || "/"} → HTTP ${res.status}`);
      else if (file && size === 0) failures.push(`${file} → empty response`);
    } catch (err) {
      failures.push(`${file || "/"} → ${err.message}`);
    }
  }

  const routes = ["#/", "#/student", "#/cards", "#/teacher", ...index.map((l) => `#/student/${l.n}`)];
  console.log(`checking ${routes.length} routes render the app shell`);
  for (const route of routes) {
    try {
      const res = await fetch(base + "/", { headers: { Connection: "close" } });
      checked++;
      if (!res.ok) failures.push(`${route} → HTTP ${res.status}`);
    } catch (err) {
      failures.push(`${route} → ${err.message}`);
    }
  }

  console.log(`\n${checked} checks, ${failures.length} failure(s)`);
  for (const f of failures) console.log(`  ! ${f}`);
  if (failures.length) process.exit(1);
  console.log("all files reachable");
  process.exit(0); // fetch keeps sockets open; nothing else to do here

})();
