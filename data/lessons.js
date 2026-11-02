// Travel course (B1 → B2), 50-minute lessons. Source: Data/Eden's_Files PDFs.
// words: [word, meaning, example]. quiz: words to test (all of `words` by default).
// To add lesson 2, copy the lesson 1 object and change it; phases must add up to 50.

const P = (min, name, teacher, student) => ({ min, name, teacher, student });

const LESSONS = [
  {
    n: 1, title: "Places that take your breath away",
    goal: "Describe places and travel experiences with precise B2 words, and speak for 30–60 seconds about a real trip.",
    warmup: [
      { icon: "🏙️🚶‍♂️🚶‍♀️🛍️", caption: "A busy market in a big city" },
      { icon: "🏝️🌊🌴", caption: "A quiet beach with no one around" },
    ],
    groups: [
      { name: "Describing places & scenery", words: [
        ["breathtaking / stunning", "extremely beautiful or impressive", "The view from the top was breathtaking."],
        ["picturesque", "pretty in a way that looks like a painting", "We walked through a picturesque old town."],
        ["bustling", "full of activity and people", "The market was bustling with tourists."],
        ["remote / off the beaten track", "far from towns or tourist areas", "We stayed in a remote village off the beaten track."],
        ["overcrowded / touristy", "too many tourists", "The beach became overcrowded in summer."],
        ["unspoilt / pristine", "still natural and clean", "The island is still unspoilt."],
        ["vibrant", "full of life and energy", "The city has a vibrant cultural scene."],
        ["cosmopolitan", "with people and influences from many countries", "London is a very cosmopolitan city."],
      ] },
      { name: "Experiences & feelings", words: [
        ["memorable", "worth remembering", "It was a really memorable trip."],
        ["once-in-a-lifetime", "very special and unlikely to happen again", "Seeing the Northern Lights was a once-in-a-lifetime experience."],
        ["live up to expectations", "be as good as you hoped", "The hotel didn't quite live up to our expectations."],
        ["take your breath away", "be extremely impressive", "The waterfall took my breath away."],
        ["culture shock", "feeling of confusion in a very different culture", "He experienced a bit of culture shock at first."],
        ["hidden gem", "a place that is excellent but not well known", "We discovered a hidden gem of a café."],
        ["local customs", "traditional ways of behaving in a place", "It's important to respect local customs."],
      ] },
    ],
    questions: [
      { name: "Personal experience", qs: [
        "Have you ever been on a trip you really enjoyed? Where did you go?",
        "What's the furthest place you've travelled to?",
        "What's the best thing you've ever eaten on holiday?",
      ] },
      { name: "Describing places & experiences", qs: [
        "Describe a place you've visited that you found really special. What made it special?",
        "Have you ever visited a place that was completely different from what you expected?",
        "What's the most beautiful place you've ever seen? Can you describe it?",
        "Have you ever experienced culture shock? What happened?",
      ] },
    ],
    followups: ["Why?", "Can you tell me more?", "What was the best / worst part?", "How did that make you feel?"],
    phrases: [
      "One of the best things about the place was…",
      "What I liked most was… / What disappointed me was…",
      "The highlight of the trip was…",
      "It was worth every penny / It wasn't worth the money.",
      "In the end we decided to…",
    ],
    phases: [
      P(5, "Warm-up: where would you rather be?", [
        "Show the two pictures. Ask: 'Where would you rather be? Why?'",
        "Don't correct yet; note the simple words he uses (nice, big, beautiful) to upgrade later.",
      ], ["Look at the two pictures: where would you rather be, and why?"]),
      P(15, "New words", [
        "Go through both groups. For each word he reads the example and guesses the meaning before you show it.",
        "Ask for a personal example: 'Name a place that is bustling / a hidden gem in Israel.'",
        "Upgrade his warm-up words: nice → picturesque, busy → bustling, beautiful → breathtaking.",
      ], ["Learn 15 new words: read the example and guess the meaning.", "Give your own example for 5 of the words."]),
      P(5, "Quick quiz", [
        "He does the matching quiz in the app alone. Check the score together; re-teach any mistakes.",
      ], ["Do the matching quiz (15 words)."]),
      P(20, "Speaking: tell me about a trip", [
        "Ask the questions in order. After each answer use a follow-up: Why? Tell me more?",
        "Rule: he must use at least 5 new words. Tick them off on the word list as he uses them.",
        "Aim for 30–60 seconds per answer. Write down 2–3 errors to fix in the wrap-up, don't interrupt.",
      ], ["Answer the questions. Use at least 5 new words.", "Try to speak for 30–60 seconds each time."]),
      P(5, "Wrap-up & homework", [
        "Fix the 2–3 errors you noted. He reads the useful phrases aloud.",
        "Give the homework and show him the flashcards in the student view.",
      ], ["Read the useful phrases aloud.", "Check the homework."]),
    ],
    challenge: "Describe your dream destination in 1 minute using at least 8 new words and 2 useful phrases.",
    homework: "Write 6–8 sentences about a real trip you took, using at least 6 new words. Practise the flashcards for 5 minutes on 3 different days.",
  },
];
