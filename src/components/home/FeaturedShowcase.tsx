import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import type { AnimeData } from "../../data/sampleAnime";
import { GENRE_JA } from "../../lib/labels";

interface FeaturedShowcaseProps {
  animeList: AnimeData[];
}

export default function FeaturedShowcase({ animeList }: FeaturedShowcaseProps) {
  const featured = animeList.filter((a) => a.featured);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const kenBurnsTween = useRef<gsap.core.Tween | null>(null);
  const navigate = useNavigate();

  const current = featured[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + featured.length) % featured.length);
    },
    [featured.length]
  );

  // 自動スライド（6秒）
  useEffect(() => {
    if (isPaused || featured.length <= 1) return;
    const timer = setInterval(() => goTo(activeIndex + 1), 6000);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, goTo, featured.length]);

  // キーボード操作
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goTo]);

  // Ken Burns エフェクト（スライド切り替えのたびにリセット）
  useEffect(() => {
    if (!bgRef.current) return;
    kenBurnsTween.current?.kill();
    gsap.set(bgRef.current, { scale: 1 });
    kenBurnsTween.current = gsap.to(bgRef.current, {
      scale: 1.08,
      duration: 6,
      ease: "none",
    });
    return () => {
      kenBurnsTween.current?.kill();
    };
  }, [activeIndex]);

  if (featured.length === 0) return null;

  const bgImage = current.bannerImage ?? current.coverImage.extraLarge;
  const genres = current.genres.slice(0, 3);
  const studio = current.studios.nodes[0]?.name ?? "—";

  return (
    <section
      className="featured-showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="注目作品スライダー"
    >
      {/* 背景レイヤー */}
      <div className="featured-bg">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeIndex}
            className="featured-bg-image"
            ref={bgRef}
            style={{ backgroundImage: `url(${bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AnimatePresence>
        {/* テーマカラーベースのグラデーションオーバーレイ */}
        <div
          className="featured-bg-overlay"
          style={{
            background: `linear-gradient(
              105deg,
              ${current.themeColor}40 0%,
              transparent 60%
            )`,
          }}
        />
        {/* 下部フェードアウト → --bg-base へ */}
        <div className="featured-bg-fade" />
      </div>

      {/* コンテンツ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="featured-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="featured-eyebrow">
            <span className="featured-number">
              {String(activeIndex + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
            </span>
            <span className="featured-label">FEATURED</span>
          </div>

          <h2 className="featured-title">{current.title.native}</h2>
          <p className="featured-romaji">{current.title.romaji.toUpperCase()}</p>

          <div className="featured-genres">
            {genres.map((g) => (
              <span key={g} className="featured-genre-tag">
                {GENRE_JA[g] ?? g}
              </span>
            ))}
          </div>

          <div className="featured-meta">
            <span>{studio}</span>
            <span className="featured-meta-divider">|</span>
            <span>{current.seasonYear}</span>
            <span className="featured-meta-divider">|</span>
            <span>{current.episodes === 1 ? "劇場版" : `全${current.episodes}話`}</span>
          </div>

          <button
            className="featured-cta"
            style={{ "--cta-color": current.themeColor } as React.CSSProperties}
            onClick={() => navigate(`/anime/${current.id}`)}
          >
            VIEW DETAIL
            <span className="cta-arrow">→</span>
          </button>
        </motion.div>
      </AnimatePresence>

      {/* ドットインジケーター */}
      <div className="featured-dots" role="tablist" aria-label="スライドインジケーター">
        {featured.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`${item.title.native}へ移動`}
            className={`featured-dot${i === activeIndex ? " active" : ""}`}
            style={
              i === activeIndex
                ? ({ "--dot-color": item.themeColor } as React.CSSProperties)
                : undefined
            }
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* 左右ナビ（モバイルでは非表示） */}
      <button
        className="featured-nav featured-nav-prev"
        onClick={() => goTo(activeIndex - 1)}
        aria-label="前の作品"
      >
        ‹
      </button>
      <button
        className="featured-nav featured-nav-next"
        onClick={() => goTo(activeIndex + 1)}
        aria-label="次の作品"
      >
        ›
      </button>
    </section>
  );
}
