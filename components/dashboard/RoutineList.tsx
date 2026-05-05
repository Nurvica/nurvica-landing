"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { RoutineStep } from "@/lib/dashboard/profile";

const STORAGE_PREFIX = "nurvica:routine:";

function todayKey() {
  const d = new Date();
  return `${STORAGE_PREFIX}${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function RoutineList({ steps }: { steps: RoutineStep[] }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(todayKey());
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(todayKey(), JSON.stringify(done));
  }, [done, hydrated]);

  const toggle = (id: string) =>
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));

  const completed = Object.values(done).filter(Boolean).length;
  const total = steps.length;
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex items-center justify-between gap-3 mb-1">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
          Today&apos;s Routine
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-deep-forest/45">
          {completed} / {total}
        </span>
      </div>

      <h2
        className="font-display font-medium text-deep-forest leading-tight mt-1"
        style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
      >
        {completed === total && total > 0
          ? "Done for today. Beautiful."
          : "Small steps, big returns."}
      </h2>

      <div className="mt-4 h-[3px] w-full bg-deep-forest/10 rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-caramel rounded-full"
        />
      </div>

      <ul className="mt-5 space-y-2">
        {steps.map((step) => {
          const checked = !!done[step.id];
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggle(step.id)}
                aria-pressed={checked}
                className={[
                  "w-full text-left flex items-start gap-3 px-3 sm:px-4 py-3 rounded-card border transition-all",
                  checked
                    ? "border-caramel/60 bg-caramel/5"
                    : "border-deep-forest/8 bg-cream/40 hover:border-deep-forest/20",
                ].join(" ")}
              >
                <span
                  className={[
                    "mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0",
                    checked
                      ? "bg-caramel border border-caramel"
                      : "border border-deep-forest/25",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  {checked && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.5L4.5 9L10 3"
                        stroke="#1D2A1F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span className="flex-1 min-w-0">
                  <span
                    className={[
                      "block font-sans text-[15px] leading-snug transition-colors",
                      checked
                        ? "text-deep-forest/55 line-through decoration-1"
                        : "text-deep-forest",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                  <span className="block mt-1 font-sans text-xs text-deep-forest/55 leading-relaxed">
                    {step.why}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
