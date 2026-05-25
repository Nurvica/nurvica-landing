"use client";

import type { CommunityMeta } from "@/lib/types/community";

type Props = {
  meta: CommunityMeta;
};

export default function EmptyCommunityState({ meta }: Props) {
  return (
    <article className="rounded-card border border-dashed border-deep-forest/15 bg-off-white/60 px-5 py-8 sm:px-7 sm:py-10 text-center">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
        Quiet in here
      </p>
      <h3
        className="mt-2 font-display font-medium text-deep-forest leading-tight"
        style={{ fontSize: "clamp(1.15rem, 2.5vw, 1.3rem)" }}
      >
        Be the first to ask a question about {meta.name}.
      </h3>
      <p className="mt-2 font-sans font-light text-deep-forest/60 text-[14px] leading-relaxed max-w-md mx-auto">
        Open the compose button below — a clear question always gets the
        community started.
      </p>
    </article>
  );
}
