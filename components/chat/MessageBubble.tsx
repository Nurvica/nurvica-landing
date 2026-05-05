"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { AIResponse } from "@/lib/chat/responses";

export type ChatMessage =
  | { id: string; role: "user"; content: string; createdAt: number }
  | {
      id: string;
      role: "assistant";
      response: AIResponse;
      saved?: boolean;
      createdAt: number;
    };

type Props = {
  message: ChatMessage;
  onToggleSave?: (id: string) => void;
};

export default function MessageBubble({ message, onToggleSave }: Props) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-[85%] sm:max-w-[75%] px-4 py-2.5 rounded-2xl rounded-br-md bg-caramel/15 border border-caramel/30 text-deep-forest font-sans text-[15px] leading-relaxed whitespace-pre-wrap"
        >
          {message.content}
        </motion.div>
      </div>
    );
  }

  return (
    <AssistantBubble
      message={message}
      onToggleSave={onToggleSave}
    />
  );
}

function AssistantBubble({
  message,
  onToggleSave,
}: {
  message: Extract<ChatMessage, { role: "assistant" }>;
  onToggleSave?: (id: string) => void;
}) {
  const { response } = message;
  const [revealed] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-start"
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-7 h-7 rounded-full bg-deep-forest text-cream flex items-center justify-center font-display text-[13px]">
          N
        </span>
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-deep-forest/55">
          NURVICA AI
        </span>
      </div>

      <div className="w-full max-w-[95%] sm:max-w-[88%] rounded-card bg-off-white border border-deep-forest/8 px-5 py-5 sm:px-6 sm:py-6">
        <p className="font-sans text-[15px] sm:text-[15.5px] text-deep-forest leading-relaxed">
          <RichText text={response.intro} />
        </p>

        {response.diagnosis && (
          <p className="mt-3 font-sans text-[14.5px] text-deep-forest/75 leading-relaxed">
            <RichText text={response.diagnosis} />
          </p>
        )}

        {revealed && response.steps.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {response.steps.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 mt-[7px] w-1.5 h-1.5 rounded-full bg-caramel" />
                <span className="font-sans text-[14.5px] text-deep-forest/85 leading-relaxed">
                  <RichText text={step} />
                </span>
              </li>
            ))}
          </ul>
        )}

        {response.followUp && (
          <p className="mt-4 font-sans italic text-[14px] text-deep-forest/65 leading-relaxed">
            {response.followUp}
          </p>
        )}

        {response.links && response.links.length > 0 && (
          <div className="mt-5 pt-4 border-t border-deep-forest/8 space-y-2">
            {response.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-card bg-cream/50 border border-deep-forest/8 hover:border-deep-forest/20 hover:bg-cream transition-all"
              >
                <span className="font-sans text-[13.5px] text-deep-forest/85">
                  {link.label}
                </span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-deep-forest/45">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-deep-forest/8 flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-deep-forest/40">
            AI guidance · Not medical advice
          </span>
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(message.id)}
              aria-pressed={!!message.saved}
              className={[
                "flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase transition-colors",
                message.saved
                  ? "bg-caramel/15 text-caramel"
                  : "text-deep-forest/55 hover:text-deep-forest hover:bg-deep-forest/5",
              ].join(" ")}
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill={message.saved ? "currentColor" : "none"} aria-hidden="true">
                <path
                  d="M3 2H9V10L6 8L3 10V2Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
              {message.saved ? "Saved" : "Save"}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function RichText({ text }: { text: string }) {
  // Tiny markdown: **bold** only
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-deep-forest">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
