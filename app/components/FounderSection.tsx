"use client";

import FadeInSection from "./FadeInSection";

const values = [
  { name: "Intentionality", desc: "Every recommendation is purposeful. We do not chase trends." },
  { name: "Education", desc: "Informed people make better decisions about their hair." },
  { name: "Authenticity", desc: "Built from inside the culture, from the barbershop chair outward." },
  { name: "Community", desc: "Hair care is not a solo journey. We build the space to share it." },
  { name: "Science-backed integrity", desc: "Grounded in hair biology. Never popularity over truth." },
  { name: "Inclusivity within Blackness", desc: "3A and 4C are not the same. We honor the full spectrum." },
];

export default function FounderSection() {
  return (
    <section id="our-story" className="bg-deep-forest py-20 sm:py-24 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto">
          <FadeInSection>
            <p className="font-mono text-[11px] text-caramel/50 tracking-[0.2em] uppercase mb-6">
              Our story
            </p>

            <blockquote
              className="font-display font-medium text-cream leading-snug"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              &ldquo;NURVICA was not built by outsiders studying a demographic. It was
              built from inside the culture —{" "}
              <span className="text-caramel italic">from the barbershop chair outward.</span>&rdquo;
            </blockquote>

            <p className="mt-8 font-sans font-light text-cream/60 text-[15px] leading-relaxed">
              NURVICA started from a professional barbering background and a
              simple observation: Black men and women were not frustrated with
              their hair. They were frustrated with the absence of real guidance.
              What began as a response to a gap observed daily across the
              barbershop chair has grown into a platform that serves the entire
              Black community — across every texture and every stage of the
              hair journey.
            </p>

            <p className="mt-5 font-sans font-light text-cream/60 text-[15px] leading-relaxed">
              We are an education-first platform with a community at its center
              and a product line on the horizon. A model that builds trust before
              revenue, and loyalty before scale.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="w-8 h-px bg-caramel/30" />
              <div>
                <p className="font-sans font-medium text-cream text-sm">NURVICA Founding Team</p>
                <p className="font-mono text-[11px] text-cream/35 mt-0.5">Ontario, Canada</p>
              </div>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.15} className="mt-16 pt-10 border-t border-cream/8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-7">
            {values.map((v) => (
              <div key={v.name}>
                <p className="font-sans font-medium text-caramel text-sm leading-snug">
                  {v.name}
                </p>
                <p className="font-sans font-light text-cream/40 text-xs leading-relaxed mt-1.5">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
