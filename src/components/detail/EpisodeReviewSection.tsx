import { useEffect, useMemo, useState } from "react";
import { episodeBrowserMetaByAnimeId } from "../../data/episodeBrowserMeta";

interface EpisodeReviewComment {
  id: number;
  userName: string;
  userUsername: string;
  createdAt: string;
  likesCount: number;
  ratingState: string | null;
  comment: string;
}

interface EpisodeReviewItem {
  id: number;
  number: number | null;
  numberText: string | null;
  title: string | null;
  comments: EpisodeReviewComment[];
}

interface Props {
  animeId: number;
  assetPath: string;
}

interface EpisodeBrowserMeta {
  durationLabel: string;
  summary: string;
  thumbnailSrc: string;
  previewSrc: string;
  previewAnimatedSrc?: string;
  previewCaption?: string;
}

const ratingLabels: Record<string, string> = {
  great: "最高",
  good: "良い",
  average: "ふつう",
  bad: "惜しい",
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function shouldCollapse(comment: string): boolean {
  return comment.length > 140 || comment.includes("\n");
}

function getEpisodeLabel(episode: EpisodeReviewItem, index: number): string {
  return (
    episode.numberText ??
    (episode.number != null ? `第${episode.number}話` : `話数 ${index + 1}`)
  );
}

function getEpisodeMeta(
  animeId: number,
  episode: EpisodeReviewItem,
  index: number
): EpisodeBrowserMeta {
  const metaMap = episodeBrowserMetaByAnimeId[animeId] ?? {};
  const key = episode.number ?? index + 1;
  const fallbackPreview = index % 2 === 0 ? "/frieren/key-visual.jpg" : "/frieren/banner-visual.jpg";

  return (
    metaMap[key] ?? {
      durationLabel: "24分",
      summary: "話数を選ぶと、このエピソードの感想20件を右側に表示します。",
      thumbnailSrc: fallbackPreview,
      previewSrc: fallbackPreview,
      previewCaption: "選択中の話数プレビュー",
    }
  );
}

export default function EpisodeReviewSection({ animeId, assetPath }: Props) {
  const [episodes, setEpisodes] = useState<EpisodeReviewItem[]>([]);
  const [activeEpisodeId, setActiveEpisodeId] = useState<number | null>(null);
  const [expandedCommentIds, setExpandedCommentIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(assetPath);
        if (!response.ok) {
          throw new Error(`Failed to load reviews: ${response.status}`);
        }

        const payload = (await response.json()) as EpisodeReviewItem[];
        if (!active) {
          return;
        }

        setEpisodes(payload);
        setActiveEpisodeId(payload[0]?.id ?? null);
        setExpandedCommentIds([]);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Failed to load episode reviews."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadReviews();

    return () => {
      active = false;
    };
  }, [assetPath]);

  useEffect(() => {
    setExpandedCommentIds([]);
  }, [activeEpisodeId]);

  const activeEpisode = useMemo(
    () =>
      episodes.find((episode) => episode.id === activeEpisodeId) ??
      episodes[0] ??
      null,
    [activeEpisodeId, episodes]
  );

  function toggleExpanded(commentId: number): void {
    setExpandedCommentIds((current) =>
      current.includes(commentId)
        ? current.filter((id) => id !== commentId)
        : [...current, commentId]
    );
  }

  if (loading) {
    return (
      <section className="episode-browser-section">
        <div className="episode-browser-header">
          <div>
            <span className="detail-panel-kicker">ANNICT</span>
            <h2 className="section-title">エピソードとみんなの感想</h2>
          </div>
        </div>
        <div className="episode-review-loading">感想を読み込み中です...</div>
      </section>
    );
  }

  if (error || episodes.length === 0 || !activeEpisode) {
    return (
      <section className="episode-browser-section">
        <div className="episode-browser-header">
          <div>
            <span className="detail-panel-kicker">ANNICT</span>
            <h2 className="section-title">エピソードとみんなの感想</h2>
          </div>
        </div>
        <div className="episode-review-empty">
          {error ?? "感想データはまだありません。"}
        </div>
      </section>
    );
  }

  const activeIndex = episodes.findIndex((episode) => episode.id === activeEpisode.id);
  const activeMeta = getEpisodeMeta(animeId, activeEpisode, activeIndex);

  return (
    <section className="episode-browser-section">
      <div className="episode-browser-header">
        <div>
          <span className="detail-panel-kicker">ANNICT</span>
          <h2 className="section-title">エピソードとみんなの感想</h2>
        </div>
        <span className="episode-review-count">
          選択中: {getEpisodeLabel(activeEpisode, activeIndex)} / {activeEpisode.comments.length}件
        </span>
      </div>

      <div className="episode-browser-shell">
        <div className="episode-browser-list">
          {episodes.map((episode, index) => {
            const meta = getEpisodeMeta(animeId, episode, index);
            const isActive = episode.id === activeEpisode.id;
            return (
              <button
                key={episode.id}
                className={`episode-browser-item${
                  isActive ? " episode-browser-item--active" : ""
                }`}
                onClick={() => setActiveEpisodeId(episode.id)}
              >
                <span className="episode-browser-number">
                  {episode.number ?? index + 1}
                </span>
                <span className="episode-browser-thumb-frame">
                  <img
                    src={meta.thumbnailSrc}
                    alt={episode.title ?? "Episode preview"}
                    className="episode-browser-thumb"
                    loading="lazy"
                  />
                  <span className="episode-browser-progress" />
                </span>
                <span className="episode-browser-copy">
                  <span className="episode-browser-title">
                    {episode.title ?? "タイトル未設定"}
                  </span>
                  <span className="episode-browser-summary">{meta.summary}</span>
                </span>
                <span className="episode-browser-duration">{meta.durationLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="episode-browser-detail">
          <div className="episode-browser-preview">
            <div className="episode-browser-preview-media-frame">
              <img
                src={activeMeta.previewAnimatedSrc ?? activeMeta.previewSrc}
                alt={activeEpisode.title ?? "Selected episode"}
                className={`episode-browser-preview-media${
                  activeMeta.previewAnimatedSrc
                    ? ""
                    : " episode-browser-preview-media--simulated-play"
                }`}
              />
              <div className="episode-browser-preview-overlay" />
              <button className="episode-browser-preview-play" type="button">
                再生
              </button>
              <div className="episode-browser-preview-copy">
                <p className="episode-browser-preview-kicker">
                  {getEpisodeLabel(activeEpisode, activeIndex)}
                </p>
                <h3 className="episode-browser-preview-title">
                  {activeEpisode.title ?? "タイトル未設定"}
                </h3>
                <p className="episode-browser-preview-caption">
                  {activeMeta.previewCaption ?? "選択した話数のプレビュー"}
                </p>
              </div>
              <div className="episode-browser-preview-bar">
                <span className="episode-browser-preview-bar-fill" />
              </div>
            </div>
          </div>

          <div className="episode-browser-comment-panel">
            <div className="episode-browser-comment-header">
              <div>
                <p className="episode-browser-comment-kicker">COMMUNITY</p>
                <h3 className="episode-browser-comment-title">みんなの感想</h3>
              </div>
              <span className="episode-browser-comment-count">
                {activeEpisode.comments.length}件
              </span>
            </div>

            <div className="episode-browser-comment-list">
              {activeEpisode.comments.map((comment) => (
                <article key={comment.id} className="episode-review-card">
                  <div className="episode-review-card-head">
                    <div>
                      <p className="episode-review-user">{comment.userName}</p>
                      <p className="episode-review-handle">@{comment.userUsername}</p>
                    </div>
                    <div className="episode-review-meta">
                      {comment.ratingState && (
                        <span className="episode-review-rating">
                          {ratingLabels[comment.ratingState] ?? comment.ratingState}
                        </span>
                      )}
                      <span className="episode-review-likes">
                        {comment.likesCount} likes
                      </span>
                      <span className="episode-review-date">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p
                    className={`episode-review-body${
                      shouldCollapse(comment.comment) &&
                      !expandedCommentIds.includes(comment.id)
                        ? " episode-review-body--collapsed"
                        : ""
                    }`}
                  >
                    {comment.comment}
                  </p>
                  {shouldCollapse(comment.comment) && (
                    <button
                      className="episode-review-more"
                      onClick={() => toggleExpanded(comment.id)}
                    >
                      {expandedCommentIds.includes(comment.id) ? "閉じる" : "さらに表示"}
                    </button>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
