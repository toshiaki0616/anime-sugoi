import type { Quality, GifWidth, GifFps } from "../../types/gif-maker";

interface Props {
  width: GifWidth;
  fps: GifFps;
  quality: Quality;
  onWidthChange: (w: GifWidth) => void;
  onFpsChange: (f: GifFps) => void;
  onQualityChange: (q: Quality) => void;
}

const WIDTHS: GifWidth[] = [320, 480, 640];
const FPS_VALUES: GifFps[] = [8, 12, 15];
const QUALITIES: { value: Quality; label: string }[] = [
  { value: "light", label: "軽量" },
  { value: "standard", label: "標準" },
  { value: "high", label: "高画質" },
];

export default function SettingsPanel({
  width,
  fps,
  quality,
  onWidthChange,
  onFpsChange,
  onQualityChange,
}: Props) {
  return (
    <div className="gm-settings">
      <div className="gm-setting-group">
        <span className="gm-setting-label">Width</span>
        <div className="gm-toggle-row">
          {WIDTHS.map((value) => (
            <button
              type="button"
              key={value}
              className={`gm-toggle ${width === value ? "active" : ""}`}
              onClick={() => onWidthChange(value)}
            >
              {value}px
            </button>
          ))}
        </div>
      </div>

      <div className="gm-setting-group">
        <span className="gm-setting-label">FPS</span>
        <div className="gm-toggle-row">
          {FPS_VALUES.map((value) => (
            <button
              type="button"
              key={value}
              className={`gm-toggle ${fps === value ? "active" : ""}`}
              onClick={() => onFpsChange(value)}
            >
              {value}fps
            </button>
          ))}
        </div>
      </div>

      <div className="gm-setting-group">
        <span className="gm-setting-label">Quality</span>
        <div className="gm-toggle-row">
          {QUALITIES.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`gm-toggle ${quality === option.value ? "active" : ""}`}
              onClick={() => onQualityChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
