"use client";

import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import AcademyHeader from "@/components/academy/AcademyHeader";
import TopicChips from "@/components/academy/TopicChips";
import FeaturedSeries from "@/components/academy/FeaturedSeries";
import SeriesSection from "@/components/academy/SeriesSection";
import { ACADEMY_ITEMS, SERIES } from "@/lib/mock-data/academy";
import type {
  AcademyItem,
  AcademyTopic,
  Series,
  TopicFilter,
} from "@/lib/types/academy";

const VALID_TOPICS: AcademyTopic[] = [
  "fundamentals",
  "moisture",
  "scalp",
  "edges",
  "growth",
  "breakage",
  "damage",
  "frizz",
  "retention",
  "styling",
];

export default function AcademyPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh]" />}>
      <AcademyPageInner />
    </Suspense>
  );
}

function AcademyPageInner() {
  const searchParams = useSearchParams();
  const initialTopic = readTopicParam(searchParams.get("topic"));
  const [topic, setTopic] = useState<TopicFilter>(initialTopic);

  // If the user changes the URL (?topic=...) without a full page nav, follow.
  useEffect(() => {
    const next = readTopicParam(searchParams.get("topic"));
    setTopic(next);
  }, [searchParams]);

  const filterFn = useCallback(
    (item: AcademyItem) => topic === "all" || item.topics.includes(topic),
    [topic]
  );

  const filteredItems = useMemo(
    () => ACADEMY_ITEMS.filter(filterFn),
    [filterFn]
  );

  const itemsBySeries = useMemo(() => {
    const map = new Map<string, AcademyItem[]>();
    for (const item of filteredItems) {
      if (!item.series) continue;
      const list = map.get(item.series) ?? [];
      list.push(item);
      map.set(item.series, list);
    }
    return map;
  }, [filteredItems]);

  const featured: Series | undefined = SERIES.find((s) => s.isFeatured);
  const featuredItems = featured ? itemsBySeries.get(featured.slug) ?? [] : [];

  // Other series in the order declared, skipping the featured one and any
  // series with zero items under the current filter.
  const otherSeries = SERIES.filter(
    (s) => !s.isFeatured && (itemsBySeries.get(s.slug)?.length ?? 0) > 0
  );

  const jumpToFeatured = () => {
    if (!featured) return;
    document
      .getElementById(`series-${featured.slug}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
      <AcademyHeader />
      <TopicChips selected={topic} onSelect={setTopic} />

      {featured && featuredItems.length > 0 && (
        <FeaturedSeries
          series={featured}
          items={featuredItems}
          onJumpToSeries={jumpToFeatured}
        />
      )}

      {featured && featuredItems.length > 0 && (
        <SeriesSection series={featured} items={featuredItems} />
      )}

      {otherSeries.map((series) => (
        <SeriesSection
          key={series.slug}
          series={series}
          items={itemsBySeries.get(series.slug) ?? []}
        />
      ))}

      {filteredItems.length === 0 && (
        <article className="mt-8 rounded-card border border-dashed border-deep-forest/15 bg-off-white/60 px-5 py-10 sm:px-7 sm:py-12 text-center">
          <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
            Nothing here yet
          </p>
          <h3
            className="mt-2 font-display font-medium text-deep-forest leading-tight"
            style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)" }}
          >
            We haven&apos;t published in this topic yet.
          </h3>
          <p className="mt-2 font-sans font-light text-deep-forest/60 text-[14px] leading-relaxed max-w-md mx-auto">
            Try a different topic, or follow our Substack — new pieces drop
            most weeks.
          </p>
          <button
            type="button"
            onClick={() => setTopic("all")}
            className="mt-5 inline-flex items-center justify-center px-5 py-2.5 rounded-card bg-deep-forest text-cream font-sans text-sm font-medium hover:bg-olive transition-colors"
          >
            Show everything
          </button>
        </article>
      )}

      <section className="mt-14 sm:mt-20 mb-4 text-center">
        <p className="font-display italic text-deep-forest/50 text-sm sm:text-[15px]">
          New pieces every week. Follow along.
        </p>
      </section>
    </div>
  );
}

function readTopicParam(raw: string | null): TopicFilter {
  if (!raw) return "all";
  if (raw === "all") return "all";
  return (VALID_TOPICS as string[]).includes(raw) ? (raw as AcademyTopic) : "all";
}
