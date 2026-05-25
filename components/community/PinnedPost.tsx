"use client";

import PostCard from "./PostCard";
import type { Community, CommunityPost } from "@/lib/types/community";

type Props = {
  post: CommunityPost;
  isHelpful: boolean;
  isSaved: boolean;
  onToggleHelpful: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectCommunity: (slug: Community) => void;
};

/**
 * Thin variant of PostCard with the pinned eyebrow + caramel border treatment.
 * The visual difference lives in PostCard so the layout stays in sync.
 */
export default function PinnedPost(props: Props) {
  return <PostCard {...props} pinned />;
}
