export type OptionItem = {
  value: string;
  label: string;
  description?: string;
};

export type SectionId =
  | "about"
  | "hair"
  | "scalp"
  | "goals"
  | "style"
  | "life"
  | "extras";

export const SECTIONS: { id: SectionId; label: string }[] = [
  { id: "about", label: "About you" },
  { id: "hair", label: "Your hair" },
  { id: "scalp", label: "Your scalp" },
  { id: "goals", label: "Why you're here" },
  { id: "style", label: "How you style" },
  { id: "life", label: "Your life" },
  { id: "extras", label: "Anything else" },
];

type BaseStep = {
  id: string;
  section: SectionId;
  question: string;
  help?: string;
};

export type Step =
  | (BaseStep & {
      type: "single";
      options: OptionItem[];
      autoAdvance?: boolean;
    })
  | (BaseStep & {
      type: "multi";
      options: OptionItem[];
      max?: number;
      exclusive?: string[];
      minOne?: boolean;
    })
  | (BaseStep & { type: "age-gate" })
  | (BaseStep & {
      type: "curl-pattern";
      options: OptionItem[];
      fallbacks: OptionItem[];
    })
  | (BaseStep & { type: "hair-length"; options: OptionItem[] })
  | (BaseStep & {
      type: "location";
      climateOptions: OptionItem[];
    })
  | (BaseStep & {
      type: "text";
      placeholder?: string;
      optional?: boolean;
    });

