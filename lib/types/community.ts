export type Community =
  | "locs"
  | "braids-and-twists"
  | "waves"
  | "wash-and-go"
  | "4c-hair"
  | "scalp-health"
  | "protective-styles"
  | "transitioning";

export type ExpertRole =
  | "trichologist"
  | "nurvica-team"
  | "licensed-barber"
  | null;

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  /** Short initials rendered in a circle (e.g. "TA"). */
  authorAvatar: string;
  authorRole: ExpertRole;
  /** ISO timestamp. */
  createdAt: string;
  body: string;
  images?: string[];
  /** 1–3 communities the post belongs to. */
  communities: Community[];
  helpfulCount: number;
  commentCount: number;
  isPinned?: boolean;
}

export interface CommunityMeta {
  slug: Community;
  name: string;
  description: string;
  /** Mock member count for display. */
  memberCount: number;
}

/** Used by the chips row — "for-you" is the default feed view (everything). */
export type CommunityFilter = Community | "for-you";
