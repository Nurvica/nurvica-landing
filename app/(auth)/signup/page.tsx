"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import GrainOverlay from "@/app/components/GrainOverlay";

const vp = { once: true, amount: 0 as const };

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up auth
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
          Start your hair story.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-3 font-sans font-light text-deep-forest/60 text-[15px] leading-relaxed"
        >
          Personalized care, made for your hair.
        </motion.p>

        <div className="mt-8 sm:mt-10 space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-card bg-off-white border border-border hover:bg-white transition-colors text-deep-forest font-sans text-[15px]"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-card bg-off-white border border-border hover:bg-white transition-colors text-deep-forest font-sans text-[15px]"
          >
            <AppleIcon />
            Continue with Apple
          </button>
        </div>

        <div className="my-7 flex items-center gap-3">
          <div className="flex-1 h-px bg-deep-forest/10" />
          <span className="font-sans text-xs text-deep-forest/50">
            or with email
          </span>
          <div className="flex-1 h-px bg-deep-forest/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            autoComplete="name"
            required
            className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            autoComplete="email"
            required
            className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            minLength={8}
            required
            className="w-full px-4 py-3.5 rounded-card bg-off-white border border-border text-deep-forest placeholder-deep-forest/40 font-sans text-[15px] focus:outline-none focus:border-caramel/60 focus:bg-white transition-colors"
          />

          <p className="font-sans text-xs text-deep-forest/50 leading-relaxed pt-1">
            By creating an account, you agree to our{" "}
            <Link href="/privacy" className="text-caramel hover:text-caramel/80 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>

          <button
            type="submit"
            className="w-full mt-3 px-4 py-3.5 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-[15px] font-medium"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 font-sans text-sm text-deep-forest/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-caramel hover:text-caramel/80 transition-colors font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
