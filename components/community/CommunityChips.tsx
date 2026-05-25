"use client";

import { COMMUNITIES } from "@/lib/mock-data/communities";
import type { CommunityFilter } from "@/lib/types/community";

type Props = {
  selected: CommunityFilter;
  onSelect: (filter: CommunityFilter) => void;
};

type Chip = { value: CommunityFilter; label: string };

const CHIPS: Chip[] = [
  { value: "for-you", label: "For You" },
  ...COMMUNITIES.map<Chip>((c) => ({ value: c.slug, label: c.name })),
];

export default function CommunityChips({ selected, onSelect }: Props) {
  return (
    <div
      className="overflow-x-auto -mx-5 sm:-mx-8 px-5 sm:px-8 mb-6 sm:mb-8 scrollbar-none"
      role="tablist"
      aria-label="Filter feed by community"
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
