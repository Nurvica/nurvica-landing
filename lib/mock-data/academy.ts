import type { AcademyItem, Series } from "@/lib/types/academy";

/**
 * Series and items are mock data. URLs follow the real platform conventions
 * but are placeholders until the actual NURVICA handles are wired in.
 *
 * Item ids deliberately match the existing /academy/<id> deep links used in
 * the dashboard (lib/dashboard/profile.ts) and chat responses
 * (lib/chat/responses.ts) so those links resolve correctly via the
 * app/academy/[slug] redirect route.
 */

export const SERIES: Series[] = [
  {
    slug: "know-your-crown",
    name: "Know Your Crown",
    description:
      "The fundamentals. Curl pattern, porosity, density — how to actually read your hair before you try to fix it.",
    cover: "https://placehold.co/1200x600/1D2A1F/EFE6D7?text=Know+Your+Crown",
    isFeatured: true,
  },
  {
    slug: "wash-day-diaries",
    name: "Wash Day Diaries",
    description:
      "Real wash routines, deep conditioning, and what to do when your hair fights you in the shower.",
    cover: "https://placehold.co/800x600/2F3F2E/EFE6D7?text=Wash+Day+Diaries",
  },
  {
    slug: "edge-recovery",
    name: "Edge Recovery",
    description:
      "Bring the hairline back. Tension, traction, and a recovery plan that works without product noise.",
    cover: "https://placehold.co/800x600/C7A77A/1D2A1F?text=Edge+Recovery",
  },
  {
    slug: "strength-and-repair",
    name: "Strength & Repair",
    description:
      "Protein vs. moisture, bond repair, and when to trim — what actually rebuilds damaged hair.",
    cover: "https://placehold.co/800x600/1D2A1F/C7A77A?text=Strength+%26+Repair",
  },
  {
    slug: "growth-and-retention",
    name: "Growth & Retention",
    description:
      "Scalp-up. Healthy follicles, gentle detangling, and the habits that actually keep length.",
    cover: "https://placehold.co/800x600/EFE6D7/1D2A1F?text=Growth+%26+Retention",
  },
];

/** Anchor "now" for relative timestamps. Items are dated backwards from here. */
const NOW = "2026-05-25T12:00:00Z";

function daysAgo(d: number): string {
  return new Date(Date.parse(NOW) - d * 86400_000).toISOString();
}

