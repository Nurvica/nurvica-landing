import type { ChatMessage } from "@/components/chat/MessageBubble";

export type Conversation = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type ChatStore = {
  conversations: Conversation[];
  activeId: string | null;
};

const STORE_KEY = "nurvica:chat:store";
const LEGACY_KEY = "nurvica:chat:messages";

export const EMPTY_STORE: ChatStore = { conversations: [], activeId: null };

export function newConversationId() {
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function deriveTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser || firstUser.role !== "user") return "New chat";
  const text = firstUser.content.trim();
  if (!text) return "New chat";
  return text.length > 40 ? text.slice(0, 37) + "…" : text;
}

export function createConversation(messages: ChatMessage[] = []): Conversation {
  const now = Date.now();
  return {
    id: newConversationId(),
    title: deriveTitle(messages),
    messages,
    createdAt: now,
    updatedAt: now,
  };
}

export function loadStore(): ChatStore {
  if (typeof window === "undefined") return EMPTY_STORE;

  // One-time migration from legacy single-conversation key.
  try {
    const existing = localStorage.getItem(STORE_KEY);
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy && !existing) {
      const messages = JSON.parse(legacy) as ChatMessage[];
      if (Array.isArray(messages) && messages.length > 0) {
        const conv = createConversation(messages);
        const migrated: ChatStore = {
          conversations: [conv],
          activeId: conv.id,
        };
        localStorage.setItem(STORE_KEY, JSON.stringify(migrated));
      }
      localStorage.removeItem(LEGACY_KEY);
    }
  } catch {
    // ignore
  }

  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return EMPTY_STORE;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.conversations)) {
      return {
        conversations: parsed.conversations,
        activeId: typeof parsed.activeId === "string" ? parsed.activeId : null,
      };
    }
  } catch {
    // ignore
  }
  return EMPTY_STORE;
}

export function saveStore(store: ChatStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // ignore quota issues
  }
}

export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "Just now";
  const min = Math.floor(diff / 60_000);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Yesterday";
  if (day < 7) return `${day}d ago`;
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function sortConversations(convs: Conversation[]): Conversation[] {
  return [...convs].sort((a, b) => b.updatedAt - a.updatedAt);
}
