"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavItem = {
  href: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
};

export const APP_NAV: NavItem[] = [
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

export function BottomTabNav() {
  const pathname = usePathname();
  return (
    <nav
      className="md:hidden bg-cream/95 backdrop-blur-md border-t border-deep-forest/8"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="grid grid-cols-5 max-w-md mx-auto">
        {APP_NAV.map((item) => {
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
  );
}

export function DesktopNavPills({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <nav
      className={`hidden md:flex items-center gap-1 ${className}`}
      aria-label="Primary"
    >
      {APP_NAV.map((item) => {
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
  );
}
