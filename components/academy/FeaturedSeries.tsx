"use client";

import { motion } from "framer-motion";
import type { AcademyItem, Series } from "@/lib/types/academy";

type Props = {
  series: Series;
  items: AcademyItem[];
  onJumpToSeries: () => void;
};

/**
 * Editorial hero card for the featured series. Mirrors the dashboard's
 * dark-card treatment (deep-forest + cream) so it reads as a primary CTA.
 */
export default function FeaturedSeries({ series, items, onJumpToSeries }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="rounded-card overflow-hidden border border-deep-forest/10 bg-deep-forest text-cream mb-8 sm:mb-10"
    >
      <div className="grid md:grid-cols-5">
        {/* Cover */}
        <div className="md:col-span-2 relative aspect-[16/10] md:aspect-auto bg-olive">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={series.cover}
            alt=""
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="md:col-span-3 px-6 py-7 sm:px-8 sm:py-9 flex flex-col">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-caramel">
            Featured series
          </p>
          <h2
            className="mt-2 font-display font-medium leading-[1.1]"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)" }}
          >
            {series.name}
          </h2>
          <p className="mt-3 font-sans font-light text-cream/75 text-[15px] leading-relaxed max-w-md">
            {series.description}
          </p>
          <div className="mt-5 flex items-center gap-4 flex-wrap">
            <button
              type="button"
              onClick={onJumpToSeries}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-card bg-caramel hover:bg-caramel/90 transition-colors text-deep-forest font-sans text-sm font-medium"
            >
              Explore the series
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-cream/55">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
