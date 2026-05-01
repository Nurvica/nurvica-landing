"use client";

import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The platform", href: "#platform" },
  { label: "Our story", href: "#our-story" },
  { label: "Join the waitlist", href: "#waitlist" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nurvica.co/",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@nurvica.co",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.22 8.22 0 0 0 4.76 1.51V6.75a4.82 4.82 0 0 1-1-.06z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms of use", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-black px-5 pt-14 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-10 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/">
              <Image
                src="/logo-full.png"
                alt="NURVICA"
                width={120}
                height={120}
                className="w-20 h-auto object-contain brightness-0 invert opacity-85"
              />
            </Link>
            <p className="font-sans font-light text-muted text-sm leading-relaxed">
              Rooted in the chair. Grown for the home.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-muted hover:text-cream hover:border-white/25 transition-colors duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-caramel/40 tracking-widest uppercase">
              Navigation
            </span>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans font-light text-muted text-sm hover:text-cream transition-colors duration-150 min-h-[44px] inline-flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-7 border-t border-white/5">
          <p className="font-mono text-[11px] text-muted/60 tracking-wide">
            &copy; 2026 NURVICA. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-[11px] text-muted/60 hover:text-cream transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
