"use client";

import { useState } from "react";

interface Props {
  dark?: boolean;
}

export default function WaitlistForm({ dark = false }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`flex items-center gap-2.5 px-5 py-3.5 rounded-full border text-sm font-sans ${
          dark
            ? "border-cream/15 text-cream/70"
            : "border-deep-forest/15 text-deep-forest/60"
        }`}
      >
        <span className="text-caramel">&#10003;</span>
        You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className={`flex-1 min-w-0 px-5 py-3 rounded-full text-sm font-sans outline-none min-h-[48px] transition-colors duration-200 ${
          dark
            ? "bg-cream/8 text-cream placeholder-cream/30 border border-cream/15 focus:border-cream/40"
            : "bg-white text-deep-forest placeholder-deep-forest/35 border border-deep-forest/12 focus:border-deep-forest/35"
        }`}
      />
      <button
        type="submit"
        disabled={loading}
        className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-sans font-medium text-sm min-h-[48px] shrink-0 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 ${
          dark
            ? "bg-caramel text-deep-forest hover:bg-cream"
            : "bg-deep-forest text-cream hover:bg-olive"
        }`}
      >
        {loading ? "Joining..." : "Join the waitlist"}
      </button>
      {error && (
        <p className="text-alert text-xs font-sans mt-2 sm:mt-0 sm:absolute sm:-bottom-6 sm:left-0">
          {error}
        </p>
      )}
    </form>
  );
}
