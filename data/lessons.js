// Travel course (B1 → B2), 50-minute lessons. Source: Data/Eden's_Files PDFs.
// words: [word, meaning, example]. quiz: words to test (all of `words` by default).
// Optional: rules (grammar cards), drill ([sentence, options, answer]), gates ({warmup|words|quiz|speak: [title, sub]}),
// theme (body class in style.css), warmup[].stamp.
// Phases must add up to 50.

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
  {
    n: 2, title: "Ciao, Italia! Have you ever…?", theme: "italia",
    goal: "Talk about YOUR trips in Italy (Rome, Florence, Pisa, Milano, Lake Garda, Gardaland, the Lamborghini Museum) with the present perfect (Have you ever…? I've been…) and the past simple (We went… It was…), using the words from lesson 1.",
    gates: { warmup: ["Your trips, your story", "These are places you've been to. Pick one and tell me about it."],
             words: ["Pack your verbs", "Say the three forms, then tap the tag to check."],
             quiz: ["Passport control", "Match each verb or time word to the right form or use."],
             speak: ["Tell me about your travels", "Start with 'I've been…', then give details in the past simple."] },
    warmup: [
      { icon: "🎢🎡🍦", caption: "Gardaland, Lake Garda 🇮🇹", stamp: "🍕" },
      { icon: "🏛️🛵🍝", caption: "Rome, the Colosseum 🇮🇹", stamp: "🍝" },
      { icon: "🖼️🎨⛪", caption: "Florence, the David 🇮🇹", stamp: "🎨" },
      { icon: "🏎️🐂🏁", caption: "Lamborghini Museum 🇮🇹", stamp: "🏁" },
      { icon: "🗼📸🍕", caption: "Pisa, the Leaning Tower 🇮🇹", stamp: "📸" },
      { icon: "⛪🛍️⚽", caption: "Milano, the Duomo 🇮🇹", stamp: "☕" },
    ],
    rules: [
      { title: "🇮🇹 Present perfect: your experience", form: "have / has + past participle (V3)",
        use: "Something happened in your life, but we don't say when. Often with ever, never, before, already, yet, just.",
        ex: ["I've been to Rome, Florence and Lake Garda.", "Have you ever been on a roller coaster at Gardaland?", "Have you ever seen a real Lamborghini up close?"] },
      { title: "🍝 Past simple: the story", form: "verb + -ed / irregular V2 (did + verb in questions)",
        use: "A finished time: last summer, in 2024, two years ago, when I was ten, on the first day. Use it for the details.",
        ex: ["Where did you stay in Rome?", "We went to Gardaland, and then we drove to Rome.", "The statue of David was breathtaking.", "We didn't have time to see everything."] },
      { title: "🎢 The B2 move: start perfect, continue past", form: "Have you ever…? → Yes, I have. → When / Where / What did you…?",
        use: "Open with the experience (present perfect), then switch to the past simple as soon as you give a time or detail.",
        ex: ["Have you ever been to Italy? — Yes, I have. We went to Lake Garda and spent a day at Gardaland. It was amazing!", "I've seen Michelangelo's David. We saw it in Florence, and it took my breath away."] },
      { title: "🏆 Superlative + present perfect", form: "the most / the -est … I've ever + V3",
        use: "The strongest way to describe a place or experience.",
        ex: ["It's the scariest ride I've ever been on.", "That was the best pizza I've ever eaten.", "The Lamborghini Museum is the coolest museum I've ever visited."] },
      { title: "✈️ been or gone?", form: "been = went and came back · gone = went and is still there",
        use: "I've been to Rome = I came back. 'My friend has gone to Italy' = he is there now.",
        ex: ["I've been to Florence once.", "Dad isn't here, he's gone to the airport."] },
    ],
    groups: [
      { name: "Travel verbs: base → past → past participle", words: [
        ["be", "was / were → been", "I've been to Rome, Florence and Lake Garda."],
        ["go", "went → gone", "We went to Lake Garda by car."],
        ["see", "saw → seen", "It's the most stunning lake I've ever seen."],
        ["eat", "ate → eaten", "That's the best gelato I've ever eaten."],
        ["ride", "rode → ridden", "Have you ever ridden a roller coaster at Gardaland?"],
        ["fly", "flew → flown", "We flew to Italy from Tel Aviv."],
        ["take", "took → taken", "The David in Florence took my breath away."],
        ["visit", "visited → visited", "We visited the Lamborghini Museum."],
        ["spend", "spent → spent", "We spent a whole day at Gardaland."],
        ["buy", "bought → bought", "I bought a Lamborghini souvenir at the museum."],
      ] },
      { name: "Time words: which tense?", words: [
        ["ever", "present perfect, in questions: at any time in your life", "Have you ever been to a city as bustling as Rome?"],
        ["never", "present perfect: not at any time", "I've never seen so many fast cars in one place!"],
        ["already / just", "present perfect: earlier than expected / a moment ago", "We've just arrived at Lake Garda!"],
        ["yet", "present perfect, end of questions and negatives", "Have you booked the next trip yet?"],
        ["last summer / in 2024", "past simple: a finished time", "Last summer we stayed near Lake Garda."],
        ["…ago", "past simple: how long before now", "We went to Italy two years ago."],
      ] },
    ],
    drill: [
      ["I ___ (be) to Rome, Florence and Lake Garda.", ["have been", "was", "have gone"], "have been"],
      ["Last summer we ___ (stay) in a picturesque town near Lake Garda.", ["stayed", "have stayed", "stay"], "stayed"],
      ["It's the scariest ride I ___ ever ___ (ride)!", ["have … ridden", "did … ride", "have … rode"], "have … ridden"],
      ["___ you ___ (go) to Gardaland in the morning or in the afternoon?", ["Did … go", "Have … gone", "Did … went"], "Did … go"],
      ["Rome ___ (be) bustling with tourists when we were there.", ["was", "has been", "is"], "was"],
      ["Have you ever eaten real Italian pizza? — Yes, I ___ .", ["have", "did", "was"], "have"],
      ["What ___ you ___ (see) at the Lamborghini Museum?", ["did … see", "have … seen", "did … saw"], "did … see"],
      ["I ___ (see) Michelangelo's David. It's huge!", ["have seen", "have saw", "was seen"], "have seen"],
      ["When we were in Rome, we ___ (visit) the Colosseum.", ["visited", "have visited", "visit"], "visited"],
      ["My cousin isn't here. He ___ to Italy for the summer.", ["has gone", "has been", "went to"], "has gone"],
      ["The long queues at Gardaland ___ (not ruin) the day.", ["didn't ruin", "haven't ruined", "don't ruin"], "didn't ruin"],
      ["We haven't decided where to go next ___ .", ["yet", "already", "ago"], "yet"],
    ],
    questions: [
      { name: "🇮🇹 Northern Italy & Gardaland", qs: [
        "You've been to Northern Italy. Where exactly did you go, and who did you go with?",
        "What's the scariest ride you've ever been on at Gardaland? What was it like?",
        "What's the best thing you've ever eaten in Italy? Where did you eat it?",
        "Lake Garda: what did it look like? Use 3 words from lesson 1 (picturesque, breathtaking, unspoilt…).",
      ] },
      { name: "🏛️ Rome, Florence & 🏎️ Lamborghini", qs: [
        "You've been to Rome. What did you see there? Was it bustling or overcrowded?",
        "You've seen Michelangelo's David in Florence. Describe it: how big was it, and how did you feel when you saw it?",
        "What's the coolest car you've ever seen at the Lamborghini Museum? What did it look like?",
        "Have you ever taken the classic 'holding up the Leaning Tower' photo in Pisa? Did the tower live up to your expectations?",
        "What did you see in Milano? Is it more cosmopolitan than Rome? Why?",
        "Which was more memorable: Rome, Florence or the Lamborghini Museum? Why?",
      ] },
      { name: "🇮🇹 The whole trip", qs: [
        "Of all the places you've been to in Italy, which one is the most memorable? Why?",
        "Has anything ever gone wrong on this trip (delays, queues, getting lost)? What happened and what did you do?",
        "Did any place in Italy not live up to your expectations? Why not?",
      ] },
    ],
    followups: ["When was that?", "Who did you go with?", "What did you do there?", "How did that make you feel?"],
    phrases: [
      "Have you ever been to…? — Yes, I have. I went there in…",
      "I've been to Rome, Florence and Lake Garda.",
      "It's the most … place I've ever seen.",
      "The highlight of the trip was…",
      "It didn't live up to my expectations because…",
    ],
    phases: [
      P(5, "Warm-up: your trips", [
        "Show the six postcards (Gardaland, Rome, Florence, Lamborghini Museum, Pisa, Milano). Ask: 'Which trip do you remember best? Tell me about it.'",
        "Write his answers down word for word. Don't correct yet: they are the 'before' sample for the rule.",
      ], ["Pick one postcard and tell me about that trip."]),
      P(12, "Grammar: present perfect vs past simple", [
        "Show the rules one by one. Ask: 'Why is it I've been to Italy but We went to Gardaland last summer?' Let him find it: no time vs finished time.",
        "Go back to his warm-up answers and fix them together with the rule.",
        "Do the verb tags: he says all three forms before tapping. Re-drill any he misses (been/gone, ridden, eaten, flown).",
        "Been vs gone: 'You've been to Rome, you're back. If you were still there, you'd have gone.'",
      ], ["Read the 5 grammar rules.", "Say the three forms of each verb, then tap to check."]),
      P(10, "Practice: fill the gaps", [
        "He does the gap-fill (12 sentences about his trips) in the app alone, then the matching quiz.",
        "Check together: for every mistake, he says WHY (time word? experience or story?).",
      ], ["Fill the gaps (12 sentences).", "Do the matching quiz."]),
      P(18, "Speaking: his trips", [
        "Ask the questions. He answers with 1 sentence in present perfect, then 2–3 in past simple.",
        "Dig for real details (ride names, food, the David, Lamborghini models, who was there). Real memories = longer answers.",
        "Reverse: he asks YOU 3 'Have you ever…?' questions about Italy, with follow-ups.",
        "Note 2–3 tense errors; don't interrupt.",
      ], ["Tell me about your trips: start with 'I've been…', then give details in the past.", "Ask your teacher 3 'Have you ever…?' questions."]),
      P(5, "Wrap-up & homework", [
        "Fix the noted errors. He reads the useful phrases aloud.",
        "Give the homework; remind him the verb forms are in the flashcards.",
      ], ["Read the useful phrases aloud.", "Check the homework."]),
    ],
    challenge: "Be a tour guide: in 1 minute, sell me a trip to Italy (Rome, Florence, Lake Garda or the Lamborghini Museum). Use 'I've been…', 3 past-simple details, 1 superlative ('the best… I've ever…') and 4 words from lesson 1.",
    homework: "Write a short travel blog post (8–10 sentences) about your trip to Italy: start with what you've done (present perfect), then tell the story in the past simple. Use at least 5 words from lesson 1. Practise the flashcards for 5 minutes on 3 days.",
  },
];
