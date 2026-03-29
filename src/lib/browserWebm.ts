interface CreateWebmClipOptions {
  startTime: number;
  duration: number;
  width: number;
  fps: number;
  quality: "light" | "standard" | "high";
  onProgress?: (progress: number) => void;
}

const QUALITY_MULTIPLIER = {
  light: 0.75,
  standard: 1,
  high: 1.3,
} as const;

function waitForEvent(target: EventTarget, eventName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const handleResolve = () => {
      cleanup();
      resolve();
    };
    const handleReject = () => {
      cleanup();
      reject(new Error(`${eventName} の待機に失敗しました。`));
    };
    const cleanup = () => {
      target.removeEventListener(eventName, handleResolve);
      target.removeEventListener("error", handleReject);
    };

    target.addEventListener(eventName, handleResolve, { once: true });
    target.addEventListener("error", handleReject, { once: true });
  });
}

function chooseRecorderMimeType(): string {
  const candidates = [
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];

  for (const candidate of candidates) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(candidate)) {
      return candidate;
    }
  }

  throw new Error("このブラウザは webm 録画に対応していません。");
}

function estimateBitrate(width: number, fps: number, quality: CreateWebmClipOptions["quality"]) {
  const base = width * width * fps * 0.18;
  return Math.round(base * QUALITY_MULTIPLIER[quality]);
}

export async function createWebmClipFromVideo(
  file: File,
  { startTime, duration, width, fps, quality, onProgress }: CreateWebmClipOptions
): Promise<File> {
  if (
    typeof document === "undefined" ||
    typeof HTMLCanvasElement === "undefined" ||
    typeof MediaRecorder === "undefined"
  ) {
    throw new Error("ネイティブ動画変換 API が利用できません。");
  }

  const video = document.createElement("video");
  const objectUrl = URL.createObjectURL(file);
  const canvas = document.createElement("canvas");
  const mimeType = chooseRecorderMimeType();
  let stream: MediaStream | null = null;
  let recorder: MediaRecorder | null = null;
  let frameHandle = 0;
  let stopped = false;

  try {
    video.src = objectUrl;
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    await waitForEvent(video, "loadedmetadata");

    const clippedDuration = Math.max(0.1, Math.min(duration, video.duration - startTime));
    if (clippedDuration <= 0) {
      throw new Error("切り出し範囲が動画の長さを超えています。");
    }

    const sourceWidth = video.videoWidth || width;
    const sourceHeight = video.videoHeight || Math.round((width * 9) / 16);
    const height = Math.max(2, Math.round((width / sourceWidth) * sourceHeight));

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d", { alpha: false });
    if (!context) {
      throw new Error("canvas コンテキストを取得できませんでした。");
    }

    stream = canvas.captureStream(fps);
    recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: estimateBitrate(width, fps, quality),
    });

    const chunks: Blob[] = [];
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    const stopPromise = new Promise<Blob>((resolve, reject) => {
      recorder!.onstop = () => {
        resolve(new Blob(chunks, { type: mimeType }));
      };
      recorder!.onerror = () => {
        reject(new Error("MediaRecorder での録画に失敗しました。"));
      };
    });

    video.currentTime = startTime;
    await waitForEvent(video, "seeked");

    const startedAt = startTime;
    const endAt = startTime + clippedDuration;
    const frameInterval = 1000 / fps;
    let previousFrameTime = -Infinity;

    const stopRecording = () => {
      if (stopped) return;
      stopped = true;
      video.pause();
      if (frameHandle) {
        cancelAnimationFrame(frameHandle);
      }
      if (recorder && recorder.state !== "inactive") {
        recorder.stop();
      }
      stream?.getTracks().forEach((track) => track.stop());
    };

    const drawFrame = (timestamp: number) => {
      if (stopped) return;

      if (timestamp - previousFrameTime >= frameInterval) {
        previousFrameTime = timestamp;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const elapsed = Math.max(0, video.currentTime - startedAt);
        onProgress?.(Math.min(0.99, elapsed / clippedDuration));
      }

      if (video.currentTime >= endAt || video.ended) {
        stopRecording();
        return;
      }

      frameHandle = requestAnimationFrame(drawFrame);
    };

    recorder.start(250);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    frameHandle = requestAnimationFrame(drawFrame);
    await video.play();

    const stopTimer = window.setTimeout(() => {
      stopRecording();
    }, Math.ceil(clippedDuration * 1000) + 1000);

    const blob = await stopPromise.finally(() => {
      window.clearTimeout(stopTimer);
      onProgress?.(1);
    });

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webm`, { type: "video/webm" });
  } finally {
    if (frameHandle) {
      cancelAnimationFrame(frameHandle);
    }
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }
    stream?.getTracks().forEach((track) => track.stop());
    video.pause();
    video.removeAttribute("src");
    video.load();
    URL.revokeObjectURL(objectUrl);
  }
}
