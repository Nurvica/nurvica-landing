"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

const NAV: NavItem[] = [
  {
    href: "/dashboard",
    label: "Home",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 11L12 4L21 11V20C21 20.5 20.5 21 20 21H15V14H9V21H4C3.5 21 3 20.5 3 20V11Z"
          stroke="currentColor"
          strokeWidth={a ? 1.8 : 1.4}
          strokeLinejoin="round"
          fill={a ? "currentColor" : "none"}
          fillOpacity={a ? 0.08 : 0}
        />
      </svg>
    ),
  },
  {
    href: "/routine",
    label: "Routine",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} fill={a ? "currentColor" : "none"} fillOpacity={a ? 0.08 : 0} />
        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    href: "/chat",
    label: "Chat",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5 5H19C19.5 5 20 5.5 20 6V16C20 16.5 19.5 17 19 17H10L6 21V17H5C4.5 17 4 16.5 4 16V6C4 5.5 4.5 5 5 5Z"
          stroke="currentColor"
          strokeWidth={a ? 1.8 : 1.4}
          strokeLinejoin="round"
          fill={a ? "currentColor" : "none"}
          fillOpacity={a ? 0.08 : 0}
        />
      </svg>
    ),
  },
  {
    href: "/academy",
    label: "Academy",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 4H19V20H7C5.9 20 5 19.1 5 18V4Z" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinejoin="round" fill={a ? "currentColor" : "none"} fillOpacity={a ? 0.08 : 0} />
        <path d="M9 8H16" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinecap="round" />
        <path d="M9 12H14" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/community",
    label: "Community",
    icon: (a) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} fill={a ? "currentColor" : "none"} fillOpacity={a ? 0.08 : 0} />
        <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} />
        <path d="M3 19C3 16 5.5 14 9 14C12.5 14 15 16 15 19" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinecap="round" />
        <path d="M15 17C16 15.5 17.5 15 19 15C21 15 22 16.5 22 18" stroke="currentColor" strokeWidth={a ? 1.8 : 1.4} strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function DashboardChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-[100dvh] bg-cream flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-deep-forest/8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/dashboard" className="flex items-center" aria-label="NURVICA home">
            <Image
              src="/logo-wordmark.png"
              alt="NURVICA"
              width={120}
              height={24}
              priority
              className="h-auto w-[88px] sm:w-[104px]"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "px-3.5 py-2 rounded-full font-sans text-sm transition-colors",
                    active
                      ? "bg-deep-forest/8 text-deep-forest"
                      : "text-deep-forest/60 hover:text-deep-forest",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-deep-forest/65 hover:text-deep-forest hover:bg-deep-forest/5 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 9C6 5.7 8.7 3 12 3C15.3 3 18 5.7 18 9V14L20 16H4L6 14V9Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M10 19C10.5 20 11.2 20.5 12 20.5C12.8 20.5 13.5 20 14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              href="/profile"
              aria-label="Your profile"
              className="w-9 h-9 rounded-full bg-deep-forest text-cream flex items-center justify-center font-display text-sm hover:bg-olive transition-colors"
            >
              N
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 pb-24 md:pb-12">{children}</main>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-cream/95 backdrop-blur-md border-t border-deep-forest/8"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-label="Primary"
      >
        <ul className="grid grid-cols-5 max-w-md mx-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "flex flex-col items-center justify-center gap-1 py-2.5 transition-colors",
                    active ? "text-deep-forest" : "text-deep-forest/45",
                  ].join(" ")}
                >
                  {item.icon(active)}
                  <span className="font-mono text-[9px] tracking-[0.12em] uppercase">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
