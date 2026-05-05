export type RoutineStep = {
  id: string;
  label: string;
  why: string;
};

export type Profile = {
  hasProfile: boolean;
  curlPattern: string | null;
  curlPatternLabel: string;
  porosityHint: string;
  thickness: string | null;
  hairLength: string | null;
  concerns: string[];
  goals: string[];
  scalp: string[];
  styles: string[];
  heat: string | null;
  tension: string | null;
  washFrequency: string | null;
  climate: string | null;
  city: string | null;
  healthScore: number;
  scoreNote: string;
  topConcernKey: string;
  topConcern: { title: string; tip: string; topic: string };
  routine: RoutineStep[];
  recommended: RecommendedItem[];
  communityHighlights: CommunityPost[];
  suggestedPrompts: string[];
};

export type RecommendedItem = {
  id: string;
  kind: "article" | "video";
  title: string;
  meta: string;
  topic: string;
};

export type CommunityPost = {
  id: string;
  group: string;
  author: string;
  excerpt: string;
  replies: number;
};

const CURL_LABELS: Record<string, string> = {
  "3a": "3A",
  "3b": "3B",
  "3c": "3C",
  "4a": "4A",
  "4b": "4B",
  "4c": "4C",
  multiple: "Multiple patterns",
  unsure: "Curl pattern TBD",
};

const POROSITY_FROM_WET: Record<string, string> = {
  "soft-stretchy": "Balanced porosity, healthy elasticity",
  fragile: "Low elasticity — likely high porosity",
  rough: "Low porosity — moisture has trouble getting in",
  unsure: "Porosity to be confirmed",
};

const CONCERN_MAP: Record<
  string,
  { title: string; tip: string; topic: string }
> = {
  dryness: {
    title: "Bring back your moisture",
    tip: "Layer leave-in, cream, then sealant on soaking wet hair — every wash.",
    topic: "moisture",
  },
  breakage: {
    title: "Strengthen what you have",
    tip: "Cut manipulation in half this week. Sleep on satin every night.",
    topic: "breakage",
  },
  growth: {
    title: "Set the conditions for growth",
    tip: "Healthy scalp first — gentle weekly cleanse, low-tension styles, scalp massage.",
    topic: "growth",
  },
  thinning: {
    title: "Protect your density",
    tip: "Drop tight styles for the next 30 days. Massage your scalp 4 minutes daily.",
    topic: "thinning",
  },
  "scalp-irritation": {
    title: "Calm your scalp",
    tip: "Switch to a sulfate-free, fragrance-free wash. Cool rinses only this week.",
    topic: "scalp",
  },
  edges: {
    title: "Rebuild your edges",
    tip: "No tension at the hairline. Take a 6-week break from braids and weaves.",
    topic: "edges",
  },
  damage: {
    title: "Repair, then rebuild",
    tip: "Trim what's not coming back. Add a bond-repair treatment monthly.",
    topic: "damage",
  },
  frizz: {
    title: "Smooth without weighing it down",
    tip: "Apply product on soaking wet hair, not damp. Less heat, more air-dry.",
    topic: "frizz",
  },
  retention: {
    title: "Stop losing length",
    tip: "Detangle with conditioner, finger first. Trim only when you see split ends.",
    topic: "retention",
  },
  unsure: {
    title: "Let's figure it out together",
    tip: "Start with the basics — gentle wash, weekly deep condition, satin at night.",
    topic: "fundamentals",
  },
};

