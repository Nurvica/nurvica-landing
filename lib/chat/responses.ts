import type { Profile } from "@/lib/dashboard/profile";

export type ResponseLink = {
  label: string;
  href: string;
};

export type AIResponse = {
  intro: string;
  diagnosis?: string;
  steps: string[];
  followUp?: string;
  links?: ResponseLink[];
};

type Intent =
  | "dryness"
  | "edges"
  | "growth"
  | "breakage"
  | "frizz"
  | "scalp"
  | "damage"
  | "retention"
  | "thinning"
  | "routine"
  | "product"
  | "porosity"
  | "style"
  | "fundamentals";

const INTENT_KEYWORDS: Record<Intent, string[]> = {
  dryness: ["dry", "dryness", "moisture", "thirsty", "parched", "hydrate"],
  edges: ["edges", "edge", "hairline", "baby hair", "baby hairs", "temples"],
  growth: ["grow", "growth", "longer", "length goal"],
  breakage: ["break", "breaking", "broken", "snap", "shed", "shedding", "fragile"],
  frizz: ["frizz", "puff", "fuzzy", "humid"],
  scalp: ["scalp", "itch", "itchy", "flake", "flaky", "dandruff", "tender", "sore"],
  damage: ["damage", "damaged", "bleach", "color", "dye", "heat damage"],
  retention: ["retention", "retain", "keep length", "losing length"],
  thinning: ["thin", "thinning", "density", "sparse", "bald"],
  routine: ["routine", "regimen", "plan", "schedule", "day-to-day", "build me"],
  product: ["product", "recommend product", "what should i use", "buy", "shampoo", "conditioner"],
  porosity: ["porosity", "porous"],
  style: ["wave", "waves", "loc", "locs", "braid", "twist", "wash and go", "wash-and-go", "press", "wig"],
  fundamentals: [],
};

function detectIntent(question: string): Intent {
  const q = question.toLowerCase();
  for (const intent of Object.keys(INTENT_KEYWORDS) as Intent[]) {
    if (INTENT_KEYWORDS[intent].some((kw) => q.includes(kw))) return intent;
  }
  return "fundamentals";
}

function profileSnippet(profile: Profile): string {
  const bits: string[] = [];
  if (profile.curlPattern && !["unsure", "multiple"].includes(profile.curlPattern)) {
    bits.push(profile.curlPatternLabel + " hair");
  }
  if (profile.tension === "most") bits.push("frequent tension styles");
  if (profile.heat === "weekly" || profile.heat === "daily") bits.push("regular heat");
  if (profile.washFrequency === "monthly" || profile.washFrequency === "varies") {
    bits.push("infrequent washing");
  }
  if (profile.climate) bits.push(climateText(profile.climate));
  return bits.slice(0, 3).join(", ");
}

function climateText(climate: string) {
  const map: Record<string, string> = {
    cold: "a cold climate",
    humid: "a humid climate",
    dry: "a dry climate",
    tropical: "a tropical climate",
    mixed: "a four-season climate",
  };
  return map[climate] ?? climate;
}

