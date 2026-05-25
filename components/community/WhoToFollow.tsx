"use client";

import { useState } from "react";

type Account = {
  id: string;
  name: string;
  role: string;
  avatar: string;
};

const ACCOUNTS: Account[] = [
  { id: "dr-amaka", name: "Dr. Amaka O.", role: "Trichologist", avatar: "AO" },
  { id: "victor", name: "Victor", role: "Founder · Licensed Barber", avatar: "VC" },
  { id: "nurvica", name: "NURVICA Team", role: "Official", avatar: "N" },
];

export default function WhoToFollow() {
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside className="rounded-card border border-deep-forest/8 bg-off-white px-5 py-6 sm:px-6 sm:py-6">
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55 mb-4">
        Who to follow
      </p>
      <ul className="space-y-4">
        {ACCOUNTS.map((acc) => {
          const isFollowing = following.has(acc.id);
          return (
            <li key={acc.id} className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full bg-deep-forest text-cream flex items-center justify-center font-display text-sm flex-shrink-0"
                aria-hidden="true"
              >
                {acc.avatar}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-sans font-medium text-deep-forest text-[14px] truncate">
                  {acc.name}
                </p>
                <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-deep-forest/50 truncate">
                  {acc.role}
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggle(acc.id)}
                aria-pressed={isFollowing}
                className={[
                  "px-3 py-1.5 rounded-full font-sans text-[12px] font-medium transition-colors flex-shrink-0",
                  isFollowing
                    ? "bg-caramel/15 text-caramel"
                    : "bg-deep-forest text-cream hover:bg-olive",
                ].join(" ")}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
