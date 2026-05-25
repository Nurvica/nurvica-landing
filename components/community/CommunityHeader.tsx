"use client";

import { motion } from "framer-motion";

export default function CommunityHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
        Community
      </p>
      <h1
        className="mt-2 font-display font-medium text-deep-forest leading-[1.1]"
        style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
      >
        Find your people.
      </h1>
      <p className="mt-3 font-sans font-light text-deep-forest/65 text-[15px] leading-relaxed max-w-xl">
        Conversations, questions, and shared wins from people with hair like
        yours — moderated and grounded.
      </p>
    </motion.section>
  );
}
