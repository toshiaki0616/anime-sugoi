import { useEffect, useMemo } from "react";
import type { StoredGifItem } from "../../types/gif-maker";

interface Props {
  items: StoredGifItem[];
  onSelect: (item: StoredGifItem) => void;
  onDelete: (id: string) => void;
}

export default function GifList({ items, onSelect, onDelete }: Props) {
  if (items.length === 0) {
    return <p className="gm-text-muted gm-list-empty">保存済みクリップはまだありません</p>;
  }

  return (
    <ul className="gm-list">
      {items.map((item) => (
        <GifListItem key={item.id} item={item} onSelect={onSelect} onDelete={onDelete} />
      ))}
    </ul>
  );
}

function GifListItem({
  item,
  onSelect,
  onDelete,
}: {
  item: StoredGifItem;
  onSelect: (item: StoredGifItem) => void;
  onDelete: (id: string) => void;
}) {
  const thumbUrl = useMemo(() => URL.createObjectURL(item.blob), [item.blob]);
  const sizeKb = Math.round(item.blob.size / 1024);
  const mimeType = item.mimeType || item.blob.type || "image/gif";
  const isVideo = mimeType.startsWith("video/");
  const date = new Date(item.createdAt).toLocaleDateString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(thumbUrl);
    };
  }, [thumbUrl]);

  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete(item.id);
  };

  return (
    <li className="gm-list-item" onClick={() => onSelect(item)}>
      {isVideo ? (
        <video
          src={thumbUrl}
          className="gm-list-thumb-media"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      ) : (
        <img src={thumbUrl} alt={item.title} className="gm-list-thumb-media" />
      )}
      <div className="gm-list-info">
        <span className="gm-list-title">{item.title}</span>
        <span className="gm-text-muted gm-list-meta">
          {item.width}px / {item.fps}fps / {sizeKb}KB / {date}
        </span>
      </div>
      <button type="button" className="gm-list-delete" onClick={handleDelete} title="削除" aria-label="削除">
        ×
      </button>
    </li>
  );
}
