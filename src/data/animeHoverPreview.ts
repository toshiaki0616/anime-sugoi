export interface AnimeHoverPreview {
  posterImageSrc?: string;
  videoSrc?: string;
  loop?: boolean;
  muted?: boolean;
}

export const animeHoverPreviewById: Record<number, AnimeHoverPreview> = {
  20260116: {
    posterImageSrc: "/frieren/banner-visual.jpg",
    loop: true,
    muted: true,
  },
};
