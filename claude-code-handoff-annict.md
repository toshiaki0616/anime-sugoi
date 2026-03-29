# anime-sugoi — Annict データ統合 引き継ぎ指示書

## プロジェクトパス
`C:\work\claude\anime-sugoi`

## 概要
Annict API から取得したアニメ情報（エピソード・キャスト・スタッフ・視聴者数）を
各作品の詳細ページに表示する。

---

## 完了済み作業

### 取得スクリプト
- `scripts/fetch-annict.ts` — Annict GraphQL API からデータ取得
- `npm run fetch-annict` で実行（`.env` に `ANNICT_TOKEN` 必要）

### 生成済みキャッシュ
- `src/data/annictCache.ts` — 自動生成ファイル（手動編集禁止）
- 型定義: `AnnictWorkData`, `AnnictEpisode`, `AnnictCast`, `AnnictStaff`

```typescript
// 使い方
import { annictCache } from "../data/annictCache";
const data = annictCache[anime.id]; // anime.id は number
// data.episodes, data.casts, data.staffs, data.watchersCount
```

### 取得済みデータ内容
| id     | 作品               | エピソード | キャスト | スタッフ | 視聴者数 |
|--------|--------------------|-----------|---------|---------|---------|
| 227    | フリクリ           | 6件        | 13件    | 20件    | 828     |
| 9253   | STEINS;GATE        | 1件        | 0件     | 0件     | 1,826   |
| 2104   | 瀬戸の花嫁         | 4件        | 16件    | 7件     | 728     |
| 16664  | かぐや姫の物語     | 0件        | 4件     | 6件     | 2,193   |
| 2321   | ジャイアントロボ   | 7件        | 0件     | 1件     | 266     |
| 201903 | 超かぐや姫！       | 0件        | 2件     | 20件    | 315     |

---

## 実装してほしい内容

### 1. AnimeDetailPage にスタッフセクション追加

ファイル: `src/pages/AnimeDetailPage.tsx`（または詳細ページの構成要素を確認）

`annictCache[anime.id]?.staffs` を使ってスタッフクレジットを表示する。

```tsx
// 表示例
import { annictCache } from "../data/annictCache";

const annictData = annictCache[anime.id];
const staffs = annictData?.staffs ?? [];

// JSX
<section className="staff-section">
  <h3>スタッフ</h3>
  {staffs.map((s, i) => (
    <div key={i} className="staff-row">
      <span className="staff-role">{s.role}</span>
      <span className="staff-name">{s.name}</span>
    </div>
  ))}
</section>
```

### 2. エピソードリスト表示

`annictCache[anime.id]?.episodes` を使ってエピソード一覧を表示する。

```tsx
const episodes = annictData?.episodes ?? [];

<section className="episode-section">
  <h3>エピソード</h3>
  {episodes.map((ep, i) => (
    <div key={i} className="episode-row">
      <span className="ep-number">{ep.numberText ?? `#${ep.number}`}</span>
      <span className="ep-title">{ep.title ?? "—"}</span>
    </div>
  ))}
</section>
```

### 3. 視聴者数バッジ表示

AnimeCard や詳細ページに Annict 視聴者数を追加する。

```tsx
const watchersCount = annictCache[anime.id]?.watchersCount ?? 0;

// 表示例
{watchersCount > 0 && (
  <span className="annict-badge">
    👁 {watchersCount.toLocaleString()} 視聴
  </span>
)}
```

---

## ファイル構成（関連部分）

```
src/
  data/
    sampleAnime.ts       — アニメデータ定義（AnimeData 型）
    annictCache.ts       — Annict から自動生成（触らない）
  pages/
    AnimeDetailPage.tsx  — 詳細ページ（ここに追加する）
  components/
    detail/              — 詳細ページ用コンポーネント群
      MusicSection.tsx
      CharacterGrid.tsx
      CharacterShowcase.tsx
      VideoGallery.tsx
      FanVideoSection.tsx
      PosterSection.tsx
```

## スタイル方針
- 既存の `src/index.css` に `.staff-section`, `.episode-section` 等を追記
- カラー変数: `--cyan: #00e5ff`, `--magenta: #ff2d78`, `--text-secondary: #8892a4`
- フォント: `"Share Tech Mono", monospace`（モノスペース系）, `"Noto Sans JP"`（日本語）
- BEM 命名規則 `.staff-xxx` で追加すること

## 注意事項
- `annictCache` は `Record<number, AnnictWorkData>` だが JSON キーは文字列になるため
  `annictCache[anime.id]` でアクセスする（TypeScript が自動的に変換する）
- データがない作品（episodes: 0件等）は graceful に非表示にすること
- `.env` の `ANNICT_TOKEN` は絶対にコードに直書きしない
