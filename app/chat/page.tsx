"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import MessageBubble, { type ChatMessage } from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";
import EmptyState from "@/components/chat/EmptyState";
import ConversationDrawer from "@/components/chat/ConversationDrawer";
import { BottomTabNav, DesktopNavPills } from "@/components/shared/AppNav";
import { buildProfile, type Profile } from "@/lib/dashboard/profile";
import { generateResponse } from "@/lib/chat/responses";
import {
  createConversation,
  deriveTitle,
  EMPTY_STORE,
  loadStore,
  saveStore,
  type ChatStore,
  type Conversation,
} from "@/lib/chat/store";

const ONBOARDING_KEYS = [
  "nurvica:onboarding:final",
  "nurvica:onboarding:v2",
];

function loadAnswers(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  for (const key of ONBOARDING_KEYS) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      const answers = parsed?.answers ?? parsed;
      if (answers && typeof answers === "object") return answers;
    } catch {
      // ignore
    }
  }
  return null;
}

function newMessageId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-cream" />}>
      <ChatPageInner />
    </Suspense>
  );
}

function ChatPageInner() {
  const searchParams = useSearchParams();
  const [hydrated, setHydrated] = useState(false);
  const [store, setStore] = useState<ChatStore>(EMPTY_STORE);
  const [thinking, setThinking] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const handledQueryRef = useRef(false);

  useEffect(() => {
    setStore(loadStore());
    setProfile(buildProfile(loadAnswers()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveStore(store);
  }, [store, hydrated]);

  const activeConversation = useMemo<Conversation | null>(() => {
    if (!store.activeId) return null;
    return store.conversations.find((c) => c.id === store.activeId) ?? null;
  }, [store]);

  const messages = activeConversation?.messages ?? [];

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, thinking, store.activeId]);

  const send = useCallback(
    (text: string) => {
      if (!profile) return;
      const userMsg: ChatMessage = {
        id: newMessageId(),
        role: "user",
        content: text,
        createdAt: Date.now(),
      };

      let nextActiveId: string | null = null;

      setStore((prev) => {
        const now = Date.now();
        if (prev.activeId) {
          const conversations = prev.conversations.map((c) => {
            if (c.id !== prev.activeId) return c;
            const messages = [...c.messages, userMsg];
            const wasEmpty = c.messages.length === 0;
            return {
              ...c,
              messages,
              title: wasEmpty ? deriveTitle(messages) : c.title,
              updatedAt: now,
            };
          });
          nextActiveId = prev.activeId;
          return { ...prev, conversations };
        }
        const conv = createConversation([userMsg]);
        nextActiveId = conv.id;
        return {
          conversations: [conv, ...prev.conversations],
          activeId: conv.id,
        };
      });

      setThinking(true);
      const delay = 800 + Math.random() * 600;
      setTimeout(() => {
        const response = generateResponse(text, profile);
        const aiMsg: ChatMessage = {
          id: newMessageId(),
          role: "assistant",
          response,
          createdAt: Date.now(),
        };
        setStore((prev) => {
          const targetId = nextActiveId ?? prev.activeId;
          if (!targetId) return prev;
          const conversations = prev.conversations.map((c) =>
            c.id === targetId
              ? {
                  ...c,
                  messages: [...c.messages, aiMsg],
                  updatedAt: Date.now(),
                }
              : c
          );
          return { ...prev, conversations };
        });
        setThinking(false);
      }, delay);
    },
    [profile]
  );

  // Open a specific conversation via ?c= (e.g. from a saved routine card).
  useEffect(() => {
    if (!hydrated || handledQueryRef.current) return;
    const c = searchParams.get("c");
    if (!c) return;
    setStore((prev) =>
      prev.conversations.some((conv) => conv.id === c)
        ? { ...prev, activeId: c }
        : prev
    );
  }, [hydrated, searchParams]);

  // Auto-send the ?q= URL param once on first load
  useEffect(() => {
    if (!hydrated || handledQueryRef.current || !profile) return;
    const q = searchParams.get("q");
    if (q && q.trim()) {
      handledQueryRef.current = true;
      send(q.trim());
    }
  }, [hydrated, profile, searchParams, send]);

  const toggleSave = (id: string) => {
    setStore((prev) => ({
      ...prev,
      conversations: prev.conversations.map((c) =>
        c.id === prev.activeId
          ? {
              ...c,
              messages: c.messages.map((m) =>
                m.id === id && m.role === "assistant"
                  ? { ...m, saved: !m.saved }
                  : m
              ),
            }
          : c
      ),
    }));
  };

  const startNewChat = () => {
    setDrawerOpen(false);
    setThinking(false);
    handledQueryRef.current = true; // never replay ?q= after the user starts fresh
    setStore((prev) => ({ ...prev, activeId: null }));
  };

  const selectConversation = (id: string) => {
    setDrawerOpen(false);
    setStore((prev) => ({ ...prev, activeId: id }));
  };

  const deleteConversation = (id: string) => {
    setStore((prev) => {
      const conversations = prev.conversations.filter((c) => c.id !== id);
      let activeId = prev.activeId;
      if (activeId === id) {
        const fallback = [...conversations].sort(
          (a, b) => b.updatedAt - a.updatedAt
        )[0];
        activeId = fallback?.id ?? null;
      }
      return { conversations, activeId };
    });
  };

  const isEmpty = useMemo(
    () => messages.length === 0 && !thinking,
    [messages.length, thinking]
  );

  if (!hydrated || !profile) {
    return <div className="min-h-[100dvh] bg-cream" />;
  }

  return (
    <div className="relative h-[100dvh] flex flex-col bg-cream overflow-hidden">
      <ConversationDrawer
        open={drawerOpen}
        conversations={store.conversations}
        activeId={store.activeId}
        onClose={() => setDrawerOpen(false)}
        onNewChat={startNewChat}
        onSelect={selectConversation}
        onDelete={deleteConversation}
      />

      {/* Header */}
      <header className="flex-shrink-0 bg-cream/85 backdrop-blur-md border-b border-deep-forest/8">
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center gap-4">
          {/* Left cluster: hamburger + title */}
          <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-initial md:max-w-[28%]">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open conversations"
              className="w-9 h-9 rounded-full flex items-center justify-center text-deep-forest/65 hover:text-deep-forest hover:bg-deep-forest/5 transition-colors flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-pulse flex-shrink-0" />
              <span className="font-display text-[15px] sm:text-base text-deep-forest truncate">
                {activeConversation?.title ?? "NURVICA AI"}
              </span>
            </div>
          </div>

          {/* Centered nav — fixed position regardless of title length */}
          <DesktopNavPills className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Right: new chat */}
          <div className="ml-auto">
            <button
              type="button"
              onClick={startNewChat}
              aria-label="New chat"
              className="w-9 h-9 rounded-full flex items-center justify-center text-deep-forest/65 hover:text-deep-forest hover:bg-deep-forest/5 transition-colors flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Messages scroller */}
      <div ref={scrollerRef} className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 sm:py-7">
          {isEmpty ? (
            <EmptyState profile={profile} onPick={send} />
          ) : (
            <ul className="space-y-7 sm:space-y-8 pb-4">
              {messages.map((m) => (
                <li key={m.id}>
                  <MessageBubble
                    message={m}
                    onToggleSave={m.role === "assistant" ? toggleSave : undefined}
                  />
                </li>
              ))}
              {thinking && (
                <li>
                  <TypingIndicator />
                </li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-cream/85 backdrop-blur-md border-t border-deep-forest/8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3.5">
          <ChatInput onSubmit={send} disabled={thinking} />
          <p className="mt-1.5 text-center font-mono text-[9.5px] tracking-[0.15em] uppercase text-deep-forest/35">
            AI guidance · Not medical advice
          </p>
        </div>
      </div>

      {/* Mobile bottom tab nav */}
      <div className="flex-shrink-0">
        <BottomTabNav />
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
      <div className="rounded-card bg-off-white border border-deep-forest/8 px-5 py-4">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-caramel"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
