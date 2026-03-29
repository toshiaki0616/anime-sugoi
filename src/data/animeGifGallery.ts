export interface AnimeGifItem {
  src: string;
  alt: string;
  title: string;
  note?: string;
}

export const animeGifGalleryById: Record<number, AnimeGifItem[]> = {
  20260116: [
    {
      src: "/frieren/key-visual.jpg",
      alt: "フリーレン第2期のキービジュアル",
      title: "旅立ちの空気",
      note: "ローカル素材差し替え対応",
    },
    {
      src: "/frieren/chara-frieren.png",
      alt: "フリーレンの立ち絵",
      title: "フリーレン",
      note: "GIF の差し替え先 01",
    },
    {
      src: "/frieren/chara-fern.png",
      alt: "フェルンの立ち絵",
      title: "フェルン",
      note: "GIF の差し替え先 02",
    },
    {
      src: "/frieren/chara-stark.png",
      alt: "シュタルクの立ち絵",
      title: "シュタルク",
      note: "GIF の差し替え先 03",
    },
  ],
};