const RECOMMENDED_BY_TOPIC: Record<string, RecommendedItem[]> = {
  moisture: [
    {
      id: "lco-method",
      kind: "article",
      title: "The LCO method, broken down",
      meta: "5 min read · Moisture",
      topic: "moisture",
    },
    {
      id: "humectants",
      kind: "video",
      title: "Why glycerin works (and when it doesn't)",
      meta: "4 min watch · Trichologist",
      topic: "moisture",
    },
  ],
  breakage: [
    {
      id: "protein-balance",
      kind: "article",
      title: "Protein vs moisture — finding your balance",
      meta: "6 min read · Breakage",
      topic: "breakage",
    },
    {
      id: "satin-rules",
      kind: "video",
      title: "Satin rules: pillowcase, bonnet, or scarf?",
      meta: "3 min watch · Habits",
      topic: "habits",
    },
  ],
  growth: [
    {
      id: "scalp-massage",
      kind: "video",
      title: "The 4-minute scalp massage",
      meta: "4 min watch · Scalp",
      topic: "scalp",
    },
    {
      id: "growth-truth",
      kind: "article",
      title: "What actually grows hair (and what doesn't)",
      meta: "7 min read · Growth",
      topic: "growth",
    },
  ],
  thinning: [
    {
      id: "tension-traction",
      kind: "article",
      title: "Tension, traction, and what your edges are telling you",
      meta: "6 min read · Thinning",
      topic: "thinning",
    },
    {
      id: "density-day",
      kind: "video",
      title: "Day-to-day density: 3 small swaps",
      meta: "5 min watch · Habits",
      topic: "thinning",
    },
  ],
  scalp: [
    {
      id: "scalp-microbiome",
      kind: "article",
      title: "Your scalp is an ecosystem — treat it like one",
      meta: "5 min read · Scalp",
      topic: "scalp",
    },
    {
      id: "wash-day",
      kind: "video",
      title: "The wash-day reset for itchy scalp",
      meta: "6 min watch · Wash day",
      topic: "scalp",
    },
  ],
  edges: [
    {
      id: "edges-recovery",
      kind: "article",
      title: "A 6-week edge recovery plan",
      meta: "5 min read · Edges",
      topic: "edges",
    },
    {
      id: "edges-myths",
      kind: "video",
      title: "Edge myths that are costing you length",
      meta: "4 min watch · Myths",
      topic: "edges",
    },
  ],
  damage: [
    {
      id: "bond-repair",
      kind: "article",
      title: "Bond repair: what works, what's marketing",
      meta: "6 min read · Damage",
      topic: "damage",
    },
    {
      id: "trim-truth",
      kind: "video",
      title: "When to trim, when to wait",
      meta: "3 min watch · Trims",
      topic: "damage",
    },
  ],
  frizz: [
    {
      id: "frizz-humidity",
      kind: "article",
      title: "Frizz, humidity, and why your hair fights you",
      meta: "5 min read · Frizz",
      topic: "frizz",
    },
    {
      id: "diffuser",
      kind: "video",
      title: "Diffusing without disturbing your curls",
      meta: "4 min watch · Styling",
      topic: "frizz",
    },
  ],
  retention: [
    {
      id: "retention-101",
      kind: "article",
      title: "Length retention 101",
      meta: "6 min read · Retention",
      topic: "retention",
    },
    {
      id: "detangle",
      kind: "video",
      title: "The gentle detangle that saves length",
      meta: "5 min watch · Wash day",
      topic: "retention",
    },
  ],
  fundamentals: [
    {
      id: "starter-routine",
      kind: "article",
      title: "Your starter routine in 4 steps",
      meta: "4 min read · Basics",
      topic: "fundamentals",
    },
    {
      id: "porosity-test",
      kind: "video",
      title: "How to actually test your porosity",
      meta: "3 min watch · Diagnostics",
      topic: "fundamentals",
    },
  ],
};

const COMMUNITY_BY_TOPIC: Record<string, CommunityPost> = {
  moisture: {
    id: "c-moisture",
    group: "Moisture & Curls",
    author: "Tasha · 4C",
    excerpt:
      "What finally worked for me: heavy leave-in on dripping wet hair, then a cream within 60 seconds.",
    replies: 23,
  },
  growth: {
    id: "c-growth",
    group: "Natural Growth",
    author: "Marcus · 4A",
    excerpt:
      "Six months of nothing but consistent scalp massage and protective styling. Here's the photo.",
    replies: 41,
  },
  edges: {
    id: "c-edges",
    group: "Edges & Hairline",
    author: "Yara · 4B",
    excerpt: "Day 28 of my edge break. The baby hairs are showing up — slow but real.",
    replies: 18,
  },
  scalp: {
    id: "c-scalp",
    group: "Scalp Care",
    author: "Jordan · 3C",
    excerpt:
      "Switching to a fragrance-free wash stopped the itch in two weeks. Sharing what I use.",
    replies: 12,
  },
  breakage: {
    id: "c-breakage",
    group: "Strength & Breakage",
    author: "Imani · 4A",
    excerpt:
      "If your hair feels mushy when wet, that's not dryness — that's protein loss.",
    replies: 27,
  },
  damage: {
    id: "c-damage",
    group: "Damage Recovery",
    author: "Adaeze · 4C",
    excerpt:
      "Three months post-bleach. Bond-repair monthly + trims every 8 weeks is doing real work.",
    replies: 19,
  },
  frizz: {
    id: "c-frizz",
    group: "Wash-and-Go Club",
    author: "Khalil · 3B",
    excerpt:
      "Soaking wet application changed my whole wash-and-go. Frizz is 80% gone.",
    replies: 31,
  },
  retention: {
    id: "c-retention",
    group: "Length Retention",
    author: "Simi · 4B",
    excerpt: "Stopped finger-fighting tangles. Conditioner + wide-tooth comb only. Game changer.",
    replies: 15,
  },
  thinning: {
    id: "c-thinning",
    group: "Density & Thinning",
    author: "Renée · 3C",
    excerpt:
      "30 days no tight styles. The crown is filling back in. Patience is the move.",
    replies: 22,
  },
  fundamentals: {
    id: "c-fundamentals",
    group: "Welcome",
    author: "Kemi · TBD",
    excerpt:
      "New here too — start with one wash, one deep condition, satin at night. That was my whole month one.",
    replies: 9,
  },
};

