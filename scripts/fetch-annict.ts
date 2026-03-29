/**
 * Annict GraphQL API から各作品のエピソード・キャスト・スタッフ情報を取得し、
 * src/data/annictCache.ts として出力するスクリプト。
 *
 * 実行: npm run fetch-annict
 */
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const ANNICT_TOKEN = process.env.ANNICT_TOKEN;
if (!ANNICT_TOKEN) {
  console.error("❌ ANNICT_TOKEN が .env に設定されていません");
  process.exit(1);
}

const ANNICT_API = "https://api.annict.com/graphql";

// sampleAnime の作品リスト（id → 検索タイトル のマッピング）
const ANIME_TARGETS: { id: number; searchTitle: string }[] = [
  { id: 227,    searchTitle: "フリクリ" },
  { id: 9253,   searchTitle: "STEINS;GATE" },
  { id: 2104,   searchTitle: "瀬戸の花嫁" },
  { id: 16664,  searchTitle: "かぐや姫の物語" },
  { id: 2321,   searchTitle: "ジャイアントロボ THE ANIMATION" },
  { id: 201903, searchTitle: "超かぐや姫" },
];

const QUERY = `
query SearchWork($title: String!) {
  searchWorks(titles: [$title], first: 1) {
    nodes {
      title
      watchersCount
      episodesCount
      episodes(orderBy: { field: SORT_NUMBER, direction: ASC }, first: 50) {
        nodes {
          number
          numberText
          title
        }
      }
      casts(orderBy: { field: SORT_NUMBER, direction: ASC }, first: 30) {
        nodes {
          character { name }
          person { name }
        }
      }
      staffs(orderBy: { field: SORT_NUMBER, direction: ASC }, first: 20) {
        nodes {
          roleText
          name
        }
      }
    }
  }
}
`;

interface AnnictEpisode {
  number: number | null;
  numberText: string | null;
  title: string | null;
}

interface AnnictCast {
  characterName: string;
  personName: string;
}

interface AnnictStaff {
  role: string;
  name: string;
}

interface AnnictWorkData {
  episodes: AnnictEpisode[];
  casts: AnnictCast[];
  staffs: AnnictStaff[];
  watchersCount: number;
}

async function fetchWork(searchTitle: string): Promise<AnnictWorkData | null> {
  const res = await fetch(ANNICT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ANNICT_TOKEN}`,
    },
    body: JSON.stringify({ query: QUERY, variables: { title: searchTitle } }),
  });

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for "${searchTitle}"`);
    return null;
  }

  const json = (await res.json()) as {
    data?: { searchWorks?: { nodes?: unknown[] } };
    errors?: { message: string }[];
  };

  if (json.errors) {
    console.error(`  API エラー: ${json.errors.map((e) => e.message).join(", ")}`);
    return null;
  }

  const nodes = json.data?.searchWorks?.nodes ?? [];
  if (nodes.length === 0) {
    console.warn(`  ⚠ "${searchTitle}" が Annict で見つかりませんでした`);
    return null;
  }

  const work = nodes[0] as {
    watchersCount: number;
    episodes: { nodes: { number: number | null; numberText: string | null; title: string | null }[] };
    casts: { nodes: { character: { name: string }; person: { name: string } }[] };
    staffs: { nodes: { roleText: string; name: string }[] };
  };

  return {
    watchersCount: work.watchersCount ?? 0,
    episodes: (work.episodes?.nodes ?? []).map((e) => ({
      number: e.number,
      numberText: e.numberText ?? null,
      title: e.title ?? null,
    })),
    casts: (work.casts?.nodes ?? []).map((c) => ({
      characterName: c.character?.name ?? "",
      personName: c.person?.name ?? "",
    })),
    staffs: (work.staffs?.nodes ?? []).map((s) => ({
      role: s.roleText ?? "",
      name: s.name ?? "",
    })),
  };
}

async function main() {
  console.log("🎌 Annict からデータ取得開始...\n");

  const cache: Record<number, AnnictWorkData> = {};

  for (const target of ANIME_TARGETS) {
    console.log(`📡 [${target.id}] "${target.searchTitle}" を取得中...`);
    const data = await fetchWork(target.searchTitle);
    if (data) {
      cache[target.id] = data;
      console.log(
        `  ✅ エピソード:${data.episodes.length}件 キャスト:${data.casts.length}件 スタッフ:${data.staffs.length}件 視聴者:${data.watchersCount}`
      );
    }
    // レート制限対策
    await new Promise((r) => setTimeout(r, 300));
  }

  const outputPath = path.resolve("src/data/annictCache.ts");

  const fileContent = `// このファイルは scripts/fetch-annict.ts によって自動生成されます。手動編集しないでください。
// 最終更新: ${new Date().toISOString()}

export interface AnnictEpisode {
  number: number;
  numberText: string | null;
  title: string | null;
}

export interface AnnictCast {
  characterName: string;
  personName: string;
}

export interface AnnictStaff {
  role: string;
  name: string;
}

export interface AnnictWorkData {
  episodes: AnnictEpisode[];
  casts: AnnictCast[];
  staffs: AnnictStaff[];
  watchersCount: number;
}

export const annictCache: Record<number, AnnictWorkData> = ${JSON.stringify(cache, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`\n✨ ${outputPath} に保存しました`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
