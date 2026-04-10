"use client";

import FadeInSection from "./FadeInSection";
import GrainOverlay from "./GrainOverlay";
import WaitlistForm from "./WaitlistForm";

export default function CTASection() {
  return (
    <section className="relative bg-cream py-24 sm:py-28 px-5 overflow-hidden">
      <GrainOverlay />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(29,42,31,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-xl mx-auto text-center">
        <FadeInSection>
          <p className="font-mono text-[11px] text-caramel tracking-[0.2em] uppercase mb-5">
            Coming 2026
          </p>
          <h2
            className="font-display font-medium text-deep-forest leading-tight"
            style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}
          >
            Your hair deserves guidance
            <br />
            that actually{" "}
            <span className="text-caramel italic">knows</span> it.
          </h2>
          <p className="mt-5 font-sans font-light text-deep-forest/55 text-[15px] leading-relaxed max-w-md mx-auto">
            Be first in line when NURVICA launches. Join the waitlist
            for early access and updates from the build.
          </p>

          <div className="mt-9 flex justify-center">
            <WaitlistForm />
          </div>

          <p className="mt-4 font-mono text-[10px] text-deep-forest/30 tracking-widest">
            Free at launch. No spam. Unsubscribe anytime.
          </p>
        </FadeInSection>
      </div>
    </section>
  );
}
