import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimeData } from "../../data/sampleAnime";

interface Props {
  anime: AnimeData;
}

export default function OfficialCharacterSection({ anime }: Props) {
  const characters = anime.characters.nodes;
  const [activeIndex, setActiveIndex] = useState(0);

  const entries = useMemo(
    () =>
      characters.map((character, index) => ({
        character,
        voiceActor: anime.characters.edges[index]?.voiceActors?.[0] ?? null,
      })),
    [anime.characters.edges, characters]
  );

  if (entries.length === 0) return null;

  const activeEntry = entries[activeIndex];
  const activeName =
    activeEntry.character.name.native || activeEntry.character.name.full;
  const activeCv =
    activeEntry.voiceActor?.name.native ||
    activeEntry.voiceActor?.name.full ||
    "CV未掲載";

  return (
    <section className="frieren-char-section">
      <div className="frieren-char-header">
        <p className="frieren-char-kicker">CHARACTER</p>
        <h2 className="frieren-char-title">キャラクター</h2>
      </div>

      <div className="frieren-char-stage">
        <div className="frieren-char-visual">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeEntry.character.id}
              src={activeEntry.character.image.large}
              alt={activeName}
              className="frieren-char-image"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            />
          </AnimatePresence>
        </div>

        <div className="frieren-char-detail">
          <AnimatePresence mode="wait">
            <motion.div
              key={`detail-${activeEntry.character.id}`}
              className="frieren-char-copy"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              <p className="frieren-char-label">CHARACTER PROFILE</p>
              <h3 className="frieren-char-name">{activeName}</h3>
              <p className="frieren-char-cv">CV. {activeCv}</p>
              {activeEntry.character.description && (
                <p className="frieren-char-description">
                  {activeEntry.character.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="frieren-char-controls">
            <button
              className="frieren-char-nav"
              onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
              disabled={activeIndex === 0}
            >
              PREV
            </button>
            <span className="frieren-char-counter">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(entries.length).padStart(2, "0")}
            </span>
            <button
              className="frieren-char-nav"
              onClick={() =>
                setActiveIndex((prev) => Math.min(prev + 1, entries.length - 1))
              }
              disabled={activeIndex === entries.length - 1}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      <div className="frieren-char-rail" role="tablist" aria-label="Characters">
        {entries.map((entry, index) => {
          const label =
            entry.character.name.native || entry.character.name.full;
          return (
            <button
              key={entry.character.id}
              className={`frieren-char-thumb${
                index === activeIndex ? " frieren-char-thumb--active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={entry.character.image.medium}
                alt={label}
                className="frieren-char-thumb-image"
              />
              <span className="frieren-char-thumb-name">{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
