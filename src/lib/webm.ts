import { fetchFile, getFFmpeg } from "./ffmpeg";

interface ConvertToWebmOptions {
  startTime?: number;
  duration?: number;
  videoFilter?: string;
  crf?: number;
  outputPrefix?: string;
  onProgress?: (progress: number) => void;
  timeoutMs?: number;
}

function getExtension(file: File): string {
  if (file.type === "image/gif") return "gif";
  if (file.type === "video/mp4") return "mp4";
  if (file.type === "video/webm") return "webm";
  const match = file.name.match(/\.([^.]+)$/);
  return match?.[1]?.toLowerCase() ?? "bin";
}

export async function convertToWebm(
  file: File,
  {
    startTime,
    duration,
    videoFilter,
    crf = 34,
    outputPrefix = "webm",
    onProgress,
    timeoutMs = 30000,
  }: ConvertToWebmOptions = {}
): Promise<File> {
  const needsProcessing =
    file.type !== "video/webm" ||
    startTime !== undefined ||
    duration !== undefined ||
    Boolean(videoFilter) ||
    crf !== 34;

  if (!needsProcessing) {
    return file;
  }

  const ffmpeg = await getFFmpeg();
  const token = crypto.randomUUID();
  const inputName = `${outputPrefix}-input-${token}.${getExtension(file)}`;
  const outputName = `${outputPrefix}-output-${token}.webm`;
  const command: string[] = [];
  const handleProgress =
    onProgress === undefined
      ? undefined
      : ({ progress }: { progress: number }) => onProgress(progress);

  if (startTime !== undefined) {
    command.push("-ss", String(startTime));
  }
  if (duration !== undefined) {
    command.push("-t", String(duration));
  }

  command.push("-i", inputName);

  if (videoFilter) {
    command.push("-vf", videoFilter);
  }

  command.push(
    "-an",
    "-c:v",
    "libvpx",
    "-crf",
    String(crf),
    "-b:v",
    "0",
    "-deadline",
    "realtime",
    "-cpu-used",
    "8",
    "-auto-alt-ref",
    "0",
    "-pix_fmt",
    "yuv420p",
    "-y",
    outputName
  );

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  if (handleProgress) {
    ffmpeg.on("progress", handleProgress);
  }

  try {
    const exitCode = await ffmpeg.exec(command, timeoutMs);
    if (exitCode !== 0) {
      throw new Error(
        exitCode === 1
          ? "変換がタイムアウトしました。設定を軽くするか、短い範囲で試してください。"
          : `FFmpeg の変換に失敗しました (code: ${exitCode})。`
      );
    }
    const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
    const blob = new Blob([new Uint8Array(data).buffer], { type: "video/webm" });
    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webm`, { type: "video/webm" });
  } finally {
    if (handleProgress) {
      ffmpeg.off("progress", handleProgress);
    }
    await ffmpeg.deleteFile(inputName).catch(() => undefined);
    await ffmpeg.deleteFile(outputName).catch(() => undefined);
  }
}
