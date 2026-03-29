interface EpisodeBrowserMeta {
  durationLabel: string;
  summary: string;
  thumbnailSrc: string;
  previewSrc: string;
  previewAnimatedSrc?: string;
  previewCaption?: string;
}

export const episodeBrowserMetaByAnimeId: Record<
  number,
  Record<number, EpisodeBrowserMeta>
> = {
  20260116: {
    29: {
      durationLabel: "24分",
      summary: "第2期の幕開け。3人の旅路がもう一度ゆっくり動き出す。",
      thumbnailSrc: "/frieren/chara-fern.png",
      previewSrc: "/frieren/key-visual.jpg",
      previewCaption: "ここに GIF や mp4 を置くと、選択時にそのまま再生プレビューへ差し替えできます。",
    },
    30: {
      durationLabel: "24分",
      summary: "過去と現在が静かにつながる、勇者の面影が残る一話。",
      thumbnailSrc: "/frieren/chara-himmel.png",
      previewSrc: "/frieren/chara-himmel.png",
      previewCaption: "選択中の話数だけ、プレビューを大きく見せる構成です。",
    },
    31: {
      durationLabel: "24分",
      summary: "旅先の景色と余韻をじっくり味わう、穏やかな寄り道回。",
      thumbnailSrc: "/frieren/chara-frieren.png",
      previewSrc: "/frieren/chara-frieren.png",
      previewCaption: "active エピソードのプレビュー領域。",
    },
    32: {
      durationLabel: "24分",
      summary: "シュタルクとフェルンの距離感が映える回。",
      thumbnailSrc: "/frieren/chara-stark.png",
      previewSrc: "/frieren/chara-stark.png",
      previewCaption: "本物の GIF を置けば Netflix 風にもっと近づけられます。",
    },
    33: {
      durationLabel: "24分",
      summary: "静かな空気の中に、旅の緊張がにじむエピソード。",
      thumbnailSrc: "/frieren/chara-fern.png",
      previewSrc: "/frieren/banner-visual.jpg",
      previewCaption: "選択した話数の雰囲気を上段で見せます。",
    },
    34: {
      durationLabel: "24分",
      summary: "仲間たちの会話劇と、少し不穏な予感が同居する回。",
      thumbnailSrc: "/frieren/chara-heiter.png",
      previewSrc: "/frieren/chara-heiter.png",
      previewCaption: "プレビューは今後 GIF に差し替え可能です。",
    },
    35: {
      durationLabel: "24分",
      summary: "旅の重みと温度差がきれいに伝わるエピソード。",
      thumbnailSrc: "/frieren/chara-eisen.png",
      previewSrc: "/frieren/chara-eisen.png",
      previewCaption: "コメント欄は右側に固定して縦長化を抑えています。",
    },
    36: {
      durationLabel: "24分",
      summary: "思い出の断片と今の旅が交差していく一話。",
      thumbnailSrc: "/frieren/banner-visual.jpg",
      previewSrc: "/frieren/banner-visual.jpg",
      previewCaption: "選択切り替え時にプレビューも同期します。",
    },
    37: {
      durationLabel: "24分",
      summary: "感情の揺れがやわらかく積み重なるエピソード。",
      thumbnailSrc: "/frieren/chara-frieren.png",
      previewSrc: "/frieren/key-visual.jpg",
      previewCaption: "一覧と感想を同じ画面内に集約しました。",
    },
    38: {
      durationLabel: "24分",
      summary: "光景の美しさと余韻が残る締め方の一話。",
      thumbnailSrc: "/frieren/key-visual.jpg",
      previewSrc: "/frieren/key-visual.jpg",
      previewCaption: "最後の話数でも同じ UI で切り替えられます。",
    },
  },
};
