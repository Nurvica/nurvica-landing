"use client";

import { motion } from "framer-motion";

type Props = {
  score: number;
  note: string;
};

const SIZE = 168;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function HealthScore({ score, note }: Props) {
  const pct = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE * (1 - pct / 100);

  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-7 sm:py-7">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
          Hair Health Score
        </span>
        <button
          type="button"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/50 hover:text-deep-forest transition-colors"
        >
          How?
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-5 sm:gap-7">
        <div className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="-rotate-90"
            aria-hidden="true"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#1D2A1F"
              strokeOpacity="0.08"
              strokeWidth={STROKE}
              fill="none"
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke="#C7A77A"
              strokeWidth={STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={CIRCUMFERENCE}
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="font-display font-medium text-deep-forest leading-none"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3rem)" }}
            >
              {score}
            </motion.span>
            <span className="mt-1 font-mono text-[10px] tracking-[0.18em] uppercase text-deep-forest/45">
              of 100
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
          <h2
            className="font-display font-medium text-deep-forest leading-tight"
            style={{ fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)" }}
          >
            {labelFor(score)}
          </h2>
          <p className="mt-2 font-sans font-light text-[14px] sm:text-[15px] text-deep-forest/65 leading-relaxed">
            {note}
          </p>
        </div>
      </div>
    </article>
  );
}

function labelFor(score: number) {
  if (score >= 80) return "Healthy and thriving.";
  if (score >= 65) return "On the right track.";
  if (score >= 50) return "Building back up.";
  return "Time for a reset.";
}
