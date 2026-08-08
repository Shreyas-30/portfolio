import type { ImageRef } from "./types";

export type LabProject = {
  slug: string;
  title: string;
  subtitle: string;
  previewSubtitle: string;
  description: string;
  metadataDescription: string;
  tags: string[];
  year: string;
  href: string;
  thumbnail: ImageRef;
  links?: {
    label: string;
    href: string;
  }[];
  facts: {
    label: string;
    value: string;
  }[];
  overview: string[];
  demo?: {
    embedUrl: string;
    title: string;
    kicker: string;
    heading: string;
    body: string;
  };
  sections: {
    title: string;
    body: string;
  }[];
};

export const labProjects: LabProject[] = [
  {
    slug: "context-colab",
    title: "ContextCollab",
    subtitle: "Shared context for teams working with AI agents.",
    previewSubtitle: "agent context sharing",
    description:
      "A team workspace for sharing agent context without copy-pasting AI responses, so collaborators can keep personal agent memory while staying aligned.",
    metadataDescription:
      "A Microsoft Hackathon project from New York Tech Week 2026 exploring how teammates can share useful AI agent context without losing their individual workflows.",
    tags: ["AI", "COLLABORATION", "HACKATHON"],
    year: "2026",
    href: "/work/context-colab",
    thumbnail: {
      src: "/images/projects/lab/nytw/contextcollab.png",
      alt: "ContextCollab project preview",
      width: 3248,
      height: 2122,
    },
    links: [
      {
        label: "view GitHub",
        href: "https://github.com/Shreyas-30/NYTW-MicrosoftHackathon",
      },
    ],
    facts: [
      { label: "Event", value: "Microsoft Hackathon" },
      { label: "Setting", value: "New York Tech Week 2026" },
      { label: "Focus", value: "Shared agent context" },
      { label: "Output", value: "Collaborative AI workflow prototype" },
    ],
    overview: [
      "ContextCollab was built during a Microsoft Hackathon at New York Tech Week 2026. The project came from a familiar team problem: AI agents are useful, but the context they build up often stays locked inside one person's chat.",
      "The idea was to make that context easier to share without forcing everyone into the same agent or the same thread. Instead of copy-pasting long responses, teammates could pass along the useful parts of their agent context while keeping their own working memory, preferences, and flow intact.",
    ],
    sections: [
      {
        title: "Problem",
        body: "Teams often collaborate around the output of AI tools, but not the reasoning, constraints, and background that produced that output. That makes handoffs brittle and encourages people to paste giant walls of context back and forth.",
      },
      {
        title: "Idea",
        body: "ContextCollab treats agent context as something teams can share in smaller, intentional pieces: the goal, what has already been tried, decisions made, open questions, and useful artifacts. It keeps collaboration lightweight without flattening everyone's individual agent relationship.",
      },
      {
        title: "Next",
        body: "I'll add the full hackathon story, product flow, and more visuals here once I organize the rest of the project assets.",
      },
    ],
  },
  {
    slug: "kairos",
    title: "Kairos",
    subtitle: "A physical watch for noticing the quality of time.",
    previewSubtitle: "MIT Hard Mode",
    description:
      "A watch that uses on-device audio intelligence to sense meaningful human interaction and reflects the quality of time through a physical clock face.",
    metadataDescription:
      "A wearable hardware prototype from MIT Hard Mode that uses on-device audio intelligence to reflect the quality of time through a physical clock face.",
    tags: ["HARDWARE", "AI", "WEARABLE", "HACKATHON"],
    year: "2026",
    href: "/work/kairos",
    thumbnail: {
      src: "/images/projects/lab/hardmode/Hardmode.png",
      alt: "Kairos watch preview for MIT Hard Mode",
      width: 2000,
      height: 1200,
    },
    facts: [
      { label: "Event", value: "MIT Hard Mode 2026" },
      { label: "Format", value: "48-hour hardware hackathon" },
      { label: "Focus", value: "On-device audio intelligence" },
      { label: "Output", value: "Wearable physical prototype" },
    ],
    overview: [
      "Kairos was built during MIT Hard Mode 2026, a 48-hour hardware hackathon hosted by MIT Media Lab. The project asks a simple question: what if a watch could reflect not just how much time has passed, but the kind of time you are spending?",
      "The prototype uses on-device audio intelligence to distinguish meaningful human interaction from passive media. Instead of turning that signal into another notification, Kairos expresses it through a physical clock face: time slows down or speeds up based on the quality of presence around you.",
    ],
    sections: [
      {
        title: "Signal",
        body: "The watch listens for patterns that suggest active conversation rather than background consumption. The goal was not to record or summarize people, but to sense the difference between being engaged and letting time slip into passive media.",
      },
      {
        title: "Expression",
        body: "We translated that signal into a physical clock face. Good time feels fuller and more present, so the interface became mechanical and ambient instead of another screen demanding attention.",
      },
      {
        title: "Next",
        body: "Full process, build details, and prototype media are coming as I add the rest of the assets from the hackathon.",
      },
    ],
  },
  {
    slug: "lerobot-so101",
    title: "LeRobot SO-101",
    subtitle: "A hands-on build with Hugging Face's open-source robotic arm.",
    previewSubtitle: "robot arm build",
    description:
      "A hands-on build with Hugging Face's SO-101 leader/follower robot arms, exploring teleoperation, calibration, and robot learning workflows.",
    metadataDescription:
      "A 2026 lab project building and experimenting with Hugging Face's open-source SO-101 leader/follower robotic arm platform.",
    tags: ["ROBOTICS", "AI", "OPEN SOURCE"],
    year: "2026",
    href: "/work/lerobot-so101",
    thumbnail: {
      src: "/images/projects/lab/lerobotso101/lerobot.png",
      alt: "LeRobot SO-101 robotic arm project preview",
      width: 3000,
      height: 1800,
    },
    links: [
      {
        label: "watch demo",
        href: "https://youtube.com/shorts/enzBa4mlhfo",
      },
      {
        label: "Hugging Face docs",
        href: "https://huggingface.co/docs/lerobot/so101",
      },
    ],
    facts: [
      { label: "Platform", value: "Hugging Face LeRobot" },
      { label: "Robot", value: "SO-101 leader/follower arms" },
      { label: "Focus", value: "Teleoperation + robot learning" },
      { label: "Year", value: "2026" },
    ],
    overview: [
      "LeRobot SO-101 was a 2026 lab build based on Hugging Face's open-source robotics work. The SO-101 setup uses a leader and a follower robotic arm, which makes it possible to teleoperate the robot, collect demonstrations, and start thinking about robot learning through real physical interaction.",
      "For this project, I focused on getting hands-on with the hardware: assembling the arm, understanding calibration, testing leader to follower control, and seeing how an open-source robotics stack can turn a small desktop arm into a learning system.",
    ],
    demo: {
      embedUrl: "https://www.youtube.com/embed/enzBa4mlhfo",
      title: "LeRobot SO-101 demo",
      kicker: "prototype demo",
      heading: "Leader motion, follower response.",
      body: "The most useful part of the build was seeing the system behave as a physical loop: a human moves the leader arm, the follower reproduces that motion, and those demonstrations become the raw material for training and evaluating robot behaviors.",
    },
    sections: [
      {
        title: "Why SO-101",
        body: "SO-101 is designed as an accessible entry point into robotics: affordable hardware, open documentation, and a workflow that connects mechanical setup with data collection and learning.",
      },
      {
        title: "What I explored",
        body: "I used the project as a way to understand how leader/follower control, calibration, teleoperation, and datasets fit together in a practical robotics workflow.",
      },
      {
        title: "Next",
        body: "I'll add the full build notes, setup details, and more media once I organize the rest of the project story.",
      },
    ],
  },
];

export function getLabProject(slug: string) {
  return labProjects.find((project) => project.slug === slug);
}
