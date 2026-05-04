# NURVICA — Curl Pattern Reference Assets

Schematic curl pattern tiles for the onboarding hair profiling flow (question 3:
"What's your curl pattern?"). These are placeholders meant to ship the MVP — they
should be replaced with real photographic references before public launch.

## Files

### Onboarding tiles (use these in the visual selector)

Clean strand-on-cream tiles with no label baked in. The label sits in the UI
underneath each tile so designers control the typography.

- `curl-3a.svg` / `curl-3a.png` — 512×512
- `curl-3b.svg` / `curl-3b.png`
- `curl-3c.svg` / `curl-3c.png`
- `curl-4a.svg` / `curl-4a.png`
- `curl-4b.svg` / `curl-4b.png`
- `curl-4c.svg` / `curl-4c.png`

**Recommended:** drop the SVGs into `/public/curl-patterns/` and reference them
from the visual selector component. SVGs scale crisply at any size and stay tiny
on the network. PNGs are provided as a fallback if your stack needs them.

### Labeled versions (for documentation, design reviews, internal use)

Same strand but with the pattern label (3A, 3B, etc.) baked into the image.

- `curl-3a-labeled.svg` / `curl-3a-labeled.png` etc.

### Combined reference

A single image showing all six patterns side by side, useful for design reviews,
content briefs, or as a comparison reference inside the Academy.

- `curl-patterns-reference.svg` / `curl-patterns-reference.png` — 1280×600

## Brand colors used

- Cream/Light Sand `#EFE6D7` — tile background
- Matte Black `#111111` — strand stroke
- Deep Forest Green `#1D2A1F` — descriptor text (combined reference only)

## Replace before public launch

These illustrations communicate the *geometry* of each pattern but they don't
communicate what hair on a head actually looks like. Real photography of textured
hair across 3A–4C, ideally shot at Victor's barbershop or sourced from a curated
stock library like CreateHER Stock or Nappy, should replace these tiles before
the platform goes public.
