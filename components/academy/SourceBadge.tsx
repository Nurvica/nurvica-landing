import type { Source } from "@/lib/types/academy";

const LABEL: Record<Source, string> = {
  substack: "Substack",
  instagram: "Instagram",
  tiktok: "TikTok",
};

/**
 * Small source pill rendered on each content card. Color-coded but kept inside
 * the cream/forest/caramel palette so it never breaks the visual system.
 */
export default function SourceBadge({
  source,
  className = "",
}: {
  source: Source;
  className?: string;
}) {
  const styles: Record<Source, string> = {
    substack: "bg-cream/95 text-deep-forest",
    instagram: "bg-caramel text-deep-forest",
    tiktok: "bg-deep-forest text-cream",
  };
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[9.5px] tracking-[0.15em] uppercase",
        styles[source],
        className,
      ].join(" ")}
    >
      {LABEL[source]}
    </span>
  );
}
