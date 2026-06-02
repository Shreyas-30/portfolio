import type { NowItem, NowSource } from "@/content/types";

export type { NowItem, NowSource };

// A source adapter fetches items from one place and normalizes them
// to NowItem[]. It must never throw — on failure return [] (the
// aggregator wraps it defensively too). Keep network work bounded.
export type NowAdapter = {
  source: NowSource;
  /** Human label for the source badge. */
  label: string;
  /** Whether required config/keys are present. */
  enabled: boolean;
  fetch: () => Promise<NowItem[]>;
};
