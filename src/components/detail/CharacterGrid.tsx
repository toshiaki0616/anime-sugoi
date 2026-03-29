import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimeData } from "../../data/sampleAnime";

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='230' height='325' viewBox='0 0 230 325'%3E%3Crect width='230' height='325' fill='%230e1018'/%3E%3Ccircle cx='115' cy='110' r='50' fill='%231a1d2e'/%3E%3Cellipse cx='115' cy='290' rx='75' ry='50' fill='%231a1d2e'/%3E%3C/svg%3E";

interface CharacterDetail {
  name: string;
  cvName: string;
  description?: string;
  imageSrc: string;
  labMemberNo?: string;
}

interface Props {
  anime: AnimeData;
}

/** Wikipedia REST API でキャラクター説明文を取得する（日本語 → 英語の順で試みる） */
async function fetchWikipediaDescription(name: string): Promise<string | null> {
  const endpoints = [
    `https://ja.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;

      const data = await res.json();
      // disambiguation ページや短すぎる抜粋は使わない
      if (data.type === "disambiguation") continue;
      if (!data.extract || data.extract.length < 40) continue;

      return data.extract;
    } catch {
      // ネットワークエラーは無視して次のエンドポイントへ
    }
  }
  return null;
}

export default function CharacterGrid({ anime }: Props) {
  const [selected, setSelected] = useState<CharacterDetail | null>(null);
  const [wikiDescription, setWikiDescription] = useState<string | null>(null);
  const [isFetchingDesc, setIsFetchingDesc] = useState(false);

  // モーダルが開いていて AniList の説明文がない場合に Wikipedia から取得
  useEffect(() => {
    if (!selected) {
      setWikiDescription(null);
      return;
    }
    if (selected.description) return;

    setIsFetchingDesc(true);
    setWikiDescription(null);

    fetchWikipediaDescription(selected.name).then((desc) => {
      setWikiDescription(desc);
      setIsFetchingDesc(false);
    });
  }, [selected]);

  const characters = anime.characters.nodes;
  if (characters.length === 0) return null;

  return (
    <>
      <section className="cg-section">
        {/* ── 4隅コーナーフレーム ── */}
        <span className="cs-corner cs-corner--tl" aria-hidden="true" />
        <span className="cs-corner cs-corner--tr" aria-hidden="true" />
        <span className="cs-corner cs-corner--bl" aria-hidden="true" />
        <span className="cs-corner cs-corner--br" aria-hidden="true" />

        {/* ── 見出し ── */}
        <div className="cg-heading">
          <p className="cg-heading-en">CHARACTER</p>
          <p className="cg-heading-ja">登場人物</p>
        </div>

        {/* ── ポートレートグリッド ── */}
        <div className="cg-grid">
          {characters.map((char, i) => {
            const voiceActor = anime.characters.edges[i]?.voiceActors?.[0];
            const displayName = char.name.native || char.name.full;
            const cvDisplayName =
              voiceActor?.name.native || voiceActor?.name.full;

            return (
              <motion.div
                key={char.id}
                className="cg-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                onClick={() =>
                  setSelected({
                    name: displayName,
                    cvName: cvDisplayName ?? "—",
                    description: char.description,
                    imageSrc: char.image.large,
                    labMemberNo: char.labMemberNo,
                  })
                }
              >
                <div className="cg-portrait">
                  <img
                    src={char.image.large}
                    alt={displayName}
                    className="cg-portrait-img"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                    }}
                  />
                  <div className="cg-portrait-overlay">
                    <p className="cg-card-name-vert">{displayName}</p>
                    {cvDisplayName && (
                      <div className="cg-card-cv-pill">
                        <span className="cg-card-cv-badge">CV</span>
                        <span className="cg-card-cv-name">{cvDisplayName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── キャラクター詳細モーダル ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="cg-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="cg-modal"
              initial={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                opacity: 1,
                scale: 1,
              }}
              exit={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                opacity: 0,
                scale: 0.92,
              }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cg-modal-close"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>

              {/* 左: キャラクター画像（contain で全体表示） */}
              <div className="cg-modal-img-wrap">
                <img
                  src={selected.imageSrc}
                  alt={selected.name}
                  className="cg-modal-img"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
              </div>

              {/* 右: 名前・CV・説明 */}
              <div className="cg-modal-info">
                <div className="cg-modal-identity">
                  <p className="cg-modal-name-vert">{selected.name}</p>
                  <div className="cg-modal-cv-pill">
                    <span className="cg-modal-cv-badge">CV</span>
                    <span className="cg-modal-cv-text">{selected.cvName}</span>
                  </div>
                </div>

                {selected.labMemberNo && (
                  <p className="cg-modal-lab">{selected.labMemberNo}</p>
                )}

                {/* 説明文（AniList → Wikipedia の優先順で表示） */}
                {selected.description ? (
                  <p className="cg-modal-desc">{selected.description}</p>
                ) : isFetchingDesc ? (
                  <p className="cg-modal-desc-loading">説明文を取得中…</p>
                ) : wikiDescription ? (
                  <>
                    <p className="cg-modal-desc">{wikiDescription}</p>
                    <p className="cg-modal-source">
                      出典:{" "}
                      <a
                        href={`https://ja.wikipedia.org/wiki/${encodeURIComponent(selected.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cg-modal-source-link"
                      >
                        Wikipedia
                      </a>{" "}
                      (CC BY-SA 4.0)
                    </p>
                  </>
                ) : (
                  <p className="cg-modal-desc-empty">説明文がありません</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
