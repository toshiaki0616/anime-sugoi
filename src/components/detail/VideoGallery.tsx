import { useState } from "react";
import { motion } from "framer-motion";
import type { AnimeData } from "../../data/sampleAnime";

interface Props {
  anime: AnimeData;
}

export default function VideoGallery({ anime }: Props) {
  const videos = anime.promotionalVideos?.filter((video) => video.youtubeId) ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) return null;

  const activeVideo = videos[activeIndex];
  const watchUrl = `https://www.youtube.com/watch?v=${activeVideo.youtubeId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${activeVideo.youtubeId}/maxresdefault.jpg`;

  return (
    <section className="video-gallery-section">
      <h2 className="section-title">動画ギャラリー</h2>

      <div className="video-gallery-strip">
        {videos.map((video, index) => (
          <button
            key={`${video.youtubeId}-${index}`}
            className={`video-gallery-thumb${
              index === activeIndex ? " video-gallery-thumb--active" : ""
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
              alt={video.title}
              className="video-gallery-thumb-image"
            />
            <span className="video-gallery-thumb-label">{video.title}</span>
          </button>
        ))}
      </div>

      <motion.a
        key={activeVideo.youtubeId}
        href={watchUrl}
        target="_blank"
        rel="noreferrer"
        className="video-launch-card video-launch-card--gallery"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      >
        <img
          className="video-launch-thumb"
          src={thumbnailUrl}
          alt={activeVideo.title}
        />
        <div className="video-launch-shade" />
        <div className="video-launch-content">
          <span className="video-launch-kicker">PROMOTIONAL VIDEO</span>
          <h3 className="video-launch-title">{activeVideo.title}</h3>
          <p className="video-launch-description">
            クリックすると YouTube を新しいタブで開きます。
          </p>
          <span className="video-launch-button">動画を見る</span>
        </div>
      </motion.a>
    </section>
  );
}
