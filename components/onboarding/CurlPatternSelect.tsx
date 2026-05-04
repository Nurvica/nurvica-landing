"use client";

import Image from "next/image";
import OptionCard from "./OptionCard";
import type { OptionItem } from "@/app/onboarding/questions";

type Props = {
  options: OptionItem[];
  fallbacks: OptionItem[];
  value: string | null;
  onChange: (value: string) => void;
};

const IMAGE_SRC: Record<string, string> = {
  "3a": "/curl-patterns/curl-3a.png",
  "3b": "/curl-patterns/curl-3b.png",
  "3c": "/curl-patterns/curl-3c.png",
  "4a": "/curl-patterns/curl-4a.png",
  "4b": "/curl-patterns/curl-4b.png",
  "4c": "/curl-patterns/curl-4c.png",
};

export default function CurlPatternSelect({
  options,
  fallbacks,
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {options.map((opt) => {
          const selected = value === opt.value;
          const src = IMAGE_SRC[opt.value];
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={[
                "group flex flex-col items-stretch overflow-hidden rounded-card border transition-all",
                selected
                  ? "border-caramel ring-2 ring-caramel/30 bg-caramel/5"
                  : "border-deep-forest/10 bg-off-white hover:border-deep-forest/25",
              ].join(" ")}
            >
              <div className="relative aspect-square w-full bg-cream/60 overflow-hidden">
                {src && (
                  <Image
                    src={src}
                    alt={`${opt.label} curl pattern example`}
                    fill
                    sizes="(max-width: 640px) 50vw, 200px"
                    className="object-cover"
                  />
                )}
                {selected && (
                  <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-caramel flex items-center justify-center shadow-sm">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6.5L4.5 9L10 3"
                        stroke="#1D2A1F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </div>
              <div className="px-3 py-2.5 text-left">
                <span className="block font-display text-[15px] sm:text-base text-deep-forest leading-tight">
                  {opt.label}
                </span>
                {opt.description && (
                  <span className="block mt-0.5 font-sans text-[11px] sm:text-xs text-deep-forest/55 leading-snug">
                    {opt.description}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {fallbacks.map((opt) => (
          <OptionCard
            key={opt.value}
            label={opt.label}
            selected={value === opt.value}
            onClick={() => onChange(opt.value)}
          />
        ))}
      </div>
    </div>
  );
}
