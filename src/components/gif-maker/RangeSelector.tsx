type FfmpegStatus = "idle" | "loading" | "ready" | "error";

interface Props {
  startTime: number;
  endTime: number;
  duration: number;
  onStartChange: (t: number) => void;
  onEndChange: (t: number) => void;
  onGenerate: () => void;
  isProcessing: boolean;
  ffmpegStatus: FfmpegStatus;
  hasFile: boolean;
}

export default function RangeSelector({
  startTime,
  endTime,
  duration,
  onStartChange,
  onEndChange,
  onGenerate,
  isProcessing,
  ffmpegStatus,
  hasFile,
}: Props) {
  const rangeDuration = endTime - startTime;
  const isValid = rangeDuration > 0;
  const canGenerate = hasFile && isValid && !isProcessing;

  const handleStart = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!Number.isNaN(value)) onStartChange(Math.max(0, Math.min(value, duration)));
  };

  const handleEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!Number.isNaN(value)) onEndChange(Math.max(0, Math.min(value, duration)));
  };

  return (
    <div className="gm-range-selector">
      <div className="gm-range-row">
        <label className="gm-label">
          <span>開始 (秒)</span>
          <input
            type="number"
            className="gm-input"
            value={startTime.toFixed(2)}
            min={0}
            max={duration || undefined}
            step={0.1}
            onChange={handleStart}
          />
        </label>
        <label className="gm-label">
          <span>終了 (秒)</span>
          <input
            type="number"
            className="gm-input"
            value={endTime.toFixed(2)}
            min={startTime}
            max={duration || undefined}
            step={0.1}
            onChange={handleEnd}
          />
        </label>
      </div>

      <div className="gm-range-info">
        {rangeDuration > 0 ? (
          <span className="gm-text-muted">{rangeDuration.toFixed(2)}s</span>
        ) : (
          <span className="gm-text-muted">範囲を指定してください</span>
        )}
      </div>
      {hasFile && ffmpegStatus === "loading" && (
        <div className="gm-range-hint">FFmpeg は裏で準備中ですが、このまま生成を始められます</div>
      )}
      {hasFile && ffmpegStatus === "error" && (
        <div className="gm-range-hint gm-range-hint--error">
          FFmpeg の準備に失敗しています。通常の生成は試せますが、必要なら再試行してください
        </div>
      )}

      <button
        type="button"
        className="gm-btn gm-btn-primary gm-btn-full"
        onClick={onGenerate}
        disabled={!canGenerate}
      >
        {getButtonLabel({ hasFile, isProcessing })}
      </button>
    </div>
  );
}

function getButtonLabel({
  hasFile,
  isProcessing,
}: {
  hasFile: boolean;
  isProcessing: boolean;
}) {
  if (!hasFile) return "動画を選択してください";
  if (isProcessing) return "変換中...";
  return "webmを生成";
}
