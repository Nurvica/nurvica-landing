"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HealthScore from "@/components/dashboard/HealthScore";
import RoutineList from "@/components/dashboard/RoutineList";
import { buildProfile, type Profile } from "@/lib/dashboard/profile";

const STORAGE_KEYS = [
  "nurvica:onboarding:final",
  "nurvica:onboarding:v2",
];

function loadAnswers(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  for (const key of STORAGE_KEYS) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const answers = parsed?.answers ?? parsed;
      if (answers && typeof answers === "object") return answers;
    } catch {
      // ignore
    }
  }
  return null;
}

export default function DashboardPage() {
  const [hydrated, setHydrated] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    setAnswers(loadAnswers());
    setHydrated(true);
  }, []);

  const profile = useMemo<Profile>(() => buildProfile(answers), [answers]);
  const greeting = greetingFor(new Date());

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
      {/* Greeting */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 sm:mb-9"
      >
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
          {greeting}
        </p>
        <h1
          className="mt-2 font-display font-medium text-deep-forest leading-[1.1]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
        >
          Welcome back to your hair.
        </h1>
        <p className="mt-3 font-sans font-light text-deep-forest/65 text-[15px] leading-relaxed max-w-xl">
          {profile.hasProfile
            ? `Your routine is shaped around ${profile.curlPatternLabel}${profile.climate ? ` · ${climateLabel(profile.climate)}` : ""}.`
            : "Take a few minutes to set up your hair profile so we can personalize everything that follows."}
        </p>
        {!profile.hasProfile && (
          <Link
            href="/onboarding"
            className="inline-block mt-5 px-5 py-3 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-[14px] font-medium"
          >
            Take the hair profile
          </Link>
        )}
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Hair Health Score — spans 2 cols on lg */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="lg:col-span-2"
        >
          <HealthScore score={profile.healthScore} note={profile.scoreNote} />
        </motion.div>

        {/* Top concern card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <TopConcernCard profile={profile} />
        </motion.div>

        {/* Routine */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="lg:col-span-2"
        >
          <RoutineList steps={profile.routine} />
        </motion.div>

        {/* Quick Ask */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
        >
          <QuickAskCard prompts={profile.suggestedPrompts} />
        </motion.div>

        {/* Recommended */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="lg:col-span-2"
        >
          <RecommendedCard profile={profile} />
        </motion.div>

        {/* Community */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
        >
          <CommunityCard profile={profile} />
        </motion.div>
      </div>

      {profile.hasProfile && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 sm:mt-14 mb-2 text-center"
        >
          <p className="font-display italic text-deep-forest/50 text-sm sm:text-[15px]">
            Rooted in the chair. Grown for the home.
          </p>
        </motion.section>
      )}
    </div>
  );
}

function TopConcernCard({ profile }: { profile: Profile }) {
  return (
    <article className="rounded-card border border-deep-forest/8 bg-deep-forest text-cream px-5 py-6 sm:px-6 sm:py-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/60">
          Top Concern
        </span>
        <span className="w-6 h-6 rounded-full bg-caramel/20 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel" />
        </span>
      </div>
      <h2
        className="font-display font-medium leading-tight mt-1"
        style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
      >
        {profile.topConcern.title}
      </h2>
      <p className="mt-3 font-sans font-light text-cream/75 text-[14px] sm:text-[15px] leading-relaxed flex-1">
        {profile.topConcern.tip}
      </p>
      <Link
        href={`/academy?topic=${profile.topConcern.topic}`}
        className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm text-caramel hover:text-caramel/80 transition-colors"
      >
        Learn more
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}

function QuickAskCard({ prompts }: { prompts: string[] }) {
  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
          Quick Ask
        </span>
        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-caramel">
          AI guidance
        </span>
      </div>
      <h2
        className="font-display font-medium text-deep-forest leading-tight"
        style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
      >
        Ask NURVICA anything.
      </h2>
      <p className="mt-2 font-sans font-light text-deep-forest/60 text-[14px] leading-relaxed">
        Filtered through your profile — every answer is for you.
      </p>

      <div className="mt-4 space-y-2">
        {prompts.map((prompt) => (
          <Link
            key={prompt}
            href={`/chat?q=${encodeURIComponent(prompt)}`}
            className="block px-3.5 py-2.5 rounded-card bg-cream/60 border border-deep-forest/8 hover:border-deep-forest/20 hover:bg-cream transition-all font-sans text-[13.5px] text-deep-forest/85"
          >
            {prompt}
          </Link>
        ))}
      </div>

      <Link
        href="/chat"
        className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-sm font-medium"
      >
        Start a conversation
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}

function RecommendedCard({ profile }: { profile: Profile }) {
  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
          Recommended for you
        </span>
        <Link
          href="/academy"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/50 hover:text-deep-forest transition-colors"
        >
          See all →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profile.recommended.map((item) => (
          <Link
            key={item.id}
            href={`/academy/${item.id}`}
            className="group block rounded-card border border-deep-forest/8 bg-cream/40 hover:bg-cream hover:border-deep-forest/20 transition-all p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={[
                  "px-2 py-0.5 rounded-full font-mono text-[9px] tracking-[0.18em] uppercase",
                  item.kind === "video"
                    ? "bg-caramel/15 text-caramel"
                    : "bg-deep-forest/8 text-deep-forest/70",
                ].join(" ")}
              >
                {item.kind === "video" ? "Video" : "Article"}
              </span>
            </div>
            <h3 className="font-display font-medium text-deep-forest text-[16px] sm:text-[17px] leading-snug group-hover:text-olive transition-colors">
              {item.title}
            </h3>
            <p className="mt-2 font-sans text-xs text-deep-forest/55">
              {item.meta}
            </p>
          </Link>
        ))}
      </div>
    </article>
  );
}

function CommunityCard({ profile }: { profile: Profile }) {
  const post = profile.communityHighlights[0];
  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
          Community
        </span>
        <Link
          href="/community"
          className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/50 hover:text-deep-forest transition-colors"
        >
          Explore →
        </Link>
      </div>

      {post && (
        <div className="flex-1 flex flex-col">
          <span className="inline-block self-start px-2.5 py-1 rounded-full bg-caramel/12 text-caramel font-mono text-[9px] tracking-[0.18em] uppercase">
            {post.group}
          </span>
          <p className="mt-3 font-sans text-[14.5px] text-deep-forest/85 leading-relaxed flex-1">
            &ldquo;{post.excerpt}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-between text-xs">
            <span className="font-sans text-deep-forest/55">{post.author}</span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/45">
              {post.replies} replies
            </span>
          </div>
        </div>
      )}
    </article>
  );
}

function greetingFor(date: Date): string {
  const h = date.getHours();
  if (h < 5) return "Late night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

function climateLabel(climate: string) {
  const map: Record<string, string> = {
    cold: "cold winters",
    humid: "humid climate",
    dry: "dry climate",
    tropical: "tropical climate",
    mixed: "four seasons",
  };
  return map[climate] ?? climate;
}
