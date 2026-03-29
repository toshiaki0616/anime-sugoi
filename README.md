# anime-sugoi

アニメ作品ごとの世界観を、強いビジュアル演出つきで見せる React + TypeScript + Vite 製のショーケースアプリです。  
一覧ページから作品詳細へ遷移し、キャラクター、音楽、動画、Annict 補足情報、各種演出セクションを表示します。

## Stack

- React 19
- TypeScript
- Vite 7
- Framer Motion
- GSAP + ScrollTrigger
- Lenis
- tsParticles

## Setup

```bash
npm ci
npm run dev
```

主なコマンド:

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run fetch-annict`

## Data Flow

このアプリは 3 系統のデータを組み合わせて表示します。

1. AniList
   - 基本的な作品情報を取得します。
   - 実装: `src/lib/anilist.ts`
2. `sampleAnime.ts`
   - ローカルで管理する説明文、演出用カラー、音楽、動画、関連リンク、作品固有 UI 用データを持ちます。
   - 実装: `src/data/sampleAnime.ts`
3. Annict cache
   - 視聴者数、話数、キャスト、スタッフなどの補足データを静的キャッシュとして持ちます。
   - 実装: `src/data/annictCache.ts`

`forceLocal: true` の作品は AniList ではなくローカル定義を優先して表示します。

## Main Files

- `src/pages/HomePage.tsx`
  - 一覧ページ
- `src/pages/AnimeDetailPage.tsx`
  - 詳細ページの統合ポイント
- `src/hooks/useAnimeData.ts`
  - 一覧・詳細の取得入口
- `src/lib/anilist.ts`
  - AniList 取得とローカル上書きの統合
- `src/data/sampleAnime.ts`
  - ローカル作品データ
- `src/data/annictCache.ts`
  - Annict 補足データ
- `src/index.css`
  - 全体スタイルと詳細ページ用スタイル

## Adding Or Updating Anime Content

新しい作品や作品固有コンテンツを足すときは、基本的に次の順で触ります。

1. `src/data/sampleAnime.ts` に作品情報や補足コンテンツを追加
2. `src/hooks/useAnimeData.ts` の `ANIME_IDS` に追加
3. 必要なら `src/lib/anilist.ts` で `forceLocal` を使う
4. Annict 補足が必要なら `src/data/annictCache.ts` を更新
5. 詳細ページ側で表示を増やすなら `src/pages/AnimeDetailPage.tsx` と `src/components/detail/` を更新

## Static Assets

外部画像の直リンクが不安定な場合は `public/` に保存して参照します。

例:

- `public/frieren/`

## Annict Cache

Annict 補足データの更新は次のコマンドを使います。

```bash
npm run fetch-annict
```

`.env` に `ANNICT_TOKEN` が必要です。

## Docs

エージェント向けの案内は次を参照してください。

- [AGENTS.md](./AGENTS.md)
- [docs/repo-map.md](./docs/repo-map.md)
- [docs/data-sources.md](./docs/data-sources.md)
- [docs/detail-page-playbook.md](./docs/detail-page-playbook.md)
