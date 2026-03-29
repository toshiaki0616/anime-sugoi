import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

let instance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const LOCAL_CORE_URL = "/vendor/ffmpeg/ffmpeg-core.js";
const LOCAL_WASM_URL = "/vendor/ffmpeg/ffmpeg-core.wasm";

export async function getFFmpeg(): Promise<FFmpeg> {
  if (instance) return instance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();

    try {
      await ffmpeg.load({
        coreURL: LOCAL_CORE_URL,
        wasmURL: LOCAL_WASM_URL,
      });
      instance = ffmpeg;
      return ffmpeg;
    } catch (error) {
      loadPromise = null;
      throw error;
    }
  })();

  return loadPromise;
}

export { fetchFile };
