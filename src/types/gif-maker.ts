export type Quality = "light" | "standard" | "high";
export type GifWidth = 320 | 480 | 640;
export type GifFps = 8 | 12 | 15;

export interface StoredGifItem {
  id: string;
  title: string;
  sourceFileName: string;
  createdAt: string;
  startTime: number;
  endTime: number;
  width: GifWidth;
  fps: GifFps;
  quality: Quality;
  blob: Blob;
  mimeType?: string;
}
