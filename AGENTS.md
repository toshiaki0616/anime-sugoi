# AGENTS.md

This file is the quick map for agents working in `anime-sugoi`.
Read this first, then jump to the focused docs in `docs/`.

## Project Snapshot

- Stack: React 19 + TypeScript + Vite 7
- Styling: global CSS in `src/index.css`
- Animation: Framer Motion, GSAP, ScrollTrigger, Lenis, tsParticles
- Data sources:
  - AniList GraphQL for base anime metadata
  - `src/data/sampleAnime.ts` for local overrides and hand-authored content
  - `src/data/annictCache.ts` for cached Annict supplemental data
- Main route files:
  - `src/pages/HomePage.tsx`
  - `src/pages/AnimeDetailPage.tsx`
  - `src/pages/showcase/GifMaker.tsx`

## Commands

- Install: `npm ci`
- Dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Refresh Annict cache: `npm run fetch-annict`

## Where To Look

- Repo map: `docs/repo-map.md`
- Data flow and content sources: `docs/data-sources.md`
- Detail page extension guide: `docs/detail-page-playbook.md`

## Working Rules For This Repo

- Prefer small, targeted edits. The detail page is already visually dense.
- Preserve the established visual language unless the task explicitly asks for a redesign.
- When adding anime-specific content, wire it through `sampleAnime.ts` first.
- When the work needs episode, cast, staff, or review data from Annict, update `src/data/annictCache.ts` and keep the shape deterministic.
- Before changing media sections, check both:
  - `src/components/detail/YouTubeEmbed.tsx`
  - `src/components/detail/VideoGallery.tsx`
- Before changing character presentation, check which branch `AnimeDetailPage.tsx` uses:
  - `OfficialCharacterSection`
  - `CharacterGrid`
  - `CharacterShowcase`

## Known Hotspots

- `src/data/sampleAnime.ts` is the main local content registry and is large.
- `src/index.css` is the main stylesheet and contains page-specific sections.
- `src/pages/AnimeDetailPage.tsx` orchestrates most detail-page sections and is the main integration point.

## Preferred Agent Flow

1. Read the relevant focused doc in `docs/`.
2. Inspect the target component and its data source.
3. Change data shape first if needed.
4. Add or update the UI component.
5. Wire it into `AnimeDetailPage.tsx` or the relevant page.
6. Run `npm run build` before handing off.