export const ACADEMY_ITEMS: AcademyItem[] = [
  // ─── Know Your Crown ───────────────────────────────────────────────────────
  {
    id: "porosity-test",
    title: "How to actually test your porosity",
    description:
      "The strand-in-water test the right way, plus what each result means for your routine.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-porosity-test",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/1D2A1F/EFE6D7?text=Porosity+Test",
    duration: "0:54",
    publishedAt: daysAgo(2),
    series: "know-your-crown",
    topics: ["fundamentals", "moisture"],
  },
  {
    id: "starter-routine",
    title: "Your starter routine in 4 steps",
    description:
      "The 4-step rhythm that works for almost every hair pattern when you're starting from zero.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/starter-routine",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/EFE6D7/1D2A1F?text=Starter+Routine",
    duration: "4 min read",
    publishedAt: daysAgo(6),
    series: "know-your-crown",
    topics: ["fundamentals"],
  },
  {
    id: "lco-method",
    title: "The LCO method, broken down",
    description:
      "Leave-in, cream, oil — why the order matters and how to layer for your porosity.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/lco-method",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/C7A77A/1D2A1F?text=L+%E2%86%92+C+%E2%86%92+O",
    duration: "5 min read",
    publishedAt: daysAgo(9),
    series: "know-your-crown",
    topics: ["moisture", "fundamentals"],
  },
  {
    id: "density-day",
    title: "Day-to-day density: 3 small swaps",
    description:
      "Three habit swaps that protect your density without changing your whole routine.",
    source: "tiktok",
    sourceUrl: "https://www.tiktok.com/@nurvica/video/density-day",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/2F3F2E/EFE6D7?text=Density+Day",
    duration: "1:12",
    publishedAt: daysAgo(12),
    series: "know-your-crown",
    topics: ["fundamentals", "retention"],
  },

  // ─── Wash Day Diaries ──────────────────────────────────────────────────────
  {
    id: "wash-day",
    title: "The wash-day reset for itchy scalp",
    description:
      "A gentle, scalp-first wash flow that calms irritation without stripping your length.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-wash-day",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/EFE6D7/1D2A1F?text=Wash+Day",
    duration: "1:32",
    publishedAt: daysAgo(3),
    series: "wash-day-diaries",
    topics: ["scalp", "moisture"],
  },
  {
    id: "frizz-humidity",
    title: "Frizz, humidity, and why your hair fights you",
    description:
      "How the cuticle reads moisture in the air — and the application rule that ends most frizz.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/frizz-humidity",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/C7A77A/1D2A1F?text=Frizz+%26+Humidity",
    duration: "5 min read",
    publishedAt: daysAgo(7),
    series: "wash-day-diaries",
    topics: ["frizz", "moisture"],
  },
  {
    id: "diffuser",
    title: "Diffusing without disturbing your curls",
    description:
      "Heat setting, distance, and the hover technique — diffuser basics that don't destroy your clumps.",
    source: "tiktok",
    sourceUrl: "https://www.tiktok.com/@nurvica/video/diffuser",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/1D2A1F/C7A77A?text=Diffuser",
    duration: "1:48",
    publishedAt: daysAgo(11),
    series: "wash-day-diaries",
    topics: ["frizz", "styling"],
  },
  {
    id: "humectants",
    title: "Why glycerin works (and when it doesn't)",
    description:
      "A quick read on humectants — they pull moisture from the air, which isn't always what you want.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-humectants",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/EFE6D7/2F3F2E?text=Humectants",
    duration: "0:48",
    publishedAt: daysAgo(15),
    series: "wash-day-diaries",
    topics: ["moisture"],
  },
  {
    id: "detangle",
    title: "The gentle detangle that saves length",
    description:
      "Fingers first, wide-tooth second, conditioner-saturated always. The order that retains inches.",
    source: "tiktok",
    sourceUrl: "https://www.tiktok.com/@nurvica/video/detangle",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/C7A77A/1D2A1F?text=Detangle",
    duration: "1:20",
    publishedAt: daysAgo(18),
    series: "wash-day-diaries",
    topics: ["retention", "breakage"],
  },

  // ─── Edge Recovery ─────────────────────────────────────────────────────────
  {
    id: "edges-recovery",
    title: "A 6-week edge recovery plan",
    description:
      "Tension break, scalp work, and the only product step you actually need. Photograph weekly.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/edges-recovery",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/1D2A1F/C7A77A?text=Edge+Recovery",
    duration: "5 min read",
    publishedAt: daysAgo(4),
    series: "edge-recovery",
    topics: ["edges"],
  },
  {
    id: "edges-myths",
    title: "Edge myths that are costing you length",
    description:
      "The advice circling on social that quietly destroys edges — and what to do instead.",
    source: "tiktok",
    sourceUrl: "https://www.tiktok.com/@nurvica/video/edges-myths",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/2F3F2E/C7A77A?text=Edges+Myths",
    duration: "1:04",
    publishedAt: daysAgo(10),
    series: "edge-recovery",
    topics: ["edges"],
  },
  {
    id: "tension-traction",
    title: "Tension, traction, and what your edges are telling you",
    description:
      "Traction alopecia explained — and how to identify it early before it becomes permanent.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/tension-traction",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/EFE6D7/2F3F2E?text=Tension+%26+Traction",
    duration: "6 min read",
    publishedAt: daysAgo(14),
    series: "edge-recovery",
    topics: ["edges", "scalp"],
  },
  {
    id: "satin-rules",
    title: "Satin rules: pillowcase, bonnet, or scarf?",
    description:
      "Which satin setup actually protects your hair — and the one mistake that cancels them all out.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-satin-rules",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/C7A77A/EFE6D7?text=Satin+Rules",
    duration: "0:42",
    publishedAt: daysAgo(20),
    series: "edge-recovery",
    topics: ["edges", "breakage"],
  },

  // ─── Strength & Repair ─────────────────────────────────────────────────────
  {
    id: "protein-balance",
    title: "Protein vs. moisture — finding your balance",
    description:
      "The single most misdiagnosed problem in textured hair, and how to find your side.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/protein-balance",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/1D2A1F/EFE6D7?text=Protein+vs+Moisture",
    duration: "6 min read",
    publishedAt: daysAgo(5),
    series: "strength-and-repair",
    topics: ["breakage", "moisture"],
  },
  {
    id: "bond-repair",
    title: "Bond repair: what works, what's marketing",
    description:
      "Maleic acid, bis-aminopropyl diglycol — what to look for, and what the bottle is selling you.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/bond-repair",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/2F3F2E/EFE6D7?text=Bond+Repair",
    duration: "6 min read",
    publishedAt: daysAgo(13),
    series: "strength-and-repair",
    topics: ["damage", "breakage"],
  },
  {
    id: "trim-truth",
    title: "When to trim, when to wait",
    description:
      "Calendar trims cost you inches. Here's how to read split ends and trim only what you have to.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-trim-truth",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/C7A77A/1D2A1F?text=When+to+Trim",
    duration: "0:58",
    publishedAt: daysAgo(17),
    series: "strength-and-repair",
    topics: ["damage", "retention"],
  },

  // ─── Growth & Retention ────────────────────────────────────────────────────
  {
    id: "scalp-massage",
    title: "The 4-minute scalp massage",
    description:
      "The exact technique — pressure, direction, and what 4 minutes a day actually does.",
    source: "instagram",
    sourceUrl: "https://www.instagram.com/reel/nurvica-scalp-massage",
    kind: "video",
    thumbnail:
      "https://placehold.co/600x800/EFE6D7/1D2A1F?text=Scalp+Massage",
    duration: "0:52",
    publishedAt: daysAgo(1),
    series: "growth-and-retention",
    topics: ["growth", "scalp"],
  },
  {
    id: "growth-truth",
    title: "What actually grows hair (and what doesn't)",
    description:
      "What the science says about growth — and which viral oils and serums are doing nothing.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/growth-truth",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/1D2A1F/C7A77A?text=Growth+Truth",
    duration: "7 min read",
    publishedAt: daysAgo(8),
    series: "growth-and-retention",
    topics: ["growth", "retention"],
  },
  {
    id: "scalp-microbiome",
    title: "Your scalp is an ecosystem — treat it like one",
    description:
      "Why over-washing and harsh products disrupt the scalp microbiome, and what to do instead.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/scalp-microbiome",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/2F3F2E/EFE6D7?text=Scalp+Microbiome",
    duration: "5 min read",
    publishedAt: daysAgo(16),
    series: "growth-and-retention",
    topics: ["scalp", "growth"],
  },
  {
    id: "retention-101",
    title: "Length retention 101",
    description:
      "Growth is at the scalp. Length is at the ends. The four habits that decide which one you see.",
    source: "substack",
    sourceUrl: "https://nurvica.substack.com/p/retention-101",
    kind: "article",
    thumbnail:
      "https://placehold.co/1200x630/C7A77A/2F3F2E?text=Retention+101",
    duration: "6 min read",
    publishedAt: daysAgo(21),
    series: "growth-and-retention",
    topics: ["retention", "breakage"],
  },
];

export const SERIES_BY_SLUG: Record<string, Series> = SERIES.reduce(
  (acc, s) => {
    acc[s.slug] = s;
    return acc;
  },
  {} as Record<string, Series>
);

export const ITEM_BY_ID: Record<string, AcademyItem> = ACADEMY_ITEMS.reduce(
  (acc, i) => {
    acc[i.id] = i;
    return acc;
  },
  {} as Record<string, AcademyItem>
);
