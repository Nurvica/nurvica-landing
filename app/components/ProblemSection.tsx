"use client";

import FadeInSection from "./FadeInSection";

const problems = [
  {
    number: "01",
    title: "Content is not guidance.",
    description:
      "Millions of Black men and women turn to TikTok, YouTube, and Reddit for hair advice. These platforms offer content at scale but zero personalization. What works for one curl pattern and porosity will fail another.",
  },
  {
    number: "02",
    title: "Generic advice causes real damage.",
    description:
      "A routine built for 4A low-porosity hair will not work for 4C high-porosity hair with scalp inflammation. Most advice treats Black hair as a monolith. The result is wasted money, poor outcomes, and frustration.",
  },
  {
    number: "03",
    title: "People are giving up.",
    description:
      "Inconsistent results and a lack of structured guidance are driving people away from natural hair entirely. The problem was never the hair but the absence of anything built specifically for it.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-off-white py-20 sm:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 max-w-lg">
          <p className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-4">
            The problem
          </p>
          <h2
            className="font-display font-medium text-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            The internet is full of hair advice.
            <br />
            Almost none of it is built for you.
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <FadeInSection key={p.number} delay={i * 0.1}>
              <div className="bg-white rounded-card border border-border/60 p-7 h-full flex flex-col gap-4">
                <span className="font-mono text-[11px] text-caramel tracking-widest">
                  {p.number}
                </span>
                <h3 className="font-display font-medium text-black text-lg leading-snug">
                  {p.title}
                </h3>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
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
