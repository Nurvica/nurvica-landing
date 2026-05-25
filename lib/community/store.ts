import type { Community, CommunityFilter } from "@/lib/types/community";

export type CommunityState = {
  selected: CommunityFilter;
  /** Communities the user has joined. Stored as an array for JSON. */
  joined: Community[];
  /** Post ids the user has bookmarked. */
  saved: string[];
  /** Post ids the user has marked as helpful. */
  helpful: string[];
};

export const EMPTY_STATE: CommunityState = {
  selected: "for-you",
  joined: [],
  saved: [],
  helpful: [],
};

const STORE_KEY = "nurvica:community:store";

export function loadCommunityState(): CommunityState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return EMPTY_STATE;
    return {
      selected:
        typeof parsed.selected === "string" ? parsed.selected : "for-you",
      joined: Array.isArray(parsed.joined) ? parsed.joined : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      helpful: Array.isArray(parsed.helpful) ? parsed.helpful : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function saveCommunityState(state: CommunityState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota issues
  }
}

/** Toggle membership of a value within a small string array. */
export function toggleIn<T extends string>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}