const SUGGESTED_PROMPTS_BY_TOPIC: Record<string, string[]> = {
  moisture: [
    "Why is my hair dry the day after I wash it?",
    "What's a good leave-in for high porosity?",
  ],
  breakage: [
    "How do I know if I need protein or moisture?",
    "Build me a low-manipulation wash day.",
  ],
  growth: [
    "How long until I see real growth?",
    "Is rosemary oil actually doing anything?",
  ],
  thinning: [
    "Are my edges thinning or just shedding?",
    "How do I protect my density at the gym?",
  ],
  scalp: [
    "Why is my scalp itchy even though I just washed?",
    "Sulfate-free shampoo for sensitive scalp?",
  ],
  edges: [
    "How do I bring my edges back?",
    "Are silk-pressed edges damaging?",
  ],
  damage: [
    "How often should I do bond repair?",
    "What does heat damage actually look like?",
  ],
  frizz: [
    "Why does my hair frizz the second I touch it?",
    "Best diffuser technique for 4A?",
  ],
  retention: [
    "I keep cutting my length — why?",
    "How do I detangle without breakage?",
  ],
  fundamentals: [
    "Build me a 4-step starter routine.",
    "How do I actually test my porosity?",
  ],
};

const FALLBACK_PROFILE: Profile = {
  hasProfile: false,
  curlPattern: null,
  curlPatternLabel: "Take the hair profile",
  porosityHint: "Porosity will show up after onboarding",
  thickness: null,
  hairLength: null,
  concerns: [],
  goals: [],
  scalp: [],
  styles: [],
  heat: null,
  tension: null,
  washFrequency: null,
  climate: null,
  city: null,
  healthScore: 65,
  scoreNote: "Default starting point until you finish your hair profile.",
  topConcernKey: "unsure",
  topConcern: CONCERN_MAP.unsure,
  routine: [
    {
      id: "satin",
      label: "Sleep on satin tonight",
      why: "Cuts down friction breakage while you sleep.",
    },
    {
      id: "water",
      label: "Drink 2L of water",
      why: "Hydrated body, hydrated scalp.",
    },
    {
      id: "scalp-massage",
      label: "Massage your scalp for 4 minutes",
      why: "Increases circulation to the follicle.",
    },
  ],
  recommended: RECOMMENDED_BY_TOPIC.fundamentals,
  communityHighlights: [COMMUNITY_BY_TOPIC.fundamentals],
  suggestedPrompts: SUGGESTED_PROMPTS_BY_TOPIC.fundamentals,
};

function asArray(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : [];
}

