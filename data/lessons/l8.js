// Lesson 8 body — loaded only when the lesson is opened.
(window.LESSON_CONTENT = window.LESSON_CONTENT || {})[8] = {
  goal: "Explain how an open game world is engineered: use the passive to describe a process, chronology to place each generation, and comparison to show what changed. Listen once and answer without reading. Then pitch a game of your own in three minutes.",
  gates: {
    warmup: [
      "Same city, thirty years",
      "Six pictures. Two are from this month, two are the machines, one is every console in one box. What changed, and what did not?"
    ],
    reading: [
      "How a world is streamed",
      "Read once for the process. Underline every passive, then find the three numbers that show the scale."
    ],
    listen: ["Listen once", "Do not read. Listen, answer, then open the transcript."],
    rules: [
      "Engineer's grammar",
      "Three tools: the passive of process, chronology, and comparison across generations."
    ],
    drill: [
      "Load the right form",
      "Each gap needs one form. Say whether it is a process, a sequence or a comparison."
    ],
    transform: ["Rebuild the sentence", "Same meaning, new shape. Name the structure that did the work."],
    words: ["Engine vocabulary", "Read the example, guess the meaning, then tap the card to check."],
    quiz: ["Asset check", "Match each word to its meaning."],
    speak: ["Pitch a game", "Three minutes. Then I am the publisher and I am not impressed."]
  },
  warmup: [
    {
      img: "img/rage/vi-13.jpg",
      caption: "Official screenshot: Vice City, 2026",
      stamp: "🌆",
      credit: "© Rockstar Games / Take-Two Interactive, official screenshot, used for teaching"
    },
    {
      img: "img/rage/vi-15.jpg",
      caption: "Official screenshot: street level, 2026",
      stamp: "🚗",
      credit: "© Rockstar Games / Take-Two Interactive, official screenshot, used for teaching"
    },
    {
      img: "img/rage/vi-16.jpg",
      caption: "Official screenshot: the city at speed, 2026",
      stamp: "🏙️",
      credit: "© Rockstar Games / Take-Two Interactive, official screenshot, used for teaching"
    },
    {
      img: "img/rage/consoles-all.jpg",
      caption: "Every PlayStation, 1994 to 2020: the box changed five times",
      stamp: "🕹️",
      credit: "Wikimedia Commons, CC BY-SA 4.0, resized"
    },
    {
      img: "img/rage/ps2.jpg",
      caption: "PlayStation 2, 2000: the machine GTA III was built for",
      stamp: "💽",
      credit: "Wikimedia Commons, public domain, resized"
    }
  ],
  reading: {
    title: "How a City Gets Built",
    paragraphs: [
      "An open-world game looks like a city. It is not: it is a machine for pretending to be a city, and every part of it is engineered. The engine — the software underneath the game — decides how much of that world can exist at once. The Rockstar Advanced Game Engine, RAGE, was built in-house after the studio lost access to an outside engine in 2004. It was assembled from an earlier engine written by a studio in San Diego, and it was first used in 2006 for a table-tennis game of all things, because a small project is the cheapest way to test a new engine.",
      "The central problem is memory. A modern city can hold millions of objects, and no console can keep them all in memory. So the world is streamed: only the streets near the player are loaded at full detail, while distant blocks are swapped for cheaper versions. The distance you see is the draw distance, and it is a budget, not a setting. Every extra metre of visible city costs memory and processing power, which is why the same map looks different on a five-hundred-dollar console and a two-thousand-dollar PC.",
      "Three systems do most of the visible work. Physics decides what happens when a car hits a wall; in RAGE this is handled by Bullet. Animation decides how people move; that came from Euphoria, which blends motion instead of playing fixed clips. Rendering decides what you actually see: lighting, shadows, fog and reflections. Between 2008 and 2026 the same engine moved from early HD graphics to physically based rendering, volumetric clouds and ray-traced reflections — not because the world became larger, but because each pixel became more expensive to compute.",
      "The history shows the same idea at work. The first two games, in 1997 and 1999, were top-down and two-dimensional. GTA III in 2001 turned the camera and built a city you could drive through in three dimensions, and that design has been copied ever since. GTA IV in 2008 rebuilt everything on RAGE and started a new visual era. GTA V in 2013 pushed the map out to sea and into the sky. GTA VI, released on 19 November 2026, runs on the same engine again — proof that twenty years of work can sit inside one codebase, and that the biggest change in a game is usually invisible to the player."
    ]
  },
  listen: {
    seconds: 75,
    script: [
      "So the question I get most is: why does a game take so long? People think we are drawing a map. We are not. We are building a city that has to keep working when the player does something stupid, and players do something stupid constantly.",
      "Take one street. If the player drives down it at a hundred kilometres an hour, the console has to load the next street before he gets there. If he turns around, it has to unload and reload. If he parks and waits, it has to keep the traffic moving and the pedestrians walking, because the moment it stops, the world feels dead.",
      "The team that hurts us most is the one nobody sees: the streaming team. They do not make anything that looks good. They make sure nothing ever pops into view, and when they get it right, nobody mentions them. When they get it wrong, everyone does.",
      "And the delays? A delay is usually not one big problem. It is four hundred small problems that each looked fine on their own."
    ],
    questions: [
      "What does the speaker say people wrongly think the team is doing?",
      "What has to happen when the player turns around?",
      "Why does the speaker call the streaming team the one 'nobody sees'?",
      "According to the speaker, what is a delay actually made of?",
      "Does the speaker sound proud, tired, or defensive? Which words tell you?"
    ]
  },
  rules: [
    {
      title: "⚙️ Passive of process: how it is done",
      form: "is / are + V3  ·  is being + V3  ·  has been + V3",
      use: "When the process matters more than the person doing it, the passive carries the description. Use 'is' for a general process, 'is being' for one happening now, 'has been' for a completed change.",
      ex: [
        "The world is streamed, not stored.",
        "Distant blocks are swapped for cheaper versions.",
        "The engine has been rebuilt three times."
      ]
    },
    {
      title: "🧭 Chronology: placing a generation",
      form: "by the time + past perfect  ·  since + present perfect  ·  once + present perfect",
      use: "History writing needs to say what was already true at a point in the past. 'By the time' takes the past perfect; 'since' and 'once' take the present perfect.",
      ex: [
        "By the time GTA III shipped, the studio had already built two engines.",
        "The same code has grown since 2008.",
        "Once the map is loaded, the frame rate must hold."
      ]
    },
    {
      title: "🔍 Comparison across generations",
      form: "whereas  ·  compared with  ·  twice as + adj  ·  far more + noun",
      use: "'Whereas' contrasts two clauses in one sentence; 'compared with' compares two nouns. Use 'far' and 'twice as' to make the size of the change visible.",
      ex: [
        "GTA III was top-down in spirit, whereas GTA IV was fully three-dimensional.",
        "Compared with 2006, a modern city uses far more memory.",
        "Ray tracing is twice as expensive as older lighting."
      ]
    }
  ],
  drill: [
    ["Only the nearest streets ___ at full detail.", ["are loaded", "load", "are loading"], "are loaded"],
    ["The engine ___ from an earlier one in 2004.", ["was rebuilt", "rebuilt", "has rebuild"], "was rebuilt"],
    [
      "By the time GTA III shipped, the studio ___ two engines.",
      ["had already built", "has already built", "was already building"],
      "had already built"
    ],
    ["The same code ___ since 2008.", ["has grown", "grew", "is growing"], "has grown"],
    [
      "Distant blocks ___ for cheaper versions as you drive.",
      ["are swapped", "swap", "are swapping"],
      "are swapped"
    ],
    ["___ the map is loaded, the frame rate must hold.", ["Once", "Until", "While"], "Once"],
    [
      "GTA III was three-dimensional, ___ the first two games were top-down.",
      ["whereas", "although", "however"],
      "whereas"
    ],
    [
      "___ with 2006, a modern city uses far more memory.",
      ["Compared", "Comparing", "Comparison"],
      "Compared"
    ],
    [
      "Every frame ___ in about sixteen milliseconds.",
      ["is rendered", "renders", "is rendering"],
      "is rendered"
    ],
    [
      "A delay is usually ___ than one big problem.",
      ["less dramatic", "least dramatic", "the less dramatic"],
      "less dramatic"
    ],
    [
      "Ray tracing is ___ as expensive as older lighting.",
      ["twice", "two times more", "double more"],
      "twice"
    ],
    [
      "Millions of objects ___ in a modern city, but not all at once.",
      ["exist", "are existed", "are existing"],
      "exist"
    ]
  ],
  transform: [
    [
      "Passive: 'They load only the nearest streets.'",
      [
        "Only the nearest streets are loaded.",
        "Only the nearest streets load.",
        "Only the nearest streets are loading."
      ],
      "Only the nearest streets are loaded."
    ],
    [
      "Passive: 'The team optimised one street for a month.'",
      [
        "One street was optimised for a month.",
        "One street optimised for a month.",
        "One street has optimised for a month."
      ],
      "One street was optimised for a month."
    ],
    [
      "Rewrite with BY THE TIME: 'The studio built two engines. Then GTA III shipped.'",
      [
        "By the time GTA III shipped, the studio had built two engines.",
        "By the time GTA III shipped, the studio has built two engines.",
        "By the time GTA III ships, the studio had built two engines."
      ],
      "By the time GTA III shipped, the studio had built two engines."
    ],
    [
      "Third conditional: 'Rockstar did not keep RenderWare. It built RAGE instead.'",
      [
        "If Rockstar had kept RenderWare, it would not have built RAGE.",
        "If Rockstar kept RenderWare, it would not build RAGE.",
        "If Rockstar had kept RenderWare, it would not have build RAGE."
      ],
      "If Rockstar had kept RenderWare, it would not have built RAGE."
    ],
    [
      "Word family: 'The team optimised the street.' (OPTIMISATION)",
      [
        "The optimisation of the street took a month.",
        "The optimise of the street took a month.",
        "The optimal of the street took a month."
      ],
      "The optimisation of the street took a month."
    ],
    [
      "Rewrite with COMPARED WITH: 'The old lighting was much cheaper than ray tracing.'",
      [
        "Compared with ray tracing, the old lighting was much cheaper.",
        "Comparing with ray tracing, the old lighting was much cheaper.",
        "Compared to ray tracing is much cheaper, the old lighting was."
      ],
      "Compared with ray tracing, the old lighting was much cheaper."
    ]
  ],
  questions: [
    {
      name: "🎮 The pictures",
      qs: [
        "Compare the 2026 screenshots with the console photo. What can you see that a 2001 console could not have drawn?",
        "Which detail in the screenshots is the most expensive to render, do you think — the crowd, the water, or the light? Why?",
        "If you had to cut one thing from that city to make it run on a cheaper machine, what would you cut first?"
      ]
    },
    {
      name: "🎧 The interview",
      qs: [
        "What surprised you most in the interview, and why?",
        "The speaker says players 'do something stupid constantly'. Is that a complaint or a design rule?",
        "Why does a team that succeeds become invisible? Can you think of another job like that?",
        "Four hundred small problems: how does that change your idea of a 'delay'?"
      ]
    },
    {
      name: "🏗️ How a world is made",
      qs: [
        "Explain streaming to someone who has never played a game. Use one analogy from real life.",
        "Why is memory the tightest budget? What happens if a developer ignores it?",
        "Would you rather work on the team that makes things look good, or the team that keeps them running? Why?",
        "Is an open world more impressive than a small, perfect game? Defend your answer."
      ]
    },
    {
      name: "💼 Money, time, decisions",
      qs: [
        "A delay costs millions. Is a late, working game better than an early, broken one?",
        "Should studios reuse one engine for twenty years, or build a new one each generation?",
        "Who should decide when a game is ready — the developers, the publisher, or the players?",
        "If you were the publisher, what would you ask a studio before giving them a hundred million dollars?"
      ]
    }
  ],
  followups: [
    "What makes you say that?",
    "Can you give an example?",
    "What would that cost?",
    "How would you test that?"
  ],
  phrases: [
    "The core of the idea is…",
    "What makes it different is…",
    "Compared with…, it…",
    "By the time the player arrives, …",
    "That is where the cost comes in.",
    "If we did that, we would have to…"
  ],
  phases: [
    {
      min: 5,
      name: "Warm-up: same city, thirty years",
      teacher: [
        "Show the five pictures. Ask what changed and what did not. Do not explain the engine yet: let him speculate.",
        "Note the hardware words he uses (console, PC, graphics, frame rate) and the ones he avoids."
      ],
      student: ["Look at the five pictures. What changed, and what did not?"]
    },
    {
      min: 8,
      name: "Reading: how a world is streamed",
      teacher: [
        "First read for the process, second read with a pencil: underline passives, circle the numbers.",
        "Ask: why can a city be larger than the console's memory? He must answer in one sentence with a passive.",
        "Do not translate. If a word blocks him, ask him to guess from the sentence."
      ],
      student: [
        "Read once for the process, then mark the passives and numbers.",
        "Answer: why can the city be bigger than the memory?"
      ]
    },
    {
      min: 7,
      name: "Listening: the interview",
      teacher: [
        "Read the script aloud twice at natural speed (or press 'Read it to me'). No transcript first.",
        "He answers the five questions, then opens the transcript and checks. Ask which words cost him a detail.",
        "Insist on inference: 'How does the speaker feel about the streaming team?' is the real question."
      ],
      student: [
        "Listen once without reading.",
        "Answer the five questions.",
        "Open the transcript and find the words you missed."
      ]
    },
    {
      min: 8,
      name: "New words and word families",
      teacher: [
        "Group 1: engine words. Ask him to draw streaming on paper in ten seconds.",
        "Group 2: industry words. For 'delay' and 'budget', ask for a school example.",
        "Group 3: word families. He supplies the missing member before tapping each card."
      ],
      student: ["Learn 18 new words: 14 topic words and 4 word families."]
    },
    {
      min: 6,
      name: "Language: the engineer's grammar",
      teacher: [
        "Three cards. He finds one example of each in the reading before you explain the rule.",
        "Then he describes his own laptop or phone using the passive of process, in three sentences."
      ],
      student: [
        "Read the three rule cards. Find one example of each in the reading.",
        "Describe your own device in three passive sentences."
      ]
    },
    {
      min: 4,
      name: "Gap-fill: load the right form",
      teacher: [
        "He does the twelve gaps and says why for every answer: process, sequence or comparison.",
        "Wrong answer = the reason is wrong. Ask him to name the pattern."
      ],
      student: ["Complete the twelve gaps. Say why each form is right."]
    },
    {
      min: 4,
      name: "Transformations: rebuild the sentence",
      teacher: [
        "Six rewrites. He must name the structure: passive, by the time, third conditional, word family, compared with."
      ],
      student: ["Complete the six transformations.", "Name the structure behind each answer."]
    },
    {
      min: 8,
      name: "Speaking: pitch a game",
      teacher: [
        "Three minutes, uninterrupted: pitch one game idea — the city, the core mechanic, the tech limit, the risk.",
        "Then become the publisher: five hostile questions ('Why this city?', 'What is the budget?', 'Why will it not be delayed?'). He must answer with a claim, a reason and one number.",
        "Finish with the quiz if time allows."
      ],
      student: [
        "Pitch one game idea for three minutes.",
        "Answer five publisher questions.",
        "Do the matching quiz (18 words)."
      ]
    }
  ],
  challenge: "Three minutes, uninterrupted: pitch a game to a publisher. Name the city, the one mechanic that matters, the technical limit you are working against, and one risk you cannot solve. Use two passive process sentences, one 'by the time', one 'compared with', and six new words. Then survive five hostile questions.",
  homework: "Write a one-page design brief (120–160 words plus a five-point feature list) for your own game: the setting, the core mechanic, the technical limit, the audience and the biggest risk. Use five new words, three passive sentences, one 'compared with' and one word-family word. Do not describe the story — describe how it works."
};
