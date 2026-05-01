"use client";

import { motion } from "framer-motion";
import GrainOverlay from "./GrainOverlay";
import WaitlistForm from "./WaitlistForm";

const vp = { once: true, amount: 0 as const };

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream flex flex-col items-center justify-center overflow-hidden px-5 pt-28 sm:pt-16 pb-12">
      <GrainOverlay />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 55%, rgba(29,42,31,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-caramel/30 bg-caramel/8 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
          <span className="font-mono text-[11px] text-caramel tracking-[0.15em] uppercase">
            Launching 2026
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-display font-medium text-deep-forest leading-[1.12]"
          style={{ fontSize: "clamp(2rem, 6.5vw, 3.5rem)" }}
        >
          Personalized hair wellness,
          <br />
          built for{" "}
          <span className="text-caramel italic">Black hair.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 font-sans font-light text-deep-forest/60 text-[15px] leading-relaxed max-w-md mx-auto"
        >
          NURVICA gives Black men and women personalized, science-backed guidance built around their actual hair, not a generic version of it. No more guesswork. No more advice that wasn&apos;t meant for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-9 flex justify-center"
          id="waitlist"
        >
          <WaitlistForm />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.65, duration: 0.4 }}
          className="mt-3.5 font-mono text-[10px] text-deep-forest/30 tracking-widest"
        >
          Free at launch. No card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-deep-forest/20" />
          <span className="font-mono text-[10px] text-deep-forest/25 tracking-widest uppercase">
            scroll
          </span>
        </motion.div>
      </div>
    </section>
  );
}
