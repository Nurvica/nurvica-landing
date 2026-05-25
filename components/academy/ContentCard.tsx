"use client";

import { motion } from "framer-motion";
import { relativeTime } from "@/lib/chat/store";
import SourceBadge from "./SourceBadge";
import type { AcademyItem } from "@/lib/types/academy";

type Props = {
  item: AcademyItem;
  /** Card sizing: "default" for grid items, "hero" for the featured slot. */
  variant?: "default" | "hero";
};

export default function ContentCard({ item, variant = "default" }: Props) {
  const hero = variant === "hero";
  const ts = Date.parse(item.publishedAt);

  return (
    <motion.a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={[
        "group block rounded-card overflow-hidden border border-deep-forest/8 bg-off-white hover:border-deep-forest/20 transition-colors",
        hero ? "sm:flex sm:items-stretch" : "",
      ].join(" ")}
      aria-label={`${item.title} — opens on ${item.source}`}
    >
      {/* Thumbnail */}
      <div
        className={[
          "relative overflow-hidden bg-cream",
          hero ? "sm:w-1/2 aspect-[16/10] sm:aspect-auto" : "aspect-[4/5]",
        ].join(" ")}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.thumbnail}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <SourceBadge
          source={item.source}
          className="absolute top-3 left-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.25)]"
        />
        {item.kind === "video" && (
          <span
            aria-hidden="true"
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-cream/95 text-deep-forest flex items-center justify-center"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 3L13 8L5 13V3Z" />
            </svg>
          </span>
        )}
      </div>

      {/* Body */}
      <div
        className={[
          "p-5",
          hero ? "sm:w-1/2 sm:p-7 sm:flex sm:flex-col sm:justify-center" : "",
        ].join(" ")}
      >
        <h3
          className={[
            "font-display font-medium text-deep-forest group-hover:text-olive transition-colors leading-tight",
            hero
              ? "text-[22px] sm:text-[26px] leading-[1.15]"
              : "text-[17px]",
          ].join(" ")}
        >
          {item.title}
        </h3>
        <p
          className={[
            "mt-2 font-sans font-light text-deep-forest/65 leading-relaxed",
            hero ? "text-[15px] sm:text-[15.5px]" : "text-[13.5px]",
          ].join(" ")}
        >
          {item.description}
        </p>
        <div className="mt-4 flex items-center gap-2 flex-wrap">
          {item.duration && (
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/55">
              {item.duration}
            </span>
          )}
          <span className="font-mono text-[10px] text-deep-forest/30">·</span>
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/45">
            {relativeTime(ts)}
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-sans text-[12.5px] text-caramel group-hover:text-caramel/80 transition-colors">
            {item.kind === "article" ? "Read" : item.kind === "video" ? "Watch" : "View"}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M5 3L11 8L5 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 3V8H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
            </svg>
          </span>
        </div>
      </div>
    </motion.a>
  );
}
