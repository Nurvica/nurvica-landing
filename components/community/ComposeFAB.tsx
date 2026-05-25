"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ComposeFAB() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Compose a new post"
        className="fixed bottom-24 md:bottom-8 right-5 sm:right-8 z-40 w-14 h-14 rounded-full bg-deep-forest text-cream shadow-[0_8px_28px_-10px_rgba(29,42,31,0.6)] hover:bg-olive transition-colors flex items-center justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 3V13M3 8H13"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-deep-forest/30 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="compose-title"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="fixed inset-0 z-50 flex items-center justify-center p-5 pointer-events-none"
            >
              <div className="pointer-events-auto w-full max-w-md rounded-card bg-off-white border border-deep-forest/10 shadow-[0_24px_60px_-24px_rgba(29,42,31,0.45)] px-6 py-7 sm:px-7 sm:py-8">
                <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/45">
                  Compose
                </p>
                <h2
                  id="compose-title"
                  className="mt-2 font-display font-medium text-deep-forest leading-tight"
                  style={{ fontSize: "clamp(1.25rem, 3vw, 1.5rem)" }}
                >
                  Compose is coming soon.
                </h2>
                <p className="mt-3 font-sans font-light text-deep-forest/65 text-[14.5px] leading-relaxed">
                  We&apos;re building this with the community. In the meantime, ask
                  NURVICA AI for guidance — your answers can be saved and shared
                  here when posting opens.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 w-full inline-flex items-center justify-center px-4 py-2.5 rounded-card bg-deep-forest text-cream font-sans text-sm font-medium hover:bg-olive transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
