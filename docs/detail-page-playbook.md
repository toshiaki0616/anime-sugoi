# Detail Page Playbook

## Primary File

- `src/pages/AnimeDetailPage.tsx`

This page is the assembly layer for most anime-specific experiences.

## Existing Section Pattern

The detail page currently composes sections in this rough order:

1. Banner
2. Poster and summary info
3. Annict data panels
4. Review and related content panels
5. Character section
6. Music
7. Trailer and promo video areas
8. Fan videos

When adding a new section, decide:

- is it global for all anime?
- is it only for one anime id?
- does it depend on local content, AniList, or Annict cache?

## Character UI Variants

The page already branches between multiple character presentations:

- `OfficialCharacterSection`
- `CharacterGrid`
- `CharacterShowcase`

Before changing character behavior, check which branch the anime id takes.

## Best Place For New Per-Episode UI

If the feature depends on Annict episode data, follow this pattern:

1. Add the new typed shape to `src/data/annictCache.ts`
2. Read it in `AnimeDetailPage.tsx`
3. Create a dedicated component in `src/components/detail/`
4. Add styles in `src/index.css`

Do not overload existing generic review cards if the interaction model changes.

## Recommended Pattern For Review UI

For episode-by-episode Annict comments:

- use one focused component such as `EpisodeReviewSection.tsx`
- include:
  - episode selector or horizontal tabs
  - visible comment count
  - author handle
  - likes or reaction signal
  - timestamp
  - comment body

Keep the payload precomputed in cache rather than formatting raw API output in the page.

## Recommended Pattern For Media UI

For media galleries such as GIF strips or promo cards:

- use a dedicated component
- keep the source list on the anime data object
- use local assets in `public/` if the media must be stable

Good fit for `sampleAnime.ts`:

- curated GIF list
- promo stills
- custom captions

## When To Add A New Component

Create a new detail component when one of these is true:

- the section has its own interaction state
- the section is anime-specific
- the markup is more than a small panel
- the CSS would otherwise sprawl in `AnimeDetailPage.tsx`

## Verification Checklist

Before handing off:

1. `npm run build`
2. confirm the target anime id still renders
3. confirm no broken image or media placeholders remain
4. confirm the section degrades safely when data is missing
