"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { relativeTime } from "@/lib/chat/store";
import { COMMUNITY_BY_SLUG } from "@/lib/mock-data/communities";
import type {
  Community,
  CommunityPost,
  ExpertRole,
} from "@/lib/types/community";

type Props = {
  post: CommunityPost;
  isHelpful: boolean;
  isSaved: boolean;
  onToggleHelpful: (id: string) => void;
  onToggleSaved: (id: string) => void;
  onSelectCommunity: (slug: Community) => void;
  pinned?: boolean;
};

const ROLE_LABEL: Record<NonNullable<ExpertRole>, string> = {
  trichologist: "Trichologist",
  "nurvica-team": "NURVICA Team",
  "licensed-barber": "Licensed Barber",
};

export default function PostCard({
  post,
  isHelpful,
  isSaved,
  onToggleHelpful,
  onToggleSaved,
  onSelectCommunity,
  pinned = false,
}: Props) {
  const ts = Date.parse(post.createdAt);
  const helpfulDisplay = post.helpfulCount + (isHelpful ? 1 : 0);

  const askPrompt = `Re: a community post — "${post.body.slice(0, 140)}${
    post.body.length > 140 ? "…" : ""
  }". Can you weigh in for my hair?`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={[
        "rounded-card px-5 py-5 sm:px-6 sm:py-6",
        pinned
          ? "bg-off-white border border-caramel/40 shadow-[0_2px_18px_-12px_rgba(199,167,122,0.5)]"
          : "bg-off-white border border-deep-forest/8",
      ].join(" ")}
    >
      {pinned && (
        <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-caramel mb-3">
          Pinned
        </p>
      )}

      {/* Author */}
      <div className="flex items-center gap-3">
        <span
          className="w-10 h-10 rounded-full bg-deep-forest text-cream flex items-center justify-center font-display text-sm flex-shrink-0"
          aria-hidden="true"
        >
          {post.authorAvatar}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-sans font-medium text-deep-forest text-[14.5px]">
              {post.authorName}
            </span>
            <span className="font-mono text-[11px] text-deep-forest/40">·</span>
            <span className="font-mono text-[11px] text-deep-forest/45">
              {relativeTime(ts)}
            </span>
          </div>
          {post.authorRole && (
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-caramel/15 text-caramel font-mono text-[9.5px] tracking-[0.15em] uppercase">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path
                  d="M2 6.5L4.5 9L10 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {ROLE_LABEL[post.authorRole]}
            </span>
          )}
        </div>
      </div>

      {/* Community tags */}
      {post.communities.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4">
          {post.communities.map((slug) => {
            const meta = COMMUNITY_BY_SLUG[slug];
            return (
              <button
                key={slug}
                type="button"
                onClick={() => onSelectCommunity(slug)}
                className="px-2 py-0.5 rounded-full bg-cream/70 border border-deep-forest/8 hover:border-deep-forest/20 hover:bg-cream font-mono text-[9.5px] tracking-[0.15em] uppercase text-deep-forest/65 transition-colors"
              >
                {meta?.name ?? slug}
              </button>
            );
          })}
        </div>
      )}

      {/* Body */}
      <p className="mt-4 font-sans text-[15px] text-deep-forest leading-relaxed whitespace-pre-wrap">
        {post.body}
      </p>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={[
            "mt-4 grid gap-2",
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
              ? "grid-cols-2"
              : "grid-cols-3",
          ].join(" ")}
        >
          {post.images.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${post.authorName} attachment ${i + 1}`}
              className="w-full h-full max-h-72 object-cover rounded-card bg-cream"
              loading="lazy"
            />
          ))}
        </div>
      )}

      {/* Footer actions */}
      <div className="mt-5 pt-4 border-t border-deep-forest/8 flex items-center gap-1 sm:gap-2 flex-wrap">
        <ActionButton
          active={isHelpful}
          onClick={() => onToggleHelpful(post.id)}
          ariaLabel={isHelpful ? "Remove helpful" : "Mark as helpful"}
          ariaPressed={isHelpful}
          icon={
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M4 8L8 3L12 8M8 3V14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {helpfulDisplay}
        </ActionButton>

        <ActionButton
          ariaLabel={`${post.commentCount} comments`}
          icon={
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 4H13C13.5 4 14 4.5 14 5V11C14 11.5 13.5 12 13 12H7L4 14V12H3C2.5 12 2 11.5 2 11V5C2 4.5 2.5 4 3 4Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {post.commentCount}
        </ActionButton>

        <ActionButton
          active={isSaved}
          onClick={() => onToggleSaved(post.id)}
          ariaLabel={isSaved ? "Remove from saved" : "Save post"}
          ariaPressed={isSaved}
          icon={
            <svg
              width="13"
              height="13"
              viewBox="0 0 12 12"
              fill={isSaved ? "currentColor" : "none"}
              aria-hidden="true"
            >
              <path
                d="M3 2H9V10L6 8L3 10V2Z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          {isSaved ? "Saved" : "Save"}
        </ActionButton>

        <Link
          href={`/chat?q=${encodeURIComponent(askPrompt)}`}
          className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-sans text-[12.5px] text-caramel hover:text-caramel/80 transition-colors"
        >
          Ask NURVICA AI
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

function ActionButton({
  children,
  icon,
  onClick,
  ariaLabel,
  ariaPressed,
  active = false,
}: {
  children?: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  ariaPressed?: boolean;
  active?: boolean;
}) {
  const interactive = !!onClick;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      disabled={!interactive}
      className={[
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-mono text-[10.5px] tracking-[0.1em] uppercase transition-colors",
        active
          ? "bg-caramel/15 text-caramel"
          : "text-deep-forest/55",
        interactive
          ? "hover:text-deep-forest hover:bg-deep-forest/5 disabled:opacity-100"
          : "cursor-default",
      ].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}
