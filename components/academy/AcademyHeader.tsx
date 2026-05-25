"use client";

import { motion } from "framer-motion";

export default function AcademyHeader() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 sm:mb-8"
    >
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
        Academy
      </p>
      <h1
        className="mt-2 font-display font-medium text-deep-forest leading-[1.1]"
        style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
      >
        Read, watch, learn.
      </h1>
      <p className="mt-3 font-sans font-light text-deep-forest/65 text-[15px] leading-relaxed max-w-xl">
        Series from our Substack, Instagram, and TikTok — pulled together so
        you can study your hair without falling down a feed.
      </p>
    </motion.section>
  );
}
