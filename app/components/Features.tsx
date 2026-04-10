"use client";

import FadeInSection from "./FadeInSection";

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    label: "NURVICA AI",
    badge: "Core",
    title: "Your personal hair advisor.",
    description:
      "AI-powered diagnostics built from the ground up for Type 3 and Type 4 hair biology. Personalized profiling, structured routines, and answers that account for your specific texture, porosity, and lifestyle.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    label: "Academy",
    badge: "In development",
    title: "Structured education, not content noise.",
    description:
      "A video and written library built around Black hair science. Content surfaces based on your profile and concerns — not a generic feed. Deep explanations of the why behind every recommendation.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Community",
    badge: "In development",
    title: "A space built around shared experience.",
    description:
      "Groups organized by hair type, lifestyle, and goals. A place where Black men and women share what works, hold each other accountable, and build better habits together.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    label: "Product line",
    badge: "Phase 3",
    title: "Formulated for your texture.",
    description:
      "A proprietary product line in development — Recovery Serum, Scalp Tonic, Daily Moisture Cream — formulated specifically for Type 3 and Type 4 hair. Trust built at the education level, converted into products that deliver.",
  },
];

export default function Features() {
  return (
    <section id="platform" className="bg-white py-20 sm:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <FadeInSection className="mb-14 max-w-lg">
          <p className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-4">
            The platform
          </p>
          <h2
            className="font-display font-medium text-black leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}
          >
            Everything your hair needs. One place.
          </h2>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <FadeInSection key={f.label} delay={i * 0.08}>
              <div className="rounded-card border border-border/60 p-7 flex flex-col gap-5 h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-full bg-off-white flex items-center justify-center text-caramel shrink-0">
                    {f.icon}
                  </div>
                  <span className="font-mono text-[10px] text-muted tracking-widest uppercase border border-border/80 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {f.badge}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[11px] text-muted tracking-widest uppercase">
                    {f.label}
                  </span>
                  <h3 className="font-display font-medium text-black text-lg leading-snug mt-1.5">
                    {f.title}
                  </h3>
                </div>
                <p className="font-sans font-light text-muted text-sm leading-relaxed">
                  {f.description}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
