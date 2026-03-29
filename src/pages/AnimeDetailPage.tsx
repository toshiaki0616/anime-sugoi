import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PosterSection from "../components/detail/PosterSection";
import CharacterShowcase from "../components/detail/CharacterShowcase";
import CharacterGrid from "../components/detail/CharacterGrid";
import OfficialCharacterSection from "../components/detail/OfficialCharacterSection";
import EpisodeReviewSection from "../components/detail/EpisodeReviewSection";
import InfoTableStack from "../components/detail/InfoTableStack";
import YouTubeEmbed from "../components/detail/YouTubeEmbed";
import MusicSection from "../components/detail/MusicSection";
import FanVideoSection from "../components/detail/FanVideoSection";
import GifGallerySection from "../components/detail/GifGallerySection";
import VideoGallery from "../components/detail/VideoGallery";
import GlitchEffect from "../components/detail/GlitchEffect";
import AnimeShowcaseSection from "../components/detail/AnimeShowcaseSection";
import TechniqueShowcaseSection from "../components/detail/TechniqueShowcaseSection";
import ParticleBackground from "../components/shared/ParticleBackground";
import PageTransition from "../components/layout/PageTransition";
import { annictCache } from "../data/annictCache";
import { animeGifGalleryById } from "../data/animeGifGallery";
import { frierenInfoTables } from "../data/frierenInfoTables";
import { useAnimeDetail } from "../hooks/useAnimeData";
import { useLenis } from "../hooks/useLenis";
import { getTheme } from "../lib/animeThemes";
import { GENRE_JA, SEASON_JA, STATUS_JA } from "../lib/labels";

gsap.registerPlugin(ScrollTrigger);

