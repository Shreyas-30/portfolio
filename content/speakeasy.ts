// ─────────────────────────────────────────────────────────────
// Copy for the SpeakEasy case study page (Version A / "Warm
// Editorial"), transcribed verbatim from se-v4/content.js.
// Edit copy here, not in app/work/speakeasy.
// ─────────────────────────────────────────────────────────────

export const speakeasyContent = {
  lede: "How a two-semester exploration narrowed from two billion learners, nine ideas, and two shelved prototypes down to one app for the adults everyone designs past.",
  chips: [
    "2 semesters · team of 4",
    "2 shelved concepts",
    "16-user cohort",
    "expert ESL validation",
    "public beta",
  ],
  tagline: ["AI", "MOBILE", "PRODUCT", "FULL-STACK"],

  stats: [
    { b: "2B+", s: "people learning a foreign language worldwide" },
    { b: "500M", s: "Duolingo downloads, and still a fluency gap" },
    { b: "9/10", s: "N. American students study a language in school" },
  ],
  quotes: [
    "I can read the words, but when it's time to talk, my head goes blank.",
    "I forget everything as soon as I learn it.",
    "Duolingo taught me to say - I'm a tired doctor. When would I ever say that?",
  ],
  insights: [
    {
      t: "Context beats structure",
      b: "People learn best when language shows up in a context they understand, not when the curriculum says it's time.",
    },
    {
      t: "Safety builds fluency",
      b: "Fluency grows from comfort, not perfection. Fear of embarrassment was the single most repeated blocker.",
    },
    {
      t: "Meaning travels through culture",
      b: "Culture is inseparable from language. Apps teach correctness; people crave meaning.",
    },
  ],
  works: [
    "Living where the language is spoken",
    "Conversing regularly with native speakers",
    "Integrating the language into daily routines",
    "Watching shows in the target language",
  ],

  hmws: [
    {
      n: "HMW 1",
      t: "How might we make practice come from a learner's real world?",
      why: "The strongest learning moments came from context learners already understood: the places they moved through, the media they consumed, and the routines they repeated.",
      ideas: [
        {
          n: "Browser-to-lesson companion",
          d: "turn everyday browsing into short lessons, which became the LangLearn prototype",
        },
        {
          n: "Environment immersion",
          d: "make café chatter, signs, and videos feel like practice material, later explored through Verba",
        },
        {
          n: "Scenario rehearsal",
          d: "let learners practice real situations like ordering food or making calls before they happen",
        },
      ],
    },
    {
      n: "HMW 2",
      t: "How might we teach through content people already care about?",
      why: "Learners did not want more abstract drills. They wanted language attached to culture, interests, and stories that made the words worth remembering.",
      ideas: [
        {
          n: "Story capsules",
          d: "small lessons around idioms, humor, and customs from media learners already watch",
        },
        {
          n: "Word lens",
          d: "show how one word changes meaning across articles, videos, and everyday contexts",
        },
        {
          n: "Interest-based feed",
          d: "let learners choose topics first, which became the backbone of SpeakEasy's article feed",
        },
      ],
    },
    {
      n: "HMW 3",
      t: "How might we make speaking practice feel low-stakes but real?",
      why: "Almost every learner described the same gap: they could recognize words, but froze when they had to speak. The product needed rehearsal without embarrassment.",
      ideas: [
        {
          n: "Wearable companion",
          d: "surface small prompts during real-world moments, an early path we chose not to pursue",
        },
        {
          n: "Voice AI buddy",
          d: "natural conversation with gentle feedback, first tested in Verba and later carried into SpeakEasy",
        },
        {
          n: "Article discussion",
          d: "turn something the learner just read into a focused spoken conversation",
        },
      ],
    },
  ],

  concepts: [
    {
      k: "Concept A",
      name: "LangLearn",
      sub: "micro-immersive daily learning",
      what: "We saw some existing solutions people used were Chrome extensions such as a few which modifided the text users read in different language or gave quick learning tools on any website. So we decided to build a Chrome extension that pulled real vocabulary and phrases from your everyday browsing, then turns them into personalized lessons on mobile.",
      story: [
        "Anna installs the extension & connects the mobile app",
        "It explains exactly what it tracks, and what it never does",
        "She toggles tracking per-site as she browses",
        "Evening digest: lessons built from her actual day",
      ],
      fb1: "Excited about personalization · alarmed by tracking & privacy · wanted visible progress, on mobile",
      iter: "Rebuilt consent-first: one-click tracking on/off, review & delete any tracked site, lessons moved fully to mobile.",
      verdict:
        "Testing this we found that learning first thing users were concerned about was privacy and tracking. But they liked that learning content was personalized and about the things they already loved to consumed. Also the interface on browswer was not ideal for daily use and everyone preferred the mobile experience.",
    },
    {
      k: "Concept B",
      name: "Verba",
      sub: "an AR language companion",
      what: "My teammate Jenn(seen in the picture below) owned a pair of Snaptacles from Snap so we decided to develop something using it. Idea was AR smart-glasses that see what you see bringing in context for practice in your target language. Mini lessons help build confidence at the right moments. ",
      story: [
        "Bryan's textbook Japanese confuses his mother-in-law",
        "His glasses watch YouTube along with him",
        "Verba, an animated character, chats about what he's watching",
        "Walking to a café, Verba asks him, in Japanese, where he's going",
      ],
      fb1: "Powerful low-anxiety practice · privacy concerns · nobody owns AR glasses · talking to a virtual person felt strange",
      iter: "Tracked only a cropped area; added customizable animal & human characters. Testers relaxed talking to an animated character.",
      verdict:
        "People liked that the practice was based on reality around them. Also format of lessons as conversation with a buddy felt more effective than a regular lesson. But we also realized that not many people had AR glasses still and it would be hard to test this hardware more widely. So we kept the voice-buddy insight into the final product.",
    },
  ],

  pivotIntro:
    "After testing LangLearn and Verba, the direction got clearer. People liked practice that came from things they already consumed, but the product had to live somewhere familiar, private, and easy to return to.",
  prototypeLearnings: [
    {
      t: "Real content worked",
      b: "Users responded to practice built around articles, videos, and daily browsing because it already had context.",
    },
    {
      t: "Mobile felt more reachable",
      b: "The browser extension felt useful but too heavy. People expected learning to fit into phone-sized moments.",
    },
    {
      t: "AR was too early",
      b: "Verba made the interaction feel alive, but smart glasses were not something most people owned or trusted yet.",
    },
    {
      t: "Voice practice mattered",
      b: "The buddy-style conversation was the part users kept coming back to: low-stakes, personal, and close to real speaking.",
    },
  ],
  pivotAudience:
    "That pushed us toward adults outside formal classrooms, especially learners who wanted to improve English but could not reliably make time for ESL classes.",
  pivotStats: [
    {
      b: "18–20M",
      s: "LEP adults age 30+ in the U.S., most outside any school system",
    },
    { b: "4%", s: "of adults actually participate in ESL classes" },
    { b: "40%", s: "cite no time · 26% cost · 23% transportation" },
    { b: "59%", s: "didn't know where classes even were" },
  ],
  tiktok:
    "Content first, practice second, no new hardware or classroom schedule required.",
  audienceWorks: [
    "Task-based, not abstract lessons",
    "Real-life, high-stakes scenarios (calls, forms, doctor visits)",
    "Micro-tasks that fit broken schedules",
    "Immediately usable today, not after level 12",
  ],

  productIntro:
    "The final app became a simple learning loop: choose something worth reading, get help when stuck, then practice speaking about it.",
  decisions: [
    {
      q: "Feed or curriculum?",
      rejT: "Lesson modules",
      rejB: "Reintroduces the structured format that keeps this demographic out of ESL programs, and removes agency.",
      winT: "User-driven scrollable feed",
      winB: "Users choose what to read, the same behavior they already use on news and social apps.",
    },
    {
      q: "Grid or single column?",
      rejT: "Grid / multi-column layout",
      rejB: "Increases visual noise and fatigue for lower-confidence readers.",
      winT: "Single column, one article at a time",
      winB: "Plain headlines and short summaries let users judge readability before tapping.",
    },
    {
      q: "Chat or call?",
      rejT: "Chat-style text interface",
      rejB: "Too much reading on top of reading; feels like a customer-service bot.",
      winT: "Voice-first, phone-call model",
      winB: "One question at a time, an AI persona, gentle corrections. Familiar and low-stakes.",
    },
    {
      q: "Which voice?",
      rejT: "Device text-to-speech",
      rejB: "Robotic voices measurably reduced perceived usefulness and trust.",
      winT: "ElevenLabs natural voices",
      winB: "Voice quality turned out to be a trust feature, not a polish feature.",
    },
  ],
  brand:
    "Calm, trustworthy, approachable: a mature natural palette, rounded corners that tested as less threatening, a reading-first typeface, and a logo that doubles as a microphone and a wine glass, a nod to the name.",
  versions: [
    {
      v: "v0",
      t: "Chrome extension",
      c: [
        ["+", "track sites → extract content → daily contextual lessons"],
        ["−", "testers rejected background tracking"],
        ["+", "rebuilt consent-first with one-click off"],
        ["#", "learned: right model, wrong home"],
      ],
    },
    {
      v: "v1",
      t: "Stories-format mobile",
      c: [
        ["+", "TikTok/stories format, interest categories, sourced content"],
        ["#", "prototyped in Figma Make"],
      ],
    },
    {
      v: "v2",
      t: "Expo rebuild",
      c: [
        ["+", "single-column feed · article as learning unit"],
        ["+", "tap-to-define · read-aloud · word bank"],
      ],
    },
    {
      v: "v3",
      t: "Simplify",
      c: [
        ["−", "Explore tab, which didn't support the core learning flow"],
        ["+", "Save → Discuss loop: passive reading becomes active use"],
        ["−", "device TTS"],
        ["+", "ElevenLabs voices · vocabulary = save + hear + translate"],
      ],
    },
  ],

  validation: {
    cohort:
      "16 immigrant adults (25–65), mixed English proficiency, diverse industries. Two weeks of testing focused on confidence, psychological safety, and practical utility.",
    expert:
      "Josh Lewis, a 10-year ESL teaching expert and founder of Boost Up English",
    stack:
      "Expo · React Native · Zustand · Node.js · Supabase · OpenAI · ElevenLabs · Guardian/GNews · ~12,300 lines",
  },
  next: "Scenario modules (doctor, grocery, transportation) · personalized learning paths · B2B community partnerships",

  sections: [
    {
      k: "01",
      label: "The wide problem",
      head: "Billions try. Few feel fluent.",
    },
    {
      k: "02",
      label: "The idea space",
      head: "Turning research into nine ideas",
    },
    {
      k: "03",
      label: "Two prototypes",
      head: "Building and testing",
    },
    { k: "04", label: "The pivot", head: "Meet the 4%" },
    { k: "05", label: "The product", head: "A feed you learn inside" },
  ],
  markers: [
    "interviews distilled into 3 how-might-we questions and 9 ideas",
    "two concepts prototyped, storyboarded and user-tested",
    "the audience got a face",
    "one product, four hard design calls",
  ],

  bandWidths: ["100%", "940px", "880px", "740px", "660px"],
};
