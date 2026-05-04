"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import GrainOverlay from "@/app/components/GrainOverlay";
import ProgressBar from "@/components/onboarding/ProgressBar";
import OptionCard from "@/components/onboarding/OptionCard";
import HairLengthSelect from "@/components/onboarding/HairLengthSelect";
import CurlPatternSelect from "@/components/onboarding/CurlPatternSelect";
import { SECTIONS, STEPS, type Step } from "./questions";

type Answers = Record<string, unknown>;
type LocationAnswer = { city: string; climate: string | null };

const STORAGE_KEY = "nurvica:onboarding:v2";

export default function OnboardingPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [direction, setDirection] = useState<1 | -1>(1);
  const [hydrated, setHydrated] = useState(false);
  const [underAge, setUnderAge] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers) setAnswers(parsed.answers);
        if (typeof parsed?.stepIdx === "number") {
          setStepIdx(Math.min(parsed.stepIdx, STEPS.length - 1));
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ stepIdx, answers })
    );
  }, [stepIdx, answers, hydrated]);

  const step = STEPS[stepIdx];
  const sectionLabel = useMemo(
    () => SECTIONS.find((s) => s.id === step.section)?.label ?? "",
    [step.section]
  );

  const setAnswer = (id: string, value: unknown) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  const goNext = () => {
    setDirection(1);
    if (stepIdx >= STEPS.length - 1) {
      setCompleted(true);
      return;
    }
    setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStepIdx((i) => Math.max(i - 1, 0));
  };

  const canContinue = (() => {
    if (step.type === "age-gate") return answers[step.id] === true;
    if (step.type === "single") return Boolean(answers[step.id]);
    if (step.type === "hair-length") return Boolean(answers[step.id]);
    if (step.type === "curl-pattern") return Boolean(answers[step.id]);
    if (step.type === "multi") {
      const raw = answers[step.id];
      const v = Array.isArray(raw) ? (raw as string[]) : [];
      if (step.minOne) return v.length > 0;
      return true;
    }
    if (step.type === "location") {
      const v = answers[step.id] as LocationAnswer | undefined;
      return Boolean(v?.city?.trim() && v?.climate);
    }
    if (step.type === "text") return true; // optional
    return false;
  })();

  if (!hydrated) {
    return <main className="min-h-screen bg-cream" />;
  }

  if (underAge) return <UnderAgeView />;
  if (completed) return <CompleteView answers={answers} />;

  return (
    <main className="relative min-h-[100dvh] bg-cream flex flex-col overflow-hidden">
      <GrainOverlay />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(29,42,31,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Top bar */}
      <header className="relative z-10 px-5 sm:px-8 pt-6 sm:pt-8 pb-3">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <Link href="/" aria-label="NURVICA home">
              <Image
                src="/logo-wordmark.png"
                alt="NURVICA"
                width={120}
                height={24}
                priority
                className="h-auto w-[96px] sm:w-[112px]"
              />
            </Link>
            <button
              type="button"
              onClick={() => {
                if (confirm("Save and finish later? Your progress is kept on this device.")) {
                  window.location.href = "/";
                }
              }}
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-deep-forest/50 hover:text-deep-forest transition-colors"
            >
              Save & exit
            </button>
          </div>
          <ProgressBar
            current={stepIdx + 1}
            total={STEPS.length}
            sectionLabel={sectionLabel}
          />
        </div>
      </header>

      {/* Step body */}
      <div className="relative z-10 flex-1 flex flex-col px-5 sm:px-8 pb-32 sm:pb-28">
        <div className="w-full max-w-xl mx-auto flex-1 flex flex-col">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="pt-8 sm:pt-12"
            >
              <h1
                className="font-display font-medium text-deep-forest leading-[1.15]"
                style={{ fontSize: "clamp(1.625rem, 4.5vw, 2.25rem)" }}
              >
                {step.question}
              </h1>
              {step.help && (
                <p className="mt-3 font-sans font-light text-deep-forest/60 text-[14px] sm:text-[15px] leading-relaxed">
                  {step.help}
                </p>
              )}

              <div className="mt-7 sm:mt-8">
                <StepBody
                  step={step}
                  answer={answers[step.id]}
                  setAnswer={(v) => setAnswer(step.id, v)}
                  onUnderAge={() => setUnderAge(true)}
                  onAutoAdvance={() => {
                    setTimeout(goNext, 280);
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 bg-cream/85 backdrop-blur-md border-t border-deep-forest/8"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-xl mx-auto px-5 sm:px-8 py-3 sm:py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIdx === 0}
            className="px-4 py-3 sm:py-3.5 rounded-card font-sans text-sm text-deep-forest/70 hover:text-deep-forest disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            ← Back
          </button>
          <div className="flex-1" />
          {step.type === "text" && step.optional && !answers[step.id] && (
            <button
              type="button"
              onClick={goNext}
              className="px-5 py-3 sm:py-3.5 font-sans text-sm text-deep-forest/70 hover:text-deep-forest transition-colors"
            >
              Skip
            </button>
          )}
          <button
            type="button"
            onClick={goNext}
            disabled={!canContinue}
            className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-card bg-deep-forest hover:bg-olive disabled:bg-deep-forest/40 disabled:cursor-not-allowed transition-colors text-cream font-sans text-[15px] font-medium"
          >
            {stepIdx === STEPS.length - 1 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}

function StepBody({
  step,
  answer,
  setAnswer,
  onUnderAge,
  onAutoAdvance,
}: {
  step: Step;
  answer: unknown;
  setAnswer: (v: unknown) => void;
  onUnderAge: () => void;
  onAutoAdvance: () => void;
}) {
  if (step.type === "single") {
    return (
      <div className="space-y-2.5">
        {step.options.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            description={opt.description}
            selected={answer === opt.value}
            onClick={() => {
              setAnswer(opt.value);
              if (step.autoAdvance !== false) onAutoAdvance();
            }}
          />
        ))}
      </div>
    );
  }

  if (step.type === "age-gate") {
    return (
      <div className="space-y-2.5">
        <OptionCard
          label="Yes — I am 18 or older"
          selected={answer === true}
          onClick={() => {
            setAnswer(true);
            onAutoAdvance();
          }}
        />
        <OptionCard
          label="No — I am under 18"
          selected={answer === false}
          onClick={() => {
            setAnswer(false);
            setTimeout(onUnderAge, 200);
          }}
        />
      </div>
    );
  }

  if (step.type === "hair-length") {
    return (
      <HairLengthSelect
        options={step.options}
        value={(answer as string) ?? null}
        onChange={(v) => setAnswer(v)}
      />
    );
  }

  if (step.type === "curl-pattern") {
    return (
      <CurlPatternSelect
        options={step.options}
        fallbacks={step.fallbacks}
        value={(answer as string) ?? null}
        onChange={(v) => setAnswer(v)}
      />
    );
  }

  if (step.type === "multi") {
    const selected = Array.isArray(answer) ? (answer as string[]) : [];
    const max = step.max;
    const exclusive = step.exclusive ?? [];

    const toggle = (value: string) => {
      let next: string[];
      if (selected.includes(value)) {
        next = selected.filter((v) => v !== value);
      } else if (exclusive.includes(value)) {
        next = [value];
      } else {
        const filtered = selected.filter((v) => !exclusive.includes(v));
        next = [...filtered, value];
        if (max && next.length > max) next = next.slice(-max);
      }
      setAnswer(next);
    };

    return (
      <div>
        {max && (
          <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-deep-forest/45 mb-3">
            {selected.length} / {max} selected
          </p>
        )}
        <div className="space-y-2.5">
          {step.options.map((opt) => {
            const isSelected = selected.includes(opt.value);
            const atCap = !!max && selected.length >= max && !isSelected;
            return (
              <OptionCard
                key={opt.value}
                label={opt.label}
                description={opt.description}
                selected={isSelected}
                multi
                disabled={atCap}
                onClick={() => toggle(opt.value)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  if (step.type === "location") {
    const v = (answer as LocationAnswer | undefined) ?? {
      city: "",
      climate: null,
    };
    return (
      <div className="space-y-5">
        <div>
          <label className="block font-sans text-xs text-deep-forest/60 mb-2">
            City
          </label>
          <input
            type="text"
            value={v.city}
            onChange={(e) =>
              setAnswer({ ...v, city: e.target.value })
            }
            placeholder="e.g. Toronto"
            autoComplete="address-level2"
            className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-deep-forest/60 mb-2">
            Climate
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.climateOptions.map((c) => {
              const sel = v.climate === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setAnswer({ ...v, climate: c.value })}
                  aria-pressed={sel}
                  className={[
                    "px-3 py-3 rounded-card border font-sans text-sm transition-all",
                    sel
                      ? "border-caramel bg-caramel/8 text-deep-forest"
                      : "border-deep-forest/10 bg-off-white text-deep-forest/80 hover:border-deep-forest/25",
                  ].join(" ")}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (step.type === "text") {
    return (
      <textarea
        value={(answer as string) ?? ""}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder={step.placeholder}
        rows={5}
        className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors resize-none"
      />
    );
  }

  return null;
}

function UnderAgeView() {
  return (
    <main className="relative min-h-[100dvh] bg-cream flex items-center justify-center px-6 overflow-hidden">
      <GrainOverlay />
      <div className="relative z-10 max-w-md text-center">
        <Image
          src="/logo-wordmark.png"
          alt="NURVICA"
          width={140}
          height={28}
          className="h-auto w-[112px] mx-auto mb-10"
        />
        <h1
          className="font-display font-medium text-deep-forest leading-[1.15]"
          style={{ fontSize: "clamp(1.75rem, 5vw, 2.25rem)" }}
        >
          Thanks for stopping by.
        </h1>
        <p className="mt-4 font-sans font-light text-deep-forest/65 text-[15px] leading-relaxed">
          NURVICA is built for adults right now. Come back when you turn 18 — your hair journey will be waiting for you.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-7 py-3.5 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-[15px] font-medium"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

const LOADING_LINES = [
  "Curl pattern mapped",
  "Porosity inferred",
  "Concerns prioritized",
  "Generating your routine",
];
const LINE_DELAY = 850;
const REDIRECT_DELAY = 900;

function CompleteView({ answers }: { answers: Answers }) {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "nurvica:onboarding:final",
        JSON.stringify(answers)
      );
    }
    // TODO: POST answers to /api/onboarding once backend is wired.
  }, [answers]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    LOADING_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setActiveIdx(i + 1), (i + 1) * LINE_DELAY)
      );
    });
    timers.push(
      setTimeout(
        () => router.push("/dashboard"),
        LOADING_LINES.length * LINE_DELAY + REDIRECT_DELAY
      )
    );
    return () => timers.forEach(clearTimeout);
  }, [router]);

  return (
    <main className="relative min-h-[100dvh] bg-cream flex items-center justify-center px-6 overflow-hidden">
      <GrainOverlay />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 50%, rgba(199,167,122,0.12) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Image
          src="/logo-wordmark.png"
          alt="NURVICA"
          width={140}
          height={28}
          className="h-auto w-[112px] mx-auto mb-10"
        />
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse" />
          <span className="font-mono text-[10px] text-caramel tracking-[0.18em] uppercase">
            Building your profile
          </span>
        </div>

        <h1
          className="font-display font-medium text-deep-forest leading-[1.15] text-center"
          style={{ fontSize: "clamp(1.625rem, 4.5vw, 2.25rem)" }}
        >
          We&apos;ve got you.
        </h1>
        <p className="mt-3 font-sans font-light text-deep-forest/60 text-[14px] sm:text-[15px] leading-relaxed text-center">
          Hold tight — we&apos;re putting the pieces together.
        </p>

        <ul className="mt-9 space-y-3.5">
          {LOADING_LINES.map((line, i) => {
            const isDone = i < activeIdx;
            const isActive = i === activeIdx;
            const isPending = i > activeIdx;
            return (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{
                  opacity: isPending ? 0.3 : 1,
                  x: 0,
                }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <span className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                  {isDone && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 20,
                      }}
                      className="w-5 h-5 rounded-full bg-caramel flex items-center justify-center"
                    >
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6.5L4.5 9L10 3"
                          stroke="#1D2A1F"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                  )}
                  {isActive && (
                    <span className="w-4 h-4 rounded-full border-2 border-caramel/30 border-t-caramel animate-spin" />
                  )}
                  {isPending && (
                    <span className="w-2 h-2 rounded-full bg-deep-forest/20" />
                  )}
                </span>
                <span
                  className={[
                    "font-sans text-[15px] transition-colors",
                    isPending
                      ? "text-deep-forest/40"
                      : "text-deep-forest",
                  ].join(" ")}
                >
                  {line}
                </span>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </main>
  );
}
