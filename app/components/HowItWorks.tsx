"use client";

import FadeInSection from "./FadeInSection";

const pillars = [
  {
    number: "01",
    title: "Personalized diagnostics",
    description:
      "A real hair profiling system, not a generic quiz. We look at curl pattern, porosity, density, scalp condition, and how you actually live, then give you a clear picture of what your hair needs and why.",
  },
  {
    number: "02",
    title: "Science-backed education",
    description:
      "Content tied directly to your profile. If you are dealing with breakage, you learn what is actually causing it, whether that is moisture imbalance, protein overload, or mechanical damage. The why, not just the what.",
  },
  {
    number: "03",
    title: "Matched routines and products",
    description:
      "Recommendations based on your actual hair biology. Not trending products, not sponsored posts but what your hair calls for. Over time, backed by a proprietary product line built for Type 3 and Type 4 textures.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-olive py-20 sm:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 max-w-lg">
          <p className="font-mono text-[11px] text-caramel/60 tracking-[0.2em] uppercase mb-4">
            What NURVICA delivers
          </p>
          <h2
            className="font-display font-medium text-cream leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            Guidance your hair has never had.
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <FadeInSection key={p.number} delay={i * 0.12}>
              <div className="flex flex-col gap-5">
                <div className="w-12 h-12 rounded-full border border-caramel/30 flex items-center justify-center bg-olive">
                  <span className="font-mono text-[11px] text-caramel tracking-widest">
                    {p.number}
                  </span>
                </div>
                <h3 className="font-display font-medium text-cream text-lg leading-snug">
                  {p.title}
                </h3>
                <p className="font-sans font-light text-cream/55 text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
