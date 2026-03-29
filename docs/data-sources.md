# Data Sources

## Overview

This app mixes remote metadata and local curated content.

## 1. AniList

File:

- `src/lib/anilist.ts`

Purpose:

- fetch base anime metadata
- provide title, description, images, genres, score, season, studio, and default characters

Notes:

- The AniList fetch is the default path for most works.
- Vite proxy is used in development for the AniList endpoint.
- The result is normalized and then merged with local data from `sampleAnime.ts`.

## 2. Local Overrides In `sampleAnime.ts`

File:

- `src/data/sampleAnime.ts`

Purpose:

- enrich or override AniList data with project-specific content

Typical fields authored here:

- `themeColor`
- `accentColor`
- `mood`
- `music`
- `fanVideos`
- `promotionalVideos`
- `communityReviews`
- `relatedContents`
- character descriptions
- anime-specific local image paths

Use `forceLocal: true` when a title should render fully from local data instead of AniList.

## 3. Annict Cache

File:

- `src/data/annictCache.ts`

Purpose:

- store runtime-safe cached Annict metadata

Recommended content for this file:

- `watchersCount`
- episode list
- cast list
- staff list
- per-episode review/comment payloads

Why cached:

- keeps the app fast and deterministic
- avoids runtime dependence on Annict API
- lets us curate the exact shape needed by the UI

## 4. Static Assets

Directory:

- `public/`

Purpose:

- store images and other media that should not depend on third-party hotlinks

Example:

- `public/frieren/`

Prefer local static assets when:

- official site hotlinks are unstable
- visual fidelity matters
- a section should still work offline or after remote asset changes

## 5. Annict Refresh Script

File:

- `scripts/fetch-annict.ts`

Purpose:

- fetch and rebuild `src/data/annictCache.ts`

Requirements:

- `.env` should contain `ANNICT_TOKEN`

Use this when:

- a work gains new Annict episode data
- cast/staff changes must be reflected
- you add per-episode review support

## Data Merge Order

At a high level:

1. Load local sample by id
2. If `forceLocal`, return local sample immediately
3. Otherwise fetch AniList
4. Merge AniList with local overrides
5. Read Annict cache separately in the detail page

This means:

- core anime object comes from AniList plus local overrides
- Annict supplemental panels are read independently from `annictCache`
