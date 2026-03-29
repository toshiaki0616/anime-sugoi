import { motion } from "framer-motion";
import { useGifMaker } from "../../hooks/useGifMaker";
import VideoPlayer from "../../components/gif-maker/VideoPlayer";
import RangeSelector from "../../components/gif-maker/RangeSelector";
import GifPreview from "../../components/gif-maker/GifPreview";
import SettingsPanel from "../../components/gif-maker/SettingsPanel";
import GifList from "../../components/gif-maker/GifList";

export default function GifMaker() {
  const gm = useGifMaker();

  return (
    <motion.div
      className="gif-maker-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <header className="gm-page-header">
        <h1 className="gm-page-title">WEBM Maker</h1>
        <p className="gm-page-sub">動画から webm クリップを切り出して保存します</p>
        <div className="gm-status-group">
          {gm.ffmpegStatus === "idle" && (
            <p className="gm-status-loading">動画選択後に FFmpeg の準備を始めます</p>
          )}
          {gm.ffmpegStatus === "loading" && (
            <p className="gm-status-loading">FFmpeg をローカル資産から準備中... 生成は先に始められます</p>
          )}
          {gm.ffmpegStatus === "ready" && <p className="gm-status-ready">● FFmpeg Ready</p>}
          {gm.ffmpegStatus === "error" && (
            <div className="gm-status-error">
              <span>FFmpeg の読み込みに失敗しました</span>
              <button type="button" className="gm-status-retry" onClick={gm.retryFfmpegLoad}>
                再試行
              </button>
            </div>
          )}
        </div>
      </header>

      {gm.error && (
        <div className="gm-error-banner">
          {gm.error}
          <button type="button" className="gm-error-close" onClick={gm.dismissError}>
            ×
          </button>
        </div>
      )}

      <div className="gm-layout">
        <div className="gm-col">
          <section className="gm-panel">
            <h2 className="gm-panel-title">動画</h2>
            <VideoPlayer
              videoUrl={gm.videoUrl}
              currentTime={gm.currentTime}
              onTimeUpdate={gm.setCurrentTime}
              onDurationChange={gm.setDuration}
              onSetStart={gm.setStartFromCurrent}
              onSetEnd={gm.setEndFromCurrent}
              onFileChange={gm.handleFileChange}
            />
          </section>

          <section className="gm-panel" style={{ marginTop: "0.75rem" }}>
            <h2 className="gm-panel-title">範囲指定</h2>
            <RangeSelector
              startTime={gm.startTime}
              endTime={gm.endTime}
              duration={gm.duration}
              onStartChange={gm.setStartTime}
              onEndChange={gm.setEndTime}
              onGenerate={gm.generateGif}
              isProcessing={gm.isProcessing}
              ffmpegStatus={gm.ffmpegStatus}
              hasFile={!!gm.file}
            />
          </section>
        </div>

        <div className="gm-col">
          <section className="gm-panel gm-panel-preview">
            <h2 className="gm-panel-title">プレビュー</h2>
            <GifPreview
              resultUrl={gm.resultUrl}
              resultBlob={gm.resultBlob}
              isProcessing={gm.isProcessing}
              progress={gm.progress}
              onSave={gm.saveGifToDb}
            />
          </section>
        </div>

        <div className="gm-col gm-col-right">
          <section className="gm-panel">
            <h2 className="gm-panel-title">設定</h2>
            <SettingsPanel
              width={gm.width}
              fps={gm.fps}
              quality={gm.quality}
              onWidthChange={gm.setWidth}
              onFpsChange={gm.setFps}
              onQualityChange={gm.setQuality}
            />
          </section>

          <section className="gm-panel" style={{ marginTop: "0.75rem" }}>
            <h2 className="gm-panel-title">保存済み ({gm.savedItems.length})</h2>
            <GifList
              items={gm.savedItems}
              onSelect={gm.selectSavedItem}
              onDelete={gm.deleteGifFromDb}
            />
          </section>
        </div>
      </div>
    </motion.div>
  );
}
