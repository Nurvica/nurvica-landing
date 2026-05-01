"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-deep-forest/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-wordmark.png"
            alt="NURVICA"
            width={140}
            height={32}
            className="h-7 w-auto object-contain"
            priority
          />
        </Link>

        <a
          href="#waitlist"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-deep-forest text-deep-forest text-sm font-sans font-medium transition-all duration-200 hover:bg-deep-forest hover:text-cream min-h-[44px]"
        >
          Join the waitlist
        </a>
      </div>
    </motion.nav>
  );
}
