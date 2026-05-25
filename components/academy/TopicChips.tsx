"use client";

import type { AcademyTopic, TopicFilter } from "@/lib/types/academy";

type Props = {
  selected: TopicFilter;
  onSelect: (topic: TopicFilter) => void;
};

type Chip = { value: TopicFilter; label: string };

const TOPICS: { value: AcademyTopic; label: string }[] = [
  { value: "fundamentals", label: "Fundamentals" },
  { value: "moisture", label: "Moisture" },
  { value: "scalp", label: "Scalp" },
  { value: "edges", label: "Edges" },
  { value: "growth", label: "Growth" },
  { value: "breakage", label: "Breakage" },
  { value: "damage", label: "Damage" },
  { value: "frizz", label: "Frizz" },
  { value: "retention", label: "Retention" },
  { value: "styling", label: "Styling" },
];

const CHIPS: Chip[] = [{ value: "all", label: "All" }, ...TOPICS];

export default function TopicChips({ selected, onSelect }: Props) {
  return (
    <div
      className="overflow-x-auto -mx-5 sm:-mx-8 px-5 sm:px-8 mb-7 sm:mb-9 scrollbar-none"
      role="tablist"
      aria-label="Filter content by topic"
    >
      <div className="flex items-center gap-2 min-w-max">
        {CHIPS.map((chip) => {
          const active = chip.value === selected;
          return (
            <button
              key={chip.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(chip.value)}
              className={[
                "px-3.5 py-2 rounded-full font-sans text-sm whitespace-nowrap transition-colors",
                active
                  ? "bg-deep-forest text-cream"
                  : "bg-off-white border border-deep-forest/8 text-deep-forest/70 hover:text-deep-forest hover:border-deep-forest/20",
              ].join(" ")}
            >
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
