import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type MouseEvent,
} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { annictCache } from "../../data/annictCache";
import { animeHoverPreviewById } from "../../data/animeHoverPreview";
import {
  deleteHoverPreview,
  getHoverPreviewsByAnimeId,
  saveHoverPreview,
  type StoredHoverPreviewItem,
} from "../../lib/db";
import { convertToWebm } from "../../lib/webm";
import type { AnimeData } from "../../data/sampleAnime";
import { GENRE_JA } from "../../lib/labels";

interface Props {
  anime: AnimeData;
  index: number;
}

interface RuntimeHoverPreview {
  kind: "image" | "video";
  src: string;
  loop: boolean;
  muted: boolean;
}

function PosterImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="card-image-placeholder">
        <span className="placeholder-text">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="card-image"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}

function stopCardNavigation(event: MouseEvent<HTMLElement>) {
  event.stopPropagation();
}

export default function AnimeCard({ anime, index }: Props) {
  const navigate = useNavigate();
  const watchersCount = annictCache[anime.id]?.watchersCount ?? 0;
  const [isHovered, setIsHovered] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [storedPreviews, setStoredPreviews] = useState<StoredHoverPreviewItem[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<RuntimeHoverPreview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fallbackPreview = animeHoverPreviewById[anime.id];

  useEffect(() => {
    let active = true;

    void getHoverPreviewsByAnimeId(anime.id).then((items) => {
      if (active) {
        setStoredPreviews(items);
      }
    });

    return () => {
      active = false;
    };
  }, [anime.id]);

  const storedPreviewUrls = useMemo(
    () =>
      storedPreviews.map((item) => ({
        id: item.id,
        url: URL.createObjectURL(item.blob),
        mimeType: item.mimeType,
      })),
    [storedPreviews]
  );

  useEffect(() => {
    return () => {
      storedPreviewUrls.forEach((item) => URL.revokeObjectURL(item.url));
    };
  }, [storedPreviewUrls]);

  useEffect(() => {
    if (!isHovered) {
      setSelectedPreview(null);
      return;
    }

    if (storedPreviewUrls.length > 0) {
      const chosen =
        storedPreviewUrls[Math.floor(Math.random() * storedPreviewUrls.length)];
      setSelectedPreview({
        kind: chosen.mimeType.startsWith("video/") ? "video" : "image",
        src: chosen.url,
        loop: true,
        muted: true,
      });
      return;
    }

    if (fallbackPreview?.videoSrc) {
      setSelectedPreview({
        kind: "video",
        src: fallbackPreview.videoSrc,
        loop: fallbackPreview.loop ?? true,
        muted: fallbackPreview.muted ?? true,
      });
      return;
    }

    if (fallbackPreview?.posterImageSrc) {
      setSelectedPreview({
        kind: "image",
        src: fallbackPreview.posterImageSrc,
        loop: true,
        muted: true,
      });
      return;
    }

    setSelectedPreview(null);
  }, [fallbackPreview, isHovered, storedPreviewUrls]);

  useEffect(() => {
    const video = previewVideoRef.current;
    if (!video) {
      return;
    }

    if (isHovered && selectedPreview?.kind === "video") {
      void video.play().catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isHovered, selectedPreview]);

  async function processPreviewFiles(files: File[]): Promise<void> {
    if (files.length === 0) {
      return;
    }

    if (storedPreviews.length >= 5) {
      setPreviewError("プレビュー素材は5つまでです。");
      return;
    }

    const accepted = files.filter(
      (file) =>
        file.type === "image/gif" ||
        file.type === "video/mp4" ||
        file.type === "video/webm"
    );

    if (accepted.length !== files.length) {
      setPreviewError("GIF / mp4 / webm だけ追加できます。");
      return;
    }

    const remaining = 5 - storedPreviews.length;
    const nextFiles = accepted.slice(0, remaining);

    try {
      setIsConverting(true);
      setPreviewError(null);

      const convertedFiles = await Promise.all(
        nextFiles.map((file) => convertToWebm(file))
      );

      const nextItems: StoredHoverPreviewItem[] = convertedFiles.map(
        (file, fileIndex) => ({
          id: `${anime.id}-${Date.now()}-${fileIndex}`,
          animeId: anime.id,
          fileName: file.name,
          mimeType: file.type,
          createdAt: new Date().toISOString(),
          blob: file,
        })
      );

      await Promise.all(nextItems.map((item) => saveHoverPreview(item)));
      setStoredPreviews((current) => [...nextItems, ...current].slice(0, 5));
      setPreviewError(
        accepted.length > remaining
          ? "5つまで保存したので、残りは追加していません。"
          : null
      );
      setIsEditOpen(true);
    } catch (error) {
      setPreviewError(
        error instanceof Error
          ? `webm 変換に失敗しました: ${error.message}`
          : "webm 変換に失敗しました。"
      );
    } finally {
      setIsConverting(false);
    }
  }

  async function handlePreviewFiles(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    await processPreviewFiles(files);
  }

  async function handleDrop(event: DragEvent<HTMLDivElement>): Promise<void> {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    await processPreviewFiles(Array.from(event.dataTransfer.files ?? []));
  }

  async function handleDeletePreview(
    event: MouseEvent<HTMLButtonElement>,
    previewId: string
  ): Promise<void> {
    event.stopPropagation();
    await deleteHoverPreview(previewId);
    setStoredPreviews((current) => current.filter((item) => item.id !== previewId));
  }

  const hasPreviewSupport = Boolean(fallbackPreview) || storedPreviews.length > 0;

  return (
    <motion.div
      className="anime-card"
      style={{ "--theme-color": anime.themeColor } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/anime/${anime.id}`)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setIsDragActive(false);
      }}
    >
      <div className="card-magnetic-inner">
        <motion.div
          layoutId={`poster-wrap-${anime.id}`}
          className={`card-image-wrapper${
            isDragActive ? " card-image-wrapper--drag-active" : ""
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragActive(true);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsDragActive(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
              return;
            }
            setIsDragActive(false);
          }}
          onDrop={(event) => {
            void handleDrop(event);
          }}
        >
          <PosterImage src={anime.coverImage.large} alt={anime.title.native} />
          {selectedPreview?.kind === "video" ? (
            <video
              ref={previewVideoRef}
              className={`card-hover-preview${
                isHovered ? " card-hover-preview--active" : ""
              }`}
              src={selectedPreview.src}
              muted={selectedPreview.muted}
              loop={selectedPreview.loop}
              playsInline
              preload="metadata"
            />
          ) : selectedPreview?.kind === "image" ? (
            <img
              src={selectedPreview.src}
              alt=""
              aria-hidden="true"
              className={`card-hover-preview card-hover-preview--image${
                isHovered ? " card-hover-preview--active" : ""
              }`}
            />
          ) : null}
          <div
            className="card-overlay"
            style={{ "--theme-color": anime.themeColor } as React.CSSProperties}
          />
          <div className="card-preview-toolbar" onClick={stopCardNavigation}>
            <button
              type="button"
              className="card-preview-edit"
              onClick={() => {
                setIsEditOpen((current) => !current);
                setPreviewError(null);
              }}
            >
              {isEditOpen ? "閉じる" : "編集する"}
            </button>
            {isEditOpen && (
              <button
                type="button"
                className="card-preview-add"
                onClick={() => fileInputRef.current?.click()}
                disabled={isConverting}
              >
                {isConverting ? "変換中..." : "追加する"}
              </button>
            )}
          </div>
          <span className="card-preview-count">{storedPreviews.length}/5</span>
          <input
            ref={fileInputRef}
            className="card-preview-input"
            type="file"
            accept="image/gif,video/mp4,video/webm"
            multiple
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => {
              event.stopPropagation();
              void handlePreviewFiles(event);
            }}
          />
          {isDragActive && (
            <div className="card-preview-dropzone">
              <span className="card-preview-dropzone-title">
                GIF / mp4 / webm をここへドロップ
              </span>
              <span className="card-preview-dropzone-copy">
                最大5件まで保存して、webm へそろえてホバー時にランダム再生します
              </span>
            </div>
          )}
          <div className="card-view-hint">
            <span>VIEW</span>
            <span className="card-view-arrow">→</span>
          </div>
        </motion.div>
        <div className="card-info">
          <div className="card-index">#{String(index + 1).padStart(2, "0")}</div>
          <h3 className={`card-title${hasPreviewSupport ? " card-title--has-preview" : ""}`}>
            {anime.title.native}
          </h3>
          <p className="card-subtitle">{anime.title.romaji}</p>
          <div className="card-meta">
            <span className="card-score">{anime.averageScore ?? "--"}</span>
            <span className="card-episodes">{anime.episodes}話</span>
            <span className="card-year">{anime.seasonYear}</span>
          </div>
          {watchersCount > 0 && (
            <div className="card-annict-meta">
              <span className="annict-badge">
                ANNICT {watchersCount.toLocaleString()} WATCHERS
              </span>
            </div>
          )}
          <div className="card-genres">
            {(anime.genres ?? []).slice(0, 2).map((genre) => (
              <span key={genre} className="genre-tag">
                {GENRE_JA[genre] ?? genre}
              </span>
            ))}
          </div>
          {isEditOpen && (
            <div className="card-preview-panel" onClick={stopCardNavigation}>
              <div className="card-preview-panel-header">
                <p className="card-preview-panel-title">追加した素材</p>
                <p className="card-preview-panel-copy">
                  サムネイル表示 / ホバー時にランダム再生
                </p>
              </div>
              {storedPreviews.length === 0 ? (
                <p className="card-preview-empty">
                  まだ素材はありません。追加ボタンかドラッグで入れられます。
                </p>
              ) : (
                <div className="card-preview-list">
                  {storedPreviews.map((item, itemIndex) => {
                    const thumb = storedPreviewUrls.find((entry) => entry.id === item.id);
                    return (
                      <div key={item.id} className="card-preview-list-item">
                        <div className="card-preview-thumb">
                          {thumb?.mimeType.startsWith("video/") ? (
                            <video
                              className="card-preview-thumb-media"
                              src={thumb.url}
                              muted
                              loop
                              autoPlay
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <img
                              className="card-preview-thumb-media"
                              src={thumb?.url}
                              alt={item.fileName}
                            />
                          )}
                        </div>
                        <div className="card-preview-list-copy">
                          <span className="card-preview-list-index">
                            {String(itemIndex + 1).padStart(2, "0")}
                          </span>
                          <div className="card-preview-list-meta">
                            <p className="card-preview-list-name">{item.fileName}</p>
                            <p className="card-preview-list-type">
                              {item.mimeType.startsWith("video/") ? "WEBM VIDEO" : "GIF"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="card-preview-remove"
                          onClick={(event) => {
                            void handleDeletePreview(event, item.id);
                          }}
                        >
                          削除
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {previewError && <p className="card-preview-error">{previewError}</p>}
        </div>
        <div className="card-corner-tl" />
        <div className="card-corner-br" />
      </div>
    </motion.div>
  );
}
