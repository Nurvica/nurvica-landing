import { redirect } from "next/navigation";
import { ITEM_BY_ID } from "@/lib/mock-data/academy";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Resolves existing /academy/<id> deep links (from dashboard and chat) to the
 * item's actual source on Substack, Instagram, or TikTok. Falls back to the
 * academy index when the slug isn't recognized so the link never dead-ends.
 */
export default async function AcademyItemRedirect({ params }: Props) {
  const { slug } = await params;
  const item = ITEM_BY_ID[slug];
  redirect(item?.sourceUrl ?? "/academy");
}
