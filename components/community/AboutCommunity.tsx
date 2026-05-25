"use client";

import type { CommunityMeta } from "@/lib/types/community";

type Props = {
  meta: CommunityMeta;
  isJoined: boolean;
  onToggleJoin: () => void;
};

export default function AboutCommunity({ meta, isJoined, onToggleJoin }: Props) {
  const members = meta.memberCount + (isJoined ? 1 : 0);
  return (
    <aside className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-6">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55 mb-2">
        About this community
      </p>
      <h2
        className="font-display font-medium text-deep-forest leading-tight"
        style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.35rem)" }}
      >
        {meta.name}
      </h2>
      <p className="mt-2 font-sans font-light text-deep-forest/65 text-[14px] leading-relaxed">
        {meta.description}
      </p>
      <p className="mt-4 font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/45">
        {members.toLocaleString()} members
      </p>
      <button
        type="button"
        onClick={onToggleJoin}
        aria-pressed={isJoined}
        className={[
          "mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-card font-sans text-sm font-medium transition-colors",
          isJoined
            ? "bg-caramel/15 text-caramel"
            : "bg-deep-forest text-cream hover:bg-olive",
        ].join(" ")}
      >
        {isJoined ? (
          <>
            Joined
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6.5L4.5 9L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </>
        ) : (
          "Join community"
        )}
      </button>
    </aside>
  );
}
