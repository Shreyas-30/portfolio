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
    "Duolingo taught me to say 'I'm a tired doctor.' When would I ever say that?",
  ],
  insights: [
    {
      t: "Meaningful beats structured",
      b: "People learn best when the content is personally meaningful, not when the curriculum says it's time.",
    },
    {
      t: "Comfort grows fluency",
      b: "Fluency grows from comfort, not perfection. Fear of embarrassment was the single most repeated blocker.",
    },
    {
      t: "Culture is the bridge",
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
      t: "Personalize the level of immersion by environment and emotional connection?",
      why: "Lived experience beats memorization. Babies learn from tone, gesture and context, not grammar drills.",
      ideas: [
        { n: "“Parent-mode” agent", d: "repetitive, emotional feedback and tremendous encouragement" },
        { n: "Environment immersion", d: "café chatter, subway signs & YouTube become interactive language moments" },
        { n: "Scenario mode", d: "role-play ordering food or meeting a friend, powered by your real routines" },
      ],
    },
    {
      n: "HMW 2",
      t: "Embed cultural storytelling and local customs into learning?",
      why: "Users kept naming culture as the bridge between memorization and fluency.",
      ideas: [
        { n: "Story capsules", d: "mini-lessons on idioms, gestures & humor drawn from media you already watch" },
        { n: "Word lens", d: "how the same word shows up across different real contexts" },
        { n: "Community threads", d: "learners connect around cultural moments in shared media" },
      ],
    },
    {
      n: "HMW 3",
      t: "Simulate authentic social scenarios without fear of embarrassment?",
      why: "Almost every learner named fear of embarrassment and a lack of realistic practice.",
      ideas: [
        { n: "Wearable companion", d: "subtle prompts to practice during real-world moments" },
        { n: "Voice AI buddy", d: "natural conversation, gentle feedback, real-world speech rhythms" },
        { n: "Real-time assistant", d: "listens to conversation around you and surfaces natural expressions" },
      ],
    },
  ],

  concepts: [
    {
      k: "Concept A",
      name: "LangLearn",
      sub: "micro-immersive daily learning",
      what: "A Chrome extension that pulls real vocabulary and phrases from your everyday browsing, then turns them into personalized lessons on mobile.",
      story: [
        "Anna installs the extension & connects the mobile app",
        "It explains exactly what it tracks, and what it never does",
        "She toggles tracking per-site as she browses",
        "Evening digest: lessons built from her actual day",
      ],
      fb1: "Excited about personalization · alarmed by tracking & privacy · wanted visible progress, on mobile",
      iter: "Rebuilt consent-first: one-click tracking on/off, review & delete any tracked site, lessons moved fully to mobile.",
      verdict: "Learning from your real life worked. Living in the browser, and asking people to accept tracking, did not.",
    },
    {
      k: "Concept B",
      name: "Verba",
      sub: "an AR language companion",
      what: "AR smart-glasses that see what you see and chat with you about it in your target language, like a friend beside you, then compile learning materials from your day.",
      story: [
        "Bryan's textbook Japanese confuses his mother-in-law",
        "His glasses watch YouTube along with him",
        "Verba, an animated character, chats about what he's watching",
        "Walking to a café, Verba asks him, in Japanese, where he's going",
      ],
      fb1: "Powerful low-anxiety practice · privacy concerns · nobody owns AR glasses · talking to a virtual person felt strange",
      iter: "Tracked only a cropped area; added customizable animal & human characters. Testers relaxed talking to an animated character.",
      verdict: "Right feeling, wrong hardware. We shelved it, but the voice-buddy insight survived into the final product.",
    },
  ],

  pivotIntro:
    "June, 53, enrolled in ESL at a community college and quit after three months. She is who the system misses:",
  pivotStats: [
    { b: "18–20M", s: "LEP adults age 30+ in the U.S., most outside any school system" },
    { b: "4%", s: "of adults actually participate in ESL classes" },
    { b: "40%", s: "cite no time · 26% cost · 23% transportation" },
    { b: "59%", s: "didn't know where classes even were" },
  ],
  tiktok:
    "44% of U.S. adults 30–49 use TikTok; 30% of 50–64. This audience already scrolls daily. The opportunity is to make that content teach.",
  audienceWorks: [
    "Task-based, not abstract lessons",
    "Real-life, high-stakes scenarios (calls, forms, doctor visits)",
    "Micro-tasks that fit broken schedules",
    "Immediately usable today, not after level 12",
  ],

  productIntro:
    "A personalized single-column feed where every article is a learning unit: read-aloud, tap-to-define, a word bank, and a voice-first AI conversation about what you just read.",
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
    expert: "Josh Lewis, a 10-year ESL teaching expert and founder of Boost Up English",
    stack: "Expo · React Native · Zustand · Node.js · Supabase · OpenAI · ElevenLabs · Guardian/GNews · ~12,300 lines",
  },
  next: "Scenario modules (doctor, grocery, transportation) · personalized learning paths · B2B community partnerships",

  sections: [
    { k: "01", label: "The wide problem", head: "Billions try. Few feel fluent." },
    { k: "02", label: "The idea space", head: "Turning research into nine ideas" },
    { k: "03", label: "Two prototypes", head: "LangLearn and Verba, built and tested" },
    { k: "04", label: "The pivot", head: "Meet the 4%" },
    { k: "05", label: "The product", head: "A feed you learn inside" },
    { k: "06", label: "Proof", head: "Sixteen learners, one expert, one beta" },
  ],
  markers: [
    "interviews distilled into 3 how-might-we questions and 9 ideas",
    "two concepts prototyped, storyboarded and user-tested",
    "the audience got a face",
    "one product, four hard design calls",
    "validated and shipped",
  ],

  bandWidths: ["100%", "940px", "880px", "740px", "660px", "560px"],
};
