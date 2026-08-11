import type { NowPost } from "./types";

export const nowPosts: NowPost[] = [
  {
    id: "2026-08-11-video-games-log",
    type: "post",
    date: "2026-08-11",
    body: "Started logging video games I've played. Been meaning to share things I know or have experienced more publicly for a long time now. This is (another) start. Currently a Google Sheet, but I want to turn it into a better-looking, easy-to-browse collection format, like Letterboxd or other catalog-style pages.",
    links: [
      {
        url: "https://docs.google.com/spreadsheets/d/1srEuqjHdy6YPWxq7Kz32Zovk8Wl49Eqoob9SEILZSCo/edit?usp=sharing",
      },
    ],
  },
  {
    id: "2026-08-09-sunday-friends",
    type: "post",
    date: "2026-08-09",
    body: "friendly sunday in philly",
    media: [
      {
        id: "sunday-friends-01",
        src: "/images/now/2026-08-10-sunday-friends/01.jpeg",
        alt: "Sunday afternoon with friends, frame 1",
        width: 2866,
        height: 3514,
      },
      {
        id: "sunday-friends-02",
        src: "/images/now/2026-08-10-sunday-friends/02.jpeg",
        alt: "Sunday afternoon with friends, frame 2",
        width: 2787,
        height: 1988,
      },
    ],
  },
];
