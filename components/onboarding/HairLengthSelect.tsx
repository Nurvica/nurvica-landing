"use client";

import type { OptionItem } from "@/app/onboarding/questions";

type Props = {
  options: OptionItem[];
  value: string | null;
  onChange: (value: string) => void;
};

const SILHOUETTES: Record<string, (selected: boolean) => React.ReactNode> = {
  twa: (s) => (
    <svg viewBox="0 0 60 80" width="56" height="74" aria-hidden="true">
      <Body selected={s} />
      <ellipse
        cx="30"
        cy="20"
        rx="14"
        ry="10"
        fill={s ? "#C7A77A" : "#1D2A1F"}
        opacity={s ? "0.8" : "0.85"}
      />
    </svg>
  ),
  ear: (s) => (
    <svg viewBox="0 0 60 80" width="56" height="74" aria-hidden="true">
      <Body selected={s} />
      <path
        d="M14 24 Q14 38 18 42 L42 42 Q46 38 46 24 Q46 12 30 12 Q14 12 14 24 Z"
        fill={s ? "#C7A77A" : "#1D2A1F"}
        opacity={s ? "0.8" : "0.85"}
      />
    </svg>
  ),
  shoulder: (s) => (
    <svg viewBox="0 0 60 80" width="56" height="74" aria-hidden="true">
      <Body selected={s} />
      <path
        d="M12 26 Q12 56 18 60 L42 60 Q48 56 48 26 Q48 10 30 10 Q12 10 12 26 Z"
        fill={s ? "#C7A77A" : "#1D2A1F"}
        opacity={s ? "0.8" : "0.85"}
      />
    </svg>
  ),
  "mid-back": (s) => (
    <svg viewBox="0 0 60 80" width="56" height="74" aria-hidden="true">
      <Body selected={s} />
      <path
        d="M11 26 Q10 70 16 74 L44 74 Q50 70 49 26 Q49 9 30 9 Q11 9 11 26 Z"
        fill={s ? "#C7A77A" : "#1D2A1F"}
        opacity={s ? "0.8" : "0.85"}
      />
    </svg>
  ),
  waist: (s) => (
    <svg viewBox="0 0 60 80" width="56" height="74" aria-hidden="true">
      <Body selected={s} />
      <path
        d="M10 26 Q9 80 14 80 L46 80 Q51 80 50 26 Q50 8 30 8 Q10 8 10 26 Z"
        fill={s ? "#C7A77A" : "#1D2A1F"}
        opacity={s ? "0.8" : "0.85"}
      />
    </svg>
  ),
};

function Body({ selected }: { selected: boolean }) {
  return (
    <>
      <circle
        cx="30"
        cy="22"
        r="10"
        fill={selected ? "#EFE6D7" : "#F8F5EF"}
        stroke={selected ? "#C7A77A" : "#1D2A1F"}
        strokeOpacity={selected ? "0.4" : "0.2"}
        strokeWidth="0.6"
      />
      <path
        d="M16 56 Q16 44 30 44 Q44 44 44 56 L44 80 L16 80 Z"
        fill={selected ? "#EFE6D7" : "#F8F5EF"}
        stroke={selected ? "#C7A77A" : "#1D2A1F"}
        strokeOpacity={selected ? "0.4" : "0.2"}
        strokeWidth="0.6"
      />
    </>
  );
}

export default function HairLengthSelect({ options, value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-3">
      {options.map((opt) => {
        const selected = value === opt.value;
        const render = SILHOUETTES[opt.value];
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={selected}
            className={[
              "flex flex-col items-center justify-end gap-2 p-3 rounded-card border transition-all",
              selected
                ? "border-caramel bg-caramel/8"
                : "border-deep-forest/10 bg-off-white hover:border-deep-forest/25",
            ].join(" ")}
          >
            <span className="flex items-end justify-center h-[74px]">
              {render ? render(selected) : null}
            </span>
            <span className="font-sans text-[11px] sm:text-xs text-deep-forest/80 text-center leading-tight">
              {opt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
