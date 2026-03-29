import { useState, type DragEvent } from "react";

interface Props {
  videoUrl: string | null;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
  onSetStart: () => void;
  onSetEnd: () => void;
  currentTime: number;
  onFileChange: (file: File) => void;
}

export default function VideoPlayer({
  videoUrl,
  onTimeUpdate,
  onDurationChange,
  onSetStart,
  onSetEnd,
  currentTime,
  onFileChange,
}: Props) {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (nextFile) onFileChange(nextFile);
  };

  const handleVideoTimeUpdate = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    onTimeUpdate(event.currentTarget.currentTime);
  };

  const handleLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    onDurationChange(event.currentTarget.duration);
    onTimeUpdate(event.currentTarget.currentTime);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragActive(false);
    const nextFile = event.dataTransfer.files?.[0];
    if (nextFile) {
      onFileChange(nextFile);
    }
  };

  return (
    <div
      className={`gm-video-player${isDragActive ? " gm-video-player--drag-active" : ""}`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="gm-file-label">
        <span>動画を選択</span>
        <input
          type="file"
          accept="video/mp4,video/*"
          onChange={handleFileInput}
          className="gm-file-input"
        />
      </label>

      <div className="gm-video-stage">
        {videoUrl ? (
          <video
            key={videoUrl}
            src={videoUrl}
            controls
            className="gm-video"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleVideoTimeUpdate}
            onSeeked={handleVideoTimeUpdate}
          />
        ) : (
          <div className="gm-video-placeholder">
            <span>動画ファイルを選択してください</span>
            <span className="gm-video-placeholder-sub">またはここにドラッグ&ドロップ</span>
          </div>
        )}

        {isDragActive && (
          <div className="gm-video-dropzone">
            <span className="gm-video-dropzone-title">ここにドロップ</span>
            <span className="gm-video-dropzone-copy">mp4 / webm などの動画を追加できます</span>
          </div>
        )}
      </div>

      <div className="gm-time-row">
        <span className="gm-time-display">{formatTime(currentTime)}</span>
        <button
          type="button"
          className="gm-btn gm-btn-sm"
          onClick={onSetStart}
          disabled={!videoUrl}
          title="現在位置を開始時間に設定"
        >
          開始に設定
        </button>
        <button
          type="button"
          className="gm-btn gm-btn-sm"
          onClick={onSetEnd}
          disabled={!videoUrl}
          title="現在位置を終了時間に設定"
        >
          終了に設定
        </button>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = (seconds % 60).toFixed(2);
  return `${minutes}:${secs.padStart(5, "0")}`;
}