export default function AnimeDetailPage() {
  useLenis();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const animeId = Number.parseInt(id ?? "0", 10);
  const { data: anime, loading } = useAnimeDetail(animeId);
  const theme = getTheme(animeId);
  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!anime || !bannerRef.current || !bannerImgRef.current) {
      return;
    }

    const trigger = gsap.to(bannerImgRef.current, {
      y: "25%",
      ease: "none",
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [anime]);

  if (loading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner" />
        <p>Loading anime data...</p>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="detail-error">
        <p>Anime not found.</p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const cssVars = {
    "--theme-color": anime.themeColor,
    "--accent-color": anime.accentColor,
  } as React.CSSProperties;

  const annictData = annictCache[anime.id];
  const annictEpisodes = annictData?.episodes ?? [];
  const annictCasts = annictData?.casts ?? [];
  const annictStaffs = annictData?.staffs ?? [];
  const watchersCount = annictData?.watchersCount ?? 0;
  const communityReviews = anime.communityReviews ?? [];
  const relatedContents = anime.relatedContents ?? [];
  const annictReviewAssetPath =
    anime.id === 20260116 ? "/frieren/annict-comments.json" : null;
  const gifGalleryItems = animeGifGalleryById[anime.id] ?? [];
  const showFrierenInfoTables = anime.id === 20260116;

  return (
    <PageTransition themeColor={anime.themeColor}>
      <div className={`detail-page mood-${anime.mood}`} style={cssVars}>
        {theme && <ParticleBackground config={theme.particleConfig} />}
        {theme && <GlitchEffect enabled={theme.glitchEnabled} />}

        {anime.bannerImage && (
          <div ref={bannerRef} className="detail-banner">
            <img
              ref={bannerImgRef}
              src={anime.bannerImage}
              alt=""
              className="banner-image"
            />
            <div className="banner-overlay" />
          </div>
        )}

        <div className="detail-container">
          <motion.button
            className="back-button"
            onClick={() => navigate("/")}
            whileHover={{ x: -4 }}
          >
            Back to Home
          </motion.button>

          <div className="detail-main">
            <PosterSection anime={anime} />

            <div className="detail-info">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="detail-meta-top">
                  <span className="detail-score">{anime.averageScore ?? "--"}</span>
                  <span className="detail-status">
                    {STATUS_JA[anime.status] ?? anime.status}
                  </span>
                  {watchersCount > 0 && (
                    <span className="detail-annict-pill">
                      ANNICT {watchersCount.toLocaleString()} WATCHERS
                    </span>
                  )}
                </div>

                <h1 className="detail-title">{anime.title.native}</h1>
                <p className="detail-romaji">{anime.title.romaji}</p>

                <div className="detail-stats">
                  <div className="stat">
                    <span className="stat-label">Episodes</span>
                    <span className="stat-value">{anime.episodes}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Season</span>
                    <span className="stat-value">
                      {SEASON_JA[anime.season] ?? anime.season}
                      {anime.seasonYear}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Studio</span>
                    <span className="stat-value">
                      {anime.studios.nodes?.[0]?.name ?? "--"}
                    </span>
                  </div>
                </div>

                <div className="detail-genres">
                  {(anime.genres ?? []).map((genre) => (
                    <span key={genre} className="genre-tag">
                      {GENRE_JA[genre] ?? genre}
                    </span>
                  ))}
                </div>

                <p className="detail-description">{anime.description}</p>
              </motion.div>
            </div>
          </div>

          {showFrierenInfoTables && (
            <InfoTableStack
              kicker="しょぼカレ"
              sections={frierenInfoTables}
              sourceHref="https://cal.syoboi.jp/tid/7629"
              sourceLabel="cal.syoboi.jp/tid/7629"
            />
          )}

          {(annictEpisodes.length > 0 ||
            ((!showFrierenInfoTables && annictCasts.length > 0) ||
              (!showFrierenInfoTables && annictStaffs.length > 0))) && (
            <section className="detail-data-grid" aria-label="Annict supplemental data">
              {annictEpisodes.length > 0 && (
                <article className="detail-data-panel episode-section">
                  <div className="detail-panel-header">
                    <span className="detail-panel-kicker">ANNICT</span>
                    <h3 className="detail-panel-title">EPISODES</h3>
                  </div>
                  <div className="detail-panel-list">
                    {annictEpisodes.map((episode, index) => (
                      <div
                        key={`${episode.numberText ?? episode.number ?? index}-${episode.title ?? "untitled"}`}
                        className="episode-row"
                      >
                        <span className="ep-number">
                          {episode.numberText ??
                            (episode.number != null
                              ? `#${episode.number}`
                              : `#${index + 1}`)}
                        </span>
                        <span className="ep-title">{episode.title ?? "UNTITLED"}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {!showFrierenInfoTables && annictCasts.length > 0 && (
                <article className="detail-data-panel cast-section">
                  <div className="detail-panel-header">
                    <span className="detail-panel-kicker">ANNICT</span>
                    <h3 className="detail-panel-title">CAST</h3>
                  </div>
                  <div className="detail-panel-list">
                    {annictCasts.map((cast, index) => (
                      <div
                        key={`${cast.characterName}-${cast.personName}-${index}`}
                        className="staff-row"
                      >
                        <span className="staff-role">{cast.characterName}</span>
                        <span className="staff-name">{cast.personName}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {!showFrierenInfoTables && annictStaffs.length > 0 && (
                <article className="detail-data-panel staff-section">
                  <div className="detail-panel-header">
                    <span className="detail-panel-kicker">ANNICT</span>
                    <h3 className="detail-panel-title">STAFF</h3>
                  </div>
                  <div className="detail-panel-list">
                    {annictStaffs.map((staff, index) => (
                      <div
                        key={`${staff.role}-${staff.name}-${index}`}
                        className="staff-row"
                      >
                        <span className="staff-role">{staff.role}</span>
                        <span className="staff-name">{staff.name}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </section>
          )}

          {annictReviewAssetPath && (
            <EpisodeReviewSection animeId={anime.id} assetPath={annictReviewAssetPath} />
          )}

          {(communityReviews.length > 0 || relatedContents.length > 0) &&
            !annictReviewAssetPath && (
            <section className="detail-extra-grid" aria-label="Extended anime content">
              {communityReviews.length > 0 && (
                <article className="detail-extra-panel">
                  <div className="detail-panel-header">
                    <span className="detail-panel-kicker">COMMUNITY</span>
                    <h3 className="detail-panel-title">みんなの感想</h3>
                  </div>
                  <div className="detail-review-list">
                    {communityReviews.map((review) => (
                      <a
                        key={`${review.title}-${review.href ?? review.source ?? "local"}`}
                        className="detail-review-card"
                        href={review.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <p className="detail-review-title">{review.title}</p>
                        <p className="detail-review-summary">{review.summary}</p>
                        {(review.source || review.href) && (
                          <span className="detail-review-source">
                            {review.source ?? "External link"}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                </article>
              )}

              {relatedContents.length > 0 && (
                <article className="detail-extra-panel">
                  <div className="detail-panel-header">
                    <span className="detail-panel-kicker">GUIDE</span>
                    <h3 className="detail-panel-title">関連コンテンツ</h3>
                  </div>
                  <div className="detail-link-list">
                    {relatedContents.map((content) => (
                      <a
                        key={content.href}
                        href={content.href}
                        target="_blank"
                        rel="noreferrer"
                        className="detail-link-card"
                      >
                        <span className="detail-link-title">{content.title}</span>
                        {content.meta && (
                          <span className="detail-link-meta">{content.meta}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </article>
              )}
            </section>
          )}

          {relatedContents.length > 0 && annictReviewAssetPath && (
            <section className="detail-extra-grid" aria-label="Extended anime content">
              <article className="detail-extra-panel">
                <div className="detail-panel-header">
                  <span className="detail-panel-kicker">GUIDE</span>
                  <h3 className="detail-panel-title">関連コンテンツ</h3>
                </div>
                <div className="detail-link-list">
                  {relatedContents.map((content) => (
                    <a
                      key={content.href}
                      href={content.href}
                      target="_blank"
                      rel="noreferrer"
                      className="detail-link-card"
                    >
                      <span className="detail-link-title">{content.title}</span>
                      {content.meta && (
                        <span className="detail-link-meta">{content.meta}</span>
                      )}
                    </a>
                  ))}
                </div>
              </article>
            </section>
          )}

          {anime.id === 20260116 ? (
            <OfficialCharacterSection anime={anime} />
          ) : anime.id === 201903 ? (
            <CharacterGrid anime={anime} />
          ) : (
            <CharacterShowcase anime={anime} />
          )}

          <MusicSection anime={anime} />
          <YouTubeEmbed anime={anime} />
          <VideoGallery anime={anime} />
          {anime.id !== 20260116 && <GifGallerySection items={gifGalleryItems} />}
          <FanVideoSection anime={anime} />

          {anime.id === 201903 && (
            <>
              <AnimeShowcaseSection />
              <TechniqueShowcaseSection />
            </>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