function asString(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function computeScore(answers: Record<string, unknown>): {
  score: number;
  note: string;
} {
  let score = 70;
  const notes: string[] = [];

  const wet = asString(answers["wet-feel"]);
  if (wet === "soft-stretchy") {
    score += 6;
  } else if (wet === "fragile") {
    score -= 10;
    notes.push("breakage signal");
  } else if (wet === "rough") {
    score -= 6;
    notes.push("low-porosity signs");
  }

  const heat = asString(answers["heat"]);
  if (heat === "never") score += 4;
  else if (heat === "rarely") score += 1;
  else if (heat === "weekly") score -= 5;
  else if (heat === "daily") {
    score -= 10;
    notes.push("frequent heat");
  }

  const tension = asString(answers["tension"]);
  if (tension === "never") score += 3;
  else if (tension === "sometimes") score -= 2;
  else if (tension === "most") {
    score -= 8;
    notes.push("tight styles");
  }

  const concerns = asArray(answers["concerns"]);
  score -= Math.min(concerns.length * 3, 9);

  const state = asArray(answers["current-state"]);
  if (state.includes("bleached")) {
    score -= 8;
    notes.push("bleached strands");
  }
  if (state.includes("color")) score -= 3;
  if (state.includes("relaxed")) score -= 3;
  if (state.includes("transitioning")) score -= 2;
  if (state.includes("natural")) score += 2;
  if (state.includes("locked")) score += 2;

  const scalp = asArray(answers["scalp-feel"]);
  const scalpHits = scalp.filter((s) =>
    ["itchy", "flaky", "tender"].includes(s)
  ).length;
  if (scalpHits > 0) {
    score -= Math.min(scalpHits * 3, 6);
    notes.push("scalp irritation");
  }

  const wash = asString(answers["wash-frequency"]);
  if (wash === "monthly") score -= 4;
  else if (wash === "varies") score -= 1;

  score = Math.max(30, Math.min(95, Math.round(score)));

  let note: string;
  if (score >= 80) note = "Your foundations look strong — keep stacking the small wins.";
  else if (score >= 65)
    note = `Solid baseline${notes.length ? ` with a few areas to watch (${notes.slice(0, 2).join(", ")})` : ""}.`;
  else if (score >= 50)
    note = `There's room to grow — start with ${notes[0] ?? "consistency"} this week.`;
  else
    note = `Let's reset — focus on ${notes[0] ?? "the basics"} before anything else.`;

  return { score, note };
}

function buildRoutine(answers: Record<string, unknown>): RoutineStep[] {
  const concerns = asArray(answers["concerns"]);
  const lifestyle = asArray(answers["lifestyle"]);
  const heat = asString(answers["heat"]);
  const wet = asString(answers["wet-feel"]);

  const steps: RoutineStep[] = [];

  steps.push({
    id: "scalp-massage",
    label: "Massage your scalp for 4 minutes",
    why: "Stimulates circulation to the follicle. Compounding daily.",
  });

  if (concerns.includes("dryness") || wet === "rough") {
    steps.push({
      id: "leave-in",
      label: "Refresh with leave-in + sealant",
      why: "Locks moisture against the cuticle for the day ahead.",
    });
  }

  if (lifestyle.includes("cotton")) {
    steps.push({
      id: "satin",
      label: "Swap to satin before bed",
      why: "Cotton drinks the moisture you just put in.",
    });
  } else {
    steps.push({
      id: "satin",
      label: "Sleep on satin tonight",
      why: "Cuts friction breakage while you sleep.",
    });
  }

  if (concerns.includes("breakage") || wet === "fragile") {
    steps.push({
      id: "low-manipulation",
      label: "Keep it low-manipulation today",
      why: "No tight styling. Hands out of your hair.",
    });
  }

  if (heat === "daily" || heat === "weekly") {
    steps.push({
      id: "heat-rest",
      label: "Skip heat today",
      why: "Give the cuticle a chance to settle.",
    });
  }

  if (steps.length < 4) {
    steps.push({
      id: "water",
      label: "Drink 2L of water",
      why: "Hydrated body, hydrated scalp.",
    });
  }

  return steps.slice(0, 5);
}

export function buildProfile(
  answers: Record<string, unknown> | null
): Profile {
  if (!answers || Object.keys(answers).length === 0) return FALLBACK_PROFILE;

  const curlPattern = asString(answers["curl-pattern"]);
  const wet = asString(answers["wet-feel"]);
  const concerns = asArray(answers["concerns"]);
  const goals = asArray(answers["main-goal"]);
  const scalp = asArray(answers["scalp-feel"]);
  const styles = asArray(answers["styles"]);
  const heat = asString(answers["heat"]);
  const tension = asString(answers["tension"]);
  const washFrequency = asString(answers["wash-frequency"]);
  const thickness = asString(answers["thickness"]);
  const hairLength = asString(answers["hair-length"]);
  const location = answers["location"] as
    | { city?: string; climate?: string | null }
    | undefined;

  const topConcernKey = concerns[0] ?? "unsure";
  const topConcern = CONCERN_MAP[topConcernKey] ?? CONCERN_MAP.unsure;

  const { score, note } = computeScore(answers);

  return {
    hasProfile: true,
    curlPattern,
    curlPatternLabel: curlPattern
      ? CURL_LABELS[curlPattern] ?? curlPattern
      : "Curl pattern TBD",
    porosityHint: wet ? POROSITY_FROM_WET[wet] ?? "" : "",
    thickness,
    hairLength,
    concerns,
    goals,
    scalp,
    styles,
    heat,
    tension,
    washFrequency,
    climate: location?.climate ?? null,
    city: location?.city ?? null,
    healthScore: score,
    scoreNote: note,
    topConcernKey,
    topConcern,
    routine: buildRoutine(answers),
    recommended:
      RECOMMENDED_BY_TOPIC[topConcern.topic] ??
      RECOMMENDED_BY_TOPIC.fundamentals,
    communityHighlights: [
      COMMUNITY_BY_TOPIC[topConcern.topic] ??
        COMMUNITY_BY_TOPIC.fundamentals,
    ],
    suggestedPrompts:
      SUGGESTED_PROMPTS_BY_TOPIC[topConcern.topic] ??
      SUGGESTED_PROMPTS_BY_TOPIC.fundamentals,
  };
}
