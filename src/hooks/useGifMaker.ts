import { useState, useEffect, useCallback, useRef } from "react";
import { saveGif, getAllGifs, deleteGif } from "../lib/db";
import { createWebmClipFromVideo } from "../lib/browserWebm";
import { getFFmpeg } from "../lib/ffmpeg";
import { convertToWebm } from "../lib/webm";
import type { StoredGifItem, Quality, GifWidth, GifFps } from "../types/gif-maker";

const CRF_BY_QUALITY: Record<Quality, number> = {
  light: 38,
  standard: 34,
  high: 30,
};

type FfmpegStatus = "idle" | "loading" | "ready" | "error";

export function useGifMaker() {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [width, setWidth] = useState<GifWidth>(320);
  const [fps, setFps] = useState<GifFps>(8);
  const [quality, setQuality] = useState<Quality>("light");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [savedItems, setSavedItems] = useState<StoredGifItem[]>([]);
  const [ffmpegStatus, setFfmpegStatus] = useState<FfmpegStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const videoUrlRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  videoUrlRef.current = videoUrl;
  resultUrlRef.current = resultUrl;

  useEffect(() => {
    getAllGifs().then(setSavedItems).catch(console.error);
  }, []);

  useEffect(() => {
    return () => {
      if (videoUrlRef.current) URL.revokeObjectURL(videoUrlRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const ensureFfmpegReady = useCallback(async () => {
    if (ffmpegStatus === "ready") {
      return;
    }

    setFfmpegStatus("loading");

    try {
      await getFFmpeg();
      setFfmpegStatus("ready");
    } catch (nextError) {
      setFfmpegStatus("error");
      throw nextError;
    }
  }, [ffmpegStatus]);

  const handleDurationChange = useCallback((nextDuration: number) => {
    if (!Number.isFinite(nextDuration) || nextDuration <= 0) {
      setDuration(0);
      return;
    }

    setDuration(nextDuration);
    setEndTime((currentEndTime) =>
      currentEndTime === 0 ? nextDuration : Math.min(currentEndTime, nextDuration)
    );
  }, []);

  const handleFileChange = useCallback(
    (nextFile: File) => {
      if (!nextFile.type.startsWith("video/")) {
        setError("動画ファイルを選択してください。");
        return;
      }

      setVideoUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(nextFile);
      });
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
      setFile(nextFile);
      setCurrentTime(0);
      setDuration(0);
      setStartTime(0);
      setEndTime(0);
      setResultBlob(null);
      setError(null);

      if (ffmpegStatus !== "ready" && ffmpegStatus !== "loading") {
        void ensureFfmpegReady().catch((nextError) => {
          setError(
            nextError instanceof Error
              ? `FFmpeg の読み込みに失敗しました: ${nextError.message}`
              : "FFmpeg の読み込みに失敗しました。"
          );
        });
      }
    },
    [ensureFfmpegReady, ffmpegStatus]
  );

  const setStartFromCurrent = useCallback(() => {
    const nextStart = Math.min(currentTime, duration);
    setStartTime(nextStart);
    setEndTime((prev) => (prev <= nextStart ? duration : prev));
  }, [currentTime, duration]);

  const setEndFromCurrent = useCallback(() => {
    if (currentTime <= startTime) return;
    setEndTime(Math.min(currentTime, duration));
  }, [currentTime, duration, startTime]);

  const retryFfmpegLoad = useCallback(async () => {
    setError(null);
    try {
      await ensureFfmpegReady();
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? `FFmpeg の読み込みに失敗しました: ${nextError.message}`
          : "FFmpeg の読み込みに失敗しました。"
      );
    }
  }, [ensureFfmpegReady]);

  const generateGif = useCallback(async () => {
    if (!file) return;

    const rangeDuration = endTime - startTime;
    if (rangeDuration <= 0) {
      setError("開始時間より後ろに終了時間を設定してください。");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError(null);

    try {
      let webmFile: File;

      try {
        webmFile = await createWebmClipFromVideo(file, {
          startTime,
          duration: rangeDuration,
          width,
          fps,
          quality,
          onProgress: (value) => setProgress(Math.round(value * 100)),
        });
      } catch {
        await ensureFfmpegReady();

        webmFile = await convertToWebm(file, {
          startTime,
          duration: rangeDuration,
          videoFilter: `fps=${fps},scale=${width}:-1:flags=lanczos`,
          crf: CRF_BY_QUALITY[quality],
          outputPrefix: "showcase",
          onProgress: (value) => setProgress(Math.round(value * 100)),
          timeoutMs: Math.max(30000, Math.ceil(rangeDuration * 4000)),
        });
      }

      setResultBlob(webmFile);
      setResultUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return URL.createObjectURL(webmFile);
      });
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? `webm 変換に失敗しました: ${nextError.message}`
          : "webm 変換に失敗しました。"
      );
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [endTime, ensureFfmpegReady, file, fps, quality, startTime, width]);

  const saveGifToDb = useCallback(async () => {
    if (!resultBlob || !file) return;

    const item: StoredGifItem = {
      id: crypto.randomUUID(),
      title: `${file.name.replace(/\.[^.]+$/, "")} (${startTime.toFixed(1)}s - ${endTime.toFixed(
        1
      )}s)`,
      sourceFileName: file.name,
      createdAt: new Date().toISOString(),
      startTime,
      endTime,
      width,
      fps,
      quality,
      blob: resultBlob,
      mimeType: resultBlob.type || "video/webm",
    };

    await saveGif(item);
    setSavedItems((prev) => [item, ...prev]);
  }, [endTime, file, fps, quality, resultBlob, startTime, width]);

  const deleteGifFromDb = useCallback(async (id: string) => {
    await deleteGif(id);
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const selectSavedItem = useCallback((item: StoredGifItem) => {
    setResultBlob(item.blob);
    setResultUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(item.blob);
    });
  }, []);

  const dismissError = useCallback(() => setError(null), []);

  return {
    file,
    videoUrl,
    currentTime,
    duration,
    startTime,
    endTime,
    width,
    fps,
    quality,
    isProcessing,
    progress,
    resultBlob,
    resultUrl,
    savedItems,
    ffmpegStatus,
    error,
    handleFileChange,
    setCurrentTime,
    setDuration: handleDurationChange,
    setStartTime,
    setEndTime,
    setWidth,
    setFps,
    setQuality,
    setStartFromCurrent,
    setEndFromCurrent,
    generateGif,
    saveGifToDb,
    deleteGifFromDb,
    selectSavedItem,
    dismissError,
    retryFfmpegLoad,
  };
}
