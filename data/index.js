// Lesson index — everything the menu, the decks and spaced repetition need.
// Full lesson bodies live in data/lessons/l<N>.js and load only when a lesson is opened.
// Run "node tools/validate-lessons.js" after editing any of them.
window.LESSONS = [
  {
    n: 1,
    done: true,
    title: "Places that take your breath away",
    from: "B1",
    to: "B2",
    groups: [
      {
        name: "Describing places & scenery",
        words: [
          [
            "breathtaking / stunning",
            "extremely beautiful or impressive",
            "The view from the top was breathtaking."
          ],
          [
            "picturesque",
            "pretty in a way that looks like a painting",
            "We walked through a picturesque old town."
          ],
          ["bustling", "full of activity and people", "The market was bustling with tourists."],
          [
            "remote / off the beaten track",
            "far from towns or tourist areas",
            "We stayed in a remote village off the beaten track."
          ],
          ["overcrowded / touristy", "too many tourists", "The beach became overcrowded in summer."],
          ["unspoilt / pristine", "still natural and clean", "The island is still unspoilt."],
          ["vibrant", "full of life and energy", "The city has a vibrant cultural scene."],
          [
            "cosmopolitan",
            "with people and influences from many countries",
            "London is a very cosmopolitan city."
          ]
        ]
      },
      {
        name: "Experiences & feelings",
        words: [
          ["memorable", "worth remembering", "It was a really memorable trip."],
          [
            "once-in-a-lifetime",
            "very special and unlikely to happen again",
            "Seeing the Northern Lights was a once-in-a-lifetime experience."
          ],
          [
            "live up to expectations",
            "be as good as you hoped",
            "The hotel didn't quite live up to our expectations."
          ],
          ["take your breath away", "be extremely impressive", "The waterfall took my breath away."],
          [
            "culture shock",
            "feeling of confusion in a very different culture",
            "He experienced a bit of culture shock at first."
          ],
          [
            "hidden gem",
            "a place that is excellent but not well known",
            "We discovered a hidden gem of a café."
          ],
          [
            "local customs",
            "traditional ways of behaving in a place",
            "It's important to respect local customs."
          ]
        ]
      }
    ],
    phaseCount: 5
  },
  {
    n: 2,
    done: true,
    title: "Ciao, Italia! Have you ever…?",
    theme: "italia",
    icon: "🇮🇹",
    from: "B1",
    to: "B2",
    groups: [
      {
        name: "Travel verbs: base → past → past participle",
        words: [
          ["be", "was / were → been", "I've been to Rome, Florence and Lake Garda."],
          ["go", "went → gone", "We went to Lake Garda by car."],
          ["see", "saw → seen", "It's the most stunning lake I've ever seen."],
          ["eat", "ate → eaten", "That's the best gelato I've ever eaten."],
          ["ride", "rode → ridden", "Have you ever ridden a roller coaster at Gardaland?"],
          ["fly", "flew → flown", "We flew to Italy from Tel Aviv."],
          ["take", "took → taken", "The David in Florence took my breath away."],
          ["visit", "visited → visited", "We visited the Lamborghini Museum."],
          ["spend", "spent → spent", "We spent a whole day at Gardaland."],
          ["buy", "bought → bought", "I bought a Lamborghini souvenir at the museum."]
        ]
      },
      {
        name: "Time words: which tense?",
        words: [
          [
            "ever",
            "present perfect, in questions: at any time in your life",
            "Have you ever been to a city as bustling as Rome?"
          ],
          ["never", "present perfect: not at any time", "I've never seen so many fast cars in one place!"],
          [
            "already / just",
            "present perfect: earlier than expected / a moment ago",
            "We've just arrived at Lake Garda!"
          ],
          ["yet", "present perfect, end of questions and negatives", "Have you booked the next trip yet?"],
          ["last summer / in 2024", "past simple: a finished time", "Last summer we stayed near Lake Garda."],
          ["…ago", "past simple: how long before now", "We went to Italy two years ago."]
        ]
      }
    ],
    phaseCount: 5
  },
  {
    n: 3,
    done: true,
    title: "Germany: what do you remember?",
    theme: "germany",
    icon: "🇩🇪",
    from: "B1",
    to: "B2",
    groups: [
      {
        name: "Before & during the trip",
        words: [
          [
            "look forward to",
            "feel excited about something in the future",
            "Before the trip, I was really looking forward to Europa-Park."
          ],
          ["book in advance", "reserve early", "My parents booked the rental car in advance."],
          ["set off / set out", "start a journey", "We set off early in the morning, and I slept in the car."],
          ["get around", "travel within a place", "We got around by car, so we could stop in small villages."],
          ["head for", "go in the direction of", "After the BMW Museum we headed for the mountains."],
          [
            "check in / check out",
            "arrive at / leave a hotel or airport",
            "We checked in at a hotel near the park."
          ],
          [
            "within walking distance",
            "close enough to walk",
            "The park was within walking distance of our hotel."
          ]
        ]
      },
      {
        name: "What went wrong (or was strange)",
        words: [
          ["delayed", "late (flight, train, etc.)", "Our flight to Germany was delayed, and I was so bored!"],
          [
            "miss a connection",
            "fail to catch the next flight/train",
            "With a car, you can't miss a train connection!"
          ],
          ["lose your luggage", "your bags don't arrive", "Luckily, the airline didn't lose our luggage."],
          ["run out of", "have none left", "We almost ran out of petrol on a quiet country road."],
          [
            "put up with",
            "accept something unpleasant",
            "I had to put up with long queues for the best rides."
          ],
          [
            "end up",
            "finally be in a situation (often unexpected)",
            "We got lost and ended up in a tiny village with an amazing bakery."
          ],
          ["go wrong", "develop problems", "Something went wrong with the sat nav, and we drove in a circle!"]
        ]
      }
    ],
    phaseCount: 6
  },
  {
    n: 4,
    done: true,
    title: "Technology: your life on a screen",
    theme: "tech",
    icon: "📱",
    from: "B2",
    to: "B2+",
    groups: [
      {
        name: "From the article",
        words: [
          [
            "connection",
            "the ability to communicate with others",
            "Video calls give us a strong connection with family abroad."
          ],
          [
            "digital tools",
            "apps, websites and devices used for learning or work",
            "Digital tools helped students study during the pandemic."
          ],
          [
            "face-to-face time",
            "time spent with people in person",
            "Many teenagers have less face-to-face time because of phones."
          ],
          [
            "self-confidence",
            "belief in yourself and your abilities",
            "Too much social media can lower a person's self-confidence."
          ],
          [
            "blue light",
            "the light from screens that can affect sleep",
            "Blue light from phones can make it harder to fall asleep."
          ],
          [
            "balance",
            "a good mix between different things",
            "Finding balance between online and offline life is important."
          ],
          [
            "digital citizenship",
            "using technology safely and responsibly",
            "Schools teach digital citizenship so students stay safe online."
          ],
          [
            "critically",
            "carefully and thoughtfully",
            "We should think critically about the information we see online."
          ]
        ]
      },
      {
        name: "More words from the text",
        words: [
          ["screen time", "time spent looking at a screen", "My screen time goes up a lot at the weekend."],
          [
            "stay in touch",
            "keep in contact with someone",
            "Messaging apps help me stay in touch with my cousins."
          ],
          ["keep up with", "follow what is happening", "It's hard to keep up with all the new apps."],
          [
            "endless scrolling",
            "scrolling without stopping",
            "I lost an hour to endless scrolling before dinner."
          ],
          ["switch off", "turn off a device", "I switch my phone off during meals."],
          [
            "pressure",
            "a strong feeling that you must do something",
            "Social media can create pressure to look perfect."
          ],
          [
            "protect your personal information",
            "keep your private data safe",
            "Digital citizenship means protecting your personal information."
          ],
          [
            "artificial intelligence",
            "machines that can learn and make decisions",
            "Artificial intelligence can now write a whole essay."
          ]
        ]
      }
    ],
    phaseCount: 6
  },
  {
    n: 5,
    done: true,
    title: "2040: upgrade or overload?",
    theme: "future",
    icon: "🤖",
    from: "B2",
    to: "C1",
    groups: [
      {
        name: "Eden's 12 · future technology",
        words: [
          [
            "artificial intelligence (AI)",
            "computer systems that can think and learn like humans",
            "Artificial intelligence can already recognise faces and voices."
          ],
          [
            "autonomous",
            "able to work or move by itself without human control",
            "Autonomous cars will drive without a driver."
          ],
          [
            "innovate",
            "to create new ideas, products or methods",
            "Scientists continue to innovate every year."
          ],
          [
            "breakthrough",
            "an important discovery or development",
            "The new battery was a major breakthrough."
          ],
          [
            "immersive",
            "making you feel completely involved in something",
            "Virtual reality games are very immersive."
          ],
          ["transform", "to completely change something", "Technology will transform the way we live."],
          [
            "sustainable",
            "able to continue for a long time without harming the environment",
            "Future cities will use sustainable energy."
          ],
          [
            "robotics",
            "the science of designing and building robots",
            "Robotics is becoming more advanced every year."
          ],
          [
            "enhance",
            "to improve the quality or ability of something",
            "Special glasses can enhance our vision."
          ],
          [
            "futuristic",
            "looking or seeming like something from the future",
            "The new building has a very futuristic design."
          ],
          [
            "predict",
            "to say what you think will happen in the future",
            "Experts predict that robots will help in hospitals."
          ],
          [
            "virtual reality (VR)",
            "a computer-generated world that feels real",
            "In virtual reality you can visit places that don't exist."
          ]
        ]
      },
      {
        name: "C1 precision: argument language",
        words: [
          [
            "at the forefront of",
            "leading or most advanced in a field",
            "AI is at the forefront of medical research."
          ],
          ["cutting-edge", "the newest and most advanced", "The lab uses cutting-edge robotics."],
          [
            "a double-edged sword",
            "something with both good and bad effects",
            "Automation is a double-edged sword: it saves time but removes jobs."
          ],
          [
            "unintended consequences",
            "effects nobody planned or expected",
            "Cheap drones had unintended consequences for privacy."
          ],
          [
            "become redundant",
            "no longer needed because of new technology",
            "Many manual jobs could become redundant."
          ],
          [
            "displace workers",
            "force people out of their jobs",
            "Automation may displace workers in manufacturing."
          ],
          ["reliance on", "dependence on something", "Schools' reliance on screens worries some parents."],
          [
            "surveillance",
            "close watching of people, often by technology",
            "Facial recognition raises surveillance concerns."
          ],
          ["algorithm", "a set of rules a computer follows", "The algorithm decides which videos you see."],
          ["regulate", "control by rules or law", "Governments are struggling to regulate AI."]
        ]
      }
    ],
    labels: {
      cards: "🧠 Memory chips",
      phrases: "🗣️ Argument bank"
    },
    phaseCount: 6
  },
  {
    n: 6,
    title: "Twelve seconds that changed the world",
    theme: "wright",
    icon: "🛩️",
    from: "B2",
    to: "C1",
    groups: [
      {
        name: "The workshop and the dream",
        words: [
          [
            "aviation",
            "the industry and activity of flying aircraft",
            "The Wright brothers are often called the pioneers of aviation."
          ],
          [
            "glider",
            "an aircraft with no engine that flies on air currents",
            "By 1902 they had flown their glider more than a thousand times."
          ],
          [
            "propeller",
            "a rotating blade that pushes an aircraft through the air",
            "A broken propeller caused the first fatal aeroplane crash."
          ],
          [
            "wind tunnel",
            "a tunnel where air is blown over models to test their shape",
            "They built a wind tunnel and tested about two hundred wing shapes."
          ],
          [
            "self-taught",
            "having learned a skill without a teacher or a course",
            "Neither brother finished high school; both were largely self-taught."
          ],
          [
            "experiment",
            "a careful test done to learn something new",
            "They experimented for years before they built a powered machine."
          ]
        ]
      },
      {
        name: "Flight, fame and risk",
        words: [
          [
            "sustained",
            "continuing for a period of time without stopping",
            "Their first flight was the first sustained, controlled flight of a powered aircraft."
          ],
          ["witness", "a person who saw an event happen", "Only five witnesses saw the first flight."],
          [
            "patent",
            "the legal right to be the only one to make or sell an invention",
            "They received a patent for their control system in 1906."
          ],
          [
            "rival",
            "a person or company competing with another",
            "They spent years fighting rivals in court over their patent."
          ],
          [
            "breakthrough",
            "an important discovery or sudden advance",
            "The three-axis control system was the real breakthrough."
          ],
          [
            "pioneer",
            "one of the first people to do or develop something",
            "The Wrights were pioneers of modern aviation."
          ],
          [
            "setback",
            "a problem that delays or stops progress",
            "A broken propeller was only one of many setbacks."
          ],
          [
            "persistence",
            "continuing to try despite difficulty",
            "Their persistence finally paid off on 17 December 1903."
          ]
        ]
      },
      {
        name: "Word families: build the whole set",
        words: [
          [
            "recognition",
            "recognise (v) → recognition (n) → recognisable (adj)",
            "Recognition came slowly for the Wright brothers."
          ],
          [
            "experimental",
            "experiment (n, v) → experimental (adj) → experimentally (adv)",
            "Their experimental method was unlike anything in Europe."
          ],
          [
            "successfully",
            "succeed (v) → success (n) → successful (adj) → successfully (adv)",
            "They successfully controlled the machine in three dimensions."
          ],
          [
            "persistently",
            "persist (v) → persistence (n) → persistent (adj) → persistently (adv)",
            "For three years they persistently measured and recorded every flight."
          ]
        ]
      }
    ],
    labels: {
      cards: "🗂️ Cabinet cards",
      phrases: "🗣️ Reporter's phrases"
    },
    phaseCount: 8
  },
  {
    n: 7,
    title: "When the ground moves",
    theme: "seismic",
    icon: "🌍",
    from: "B2",
    to: "C1",
    groups: [
      {
        name: "The science",
        words: [
          [
            "magnitude",
            "a number showing the size of an earthquake",
            "A magnitude 7.0 quake releases far more energy than a 5.0."
          ],
          [
            "intensity",
            "how strongly the ground shook in one place",
            "Intensity depends on distance, depth and local soil."
          ],
          [
            "epicentre",
            "the point on the surface above the earthquake",
            "The epicentre was 20 kilometres from the city."
          ],
          ["fault", "a crack in the Earth's crust where blocks move", "Most earthquakes begin along a fault."],
          [
            "aftershock",
            "a smaller earthquake after the main one",
            "Expect aftershocks for days after a large quake."
          ],
          ["seismic", "relating to earthquakes", "Engineers use seismic data to design safer buildings."]
        ]
      },
      {
        name: "Safety and damage",
        words: [
          ["collapse", "to fall down suddenly", "Older buildings collapsed during the shaking."],
          [
            "rubble",
            "broken stones and bricks from a destroyed building",
            "Rescue teams searched the rubble for survivors."
          ],
          [
            "evacuate",
            "to move people away from a dangerous place",
            "The school was evacuated after the first shock."
          ],
          ["shelter", "a safe place that protects you", "Take shelter under a strong table."],
          ["sturdy", "strong and not easily broken", "Cover your head under a sturdy desk."],
          ["hazard", "something that could cause harm", "Loose windows are a serious hazard in a quake."],
          [
            "warning",
            "information that danger is coming",
            "The warning arrived eight seconds before the shaking."
          ],
          [
            "trapped",
            "unable to escape from a place",
            "If you are trapped, tap on a pipe instead of shouting."
          ]
        ]
      },
      {
        name: "Word families: build the whole set",
        words: [
          [
            "evacuation",
            "evacuate (v) → evacuation (n) → evacuated (adj)",
            "The evacuation of the school took four minutes."
          ],
          [
            "destruction",
            "destroy (v) → destruction (n) → destructive (adj)",
            "The destruction of the viaduct killed forty-two people."
          ],
          [
            "protective",
            "protect (v) → protection (n) → protective (adj)",
            "Protective measures saved lives after 1989."
          ],
          [
            "resistant",
            "resist (v) → resistance (n) → resistant (adj)",
            "Base isolation makes a building resistant to shaking, not immune to it."
          ]
        ]
      }
    ],
    labels: {
      cards: "🗂️ Field cards",
      phrases: "🗣️ Safety phrases"
    },
    phaseCount: 8
  },
  {
    n: 8,
    title: "How a city gets built",
    theme: "vice",
    icon: "🎮",
    from: "B2",
    to: "C1",
    groups: [
      {
        name: "The engine",
        words: [
          [
            "engine",
            "the software that runs a game's graphics, physics and world",
            "RAGE is the engine underneath every recent Rockstar game."
          ],
          [
            "streaming",
            "loading parts of a world only when they are needed",
            "Streaming is what stops a city from needing to fit in memory."
          ],
          [
            "draw distance",
            "how far away the game still draws detail",
            "Draw distance is a memory budget, not a preference."
          ],
          [
            "render",
            "to produce the final image on screen",
            "Each frame is rendered in about sixteen milliseconds."
          ],
          [
            "physics",
            "the rules that decide how objects move and collide",
            "The physics decides what happens when a car hits a wall."
          ],
          [
            "assets",
            "the files a game loads: models, textures, sounds",
            "Every street corner is made of thousands of assets."
          ],
          [
            "frame rate",
            "how many images the machine draws each second",
            "The frame rate must hold when the city gets busy."
          ]
        ]
      },
      {
        name: "The industry",
        words: [
          ["in-house", "made inside the company rather than bought", "RAGE was built in-house after 2004."],
          ["generation", "one era of consoles or games", "The third generation of the series was fully 3D."],
          ["delay", "a later release date than planned", "The delay moved the game by six months."],
          [
            "budget",
            "the money, time or memory you are allowed to use",
            "Memory is the tightest budget in console development."
          ],
          [
            "optimise",
            "to make something run faster or use less",
            "Studios spend months optimising one street."
          ],
          [
            "codebase",
            "all the code that makes up one product",
            "Twenty years of work can sit inside one codebase."
          ],
          [
            "publisher",
            "the company that pays for and releases a game",
            "The publisher decides when the game is ready."
          ]
        ]
      },
      {
        name: "Word families: build the whole set",
        words: [
          [
            "optimisation",
            "optimise (v) → optimisation (n) → optimal (adj) → optimally (adv)",
            "The optimisation of one street can take a month."
          ],
          [
            "development",
            "develop (v) → development (n) → developer (n) → developmental (adj)",
            "Development started long before the first screenshot."
          ],
          [
            "rendering",
            "render (v) → rendering (n) → rendered (adj)",
            "Rendering is the most expensive part of a frame."
          ],
          [
            "realistic",
            "real (adj) → realism (n) → realistic (adj) → realistically (adv)",
            "The lighting is realistic, but the city is not."
          ]
        ]
      }
    ],
    labels: {
      cards: "🎮 Dev cards",
      phrases: "🗣️ Pitch phrases"
    },
    phaseCount: 8
  }
];
