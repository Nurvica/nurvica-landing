import type { Profile } from "@/lib/dashboard/profile";
import type {
  Community,
  CommunityFilter,
  CommunityPost,
} from "@/lib/types/community";

/**
 * Light profile→community boosts used for ranking in the "For You" feed. We
 * never filter by these — we just nudge relevant posts higher. The mapping is
 * intentionally generous; the cost of a wrong nudge is low.
 */
function profileBoosts(profile: Profile): Partial<Record<Community, number>> {
  const boosts: Partial<Record<Community, number>> = {};

  if (profile.curlPattern === "4c") boosts["4c-hair"] = 30;
  if (profile.curlPattern === "4b") boosts["4c-hair"] = 15;

  if (profile.concerns.includes("scalp-irritation"))
    boosts["scalp-health"] = 25;
  if (profile.concerns.includes("edges")) boosts["protective-styles"] = 15;
  if (profile.concerns.includes("breakage")) boosts["protective-styles"] = 12;
  if (profile.concerns.includes("damage")) boosts["transitioning"] = 18;
  if (profile.concerns.includes("frizz")) boosts["wash-and-go"] = 15;

  for (const style of profile.styles) {
    if (style === "locs") boosts["locs"] = (boosts["locs"] ?? 0) + 25;
    if (style === "braids") boosts["braids-and-twists"] = 22;
    if (style === "wig" || style === "sew-in") boosts["protective-styles"] = 22;
    if (style === "wash-and-go") boosts["wash-and-go"] = 22;
    if (style === "waves") boosts["waves"] = 25;
  }

  return boosts;
}

function postScore(
  post: CommunityPost,
  boosts: Partial<Record<Community, number>>
): number {
  let score = post.helpfulCount;
  if (post.authorRole) score += 25; // gentle nudge for expert authors
  for (const c of post.communities) {
    score += boosts[c] ?? 0;
  }
  return score;
}

/**
 * Produces the ordered feed for the current filter:
 *
 * - Pinned posts always sit on top.
 * - "for-you" returns everything, ranked by helpfulCount + expert bonus +
 *   profile match.
 * - A specific community filter returns only posts tagged with that community
 *   (pinned welcome posts still hoist to the top so an empty community never
 *   looks broken — pair with EmptyCommunityState when filtered.length === 1).
 */
export function buildFeed(
  posts: CommunityPost[],
  profile: Profile,
  selected: CommunityFilter
): CommunityPost[] {
  const boosts = profileBoosts(profile);

  const pool =
    selected === "for-you"
      ? posts
      : posts.filter(
          (p) => p.isPinned || p.communities.includes(selected as Community)
        );

  const pinned = pool.filter((p) => p.isPinned);
  const rest = pool
    .filter((p) => !p.isPinned)
    .sort((a, b) => postScore(b, boosts) - postScore(a, boosts));

  return [...pinned, ...rest];
}
