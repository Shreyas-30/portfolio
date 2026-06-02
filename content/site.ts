// Site-wide identity + copy. Edit here, not in components.

export const site = {
  name: "Shreyas Kulkarni",
  kicker: "PORTFOLIO · 2026",
  intro:
    "Engineering × Design × Business — I build things meant to drive real, meaningful change.",
  email: "shreyask3004@gmail.com",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/_shreyas.kulkarni/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kul-shreyas/" },
    { label: "GitHub", href: "https://github.com/Shreyas-30/" },
    { label: "Email", href: "mailto:shreyask3004@gmail.com" },
  ],
} as const;

// Where the name card anchors over the hero collage.
// Change this single value to recenter / move it (DIR D preference: left).
export const HERO_NAME_POSITION: "left" | "bottom-left" | "center" =
  "bottom-left";
