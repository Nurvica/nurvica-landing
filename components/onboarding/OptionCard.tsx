"use client";

type Props = {
  label: string;
  description?: string;
  selected: boolean;
  multi?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export default function OptionCard({
  label,
  description,
  selected,
  multi = false,
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={multi ? selected : undefined}
      className={[
        "w-full text-left flex items-start gap-3 px-4 py-4 sm:px-5 sm:py-4 rounded-card border transition-all",
        selected
          ? "border-caramel bg-caramel/8"
          : "border-deep-forest/10 bg-off-white hover:border-deep-forest/25 hover:bg-white",
        disabled && !selected ? "opacity-40 cursor-not-allowed" : "",
      ].join(" ")}
    >
      <span
        className={[
          "mt-0.5 flex-shrink-0 flex items-center justify-center transition-all",
          multi ? "w-5 h-5 rounded-md" : "w-5 h-5 rounded-full",
          selected
            ? "bg-caramel border border-caramel"
            : "border border-deep-forest/25 bg-transparent",
        ].join(" ")}
        aria-hidden="true"
      >
        {selected &&
          (multi ? (
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6.5L4.5 9L10 3"
                stroke="#1D2A1F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <span className="w-2 h-2 rounded-full bg-deep-forest" />
          ))}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-sans text-[15px] text-deep-forest leading-snug">
          {label}
        </span>
        {description && (
          <span className="block mt-0.5 font-sans text-xs text-deep-forest/55 leading-relaxed">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}
