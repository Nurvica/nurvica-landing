"use client";

import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
  sectionLabel: string;
};

export default function ProgressBar({ current, total, sectionLabel }: Props) {
  const pct = Math.min(100, Math.round((current / total) * 100));

  return (
    <div
      className="w-full"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="font-mono text-[10px] sm:text-[11px] text-deep-forest/60 tracking-[0.18em] uppercase">
          {sectionLabel}
        </span>
        <span className="font-mono text-[10px] sm:text-[11px] text-deep-forest/40 tracking-widest">
          {current} / {total}
        </span>
      </div>
      <div className="h-[3px] w-full bg-deep-forest/10 rounded-full overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-caramel rounded-full"
        />
      </div>
    </div>
  );
}
