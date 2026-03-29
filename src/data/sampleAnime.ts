export interface MusicTrack {
  type: "OP" | "ED" | "INSERT";
  title: string;
  artist: string;
  youtubeId?: string; // 公式MV・アニメOP映像のYouTube ID
}

export interface FanVideo {
  title: string;
  description: string;
  // YouTube検索クエリ（外部リンクとして開く）
  youtubeSearchQuery: string;
  views: string; // 例: "200万+"
}

export interface CommunityReview {
  title: string;
  summary: string;
  source?: string;
  href?: string;
}

export interface RelatedContent {
  title: string;
  href: string;
  meta?: string;
}

export interface AnimeData {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  description: string;
  coverImage: {
    extraLarge: string;
    large: string;
    color: string;
  };
  bannerImage: string | null;
  genres: string[];
  averageScore: number;
  episodes: number;
  status: string;
  season: string;
  seasonYear: number;
  studios: { nodes: { name: string }[] };
  characters: {
    nodes: {
      id: number;
      name: { full: string; native: string };
      image: { large: string; medium: string };
      description?: string;
      labMemberNo?: string;
    }[];
    edges: {
      role: string;
      voiceActors: {
        id: number;
        name: { full: string; native: string };
      }[];
    }[];
  };
  themeColor: string;
  accentColor: string;
  mood: string;
  twitterHashtag: string;
  youtubeTrailerId?: string;
  music?: MusicTrack[];
  fanVideos?: FanVideo[];
  // 作品ページに埋め込む動画（予告・特報など）最大3件
  promotionalVideos?: { title: string; youtubeId?: string }[];
  /** ホームページのバックドロップスライダー対象 */
  communityReviews?: CommunityReview[];
  relatedContents?: RelatedContent[];
  featured?: boolean;
  forceLocal?: boolean;
}

