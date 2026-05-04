"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import GrainOverlay from "@/app/components/GrainOverlay";

const vp = { once: true, amount: 0 as const };

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up password reset email
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-cream flex items-center justify-center overflow-hidden px-5 py-10 sm:py-14">
      <GrainOverlay />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 35%, rgba(29,42,31,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <Link href="/" className="inline-block mb-2.5" aria-label="NURVICA home">
          <Image
            src="/logo-wordmark.png"
            alt="NURVICA"
            width={140}
            height={28}
            priority
            className="h-auto w-[112px] sm:w-[128px]"
          />
        </Link>

        <p className="font-display italic text-deep-forest/60 text-sm sm:text-[15px] mb-10 sm:mb-12">
          Rooted in the chair. Grown for the home.
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-medium text-deep-forest leading-[1.12]"
          style={{ fontSize: "clamp(1.875rem, 5vw, 2.5rem)" }}
        >
          {submitted ? "Check your inbox." : "Forgot your password?"}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 font-sans font-light text-deep-forest/60 text-[15px] leading-relaxed"
        >
          {submitted
            ? `We sent a reset link to ${email}. Follow it to set a new password.`
            : "Enter your email and we'll send you a link to reset it."}
        </motion.p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8 sm:mt-10 space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              autoComplete="email"
              required
              className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors"
            />

            <button
              type="submit"
              className="w-full mt-1 px-4 py-3.5 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-[15px] font-medium"
            >
              Send reset link
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 sm:mt-10 font-sans text-sm text-caramel hover:text-caramel/80 transition-colors"
          >
            Use a different email
          </button>
        )}

        <p className="mt-6 font-sans text-sm text-deep-forest/70">
          Remembered it?{" "}
          <Link
            href="/login"
            className="text-caramel hover:text-caramel/80 transition-colors font-medium"
          >
            Back to sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