const TEMPLATES: Record<Intent, (p: Profile, q: string) => AIResponse> = {
  dryness: (p) => {
    const snippet = profileSnippet(p);
    return {
      intro: snippet
        ? `Based on your profile — ${snippet} — dryness here is almost always a sealing problem, not a hydration one.`
        : "Dryness in textured hair is almost always a sealing problem, not a hydration one.",
      diagnosis:
        "Water gets in, then leaves. The fix is layering on soaking-wet hair so the cuticle has something to hold.",
      steps: [
        "Apply leave-in to **dripping wet** hair, not damp. Damp is too late.",
        "Layer a cream within 60 seconds. Then a sealant (oil or butter) on top.",
        "Once a week, deep condition with heat for 20 minutes — steamer, plastic cap, or warm towel.",
        "Sleep on satin or silk. Cotton drinks the moisture you just put in.",
      ],
      followUp:
        "Give this a full week before judging it. Dryness usually responds within 3 wash cycles.",
      links: [
        { label: "Read: The LCO method, broken down", href: "/academy/lco-method" },
        { label: "Watch: Why glycerin works (and when it doesn't)", href: "/academy/humectants" },
      ],
    };
  },

  edges: (p) => {
    const tension =
      p.tension === "most"
        ? "frequent tension styling"
        : p.tension === "sometimes"
        ? "occasional tension styling"
        : "your styling habits";
    return {
      intro: `Edge breakage is almost always traction stress — combined with moisture loss at the hairline.`,
      diagnosis: `Looking at your profile, ${tension} plus low manipulation tolerance at the temples is the usual culprit.`,
      steps: [
        "**No tension at the hairline for 6 weeks.** No braids, no weaves, no tight ponytails.",
        "Massage your edges with light oil 2 minutes daily — circulation, not weight.",
        "Tie down with a satin scarf or bonnet at night, but not tight enough to leave a mark.",
        "Skip edge gels with high alcohol. Look for water-based stylers if you must lay them.",
      ],
      followUp: "Edges are slow. Photograph weekly — the mirror lies, the camera doesn't.",
      links: [
        { label: "Read: A 6-week edge recovery plan", href: "/academy/edges-recovery" },
        { label: "Join: Edges & Hairline group", href: "/community/edges" },
      ],
    };
  },

  growth: (p) => {
    return {
      intro:
        "Growth happens at the scalp. What you see in the mirror is a retention story.",
      diagnosis: `For ${p.curlPatternLabel || "your hair"}, the win is keeping the inches you're already growing — not chasing magic oils.`,
      steps: [
        "Massage your scalp 4 minutes daily. Stimulates the follicle. Compounding.",
        "Wash weekly, gently. Buildup suffocates growth.",
        "Detangle on conditioner-saturated hair, fingers first, wide-tooth comb second.",
        "Trim only when you see split ends — not on a calendar.",
      ],
      followUp:
        "Average growth is half an inch a month. The retention difference is what you'll feel in 6 months.",
      links: [
        { label: "Watch: The 4-minute scalp massage", href: "/academy/scalp-massage" },
        { label: "Read: What actually grows hair (and what doesn't)", href: "/academy/growth-truth" },
      ],
    };
  },

  breakage: (p) => {
    const wet = p.porosityHint;
    return {
      intro:
        "Breakage usually means one thing: your hair has more of one (protein or moisture) and not enough of the other.",
      diagnosis: wet
        ? `From what you told us about how it feels wet — ${wet.toLowerCase()} — the imbalance points us in a direction.`
        : "We need to figure out which side you're on.",
      steps: [
        "If your hair feels mushy and soft when wet, you need **protein**. Try a light protein treatment this week.",
        "If your hair feels rough and stiff when wet, you need **moisture**. Deep condition with heat.",
        "Cut manipulation in half. No combing dry. Detangle only when wet and slick.",
        "Sleep on satin every single night for the next month.",
      ],
      followUp:
        "Most people misdiagnose this. Try one side for two weeks. If it gets worse, it's the other.",
      links: [
        { label: "Read: Protein vs moisture — finding your balance", href: "/academy/protein-balance" },
      ],
    };
  },

  frizz: (p) => {
    const climate = p.climate
      ? p.climate === "humid" || p.climate === "tropical"
        ? "Humidity is working against you — you need film-forming products that lock the cuticle down."
        : p.climate === "dry" || p.climate === "cold"
        ? "Dry air pulls moisture out fast. You need heavier sealants than you'd think."
        : ""
      : "";
    return {
      intro:
        "Frizz isn't your hair misbehaving — it's your cuticle reaching for moisture it can't find.",
      diagnosis: climate || "Your cuticle is open. We need to close it.",
      steps: [
        "Apply product on **soaking wet** hair, not damp. This is the single biggest fix.",
        "Use a denman or your fingers to define curl clumps. Don't break the clumps once formed.",
        "Diffuse on low heat or air-dry without touching. Touching = frizz.",
        "Pineapple at night. Satin pillowcase or bonnet, not loose hair on cotton.",
      ],
      links: [
        { label: "Watch: Diffusing without disturbing your curls", href: "/academy/diffuser" },
      ],
    };
  },

  scalp: (p) => {
    const flagged = p.scalp.filter((s) =>
      ["itchy", "flaky", "tender"].includes(s)
    );
    return {
      intro:
        flagged.length > 0
          ? `You flagged ${flagged.join(", ")} during onboarding — a few common culprits to rule out.`
          : "Scalp irritation is usually a product or a process, not the scalp itself.",
      diagnosis:
        "Switch what you can switch first. If it persists past two weeks, see a dermatologist.",
      steps: [
        "Drop fragrances and sulfates for 14 days. Look for shampoos with **piroctone olamine** or **zinc pyrithione** if flaky.",
        "Cool rinses only. Hot water dries the scalp out and triggers the itch cycle.",
        "Don't over-wash. Once a week is plenty unless you're working out daily.",
        "Massage gently with the pads of your fingers — never your nails.",
      ],
      followUp:
        "If you see scaling, redness, or pain that doesn't ease in 2 weeks, that's a medical question, not a routine one.",
      links: [
        { label: "Read: Your scalp is an ecosystem", href: "/academy/scalp-microbiome" },
      ],
    };
  },

  damage: () => ({
    intro:
      "Damaged hair won't heal — but new hair growing in can be protected from the same fate.",
    diagnosis:
      "The strategy is two-part: stabilize what's there, and grow strong from the root.",
    steps: [
      "Bond-repair treatment monthly. Look for **maleic acid** or **bis-aminopropyl diglycol dimaleate**.",
      "Trim what's not coming back. Holding onto split ends just spreads them up the strand.",
      "Stop the damage source. If it's heat, no more for 90 days. If it's color, no overlap on retouches.",
      "Rebuild with weekly deep conditioning. Heat for 20 minutes — that's where the absorption happens.",
    ],
    followUp:
      "Recovery happens at the new-growth stage. You'll see it 3 months in, feel it 6 months in.",
    links: [
      { label: "Read: Bond repair: what works, what's marketing", href: "/academy/bond-repair" },
    ],
  }),

  retention: () => ({
    intro:
      "Length retention is the difference between hair that grows and hair that shows growth.",
    diagnosis:
      "Most length is lost during detangling, dry manipulation, and friction at night.",
    steps: [
      "Detangle on **conditioner-saturated, soaking wet** hair only. Fingers first, then wide-tooth comb.",
      "Stop touching your hair. Hands out — every touch is a chance to break a strand.",
      "Sleep on satin. Loose hair on cotton is the silent length killer.",
      "Trim conservatively — only what's split. Calendar trims cost you inches.",
    ],
    links: [
      { label: "Watch: The gentle detangle that saves length", href: "/academy/detangle" },
    ],
  }),

  thinning: () => ({
    intro:
      "Thinning has many causes — tension, hormones, deficiency, stress. Let's start with the one you can see.",
    diagnosis:
      "If thinning is at the temples, crown, or part line, traction is usually involved. If it's diffuse, it's worth a doctor's visit.",
    steps: [
      "Drop tight styles for 30 days. No braids, no weaves, no tight ponytails.",
      "Massage your scalp 4 minutes daily — circulation matters more than oils.",
      "Track your shedding. 50–100 strands a day is normal. Significantly more is a flag.",
      "If it's been over 3 months and getting worse, get bloodwork — iron, ferritin, vitamin D, thyroid.",
    ],
    followUp:
      "This is a place where AI guidance reaches its limit. If something feels wrong, see a derm.",
    links: [
      { label: "Read: Tension, traction, and what your edges are telling you", href: "/academy/tension-traction" },
    ],
  }),

  routine: (p) => {
    const wash =
      p.washFrequency === "1-3-days"
        ? "every 2–3 days"
        : p.washFrequency === "weekly"
        ? "once a week"
        : p.washFrequency === "2-weeks"
        ? "every 2 weeks"
        : "weekly";
    return {
      intro: `Here's a starter rhythm built for ${p.curlPatternLabel || "your hair"}.`,
      diagnosis: `We'll center it on a ${wash} wash and a few daily anchors.`,
      steps: [
        "**Daily** — 4-minute scalp massage, satin at night, hands out of your hair.",
        `**Wash day (${wash})** — gentle cleanse, 20-minute deep condition with heat, leave-in + cream + sealant on dripping hair.`,
        "**Mid-week** — refresh with a water-based leave-in. No heavy product on dry hair.",
        "**Monthly** — bond-repair treatment, trim if needed, audit what's working.",
      ],
      followUp: "I can adjust this if you tell me what's not working — just ask.",
    };
  },

  product: (p) => ({
    intro:
      "I can match products to your porosity, climate, and concern — once we have all three locked in.",
    diagnosis: p.porosityHint
      ? `From your wet-feel answer, you're leaning toward: ${p.porosityHint.toLowerCase()}.`
      : "Your porosity is the missing piece — it changes everything.",
    steps: [
      "**Low porosity** wants light, water-first products. Heavy butters sit on top and feel greasy.",
      "**High porosity** drinks moisture and loses it. Heavier creams, butters, and sealants do the work.",
      "**Balanced porosity** is forgiving — most well-formulated products work.",
      "Want specific brand recommendations? Tell me your budget and I'll narrow it down.",
    ],
    links: [
      { label: "Watch: How to actually test your porosity", href: "/academy/porosity-test" },
    ],
  }),

  porosity: (p) => ({
    intro:
      "Porosity is how easily your cuticle lets water in — and how stubbornly it holds it.",
    diagnosis: p.porosityHint
      ? `From what you told us, you're sitting at: ${p.porosityHint.toLowerCase()}.`
      : "We need a quick test to confirm.",
    steps: [
      "Take a clean, dry strand. Drop it into a glass of room-temperature water.",
      "**Floats for 4+ minutes:** low porosity. Cuticle is tight; products sit on top.",
      "**Sinks slowly:** balanced. The sweet spot.",
      "**Sinks immediately:** high porosity. Cuticle is open; moisture comes and goes fast.",
    ],
    followUp:
      "Once you know, products and process change. Tell me what you find and I'll adjust your routine.",
  }),

  style: (p, q) => {
    const ql = q.toLowerCase();
    if (ql.includes("wave") || ql.includes("waves")) {
      return {
        intro: "Waves are about cuticle compression and consistency.",
        diagnosis:
          "If you have a tighter curl pattern, you're training the curl flat — that takes more time and a different process.",
        steps: [
          "Brush forward consistently — same direction, same pressure, twice a day.",
          "Moisture matters more than pomade. Hydrated hair lays down. Dry hair sticks up.",
          "Durag at night, every night. No exceptions in the first 90 days.",
          "Wash schedule depends on your scalp — typically every 4–7 days.",
        ],
      };
    }
    if (ql.includes("loc")) {
      return {
        intro: "Locs are a long-term commitment — every stage looks different.",
        diagnosis: "What stage are you in? Starter, budding, or mature?",
        steps: [
          "**Starter (0–6 months):** minimal manipulation. No retwisting more than every 4 weeks.",
          "**Budding (6–18 months):** they'll get fuzzy. That's normal. Resist over-tightening.",
          "**Mature (18+ months):** routine simplifies. Wash, retwist on a longer cycle, moisturize.",
          "Sleep on satin always. Avoid heavy waxes — they trap lint and never wash out.",
        ],
      };
    }
    return {
      intro: "Style choice is a balance: protection vs. tension vs. how often you can keep it up.",
      diagnosis: `For ${p.curlPatternLabel || "your hair"}, low-tension protective styles tend to win for retention.`,
      steps: [
        "Pick styles that don't pull at the hairline. Tightness ≠ longevity.",
        "Don't keep a style longer than 6–8 weeks. Buildup and tension compound.",
        "Always moisturize underneath — protective styles still need water.",
      ],
    };
  },

  fundamentals: (p) => ({
    intro: p.hasProfile
      ? `I read your profile — ${p.curlPatternLabel || "your hair pattern"}${p.climate ? `, ${climateText(p.climate)}` : ""}. Ask me anything specific and I'll tailor it.`
      : "Take the hair profile first so I can give you answers built for your hair, not generic ones.",
    diagnosis:
      "If you're not sure where to start, here's the universal short list.",
    steps: [
      "Wash gently, weekly.",
      "Deep condition with heat, weekly.",
      "Layer leave-in + cream + sealant on **soaking wet** hair.",
      "Sleep on satin every night.",
    ],
    followUp:
      "Tell me what you're trying to fix — dryness, breakage, growth, edges — and I'll build from there.",
  }),
};

export function generateResponse(
  question: string,
  profile: Profile
): AIResponse {
  const intent = detectIntent(question);
  return TEMPLATES[intent](profile, question);
}
