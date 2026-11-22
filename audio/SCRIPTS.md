# Recording scripts for the teacher

Read these aloud and record them. The app plays your recording in the Listening gate; there is no synthetic voice anywhere.

## How to record (2 minutes)

1. Quiet room, door closed, phone or laptop 20–25 cm from your mouth, slightly to the side so you do not breathe into the mic.
2. Read it **to the student**, not to the page. He is sitting in front of you — talk like you are telling him this, not like you are announcing it.
3. One take is fine. Small mistakes are better than a stiff second attempt.
4. Do not stop the recording between paragraphs — the pause instructions below do that job.
5. Send the recording to me, or drop it in `audio/` with the name given in each script.

**Format if you convert yourself:** mono, 22–44 kHz, AAC 48 kbps, under 400 KB per minute.
`ffmpeg -i recording.m4a -codec:a aac -b:a 48k -ac 1 -ar 22050 audio/<name>.m4a`

**Pause markings:** `//` = short beat (about half a second). `///` = full stop, let it sit (about a second).

---

## Lesson 8 — "How a city gets built"

**File name:** `l8-interview.m4a` · **Target length:** 60–75 seconds · **Voice:** first person, a developer being interviewed. Slightly tired, honest, not salesy.

**Say the awkward words normally:** RAGE = like the word "rage". Euphoria = "you-FOR-ee-a". Bullet = the word. Streaming = the word. Do not spell anything out.

### Script

So the question I get most is: why does a game take so long? ///

People think we are drawing a map. We are not. // We are building a city that has to keep working when the player does something stupid. // And players do something stupid constantly. ///

Take one street. // If the player drives down it at a hundred kilometres an hour, the console has to load the next street before he gets there. // If he turns around, it has to unload, and reload. // If he parks and waits, it has to keep the traffic moving and the pedestrians walking. // Because the moment it stops, the world feels dead. ///

The team that hurts us most is the one nobody sees. // The streaming team. // They do not make anything that looks good. // They make sure nothing ever pops into view. // And when they get it right, nobody mentions them. // When they get it wrong, everyone does. ///

And the delays? // A delay is usually not one big problem. // It is four hundred small problems that each looked fine on their own. ///

### Notes

- The last line is the one he has to remember. Slow down for it, then stop.
- Do not read the five questions aloud before he listens. The app shows them; you only read the interview.
- If he asks for a second listen, give it — that is normal for a first listening lesson.

---

## Adding the file to the app

Send me the file name and it gets wired in one line:

```js
listen: { audio: "audio/l8-interview.m4a", seconds: 65, script: [...], questions: [...] }
```

With no audio file the gate says "Your teacher reads this aloud" — so the lesson works either way.
