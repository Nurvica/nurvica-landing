import { loadStore } from "@/lib/chat/store";
import type { AIResponse } from "@/lib/chat/responses";

export type SavedPlan = {
  id: string;
  conversationId: string;
  conversationTitle: string;
  response: AIResponse;
  createdAt: number;
};

/**
 * Pulls every assistant message the user has saved (the bookmark in chat)
 * across all conversations, newest first. These are the routines "gotten from
 * the chat" that surface on the routine page.
 */
export function loadSavedPlans(): SavedPlan[] {
  const store = loadStore();
  const plans: SavedPlan[] = [];

  for (const conv of store.conversations) {
    for (const msg of conv.messages) {
      if (msg.role === "assistant" && msg.saved) {
        plans.push({
          id: msg.id,
          conversationId: conv.id,
          conversationTitle: conv.title,
          response: msg.response,
          createdAt: msg.createdAt,
        });
      }
    }
  }

  return plans.sort((a, b) => b.createdAt - a.createdAt);
}
