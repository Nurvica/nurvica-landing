"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import ContentCard from "./ContentCard";
import type { AcademyItem, Series } from "@/lib/types/academy";

type Props = {
  series: Series;
  items: AcademyItem[];
};

const SeriesSection = forwardRef<HTMLElement, Props>(function SeriesSection(
  { series, items },
  ref
) {
  if (items.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mt-10 sm:mt-12 scroll-mt-24"
      aria-labelledby={`series-${series.slug}`}
    >
      <div className="flex items-end justify-between gap-3 mb-4 sm:mb-5">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
            Series
          </p>
          <h2
            id={`series-${series.slug}`}
            className="mt-1 font-display font-medium text-deep-forest leading-tight"
            style={{ fontSize: "clamp(1.35rem, 3.2vw, 1.75rem)" }}
          >
            {series.name}
          </h2>
          <p className="mt-2 font-sans font-light text-deep-forest/60 text-[14px] leading-relaxed max-w-xl">
            {series.description}
          </p>
        </div>
        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/45 whitespace-nowrap pb-1">
          {items.length} {items.length === 1 ? "piece" : "pieces"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {items.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </motion.section>
  );
});

export default SeriesSection;
