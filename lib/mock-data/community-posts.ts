import type { CommunityPost } from "@/lib/types/community";

/**
 * Mock feed for the MVP. Timestamps are anchored around late May 2026 so the
 * relative-time helper produces realistic "Xh / Xd ago" output. All images use
 * placehold.co with on-brand earth tones so the layout looks intentional even
 * without real photography.
 */
export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p-welcome",
    authorId: "u-nurvica",
    authorName: "NURVICA Team",
    authorAvatar: "N",
    authorRole: "nurvica-team",
    createdAt: "2026-05-15T09:00:00Z",
    body:
      "Welcome to the NURVICA community. This is a space for textured hair — 3A through 4C, locs, braids, waves, transitioning, all of it. We keep it expert-moderated, low-noise, and grounded in what actually works. Ask the small questions. Share the wins. Be generous with what you've learned.",
    communities: ["4c-hair", "scalp-health"],
    helpfulCount: 184,
    commentCount: 27,
    isPinned: true,
  },
  {
    id: "p-traction-edges",
    authorId: "u-dr-amaka",
    authorName: "Dr. Amaka O.",
    authorAvatar: "AO",
    authorRole: "trichologist",
    createdAt: "2026-05-21T14:30:00Z",
    body:
      "PSA on edges: most thinning at the hairline isn't genetic — it's traction alopecia from tight styling. If your braids hurt the first night, that's not 'they'll settle.' That's microtrauma at the follicle. A 6-week tension break + 2-minute daily massage at the temples brings most edges back. Photograph weekly; the mirror lies.",
    communities: ["braids-and-twists", "protective-styles", "scalp-health"],
    helpfulCount: 142,
    commentCount: 19,
  },
  {
    id: "p-protein-overload",
    authorId: "u-imani",
    authorName: "Imani · 4A",
    authorAvatar: "IM",
    authorRole: null,
    createdAt: "2026-05-22T08:15:00Z",
    body:
      "If your hair feels mushy and stretchy when wet, that's not dryness — that's protein loss. If it feels stiff and snaps when wet, that's protein overload. I was doing weekly protein treatments thinking I was helping. Cut to once a month + moisture-heavy in between and the breakage stopped in 3 wash cycles.",
    communities: ["4c-hair"],
    helpfulCount: 89,
    commentCount: 14,
  },
  {
    id: "p-wave-brushing",
    authorId: "u-victor",
    authorName: "Victor · Founder",
    authorAvatar: "VC",
    authorRole: "licensed-barber",
    createdAt: "2026-05-20T19:45:00Z",
    body:
      "Brushing for waves is about cuticle compression, not pressure. Same direction, same medium-soft brush, twice a day. The moisture step is what most guys skip — hydrated hair lays down, dry hair sticks up. Durag at night, every night, for the first 90 days. No exceptions.",
    images: [
      "https://placehold.co/800x600/1D2A1F/EFE6D7?text=Brush+%E2%80%94+same+direction",
    ],
    communities: ["waves"],
    helpfulCount: 117,
    commentCount: 22,
  },
  {
    id: "p-retwist-timing",
    authorId: "u-kemi",
    authorName: "Kemi · 8mo locs",
    authorAvatar: "KE",
    authorRole: null,
    createdAt: "2026-05-19T11:20:00Z",
    body:
      "PSA for the budding stage: stop retwisting every 2 weeks. You're thinning the roots and most of the 'they look messy' feeling is just the budding phase doing its job. I moved to every 5–6 weeks and the locs got thicker, not thinner. Cover with a satin bonnet between retwists.",
    communities: ["locs"],
    helpfulCount: 76,
    commentCount: 11,
  },
  {
    id: "p-flash-dry",
    authorId: "u-sade",
    authorName: "Sade · 3C",
    authorAvatar: "SA",
    authorRole: null,
    createdAt: "2026-05-22T13:05:00Z",
    body:
      "Wash-and-go in dry air is brutal. Hair was hydrated for about an hour then flash-dried into a crispy cast. What finally worked: leave-in on SOAKING wet hair (not damp), heavier sealant than I'd usually use (shea butter top layer), and a plastic cap for the first 20 minutes of air-dry. Cuticle stays sealed.",
    communities: ["wash-and-go", "4c-hair"],
    helpfulCount: 62,
    commentCount: 9,
  },
  {
    id: "p-low-porosity-buildup",
    authorId: "u-dr-amaka",
    authorName: "Dr. Amaka O.",
    authorAvatar: "AO",
    authorRole: "trichologist",
    createdAt: "2026-05-18T16:40:00Z",
    body:
      "Low porosity hair doesn't 'reject' product — it just doesn't have anywhere to put it. Heavy butters and oils sit on top and read as buildup within 48 hours. Lead with water-based, lightweight humectants. Add gentle heat (steamer, plastic cap, warm towel) during deep conditioning so the cuticle opens enough to let moisture in.",
    communities: ["4c-hair", "wash-and-go"],
    helpfulCount: 98,
    commentCount: 16,
  },
  {
    id: "p-demarcation",
    authorId: "u-renee",
    authorName: "Renée · transitioning",
    authorAvatar: "RE",
    authorRole: null,
    createdAt: "2026-05-21T07:50:00Z",
    body:
      "Month 7 of transitioning. The demarcation line is real — the relaxed ends snap if I look at them sideways. What's helping: detangling ONLY on conditioner-saturated wet hair, fingers first, then a wide-tooth comb. Twist-outs to blend the two textures instead of fighting the curl pattern.",
    images: [
      "https://placehold.co/600x600/C7A77A/1D2A1F?text=Month+7",
      "https://placehold.co/600x600/2F3F2E/EFE6D7?text=Twist-out",
    ],
    communities: ["transitioning", "4c-hair"],
    helpfulCount: 54,
    commentCount: 12,
  },
  {
    id: "p-sew-in-itch",
    authorId: "u-jordan",
    authorName: "Jordan · 3C",
    authorAvatar: "JO",
    authorRole: null,
    createdAt: "2026-05-20T22:10:00Z",
    body:
      "Anyone else dealing with scalp itch under a sew-in around week 3? I'm doing the diluted ACV rinses through the tracks but it's getting worse, not better. Considering taking it down early. What's the move — push through with a different cleanse or just take it out?",
    communities: ["protective-styles", "scalp-health"],
    helpfulCount: 31,
    commentCount: 24,
  },
  {
    id: "p-knotless-temples",
    authorId: "u-yara",
    authorName: "Yara · 4B",
    authorAvatar: "YA",
    authorRole: null,
    createdAt: "2026-05-19T15:25:00Z",
    body:
      "Got knotless braids 4 days ago. Stylist did them medium-tension at the temples and I can already feel the difference — no headache day one, no bumps. The 'tighter = lasts longer' myth costs us our edges. Find a braider who knows when to ease up at the hairline.",
    communities: ["braids-and-twists", "protective-styles"],
    helpfulCount: 71,
    commentCount: 8,
  },
  {
    id: "p-shrinkage",
    authorId: "u-tasha",
    authorName: "Tasha · 4C",
    authorAvatar: "TA",
    authorRole: null,
    createdAt: "2026-05-17T10:00:00Z",
    body:
      "Reminder: shrinkage is a sign of healthy elasticity. My BSL hair shrinks to chin-length when wet and that used to upset me. Stretched out it's still there. Stop measuring on dry days only — measure on a banded twist-out or a blowout if you need proof of length. Trust the process.",
    images: [
      "https://placehold.co/600x800/EFE6D7/1D2A1F?text=Shrinkage+vs+stretched",
    ],
    communities: ["4c-hair"],
    helpfulCount: 156,
    commentCount: 33,
  },
  {
    id: "p-sulfate-free",
    authorId: "u-marcus",
    authorName: "Marcus · 4A",
    authorAvatar: "MA",
    authorRole: null,
    createdAt: "2026-05-22T06:30:00Z",
    body:
      "Switched to sulfate-free + fragrance-free shampoo two weeks ago and the itch on the crown is 80% gone. The trigger wasn't dryness — it was the fragrance. If your scalp burns mid-lather, that's a flag, not 'it's working.'",
    communities: ["scalp-health"],
    helpfulCount: 42,
    commentCount: 7,
  },
  {
    id: "p-protective-rotation",
    authorId: "u-simi",
    authorName: "Simi · 4B",
    authorAvatar: "SI",
    authorRole: null,
    createdAt: "2026-05-16T18:00:00Z",
    body:
      "My retention rule: no protective style longer than 6–8 weeks, then a 2-week stretch wearing my hair out (low-manipulation buns, washes, deep conditions) before the next install. The break is where the moisture work actually happens.",
    communities: ["protective-styles", "4c-hair"],
    helpfulCount: 88,
    commentCount: 13,
  },
  {
    id: "p-loc-lint",
    authorId: "u-andre",
    authorName: "Andre · 3yr locs",
    authorAvatar: "AN",
    authorRole: null,
    createdAt: "2026-05-15T20:15:00Z",
    body:
      "Lint check: if your locs are pulling lint, your sleep setup is the issue 9 times out of 10. Cotton pillowcases shed micro-fibers that get caught in the loc body. Satin bonnet OR a satin pillowcase. Pick one and commit. Don't wait until you can see it from across the room.",
    communities: ["locs"],
    helpfulCount: 67,
    commentCount: 10,
  },
  {
    id: "p-community-update",
    authorId: "u-nurvica",
    authorName: "NURVICA Team",
    authorAvatar: "N",
    authorRole: "nurvica-team",
    createdAt: "2026-05-14T12:00:00Z",
    body:
      "New this week: the Routine tab now exports your weekly rhythm to your phone's calendar, and saved AI plans show up alongside your daily checklist. Drop questions or feedback in #Scalp Health or #4C Hair — we read everything.",
    communities: ["scalp-health", "4c-hair"],
    helpfulCount: 73,
    commentCount: 18,
  },
];
