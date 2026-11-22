#!/usr/bin/env node
// Checks the lesson data contract before a push:
//   node tools/validate-lessons.js
// Content is split in two: data/index.js (menu, decks, word lists) and one body per
// lesson in data/lessons/l<N>.js. Both halves are checked, plus they must agree.

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const problems = [];

// The data files assign to `window`, which does not exist in node.
function run(file, expression) {
  const source = fs.readFileSync(file, "utf8");
  return new Function("window", `${source}\nreturn ${expression};`)({});
}

const INDEX = run(path.join(root, "data/index.js"), "window.LESSONS");
const bodies = {};
for (const file of fs.readdirSync(path.join(root, "data/lessons")).filter((f) => f.endsWith(".js"))) {
  const content = run(path.join(root, "data/lessons", file), "window.LESSON_CONTENT");
  Object.assign(bodies, content);
}

const GATES = ["warmup", "reading", "story", "listen", "rules", "drill", "transform", "words", "quiz", "speak"];
const seen = new Set();

for (const stub of INDEX) {
  const tag = `L${stub.n}`;
  if (seen.has(stub.n)) problems.push(`${tag}: duplicate lesson number in the index`);
  seen.add(stub.n);

  if (!stub.title) problems.push(`${tag}: no title`);
  if (!stub.from || !stub.to) problems.push(`${tag}: missing from/to level`);
  if (stub.theme && !fs.existsSync(path.join(root, "themes", `${stub.theme}.css`))) problems.push(`${tag}: missing themes/${stub.theme}.css`);

  const words = (stub.groups || []).flatMap((g) => g.words || []);
  if (!words.length) problems.push(`${tag}: no words in the index — the decks would be empty`);
  for (const w of words) if (!Array.isArray(w) || w.length !== 3) problems.push(`${tag}: word is not [word, meaning, example]: ${JSON.stringify(w)}`);
  const names = words.map((w) => w[0]);
  if (new Set(names).size !== names.length) problems.push(`${tag}: duplicate word inside the lesson`);

  const body = bodies[stub.n];
  if (!body) { problems.push(`${tag}: no body in data/lessons (the page would not open)`); continue; }

  const full = { ...stub, ...body };
  const minutes = (full.phases || []).reduce((sum, p) => sum + p.min, 0);
  if (minutes !== 50) problems.push(`${tag}: phases total ${minutes} minutes, must be 50`);
  if (stub.phaseCount !== undefined && stub.phaseCount !== (full.phases || []).length) {
    problems.push(`${tag}: index says ${stub.phaseCount} gates, body has ${(full.phases || []).length}`);
  }

  for (const key of Object.keys(full.gates || {})) {
    if (!GATES.includes(key)) problems.push(`${tag}: unknown gate "${key}"`);
  }
  for (const item of full.warmup || []) {
    if (item.img && !fs.existsSync(path.join(root, item.img))) problems.push(`${tag}: missing image ${item.img}`);
  }
  for (const photo of full.story?.photos || []) {
    if (!fs.existsSync(path.join(root, photo.img))) problems.push(`${tag}: missing story image ${photo.img}`);
  }
  if (full.listen?.audio && !fs.existsSync(path.join(root, full.listen.audio))) problems.push(`${tag}: missing audio ${full.listen.audio}`);

  for (const [label, items] of [["drill", full.drill], ["transform", full.transform]]) {
    for (const item of items || []) {
      const [q, options, answer] = item;
      if (!Array.isArray(options) || !options.includes(answer)) problems.push(`${tag}: ${label} answer not among options: ${q}`);
    }
  }

  if (!(full.questions || []).length) problems.push(`${tag}: no speaking questions`);
  if (!full.challenge || !full.homework) problems.push(`${tag}: missing challenge or homework`);
}

const orphans = Object.keys(bodies).filter((n) => !seen.has(Number(n)));
for (const n of orphans) problems.push(`data/lessons/l${n}.js has no entry in the index`);

console.log(`checked ${INDEX.length} lessons (${(fs.statSync(path.join(root, "data/index.js")).size / 1024).toFixed(1)} KB index + ${Object.keys(bodies).length} bodies)`);
if (problems.length) {
  console.log(`${problems.length} problem(s):`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
console.log("data contract OK");
