export type Source = "substack" | "instagram" | "tiktok";

/** post = Instagram still/carousel; video = Reel/TikTok; article = Substack. */
export type ContentKind = "article" | "video" | "post";

export type AcademyTopic =
  | "fundamentals"
  | "moisture"
  | "scalp"
  | "edges"
  | "growth"
  | "breakage"
  | "damage"
  | "frizz"
  | "retention"
  | "styling";

export type SeriesSlug =
  | "know-your-crown"
  | "wash-day-diaries"
  | "edge-recovery"
  | "strength-and-repair"
  | "growth-and-retention";

export interface Series {
  slug: SeriesSlug;
  name: string;
  description: string;
  /** Hero/cover image URL. */
  cover: string;
  /** When true, surfaced in the page's featured slot. Only one should be true. */
  isFeatured?: boolean;
}

export interface AcademyItem {
  /** Slug; deliberately matches the existing /academy/<id> deep links sprinkled
   *  through the dashboard and chat so they resolve to the source. */
  id: string;
  title: string;
  description: string;
  source: Source;
  sourceUrl: string;
  kind: ContentKind;
  thumbnail: string;
  /** Display string for length, e.g. "5 min read" / "1:24" / "Carousel · 8". */
  duration?: string;
  publishedAt: string;
  series?: SeriesSlug;
  topics: AcademyTopic[];
}

export type TopicFilter = AcademyTopic | "all";