export const STEPS: Step[] = [
  // Section 1 — About you
  {
    id: "gender",
    section: "about",
    type: "single",
    question: "How do you identify?",
    help: "We use this to tailor language and recommendations — never to assume.",
    options: [
      { value: "man", label: "Man" },
      { value: "woman", label: "Woman" },
      { value: "non-binary", label: "Non-binary" },
      { value: "prefer-not", label: "Prefer not to say" },
    ],
  },
  {
    id: "age-gate",
    section: "about",
    type: "age-gate",
    question: "Are you 18 or older?",
    help: "NURVICA is for adults. We'll ask once and never store your age.",
  },

  // Section 2 — Your hair
  {
    id: "curl-pattern",
    section: "hair",
    type: "curl-pattern",
    question: "What's your curl pattern?",
    help: "Don't overthink it — pick what's closest. We'll refine it together.",
    options: [
      { value: "3a", label: "3A", description: "Loose, springy curls" },
      { value: "3b", label: "3B", description: "Tighter ringlets" },
      { value: "3c", label: "3C", description: "Corkscrews, dense" },
      { value: "4a", label: "4A", description: "S-pattern coils" },
      { value: "4b", label: "4B", description: "Z-pattern, less defined" },
      { value: "4c", label: "4C", description: "Tight coils, high shrinkage" },
    ],
    fallbacks: [
      { value: "multiple", label: "I have multiple patterns" },
      { value: "unsure", label: "I'm not sure" },
    ],
  },
  {
    id: "hair-length",
    section: "hair",
    type: "hair-length",
    question: "How long is your hair right now?",
    help: "Stretched, not shrunk.",
    options: [
      { value: "twa", label: "TWA / very short" },
      { value: "ear", label: "Ear length" },
      { value: "shoulder", label: "Shoulder" },
      { value: "mid-back", label: "Mid-back" },
      { value: "waist", label: "Waist or longer" },
    ],
  },
  {
    id: "thickness",
    section: "hair",
    type: "single",
    question: "How thick is your hair?",
    help: "Think about how much hair you have overall, not strand width.",
    options: [
      { value: "thin", label: "Thin" },
      { value: "medium", label: "Medium" },
      { value: "thick", label: "Thick" },
    ],
  },
  {
    id: "wet-feel",
    section: "hair",
    type: "single",
    question: "How does your hair feel when wet?",
    help: "This tells us a lot about porosity and elasticity in one step.",
    options: [
      { value: "soft-stretchy", label: "Soft and stretchy" },
      { value: "fragile", label: "Fragile, breaks easily" },
      { value: "rough", label: "Rough even when soaked" },
      { value: "unsure", label: "Not sure" },
    ],
  },
  {
    id: "current-state",
    section: "hair",
    type: "multi",
    question: "What's the current state of your hair?",
    help: "Pick all that apply.",
    options: [
      { value: "natural", label: "Natural" },
      { value: "relaxed", label: "Relaxed" },
      { value: "color", label: "Color-treated" },
      { value: "bleached", label: "Bleached" },
      { value: "locked", label: "Locked" },
      { value: "transitioning", label: "Transitioning" },
    ],
    minOne: true,
  },

  // Section 3 — Your scalp
  {
    id: "scalp-feel",
    section: "scalp",
    type: "multi",
    question: "How does your scalp usually feel?",
    help: "Pick up to 3.",
    max: 3,
    options: [
      { value: "normal", label: "Normal" },
      { value: "dry", label: "Dry" },
      { value: "oily", label: "Oily" },
      { value: "itchy", label: "Itchy" },
      { value: "flaky", label: "Flaky" },
      { value: "tender", label: "Tender" },
    ],
    minOne: true,
  },
  {
    id: "wash-frequency",
    section: "scalp",
    type: "single",
    question: "How often do you wash your hair?",
    options: [
      { value: "1-3-days", label: "Every 1–3 days" },
      { value: "weekly", label: "Weekly" },
      { value: "2-weeks", label: "Every 2 weeks" },
      { value: "monthly", label: "Monthly" },
      { value: "varies", label: "It varies" },
    ],
  },

  // Section 4 — Why you're here
  {
    id: "concerns",
    section: "goals",
    type: "multi",
    question: "What's your biggest hair concern right now?",
    help: "Pick up to 3.",
    max: 3,
    options: [
      { value: "dryness", label: "Dryness" },
      { value: "breakage", label: "Breakage" },
      { value: "growth", label: "Growth" },
      { value: "thinning", label: "Thinning" },
      { value: "scalp-irritation", label: "Scalp irritation" },
      { value: "edges", label: "Edge recession" },
      { value: "damage", label: "Heat or chemical damage" },
      { value: "frizz", label: "Frizz" },
      { value: "retention", label: "Length retention" },
      { value: "unsure", label: "Not sure yet" },
    ],
    exclusive: ["unsure"],
    minOne: true,
  },
  {
    id: "main-goal",
    section: "goals",
    type: "multi",
    question: "What are your main goals?",
    help: "Pick up to 3.",
    max: 3,
    options: [
      { value: "scalp", label: "Healthier scalp" },
      { value: "length", label: "Longer hair" },
      { value: "moisture", label: "Moisture and softness" },
      { value: "style", label: "A specific style" },
      { value: "understand", label: "Understanding my hair better" },
      { value: "reverse", label: "Reversing damage" },
    ],
    minOne: true,
  },

  // Section 5 — How you style
  {
    id: "styles",
    section: "style",
    type: "multi",
    question: "What styles do you wear most often?",
    help: "Pick all that apply.",
    options: [
      { value: "natural", label: "Natural / loose" },
      { value: "braids", label: "Braids or twists" },
      { value: "locs", label: "Locs" },
      { value: "wash-go", label: "Wash-and-go" },
      { value: "press", label: "Silk press or blowouts" },
      { value: "extensions", label: "Protective styles with extensions" },
      { value: "wigs", label: "Wigs" },
      { value: "fade", label: "Short cut or fade" },
      { value: "waves", label: "Waves" },
      { value: "cornrows", label: "Cornrows" },
    ],
    minOne: true,
  },
  {
    id: "heat",
    section: "style",
    type: "single",
    question: "How often do you use heat?",
    options: [
      { value: "never", label: "Never" },
      { value: "rarely", label: "Rarely" },
      { value: "weekly", label: "Weekly" },
      { value: "daily", label: "Daily" },
    ],
  },
  {
    id: "tension",
    section: "style",
    type: "single",
    question: "How often do you wear styles with tension?",
    help: "Tight braids, ponytails, weaves — anything that pulls.",
    options: [
      { value: "never", label: "Never" },
      { value: "sometimes", label: "Sometimes" },
      { value: "most", label: "Most of the time" },
    ],
  },

  // Section 6 — Your life
  {
    id: "activity",
    section: "life",
    type: "single",
    question: "How active are you?",
    options: [
      { value: "sedentary", label: "Sedentary" },
      { value: "moderate", label: "Moderately active" },
      { value: "very", label: "Very active" },
      { value: "athlete", label: "Athlete" },
    ],
  },
  {
    id: "lifestyle",
    section: "life",
    type: "multi",
    question: "Do any of these apply?",
    options: [
      { value: "swim", label: "I swim regularly" },
      { value: "helmet", label: "I wear a helmet or hard hat often" },
      { value: "covering", label: "I wear a head covering daily" },
      { value: "cotton", label: "I sleep on cotton" },
      { value: "none", label: "None of these" },
    ],
    exclusive: ["none"],
  },
  {
    id: "location",
    section: "life",
    type: "location",
    question: "Where do you live?",
    help: "Climate shapes how your hair behaves day to day.",
    climateOptions: [
      { value: "cold", label: "Cold winters" },
      { value: "humid", label: "Humid" },
      { value: "dry", label: "Dry" },
      { value: "tropical", label: "Tropical" },
      { value: "mixed", label: "Mixed / four seasons" },
    ],
  },

  // Section 7 — Optional
  {
    id: "anything-else",
    section: "extras",
    type: "text",
    question: "Anything else you want NURVICA to know?",
    help: "Skip if you'd rather get started.",
    placeholder: "Allergies, favourite products, things that haven't worked…",
    optional: true,
  },
];
