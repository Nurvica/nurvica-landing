"use client";

import Image from "next/image";
import Link from "next/link";
import { BottomTabNav, DesktopNavPills } from "@/components/shared/AppNav";

export default function DashboardChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[100dvh] bg-cream flex flex-col">
      <header className="sticky top-0 z-30 bg-cream/85 backdrop-blur-md border-b border-deep-forest/8">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-4">
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

          <DesktopNavPills className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          <div className="ml-auto flex items-center gap-2">
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

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30">
        <BottomTabNav />
      </div>
    </div>
  );
}
