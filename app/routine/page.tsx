"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import RoutineList from "@/components/dashboard/RoutineList";
import { buildProfile, type Profile } from "@/lib/dashboard/profile";
import { buildSchedule, buildICS, type RoutineBlock } from "@/lib/routine/schedule";
import { loadSavedPlans, type SavedPlan } from "@/lib/routine/saved";

const STORAGE_KEYS = ["nurvica:onboarding:final", "nurvica:onboarding:v2"];

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

export default function RoutinePage() {
  const [hydrated, setHydrated] = useState(false);
  const [answers, setAnswers] = useState<Record<string, unknown> | null>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);

  useEffect(() => {
    setAnswers(loadAnswers());
    setSavedPlans(loadSavedPlans());
    setHydrated(true);
  }, []);

  const profile = useMemo<Profile>(() => buildProfile(answers), [answers]);
  const schedule = useMemo(() => buildSchedule(profile), [profile]);

  if (!hydrated) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-7 sm:mb-9"
      >
        <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
          Your Routine
        </p>
        <h1
          className="mt-2 font-display font-medium text-deep-forest leading-[1.1]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
        >
          Your daily ritual.
        </h1>
        <p className="mt-3 font-sans font-light text-deep-forest/65 text-[15px] leading-relaxed max-w-xl">
          {profile.hasProfile
            ? `Shaped around ${profile.curlPatternLabel}. Check off today, then carry the rhythm into your week.`
            : "Set up your hair profile and we'll build a rhythm that actually fits your hair."}
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
        {/* Today's checklist */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="lg:col-span-2"
        >
          <RoutineList steps={profile.routine} />
        </motion.div>

        {/* Add to device */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          <AddToDeviceCard schedule={schedule} />
        </motion.div>
      </div>

      {/* Weekly rhythm */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="mt-8 sm:mt-10"
      >
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
              The full rhythm
            </p>
            <h2
              className="mt-1 font-display font-medium text-deep-forest leading-tight"
              style={{ fontSize: "clamp(1.35rem, 3.5vw, 1.75rem)" }}
            >
              Your week, mapped out.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {schedule.map((block, i) => (
            <RhythmCard key={block.id} block={block} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Saved from chat */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-10 sm:mt-12"
      >
        <div className="flex items-end justify-between gap-3 mb-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
              From your chats
            </p>
            <h2
              className="mt-1 font-display font-medium text-deep-forest leading-tight"
              style={{ fontSize: "clamp(1.35rem, 3.5vw, 1.75rem)" }}
            >
              Plans you saved with NURVICA AI.
            </h2>
          </div>
          <Link
            href="/chat"
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/50 hover:text-deep-forest transition-colors whitespace-nowrap"
          >
            Open chat →
          </Link>
        </div>

        {savedPlans.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {savedPlans.map((plan) => (
              <SavedPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          <EmptySaved />
        )}
      </motion.section>

      {profile.hasProfile && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-12 sm:mt-16 mb-2 text-center"
        >
          <p className="font-display italic text-deep-forest/50 text-sm sm:text-[15px]">
            Consistency is the only ingredient that compounds.
          </p>
        </motion.section>
      )}
    </div>
  );
}

function AddToDeviceCard({ schedule }: { schedule: RoutineBlock[] }) {
  const [added, setAdded] = useState(false);

  const download = () => {
    const ics = buildICS(schedule);
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nurvica-routine.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2600);
  };

  return (
    <article className="rounded-card border border-deep-forest/8 bg-deep-forest text-cream px-5 py-6 sm:px-6 sm:py-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream/60">
          Add to device
        </span>
        <span className="w-6 h-6 rounded-full bg-caramel/20 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="4" y="5" width="16" height="16" rx="3" stroke="#C7A77A" strokeWidth="1.6" />
            <path d="M4 9H20M8 3V6M16 3V6" stroke="#C7A77A" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <h2
        className="font-display font-medium leading-tight mt-1"
        style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
      >
        Never miss a step.
      </h2>
      <p className="mt-3 font-sans font-light text-cream/75 text-[14px] sm:text-[15px] leading-relaxed flex-1">
        Drop your whole rhythm into your calendar with reminders — daily anchors,
        wash days, and your monthly reset.
      </p>

      <button
        type="button"
        onClick={download}
        className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-card bg-caramel hover:bg-caramel/90 transition-colors text-deep-forest font-sans text-sm font-medium"
      >
        {added ? (
          <>
            <svg width="15" height="15" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Calendar file ready
          </>
        ) : (
          <>
            Add to calendar
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2V10M8 10L4 6M8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </>
        )}
      </button>
      <p className="mt-4 sm:mt-5 text-center font-mono text-[9.5px] tracking-[0.15em] uppercase text-cream/40">
        Apple · Google · Outlook
      </p>
    </article>
  );
}

function RhythmCard({ block, index }: { block: RoutineBlock; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 * index }}
      className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-7"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-medium text-deep-forest text-[18px] sm:text-[19px]">
          {block.title}
        </h3>
        <span className="px-2.5 py-1 rounded-full bg-caramel/12 text-caramel font-mono text-[9px] tracking-[0.15em] uppercase whitespace-nowrap">
          {block.cadence}
        </span>
      </div>
      <ul className="space-y-2.5">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-caramel" />
            <span className="font-sans text-[14.5px] text-deep-forest/85 leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function SavedPlanCard({ plan }: { plan: SavedPlan }) {
  const { response } = plan;
  return (
    <article className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-7 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-caramel">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <path d="M3 2H9V10L6 8L3 10V2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          Saved
        </span>
        <Link
          href={`/chat?c=${plan.conversationId}`}
          className="font-sans text-xs text-deep-forest/50 hover:text-deep-forest transition-colors truncate max-w-[55%]"
          title={plan.conversationTitle}
        >
          {plan.conversationTitle}
        </Link>
      </div>

      <p className="font-sans text-[14.5px] text-deep-forest leading-relaxed">
        {response.intro}
      </p>

      {response.steps.length > 0 && (
        <ul className="mt-3.5 space-y-2">
          {response.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-caramel" />
              <span className="font-sans text-[14px] text-deep-forest/80 leading-relaxed">
                <PlainBold text={step} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EmptySaved() {
  return (
    <article className="rounded-card border border-dashed border-deep-forest/15 bg-off-white/60 px-5 py-8 sm:px-7 sm:py-10 text-center">
      <h3 className="font-display font-medium text-deep-forest text-[18px] sm:text-[20px]">
        No saved plans yet.
      </h3>
      <p className="mt-2 font-sans font-light text-deep-forest/60 text-[14.5px] leading-relaxed max-w-md mx-auto">
        Ask NURVICA AI to build you a routine, then tap{" "}
        <span className="text-caramel font-medium">Save</span> on its answer — it
        lands right here.
      </p>
      <Link
        href={`/chat?q=${encodeURIComponent("Build me a daily and weekly routine for my hair.")}`}
        className="mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-sm font-medium"
      >
        Ask for a routine
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </article>
  );
}

function PlainBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-medium text-deep-forest">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
