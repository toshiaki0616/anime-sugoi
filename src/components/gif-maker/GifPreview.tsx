interface Props {
  resultUrl: string | null;
  resultBlob: Blob | null;
  isProcessing: boolean;
  progress: number;
  onSave: () => void;
}

export default function GifPreview({
  resultUrl,
  resultBlob,
  isProcessing,
  progress,
  onSave,
}: Props) {
  const sizeText = resultBlob ? `${(resultBlob.size / 1024 / 1024).toFixed(2)} MB` : null;
  const isVideo = (resultBlob?.type ?? "").startsWith("video/");
  const downloadName = isVideo ? "output.webm" : "output.gif";

  return (
    <div className="gm-preview">
      {isProcessing ? (
        <div className="gm-preview-processing">
          <div className="gm-spinner" />
          <span className="gm-progress-text">{progress > 0 ? `${progress}%` : "変換中..."}</span>
          <div className="gm-progress-bar">
            <div className="gm-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : resultUrl ? (
        <div className="gm-preview-result">
          {isVideo ? (
            <video
              src={resultUrl}
              className="gm-preview-media"
              controls
              muted
              loop
              playsInline
            />
          ) : (
            <img src={resultUrl} alt="Generated preview" className="gm-preview-media" />
          )}
          <div className="gm-preview-meta">
            {sizeText && <span className="gm-text-muted">{sizeText}</span>}
            <button type="button" className="gm-btn gm-btn-primary" onClick={onSave}>
              保存
            </button>
            <a href={resultUrl} download={downloadName} className="gm-btn gm-btn-sm">
              ダウンロード
            </a>
          </div>
        </div>
      ) : (
        <div className="gm-preview-empty">生成したプレビューがここに表示されます</div>
      )}
    </div>
  );
}
