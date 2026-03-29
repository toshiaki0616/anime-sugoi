export interface InfoTableRow {
  label: string;
  value: string;
}

export interface InfoTableSection {
  title: string;
  accentClass: string;
  rows: InfoTableRow[];
}

export const frierenInfoTables: InfoTableSection[] = [
  {
    title: "スタッフ",
    accentClass: "info-table-card--lavender",
    rows: [
      { label: "原作", value: "山田鐘人、アベツカサ" },
      { label: "掲載誌", value: "週刊少年サンデー(小学館)" },
      { label: "監督", value: "北川朋哉" },
      { label: "副監督", value: "原科大樹" },
      { label: "監督協力", value: "斎藤圭一郎" },
      { label: "シリーズ構成", value: "鈴木智尋" },
      { label: "キャラクターデザイン", value: "高瀬丸、小嶋慶祐、藤中友里" },
      { label: "音楽", value: "Evan Call" },
      { label: "コンセプトアート", value: "吉岡誠子" },
      { label: "デザインワークス", value: "小橋弘侑、原野瑠奈、瀬口泉、原科大樹" },
      { label: "美術監督", value: "高木佐和子" },
      { label: "美術設定", value: "杉山晋史" },
      { label: "色彩設計", value: "大野春恵" },
      { label: "3DCGディレクター", value: "今垣佳奈" },
      { label: "撮影監督", value: "伏原あかね" },
      { label: "編集", value: "木村佳史子" },
      { label: "音響監督", value: "はたしょう二" },
      { label: "アニメーション制作", value: "マッドハウス" },
    ],
  },
  {
    title: "オープニングテーマ「lulu.」",
    accentClass: "info-table-card--pink",
    rows: [
      { label: "作詞・作曲", value: "大森元貴" },
      { label: "編曲", value: "兼松衆、大森元貴" },
      { label: "歌", value: "Mrs. GREEN APPLE" },
    ],
  },
  {
    title: "エンディングテーマ「The Story of Us」",
    accentClass: "info-table-card--peach",
    rows: [
      { label: "作詞・歌", value: "milet" },
      { label: "作曲", value: "milet、野村陽一郎" },
      { label: "編曲", value: "Evan Call" },
    ],
  },
  {
    title: "キャスト",
    accentClass: "info-table-card--green",
    rows: [
      { label: "フリーレン", value: "種﨑敦美" },
      { label: "フェルン", value: "市ノ瀬加那" },
      { label: "シュタルク", value: "小林千晃" },
      { label: "ヒンメル", value: "岡本信彦" },
      { label: "ハイター", value: "東地宏樹" },
      { label: "アイゼン", value: "上田燿司" },
      { label: "ヴィアベル", value: "谷山紀章" },
      { label: "シャルフ", value: "村井雄治" },
      { label: "エーレ", value: "伊藤かな恵" },
      { label: "ゲナウ", value: "新垣樽助" },
      { label: "メトーデ", value: "上田麗奈" },
    ],
  },
];
