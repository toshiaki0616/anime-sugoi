# Repo Map

## Top Level

- `src/`: application source
- `public/`: static assets, including local anime images such as `public/frieren/`
- `scripts/`: utility scripts, including Annict cache generation
- `tasks/`: planning and handoff notes

## Source Layout

### Pages

- `src/pages/HomePage.tsx`
  - landing page and anime listing entry
- `src/pages/AnimeDetailPage.tsx`
  - main anime detail composition point
- `src/pages/showcase/GifMaker.tsx`
  - standalone GIF maker showcase
- `src/pages/*ShowcasePage.tsx`
  - visual showcase pages for experiments and references

### Data

- `src/data/sampleAnime.ts`
  - local anime registry
  - stores hand-authored descriptions, music, promo videos, links, and special-case character data
- `src/data/annictCache.ts`
  - cached Annict data used at runtime
  - good place for episode lists, cast, staff, watchers, and episode reviews

### Data Access

- `src/hooks/useAnimeData.ts`
  - source of list/detail loading
  - the `ANIME_IDS` array controls which anime appear in the app
- `src/lib/anilist.ts`
  - fetches AniList data
  - merges AniList results with local overrides from `sampleAnime.ts`
  - respects `forceLocal` entries

### Detail Components

- `src/components/detail/PosterSection.tsx`
- `src/components/detail/MusicSection.tsx`
- `src/components/detail/YouTubeEmbed.tsx`
- `src/components/detail/VideoGallery.tsx`
- `src/components/detail/FanVideoSection.tsx`
- `src/components/detail/CharacterShowcase.tsx`
- `src/components/detail/CharacterGrid.tsx`
- `src/components/detail/OfficialCharacterSection.tsx`

### Styling

- `src/index.css`
  - global styles
  - detail page sections are mostly styled here

## Main Integration Point

If a feature changes the anime detail experience, start with:

- `src/pages/AnimeDetailPage.tsx`

This file decides:

- which data panels render
- which character UI variant is used
- where media, music, reviews, and related content appear

## Practical Navigation

- Adding a new anime:
  - `src/data/sampleAnime.ts`
  - `src/hooks/useAnimeData.ts`
  - `src/lib/anilist.ts` if `forceLocal` is needed
- Adding Annict-backed metadata:
  - `scripts/fetch-annict.ts`
  - `src/data/annictCache.ts`
  - `src/pages/AnimeDetailPage.tsx`
- Changing visual behavior:
  - target component in `src/components/detail/`
  - corresponding selectors in `src/index.css`
