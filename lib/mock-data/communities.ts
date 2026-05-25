import type { CommunityMeta } from "@/lib/types/community";

export const COMMUNITIES: CommunityMeta[] = [
  {
    slug: "locs",
    name: "Locs",
    description:
      "Starter to mature. Retwist timing, fuzz, length retention, and lint.",
    memberCount: 1247,
  },
  {
    slug: "braids-and-twists",
    name: "Braids & Twists",
    description:
      "Box braids, knotless, marley twists. Tension, longevity, takedowns.",
    memberCount: 2189,
  },
  {
    slug: "waves",
    name: "Waves",
    description: "Brushing, durags, moisture, and the 360 wolfing journey.",
    memberCount: 982,
  },
  {
    slug: "wash-and-go",
    name: "Wash-and-Go",
    description:
      "Soaking-wet application, clump definition, frizz, and humidity wars.",
    memberCount: 1604,
  },
  {
    slug: "4c-hair",
    name: "4C Hair",
    description:
      "Coily kin. Shrinkage truths, low-manipulation styles, real moisture.",
    memberCount: 3081,
  },
  {
    slug: "scalp-health",
    name: "Scalp Health",
    description:
      "Itch, flake, tender scalp, and the products that calm it down.",
    memberCount: 1453,
  },
  {
    slug: "protective-styles",
    name: "Protective Styles",
    description:
      "Wigs, sew-ins, braids — protection without traction damage.",
    memberCount: 1875,
  },
  {
    slug: "transitioning",
    name: "Transitioning",
    description:
      "Growing out heat damage or a relaxer. Demarcation lines and patience.",
    memberCount: 1126,
  },
];

export const COMMUNITY_BY_SLUG: Record<string, CommunityMeta> = COMMUNITIES.reduce(
  (acc, c) => {
    acc[c.slug] = c;
    return acc;
  },
  {} as Record<string, CommunityMeta>
);
