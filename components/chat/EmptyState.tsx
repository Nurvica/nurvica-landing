"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/lib/dashboard/profile";

type Props = {
  profile: Profile;
  onPick: (prompt: string) => void;
};

const GENERIC_PROMPTS = [
  "Build me a starter routine.",
  "What does my hair need most right now?",
  "How do I actually test my porosity?",
];

export default function EmptyState({ profile, onPick }: Props) {
  const prompts = Array.from(
    new Set([...profile.suggestedPrompts, ...GENERIC_PROMPTS])
  ).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center max-w-xl mx-auto pt-12 sm:pt-20 pb-6"
    >
      <span className="w-12 h-12 rounded-full bg-deep-forest text-cream flex items-center justify-center font-display text-lg mb-5">
        N
      </span>
      <div className="inline-flex items-center gap-2 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-caramel">
          NURVICA AI · Beta
        </span>
      </div>
      <h1
        className="font-display font-medium text-deep-forest leading-[1.1]"
        style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)" }}
      >
        What do you want to know about your hair?
      </h1>
      <p className="mt-3 font-sans font-light text-deep-forest/60 text-[15px] leading-relaxed max-w-md">
        {profile.hasProfile
          ? `Your profile is loaded — ${profile.curlPatternLabel}. Every answer is filtered through it.`
          : "Take the hair profile so my answers are built for your hair specifically."}
      </p>

      <div className="mt-9 sm:mt-11 w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="text-left px-4 py-3.5 rounded-card bg-off-white border border-deep-forest/8 hover:border-deep-forest/25 hover:bg-white transition-all"
          >
            <span className="font-sans text-[14px] text-deep-forest/85 leading-snug">
              {prompt}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