function createGradientArt(
  title: string,
  subtitle: string,
  from: string,
  to: string,
  width: number,
  height: number
): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <circle cx="${width * 0.75}" cy="${height * 0.18}" r="${Math.max(width, height) * 0.18}" fill="rgba(255,255,255,0.14)" />
      <circle cx="${width * 0.2}" cy="${height * 0.8}" r="${Math.max(width, height) * 0.12}" fill="rgba(255,255,255,0.08)" />
      <path d="M0 ${height * 0.7} C ${width * 0.22} ${height * 0.55}, ${width * 0.44} ${height * 0.82}, ${width} ${height * 0.56} L ${width} ${height} L 0 ${height} Z" fill="rgba(8,9,13,0.32)" />
      <text x="${width * 0.08}" y="${height * 0.66}" fill="rgba(255,255,255,0.95)" font-family="'Noto Sans JP', sans-serif" font-size="${Math.round(width * 0.085)}" font-weight="700">${title}</text>
      <text x="${width * 0.08}" y="${height * 0.74}" fill="rgba(255,255,255,0.72)" font-family="'Share Tech Mono', monospace" font-size="${Math.round(width * 0.038)}" letter-spacing="3">${subtitle}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createCharacterArt(name: string, accent: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="440" viewBox="0 0 320 440">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0d1220" />
          <stop offset="100%" stop-color="${accent}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" rx="28" fill="url(#bg)" />
      <circle cx="160" cy="132" r="74" fill="rgba(255,255,255,0.12)" />
      <path d="M56 370c18-60 62-92 104-92s86 32 104 92" fill="rgba(255,255,255,0.14)" />
      <text x="160" y="400" text-anchor="middle" fill="rgba(255,255,255,0.92)" font-family="'Noto Sans JP', sans-serif" font-size="28" font-weight="700">${name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const sampleAnimeList: AnimeData[] = [
  {
    id: 227,
    title: { romaji: "FLCL", english: "FLCL", native: "フリクリ" },
    description: "ナオ太は普通の小学6年生。ある日、ベスパに乗った謎の女・ハルハラ ハル子にギターで殴られ、額からロボットが生えてくる。GAINAXが放つ、予測不能なハイテンションOVA。作画、音楽、演出、すべてが規格外。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx227-sHdPWoGFuRYF.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx227-sHdPWoGFuRYF.jpg",
      color: "#FF6B35",
    },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/227.jpg",
    genres: ["Action", "Comedy", "Mecha", "Sci-Fi"],
    averageScore: 80,
    episodes: 6,
    status: "FINISHED",
    season: "SPRING",
    seasonYear: 2000,
    studios: { nodes: [{ name: "Gainax" }] },
    characters: { nodes: [], edges: [] },
    themeColor: "#FF6B35",
    accentColor: "#FFD600",
    mood: "chaotic-pop",
    twitterHashtag: "フリクリ",
    youtubeTrailerId: "t7Gz5XXgGhw",
    featured: true,
  },
  {
    id: 9253,
    title: { romaji: "Steins;Gate", english: "Steins;Gate", native: "シュタインズ・ゲート" },
    description: "2010年、秋葉原。自称「狂気のマッドサイエンティスト」岡部倫太郎は、仲間たちと「未来ガジェット研究所」を運営していた。ある日、電子レンジを改造して作った装置が、過去へメッセージを送れる「Dメール」であることを発見。しかし、その力を使うたびに世界線が変動し、やがて取り返しのつかない悲劇が訪れる。\n\n仲間を救うために岡部は何度もタイムリープを繰り返す——しかし全ての世界線で、ある人物の死は避けられない。緻密に積み上げられた伏線が最終話で完璧に回収される、SFスリラーの金字塔。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-wMBvEkgAYcFD.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx9253-wMBvEkgAYcFD.jpg",
      color: "#00C853",
    },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/9253.jpg",
    genres: ["Drama", "Sci-Fi", "Thriller"],
    averageScore: 91,
    episodes: 24,
    status: "FINISHED",
    season: "SPRING",
    seasonYear: 2011,
    studios: { nodes: [{ name: "White Fox" }] },
    characters: {
      nodes: [
        {
          id: 417,
          name: { full: "Rintaro Okabe", native: "岡部 倫太郎" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/417.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/417.jpg",
          },
          labMemberNo: "ラボメン No.001",
          description: "自称「狂気のマッドサイエンティスト 鳳凰院凶真」。普段は大げさな言動が目立つが、本質は仲間思いの優しい青年。Dメールの発見後、世界線を渡り歩くタイムリープを繰り返すことで精神的に追い詰められていく。",
        },
        {
          id: 2207,
          name: { full: "Kurisu Makise", native: "牧瀬 紅莉栖" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2207.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2207.jpg",
          },
          labMemberNo: "ラボメン No.004",
          description: "17歳でアメリカの大学を卒業した天才神経科学者。毒舌でツンデレな性格だが根は優しい。2ちゃんねるに「@ちゃん」名義で書き込むことは絶対に認めない。岡部との関係が物語の核心を担う。",
        },
        {
          id: 2208,
          name: { full: "Mayuri Shiina", native: "椎名 まゆり" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2208.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2208.jpg",
          },
          labMemberNo: "ラボメン No.002",
          description: "岡部の幼馴染。「とぅとぅる〜！」が口癖の天然で純粋な女の子。コスプレ衣装作りが趣味でメイドカフェでバイト中。ある世界線では悲劇的な運命が繰り返され、それが物語の大きな軸となる。",
        },
        {
          id: 2209,
          name: { full: "Itaru Hashida", native: "橋田 至" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2209.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2209.jpg",
          },
          labMemberNo: "ラボメン No.003",
          description: "自称「スーパーハッカー」、愛称「ダル」。オタク全開の言動で知られるが、ハッキング技術は本物。未来ガジェット研究所の技術面を支える縁の下の力持ち。",
        },
        {
          id: 2210,
          name: { full: "Suzuha Amane", native: "阿万音 鈴羽" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2210.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2210.jpg",
          },
          labMemberNo: "ラボメン No.008",
          description: "ラボの大家のバイトとして働く謎めいた女性。自転車好きで筋肉質な体型。父を探してアキバに来たと言うが、その正体は未来から送られてきたタイムトラベラー「ジョン・タイター」。",
        },
        {
          id: 2211,
          name: { full: "Ruka Urushibara", native: "漆原 るか" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2211.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2211.jpg",
          },
          labMemberNo: "ラボメン No.006",
          description: "近所の神社の跡継ぎ。男性だが外見は女性そのもので、誰もが見惚れる容姿を持つ。岡部に密かに好意を寄せている。Dメールを使えば性別が変わる世界線も存在する。",
        },
        {
          id: 2212,
          name: { full: "Faris NyanNyan", native: "フェイリス・ニャンニャン" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2212.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2212.jpg",
          },
          labMemberNo: "ラボメン No.007",
          description: "メイドカフェ「MayQueen NyanNyan」の人気No.1キャスト。語尾に「にゃん」をつけるメイド口調だが、素顔は大財閥の令嬢。秋葉原の電気街化を維持するために深い因縁を持つ。",
        },
        {
          id: 2213,
          name: { full: "Moeka Kiryu", native: "桐生 萌香" },
          image: {
            large: "https://s4.anilist.co/file/anilistcdn/character/large/2213.jpg",
            medium: "https://s4.anilist.co/file/anilistcdn/character/medium/2213.jpg",
          },
          labMemberNo: "ラボメン No.005",
          description: "フリーのライターを名乗る寡黙な女性。常に携帯メールで会話しようとする奇癖がある。IBN 5100というパソコンを探している謎の人物で、その正体はSERN配下の秘密組織「FB機関」のエージェント。",
        },
      ],
      edges: [
        { role: "MAIN", voiceActors: [{ id: 95001, name: { full: "Mamoru Miyano", native: "宮野 真守" } }] },
        { role: "MAIN", voiceActors: [{ id: 95002, name: { full: "Asami Imai", native: "今井 麻美" } }] },
        { role: "MAIN", voiceActors: [{ id: 95003, name: { full: "Kana Hanazawa", native: "花澤 香菜" } }] },
        { role: "MAIN", voiceActors: [{ id: 95004, name: { full: "Tomokazu Seki", native: "関 智一" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 95005, name: { full: "Yukari Tamura", native: "田村 ゆかり" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 95006, name: { full: "Yuu Kobayashi", native: "小林 ゆう" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 95007, name: { full: "Haruko Momoi", native: "桃井 はるこ" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 95008, name: { full: "Saori Gotou", native: "後藤 沙緒里" } }] },
      ],
    },
    themeColor: "#00C853",
    accentColor: "#FFAB00",
    mood: "dark-tech",
    twitterHashtag: "シュタインズゲート",
    youtubeTrailerId: "27OZc-ku6is",
    featured: true,
    music: [
      {
        type: "OP",
        title: "Hacking to the Gate",
        artist: "いとうかなこ",
        youtubeId: "TR3ma_60-m4",
      },
      {
        type: "ED",
        title: "刻司ル十二ノ盟約",
        artist: "ファンタズム (FES cv.榊原ゆい)",
        youtubeId: "P0fyZXmRFAc",
      },
    ],
    fanVideos: [
      {
        title: "【MAD】STEINS;GATE — 感動系 岡部×紅莉栖",
        description: "岡部と紅莉栖の関係を軸にした感動系MAD。世界線を越えた愛を美しく描く。",
        youtubeSearchQuery: "シュタインズゲート MAD 岡部 紅莉栖 感動",
        views: "100万+",
      },
      {
        title: "STEINS;GATE — Tribute / AMV Compilation",
        description: "海外ファンが制作した高品質トリビュートAMV。英語圏での人気の高さが伝わる。",
        youtubeSearchQuery: "STEINS GATE AMV tribute 1 million views",
        views: "100万+",
      },
      {
        title: "シュタインズ・ゲート OP/ED フル集",
        description: "アニメ本編・ゼロを含む全主題歌まとめ。いとうかなこ、榊原ゆいなど。",
        youtubeSearchQuery: "シュタインズゲート OP ED フル まとめ いとうかなこ",
        views: "—",
      },
    ],
  },
  {
    id: 2104,
    title: { romaji: "Seto no Hanayome", english: "My Bride is a Mermaid", native: "瀬戸の花嫁" },
    description: "瀬戸内海で溺れていた中学生・サンの命を救ったのは人魚のサン。しかし人魚を人間に見せると掟により消さなければならない。サンの父は「結婚すれば許す」と言い出して…。ギャグ全開の人魚ラブコメ。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2104-BFoxWEObM2PO.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx2104-BFoxWEObM2PO.jpg",
      color: "#00B0FF",
    },
    bannerImage: null,
    genres: ["Comedy", "Romance", "Fantasy"],
    averageScore: 78,
    episodes: 26,
    status: "FINISHED",
    season: "SPRING",
    seasonYear: 2007,
    studios: { nodes: [{ name: "Gonzo" }] },
    characters: { nodes: [], edges: [] },
    themeColor: "#00B0FF",
    accentColor: "#FF4081",
    mood: "comedy-chaos",
    twitterHashtag: "瀬戸の花嫁",
    youtubeTrailerId: "EFcs-kVNpos",
  },
  {
    id: 16664,
    title: { romaji: "Kaguya-hime no Monogatari", english: "The Tale of the Princess Kaguya", native: "かぐや姫の物語" },
    description: "竹から生まれた姫が、都へと連れていかれ、貴族として育てられていく。しかし彼女の心は、幼い頃に過ごした山里への想いとともにあった。高畑勲監督による、命の輝きと哀しみを描くジブリの傑作。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16664-EkDn3G7HHiQj.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx16664-EkDn3G7HHiQj.jpg",
      color: "#8D6E63",
    },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16664.jpg",
    genres: ["Drama", "Fantasy", "Historical"],
    averageScore: 87,
    episodes: 1,
    status: "FINISHED",
    season: "FALL",
    seasonYear: 2013,
    studios: { nodes: [{ name: "Studio Ghibli" }] },
    characters: { nodes: [], edges: [] },
    themeColor: "#8D6E63",
    accentColor: "#A5D6A7",
    mood: "serene-melancholy",
    twitterHashtag: "かぐや姫の物語",
    youtubeTrailerId: "W71mtorCZDw",
    featured: true,
  },
  {
    id: 2321,
    title: { romaji: "Giant Robo the Animation", english: "Giant Robo The Animation", native: "ジャイアントロボ THE ANIMATION" },
    description: "地球の平和を守る国際警察機構と秘密結社BFの戦い。少年・草間大作が操る巨大ロボット「ジャイアントロボ」が地球の運命をかけた戦いに挑む。今川泰宏が描く、壮大なスペクタクル叙事詩。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx2321-1ILAF72Ee2gK.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx2321-1ILAF72Ee2gK.jpg",
      color: "#D32F2F",
    },
    bannerImage: null,
    genres: ["Action", "Adventure", "Mecha", "Sci-Fi"],
    averageScore: 82,
    episodes: 7,
    status: "FINISHED",
    season: "SUMMER",
    seasonYear: 1992,
    studios: { nodes: [{ name: "Mu Animation Studio" }] },
    characters: { nodes: [], edges: [] },
    themeColor: "#D32F2F",
    accentColor: "#FFD600",
    mood: "epic-retro",
    twitterHashtag: "ジャイアントロボ",
    youtubeTrailerId: "W71mtorCZDwop2rvF6fU44",
  },
  {
    id: 20260116,
    title: {
      romaji: "Sousou no Frieren 2nd Season",
      english: "Frieren: Beyond Journey's End Season 2",
      native: "葬送のフリーレン 第2期",
    },
    description:
      "勇者ヒンメルの死をきっかけに人の心を知る旅へ出たフリーレン。その旅路を共にするフェルン、シュタルクとともに北側諸国を進む中で、静かな時間の積み重ねと苛烈な戦いの両方がより濃く描かれる第2期。",
    coverImage: {
      extraLarge: createGradientArt("葬送のフリーレン", "SEASON 2", "#17375d", "#8db695", 900, 1280),
      large: createGradientArt("葬送のフリーレン", "SEASON 2", "#17375d", "#8db695", 600, 860),
      color: "#8db695",
    },
    bannerImage: createGradientArt("FRIEREN", "BEYOND JOURNEY'S END", "#13263f", "#6d8f84", 1600, 720),
    genres: ["Adventure", "Drama", "Fantasy"],
    averageScore: 92,
    episodes: 12,
    status: "RELEASING",
    season: "WINTER",
    seasonYear: 2026,
    studios: { nodes: [{ name: "MADHOUSE" }] },
    characters: {
      nodes: [
        {
          id: 2026011601,
          name: { full: "Frieren", native: "フリーレン" },
          image: {
            large: createCharacterArt("フリーレン", "#5d7fa1"),
            medium: createCharacterArt("フリーレン", "#5d7fa1"),
          },
          description:
            "魔王を倒した勇者一行の魔法使い。千年以上を生きるエルフで、人の気持ちを知るための旅を続けている。",
        },
        {
          id: 2026011602,
          name: { full: "Fern", native: "フェルン" },
          image: {
            large: createCharacterArt("フェルン", "#6e5b8f"),
            medium: createCharacterArt("フェルン", "#6e5b8f"),
          },
          description:
            "フリーレンの弟子で、一行の空気を整える常識人。ハイターに拾われ、幼い頃から魔法を学んできた。",
        },
        {
          id: 2026011603,
          name: { full: "Stark", native: "シュタルク" },
          image: {
            large: createCharacterArt("シュタルク", "#a06a4b"),
            medium: createCharacterArt("シュタルク", "#a06a4b"),
          },
          description:
            "戦士アイゼンの弟子。気弱に見えても、仲間のためには前に出られる勇敢さを持つ戦士。",
        },
        {
          id: 2026011604,
          name: { full: "Himmel", native: "ヒンメル" },
          image: {
            large: createCharacterArt("ヒンメル", "#6487c2"),
            medium: createCharacterArt("ヒンメル", "#6487c2"),
          },
          description:
            "魔王を倒した勇者一行の勇者。旅の痕跡を各地に残し、今も多くの人の行動や価値観に影響を与えている。",
        },
        {
          id: 2026011605,
          name: { full: "Heiter", native: "ハイター" },
          image: {
            large: createCharacterArt("ハイター", "#73916c"),
            medium: createCharacterArt("ハイター", "#73916c"),
          },
          description:
            "勇者一行の僧侶。飄々として見えるが、フェルンを育て、フリーレンの旅にも大きな影響を与えた導き手。",
        },
        {
          id: 2026011606,
          name: { full: "Eisen", native: "アイゼン" },
          image: {
            large: createCharacterArt("アイゼン", "#8b6f56"),
            medium: createCharacterArt("アイゼン", "#8b6f56"),
          },
          description:
            "勇者一行の戦士。頑丈さと実直さを兼ね備えたドワーフで、シュタルクの師匠でもある。",
        },
      ],
      edges: [
        { role: "MAIN", voiceActors: [{ id: 2026011611, name: { full: "Atsumi Tanezaki", native: "種﨑敦美" } }] },
        { role: "MAIN", voiceActors: [{ id: 2026011612, name: { full: "Kana Ichinose", native: "市ノ瀬加那" } }] },
        { role: "MAIN", voiceActors: [{ id: 2026011613, name: { full: "Chiaki Kobayashi", native: "小林千晃" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 2026011614, name: { full: "Nobuhiko Okamoto", native: "岡本信彦" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 2026011615, name: { full: "Hiroki Touchi", native: "東地宏樹" } }] },
        { role: "SUPPORTING", voiceActors: [{ id: 2026011616, name: { full: "Yoji Ueda", native: "上田燿司" } }] },
      ],
    },
    themeColor: "#8db695",
    accentColor: "#89b9ff",
    mood: "fantasy-elegy",
    twitterHashtag: "フリーレン",
    youtubeTrailerId: "RH-FcW94z00",
    music: [
      {
        type: "OP",
        title: "lulu.",
        artist: "Mrs. GREEN APPLE",
      },
      {
        type: "ED",
        title: "The Story of Us",
        artist: "milet",
      },
    ],
    promotionalVideos: [
      { title: "第2期発表映像", youtubeId: "DknvOzqQCTo" },
      { title: "ティザービジュアル第2弾発表映像", youtubeId: "-xW3fjM26vY" },
      { title: "ティザーPV", youtubeId: "P-YPtYkViKM" },
      { title: "PV第2弾", youtubeId: "MwP4gqRys4c" },
      { title: "本PV", youtubeId: "RH-FcW94z00" },
    ],
    communityReviews: [
      {
        title: "空気感と余白が好き",
        summary:
          "Annictの視聴記録では、静かな空気感や間の取り方の心地よさを評価する感想が多く見られる。",
        source: "Annict series records",
        href: "https://annict.com/works/10079",
      },
      {
        title: "音楽と映像の完成度",
        summary:
          "映像表現、劇伴、演出が原作の魅力をさらに押し広げているという反応が目立つ。",
        source: "Annict series records",
        href: "https://annict.com/works/10079",
      },
      {
        title: "穏やかさと戦闘の落差",
        summary:
          "日常の柔らかな会話劇と、要所で切れ味を見せるバトル演出の対比が高く評価されている。",
        source: "Annict episode records",
        href: "https://annict.com/works/10079/episodes/158238",
      },
    ],
    relatedContents: [
      {
        title: "公式サイト",
        href: "https://frieren-anime.jp/",
        meta: "イントロダクション、キャラクター、放送情報",
      },
      {
        title: "公式MOVIEページ",
        href: "https://frieren-anime.jp/movie/",
        meta: "PV、OP/ED、次回予告",
      },
      {
        title: "Annict 関連作品",
        href: "https://annict.com/works/10079/related_works",
        meta: "第1期、ミニアニメ、シリーズ導線",
      },
      {
        title: "ミニアニメ『●●の魔法』新作情報",
        href: "https://frieren-anime.jp/news/4625/",
        meta: "放送期間中に不定期配信",
      },
      {
        title: "スペシャルギャラリー",
        href: "https://frieren-anime.jp/special/gallery/",
        meta: "第2期キービジュアルやイラスト",
      },
    ],
    forceLocal: true,
  },
  {
    id: 201903,
    title: { romaji: "Chou Kaguya-hime!", english: "Super Kaguya-hime!", native: "超かぐや姫！" },
    description: "2026年公開の劇場版アニメ。Studio Colorido × Studio Chromato制作。竹から生まれた「かぐや」はバーチャル世界「ツクヨミ」で最強の配信者として活躍していた。しかし月への帰還を巡る陰謀が動き出し、仲間たちとともに壮大な戦いへと挑む。ryo(supercell)、kz(livetune)、40mP、HoneyWorksら豪華音楽陣が楽曲を担当。歌と映像が一体となる、超絶エンタメ映画。",
    coverImage: {
      extraLarge: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx201903-v43gxQKw8Tc8.jpg",
      large: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx201903-v43gxQKw8Tc8.jpg",
      color: "#e46b35",
    },
    bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/201903-Y20yLk06W45T.jpg",
    genres: ["Action", "Comedy", "Drama", "Fantasy", "Music", "Sci-Fi"],
    averageScore: 80,
    episodes: 1,
    status: "FINISHED",
    season: "WINTER",
    seasonYear: 2026,
    studios: { nodes: [{ name: "Studio Colorido" }, { name: "Studio Chromato" }, { name: "Twin Engine" }] },
    // キャラクターデータはAniList APIから取得（sampleは説明文のみ保持）
    characters: { nodes: [], edges: [] },
    themeColor: "#e46b35",
    accentColor: "#8855ff",
    mood: "cyber-moon",
    twitterHashtag: "超かぐや姫",
    music: [
      {
        type: "OP",
        title: "エクス=おとぎばなし",
        artist: "月見ヤチヨ (CV.早見沙織)",
        youtubeId: "owEBHHZg38s",
      },

      {
        type: "ED",
        title: "ray 超かぐや姫！Version",
        artist: "月見ヤチヨ (CV.早見沙織)",
        youtubeId: "8qE2pKNR84o",
      },
    ],
    fanVideos: [
      {
        title: "ray 超かぐや姫！Version",
        description: "かぐや・月見ヤチヨ",
        youtubeSearchQuery: "356MRZ6P5h0",
        views: "—",
      },
      {
        title: "【MAD】超かぐや姫！ 月見ヤチヨ × 早見沙織",
        description: "月見ヤチヨ（CV.早見沙織）のキャラを中心にした自作MAD。歌声と美麗映像を堪能できる。",
        youtubeSearchQuery: "超かぐや姫 MAD 月見ヤチヨ 早見沙織",
        views: "—",
      },
      {
        title: "超かぐや姫！ 音楽特集 ryo supercell × kz livetune",
        description: "ryo(supercell)、kz(livetune)、40mP、HoneyWorks制作楽曲のまとめ。",
        youtubeSearchQuery: "超かぐや姫 音楽 supercell livetune HoneyWorks 40mP",
        views: "—",
      },
    ],
    // ▼ YouTubeのURLから動画IDをコピーしてここに貼り付けてください
    // 例: https://www.youtube.com/watch?v=XXXXXXXXXX → youtubeId: "XXXXXXXXXX"
    promotionalVideos: [
      { title: "予告PV 第1弾", youtubeId: undefined },
      { title: "予告PV 第2弾", youtubeId: undefined },
      { title: "特報映像",     youtubeId: undefined },
    ],
    featured: true,
  },
];

const frierenSeason2 = sampleAnimeList.find((anime) => anime.id === 20260116);

if (frierenSeason2) {
  frierenSeason2.title.native = "葬送のフリーレン 第2期";
  frierenSeason2.description =
    "勇者ヒンメルの死をきっかけに、人の心を知る旅へ出たフリーレン。フェルン、シュタルクとともに北側諸国を進むなかで、静かな時間の積み重ねと苛烈な戦いの両方がより濃く描かれる第2期。";
  frierenSeason2.coverImage = {
    extraLarge: "https://frieren-anime.jp/wp-content/uploads/2025/09/n-724x1024.jpg",
    large: "https://frieren-anime.jp/wp-content/uploads/2025/09/n-724x1024.jpg",
    color: "#8db695",
  };
  frierenSeason2.bannerImage =
    "https://frieren-anime.jp/wp-content/themes/frieren_2023/assets/img/top/top/9_visual.jpg";
  frierenSeason2.twitterHashtag = "フリーレン";
  frierenSeason2.characters.nodes = [
    {
      id: 2026011601,
      name: { full: "Frieren", native: "フリーレン" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara01_full1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara01_full1.png",
      },
      description:
        "魔王を倒した勇者一行の魔法使い。千年以上生きるエルフで、人の気持ちを知るため旅を続けている。",
    },
    {
      id: 2026011602,
      name: { full: "Fern", native: "フェルン" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara02_full1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara02_full1.png",
      },
      description:
        "フリーレンの弟子。常識人で、ハイターに拾われて幼い頃から魔法を学んだ。",
    },
    {
      id: 2026011603,
      name: { full: "Stark", native: "シュタルク" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara03_full1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara03_full1.png",
      },
      description:
        "フリーレンとフェルンと共に旅をする戦士で、アイゼンの弟子。臆病ながら優しい心の持ち主。",
    },
    {
      id: 2026011604,
      name: { full: "Himmel", native: "ヒンメル" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara4_full1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara4_full1.png",
      },
      description:
        "魔王を倒した勇者パーティーの勇者。まっすぐな言葉と振る舞いで、多くの人の記憶に残り続けている。",
    },
    {
      id: 2026011605,
      name: { full: "Heiter", native: "ハイター" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara5_full1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara5_full1.png",
      },
      description:
        "魔王を倒した勇者パーティーの僧侶。飄々として見えるが、フェルンを育てた大きな導き手。",
    },
    {
      id: 2026011606,
      name: { full: "Eisen", native: "アイゼン" },
      image: {
        large: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara6_full1-1.png",
        medium: "https://frieren-anime.jp/wp-content/uploads/2023/08/chara6_full1-1.png",
      },
      description:
        "魔王を倒した勇者パーティーの戦士。頑強なドワーフ族で、寡黙ながらパーティーを支える前衛。",
    },
  ];
  frierenSeason2.characters.edges = [
    { role: "MAIN", voiceActors: [{ id: 2026011611, name: { full: "Atsumi Tanezaki", native: "種﨑敦美" } }] },
    { role: "MAIN", voiceActors: [{ id: 2026011612, name: { full: "Kana Ichinose", native: "市ノ瀬加那" } }] },
    { role: "MAIN", voiceActors: [{ id: 2026011613, name: { full: "Chiaki Kobayashi", native: "小林千晃" } }] },
    { role: "SUPPORTING", voiceActors: [{ id: 2026011614, name: { full: "Nobuhiko Okamoto", native: "岡本信彦" } }] },
    { role: "SUPPORTING", voiceActors: [{ id: 2026011615, name: { full: "Hiroki Touchi", native: "東地宏樹" } }] },
    { role: "SUPPORTING", voiceActors: [{ id: 2026011616, name: { full: "Yoji Ueda", native: "上田燿司" } }] },
  ];
}

if (frierenSeason2) {
  frierenSeason2.title.native = "葬送のフリーレン 第2期";
  frierenSeason2.description =
    "勇者ヒンメルの死をきっかけに、人の心を知る旅へ出たフリーレン。フェルン、シュタルクとともに北側諸国を進むなかで、静かな時間の積み重ねと苛烈な戦いの両方がより濃く描かれる第2期。";
  frierenSeason2.coverImage = {
    extraLarge: "/frieren/key-visual.jpg",
    large: "/frieren/key-visual.jpg",
    color: "#8db695",
  };
  frierenSeason2.bannerImage = "/frieren/banner-visual.jpg";
  frierenSeason2.twitterHashtag = "フリーレン";
  frierenSeason2.youtubeTrailerId = "P-YPtYkViKM";
  frierenSeason2.promotionalVideos = [
    { title: "ティザーPV", youtubeId: "P-YPtYkViKM" },
    { title: "PV第2弾", youtubeId: "MwP4gqRys4c" },
    { title: "第2期発表映像", youtubeId: "DknvOzqQCTo" },
    { title: "ティザービジュアル第2弾発表映像", youtubeId: "-xW3fjM26vY" },
  ];
  frierenSeason2.characters.nodes = [
    {
      id: 2026011601,
      name: { full: "Frieren", native: "フリーレン" },
      image: { large: "/frieren/chara-frieren.png", medium: "/frieren/chara-frieren.png" },
      description: "魔王を倒した勇者一行の魔法使い。千年以上生きるエルフで、人の気持ちを知るため旅を続けている。",
    },
    {
      id: 2026011602,
      name: { full: "Fern", native: "フェルン" },
      image: { large: "/frieren/chara-fern.png", medium: "/frieren/chara-fern.png" },
      description: "フリーレンの弟子。常識人で、ハイターに拾われて幼い頃から魔法を学んだ。",
    },
    {
      id: 2026011603,
      name: { full: "Stark", native: "シュタルク" },
      image: { large: "/frieren/chara-stark.png", medium: "/frieren/chara-stark.png" },
      description: "フリーレンとフェルンと共に旅をする戦士で、アイゼンの弟子。臆病ながら優しい心の持ち主。",
    },
    {
      id: 2026011604,
      name: { full: "Himmel", native: "ヒンメル" },
      image: { large: "/frieren/chara-himmel.png", medium: "/frieren/chara-himmel.png" },
      description: "魔王を倒した勇者パーティーの勇者。まっすぐな言葉と振る舞いで、多くの人の記憶に残り続けている。",
    },
    {
      id: 2026011605,
      name: { full: "Heiter", native: "ハイター" },
      image: { large: "/frieren/chara-heiter.png", medium: "/frieren/chara-heiter.png" },
      description: "魔王を倒した勇者パーティーの僧侶。飄々として見えるが、フェルンを育てた大きな導き手。",
    },
    {
      id: 2026011606,
      name: { full: "Eisen", native: "アイゼン" },
      image: { large: "/frieren/chara-eisen.png", medium: "/frieren/chara-eisen.png" },
      description: "魔王を倒した勇者パーティーの戦士。頑強なドワーフ族で、寡黙ながらパーティーを支える前衛。",
    },
  ];
}
