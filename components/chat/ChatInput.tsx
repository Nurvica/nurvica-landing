"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onSubmit: (text: string) => void;
  disabled?: boolean;
};

export default function ChatInput({ onSubmit, disabled }: Props) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex items-end gap-2 px-3 py-2.5 rounded-card bg-off-white border border-deep-forest/15 focus-within:border-caramel/60 transition-colors"
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Ask NURVICA anything about your hair…"
        disabled={disabled}
        className="flex-1 bg-transparent border-0 outline-none resize-none font-sans text-[15px] text-deep-forest placeholder-deep-forest/40 leading-relaxed py-1.5 max-h-40"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send"
        className={[
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all",
          canSend
            ? "bg-deep-forest hover:bg-olive text-cream"
            : "bg-deep-forest/15 text-deep-forest/30 cursor-not-allowed",
        ].join(" ")}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 13V3M8 3L4 7M8 3L12 7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </form>
  );
}
