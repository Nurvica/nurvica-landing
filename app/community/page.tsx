"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityChips from "@/components/community/CommunityChips";
import PostCard from "@/components/community/PostCard";
import PinnedPost from "@/components/community/PinnedPost";
import WhoToFollow from "@/components/community/WhoToFollow";
import AboutCommunity from "@/components/community/AboutCommunity";
import ComposeFAB from "@/components/community/ComposeFAB";
import EmptyCommunityState from "@/components/community/EmptyCommunityState";
import { COMMUNITY_POSTS } from "@/lib/mock-data/community-posts";
import { COMMUNITY_BY_SLUG } from "@/lib/mock-data/communities";
import { buildFeed } from "@/lib/community/feed";
import {
  EMPTY_STATE,
  loadCommunityState,
  saveCommunityState,
  toggleIn,
  type CommunityState,
} from "@/lib/community/store";
import { buildProfile, type Profile } from "@/lib/dashboard/profile";
import type { Community, CommunityFilter } from "@/lib/types/community";

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

export default function CommunityPage() {
  const [hydrated, setHydrated] = useState(false);
  const [state, setState] = useState<CommunityState>(EMPTY_STATE);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setState(loadCommunityState());
    setProfile(buildProfile(loadAnswers()));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCommunityState(state);
  }, [state, hydrated]);

  const setSelected = useCallback((selected: CommunityFilter) => {
    setState((prev) => ({ ...prev, selected }));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setState((prev) => ({ ...prev, saved: toggleIn(prev.saved, id) }));
  }, []);

  const toggleHelpful = useCallback((id: string) => {
    setState((prev) => ({ ...prev, helpful: toggleIn(prev.helpful, id) }));
  }, []);

  const toggleJoin = useCallback((slug: Community) => {
    setState((prev) => ({ ...prev, joined: toggleIn(prev.joined, slug) }));
  }, []);

  const feed = useMemo(() => {
    if (!profile) return [];
    return buildFeed(COMMUNITY_POSTS, profile, state.selected);
  }, [profile, state.selected]);

  const selectedMeta =
    state.selected !== "for-you" ? COMMUNITY_BY_SLUG[state.selected] : null;

  // When a specific community is selected, anything past the pinned welcome is
  // a "real" community post. If there are none, surface the empty state.
  const nonPinnedFiltered = feed.filter((p) => !p.isPinned);
  const showEmpty = state.selected !== "for-you" && nonPinnedFiltered.length === 0;

  if (!hydrated || !profile) {
    return <div className="min-h-[60vh]" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-10">
      <CommunityHeader />
      <CommunityChips selected={state.selected} onSelect={setSelected} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Feed */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          {feed.map((post) =>
            post.isPinned ? (
              <PinnedPost
                key={post.id}
                post={post}
                isHelpful={state.helpful.includes(post.id)}
                isSaved={state.saved.includes(post.id)}
                onToggleHelpful={toggleHelpful}
                onToggleSaved={toggleSaved}
                onSelectCommunity={setSelected}
              />
            ) : (
              <PostCard
                key={post.id}
                post={post}
                isHelpful={state.helpful.includes(post.id)}
                isSaved={state.saved.includes(post.id)}
                onToggleHelpful={toggleHelpful}
                onToggleSaved={toggleSaved}
                onSelectCommunity={setSelected}
              />
            )
          )}

          {showEmpty && selectedMeta && (
            <EmptyCommunityState meta={selectedMeta} />
          )}

          {/* Right-rail cards inline on mobile (below the feed) */}
          <div className="lg:hidden space-y-4 sm:space-y-5 pt-2">
            {selectedMeta && (
              <AboutCommunity
                meta={selectedMeta}
                isJoined={state.joined.includes(selectedMeta.slug)}
                onToggleJoin={() => toggleJoin(selectedMeta.slug)}
              />
            )}
            <WhoToFollow />
          </div>
        </div>

        {/* Right rail (desktop) */}
        <aside className="hidden lg:block space-y-5">
          {selectedMeta && (
            <AboutCommunity
              meta={selectedMeta}
              isJoined={state.joined.includes(selectedMeta.slug)}
              onToggleJoin={() => toggleJoin(selectedMeta.slug)}
            />
          )}
          <WhoToFollow />
        </aside>
      </div>

      <ComposeFAB />
    </div>
  );
}
