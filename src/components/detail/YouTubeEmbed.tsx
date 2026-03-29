import { useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AnimeData } from "../../data/sampleAnime";
import { parseYouTubeId } from "../../lib/parseYouTubeId";

interface StoredVideo {
  id: string;
  title: string;
}

interface VideoTab {
  id: string;
  label: string;
  isUserAdded: boolean;
}

interface Props {
  anime: AnimeData;
}

function loadStored(animeId: number): StoredVideo[] {
  try {
    const raw = localStorage.getItem(`yt-user-${animeId}`);
    return raw ? (JSON.parse(raw) as StoredVideo[]) : [];
  } catch {
    return [];
  }
}

function saveStored(animeId: number, videos: StoredVideo[]): void {
  try {
    localStorage.setItem(`yt-user-${animeId}`, JSON.stringify(videos));
  } catch {
    /* ignore */
  }
}

export default function YouTubeEmbed({ anime }: Props) {
  const [stored, setStored] = useState<StoredVideo[]>(() => loadStored(anime.id));
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const tabs: VideoTab[] = useMemo(
    () => [
      ...(anime.youtubeTrailerId
        ? [{ id: anime.youtubeTrailerId, label: "公式PV", isUserAdded: false }]
        : []),
      ...stored.map((video) => ({
        id: video.id,
        label: video.title,
        isUserAdded: true,
      })),
    ],
    [anime.youtubeTrailerId, stored]
  );

  const [activeId, setActiveId] = useState<string | null>(tabs[0]?.id ?? null);
  const resolvedId = tabs.find((tab) => tab.id === activeId)?.id ?? tabs[0]?.id ?? null;
  const activeTab = tabs.find((tab) => tab.id === resolvedId) ?? null;
  const hasVideo = resolvedId !== null;

  const handleAdd = useCallback(() => {
    const videoId = parseYouTubeId(urlInput);
    if (!videoId) {
      setUrlError("有効な YouTube URL か動画 ID を入力してください。");
      return;
    }
    if (tabs.some((tab) => tab.id === videoId)) {
      setUrlError("その動画はすでに追加されています。");
      return;
    }

    const nextStored = [
      ...stored,
      {
        id: videoId,
        title: `追加動画 ${stored.length + 1}`,
      },
    ];

    setStored(nextStored);
    saveStored(anime.id, nextStored);
    setActiveId(videoId);
    setUrlInput("");
    setUrlError(null);
    setIsAddOpen(false);
  }, [anime.id, stored, tabs, urlInput]);

  const handleDelete = useCallback(
    (id: string) => {
      const nextStored = stored.filter((video) => video.id !== id);
      setStored(nextStored);
      saveStored(anime.id, nextStored);
      if (activeId === id) {
        const nextActive = tabs.filter((tab) => tab.id !== id)[0]?.id ?? null;
        setActiveId(nextActive);
      }
    },
    [activeId, anime.id, stored, tabs]
  );

  const watchUrl = resolvedId ? `https://www.youtube.com/watch?v=${resolvedId}` : null;
  const thumbnailUrl = resolvedId
    ? `https://img.youtube.com/vi/${resolvedId}/maxresdefault.jpg`
    : null;

  return (
    <section className="movie-section">
      <div className="movie-header">
        <h2 className="movie-title">MOVIE</h2>
        <motion.button
          className="movie-add-btn"
          onClick={() => {
            setIsAddOpen((value) => !value);
            setUrlError(null);
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {isAddOpen ? "閉じる" : "+ URL を追加"}
        </motion.button>
      </div>

      <AnimatePresence>
        {isAddOpen && (
          <motion.div
            className="movie-add-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="movie-add-hint">
              YouTube URL か動画 ID を入力すると、この作品ページに追加できます。
            </p>
            <div className="movie-add-row">
              <input
                className="movie-url-input"
                type="text"
                placeholder="https://youtu.be/xxxxx または動画ID"
                value={urlInput}
                onChange={(event) => {
                  setUrlInput(event.target.value);
                  setUrlError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleAdd();
                }}
                autoFocus
              />
              <button className="movie-add-confirm" onClick={handleAdd}>
                追加
              </button>
            </div>
            {urlError && <p className="movie-add-error">{urlError}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {!hasVideo && !isAddOpen && (
        <motion.div
          className="movie-empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="movie-empty-icon">VIDEO</span>
          <p>再生できる動画がまだありません。</p>
        </motion.div>
      )}

      {tabs.length > 1 && (
        <div className="movie-tabs">
          {tabs.map((tab) => (
            <div key={tab.id} className="movie-tab-item">
              <button
                className={`movie-tab ${tab.id === resolvedId ? "movie-tab--active" : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                {tab.label}
              </button>
              {tab.isUserAdded && (
                <button
                  className="movie-tab-delete"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(tab.id);
                  }}
                  title="削除"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {resolvedId && watchUrl && (
        <motion.a
          key={resolvedId}
          href={watchUrl}
          target="_blank"
          rel="noreferrer"
          className="video-launch-card"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {thumbnailUrl && (
            <img
              className="video-launch-thumb"
              src={thumbnailUrl}
              alt={activeTab?.label ?? "YouTube preview"}
            />
          )}
          <div className="video-launch-shade" />
          <div className="video-launch-content">
            <span className="video-launch-kicker">YOUTUBE</span>
            <h3 className="video-launch-title">{activeTab?.label ?? "公式PV"}</h3>
            <p className="video-launch-description">
              埋め込み再生ではなく、YouTube を新しいタブで開く表示にしています。
            </p>
            <span className="video-launch-button">YouTubeで見る</span>
          </div>
        </motion.a>
      )}
    </section>
  );
}
