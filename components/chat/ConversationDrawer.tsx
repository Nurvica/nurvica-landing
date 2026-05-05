"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  relativeTime,
  sortConversations,
  type Conversation,
} from "@/lib/chat/store";

type Props = {
  open: boolean;
  conversations: Conversation[];
  activeId: string | null;
  onClose: () => void;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function ConversationDrawer({
  open,
  conversations,
  activeId,
  onClose,
  onNewChat,
  onSelect,
  onDelete,
}: Props) {
  const sorted = sortConversations(conversations);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-deep-forest/30 backdrop-blur-[2px]"
            aria-hidden="true"
          />
          <motion.aside
            key="panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[88%] max-w-sm bg-cream border-r border-deep-forest/10 flex flex-col"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
            aria-label="Conversations"
          >
            <header className="flex items-center justify-between px-4 sm:px-5 h-14 border-b border-deep-forest/8">
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-deep-forest/55">
                Conversations
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 rounded-full flex items-center justify-center text-deep-forest/65 hover:text-deep-forest hover:bg-deep-forest/5 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div className="px-4 sm:px-5 pt-4 pb-3">
              <button
                type="button"
                onClick={onNewChat}
                className="w-full flex items-center justify-between px-4 py-3 rounded-card bg-deep-forest hover:bg-olive transition-colors text-cream font-sans text-[14px] font-medium"
              >
                <span>New conversation</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M8 3V13M3 8H13"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 sm:px-3 pb-3">
              {sorted.length === 0 ? (
                <div className="px-3 py-10 text-center">
                  <p className="font-sans text-sm text-deep-forest/50">
                    No conversations yet.
                  </p>
                  <p className="mt-1 font-sans text-xs text-deep-forest/40">
                    Ask NURVICA anything to start.
                  </p>
                </div>
              ) : (
                <ul className="space-y-1">
                  {sorted.map((c) => {
                    const isActive = c.id === activeId;
                    return (
                      <li key={c.id}>
                        <div
                          className={[
                            "group flex items-center gap-2 rounded-card transition-colors",
                            isActive
                              ? "bg-deep-forest/8"
                              : "hover:bg-deep-forest/5",
                          ].join(" ")}
                        >
                          <button
                            type="button"
                            onClick={() => onSelect(c.id)}
                            className="flex-1 min-w-0 text-left px-3 py-2.5"
                          >
                            <span className="block font-sans text-[14px] text-deep-forest leading-tight truncate">
                              {c.title}
                            </span>
                            <span className="block mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-deep-forest/45">
                              {relativeTime(c.updatedAt)}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  `Delete this conversation? This can't be undone.`
                                )
                              ) {
                                onDelete(c.id);
                              }
                            }}
                            aria-label="Delete conversation"
                            className="opacity-0 group-hover:opacity-100 focus:opacity-100 flex-shrink-0 mr-2 w-8 h-8 rounded-full flex items-center justify-center text-deep-forest/55 hover:text-alert hover:bg-deep-forest/5 transition-all"
                          >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                              <path
                                d="M3 5H13M11.5 5L11 12.5C11 13.3 10.3 14 9.5 14H6.5C5.7 14 5 13.3 5 12.5L4.5 5M6 5V3.5C6 2.7 6.7 2 7.5 2H8.5C9.3 2 10 2.7 10 3.5V5"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            <footer className="px-4 sm:px-5 py-3 border-t border-deep-forest/8">
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-2 font-sans text-sm text-deep-forest/65 hover:text-deep-forest transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 13L5 8L10 3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back to dashboard
              </Link>
            </footer>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
