// このファイルは scripts/fetch-annict.ts によって自動生成されます。手動編集しないでください。
// 最終更新: 2026-03-28T11:57:39.025Z

export interface AnnictEpisode {
  number: number | null;
  numberText: string | null;
  title: string | null;
}

export interface AnnictCast {
  characterName: string;
  personName: string;
}

export interface AnnictStaff {
  role: string;
  name: string;
}

export interface AnnictWorkData {
  episodes: AnnictEpisode[];
  casts: AnnictCast[];
  staffs: AnnictStaff[];
  watchersCount: number;
}

export const annictCache: Record<number, AnnictWorkData> = {
  "227": {
    "watchersCount": 828,
    "episodes": [
      {
        "number": null,
        "numberText": "#1",
        "title": "フラメモ"
      },
      {
        "number": null,
        "numberText": "#2",
        "title": "トナブリ"
      },
      {
        "number": null,
        "numberText": "#3",
        "title": "フリコレ"
      },
      {
        "number": null,
        "numberText": "#4",
        "title": "ピタパト"
      },
      {
        "number": null,
        "numberText": "#5",
        "title": "フリステ"
      },
      {
        "number": null,
        "numberText": "#6",
        "title": "フルフラ"
      }
    ],
    "casts": [
      {
        "characterName": "ハルハラ・ハル子",
        "personName": "新谷真弓"
      },
      {
        "characterName": "河本カナ",
        "personName": "美山加恋"
      },
      {
        "characterName": "辺田友美",
        "personName": "吉田有里"
      },
      {
        "characterName": "矢島聖",
        "personName": "飯田里穂"
      },
      {
        "characterName": "本山満",
        "personName": "田村睦心"
      },
      {
        "characterName": "須藤完",
        "personName": "小西克幸"
      },
      {
        "characterName": "佐々木門",
        "personName": "永塚拓馬"
      },
      {
        "characterName": "相田弁",
        "personName": "鈴木崚汰"
      },
      {
        "characterName": "河本静香",
        "personName": "伊藤美紀"
      },
      {
        "characterName": "河本文太",
        "personName": "真坂美帆"
      },
      {
        "characterName": "デニス用賀",
        "personName": "森功至"
      },
      {
        "characterName": "木滝真希",
        "personName": "松谷彼哉"
      },
      {
        "characterName": "神田束太",
        "personName": "青山穣"
      }
    ],
    "staffs": [
      {
        "role": "監督",
        "name": "上村泰"
      },
      {
        "role": "その他",
        "name": "鈴木清崇"
      },
      {
        "role": "脚本",
        "name": "岩井秀人"
      },
      {
        "role": "キャラクター原案",
        "name": "貞本義行"
      },
      {
        "role": "キャラクターデザイン",
        "name": "高橋裕一"
      },
      {
        "role": "その他",
        "name": "押山清高"
      },
      {
        "role": "その他",
        "name": "押山清高"
      },
      {
        "role": "その他",
        "name": "谷口宏美"
      },
      {
        "role": "その他",
        "name": "細越裕治"
      },
      {
        "role": "その他",
        "name": "秋篠Denforword日和"
      },
      {
        "role": "美術監督",
        "name": "藤井綾香"
      },
      {
        "role": "その他",
        "name": "中村千穂"
      },
      {
        "role": "その他",
        "name": "さいとうつかさ"
      },
      {
        "role": "その他",
        "name": "頓所信二"
      },
      {
        "role": "その他",
        "name": "神宮司由美"
      },
      {
        "role": "その他",
        "name": "R・O・N"
      },
      {
        "role": "音楽",
        "name": "R・O・N"
      },
      {
        "role": "音響監督",
        "name": "なかのとおる"
      },
      {
        "role": "その他",
        "name": "鶴巻和哉"
      },
      {
        "role": "総監督",
        "name": "本広克行"
      }
    ]
  },
  "2104": {
    "watchersCount": 728,
    "episodes": [
      {
        "number": 1,
        "numberText": "新章 第壱話",
        "title": "暴力教室／死なない男"
      },
      {
        "number": 2,
        "numberText": "新章 第弐話",
        "title": "きみのためにできること／貴方なしでは"
      },
      {
        "number": 3,
        "numberText": "新章 第参話",
        "title": "きみのためにできること"
      },
      {
        "number": 4,
        "numberText": "新章 第肆話",
        "title": "貴方なしでは"
      }
    ],
    "casts": [
      {
        "characterName": "瀬戸燦",
        "personName": "桃井はるこ"
      },
      {
        "characterName": "満潮永澄",
        "personName": "水島大宙"
      },
      {
        "characterName": "江戸前留奈",
        "personName": "野川さくら"
      },
      {
        "characterName": "瀬戸豪三郎",
        "personName": "三宅健太"
      },
      {
        "characterName": "瀬戸蓮",
        "personName": "鍋井まき子"
      },
      {
        "characterName": "政",
        "personName": "村瀬克輝"
      },
      {
        "characterName": "巻",
        "personName": "桑谷夏子"
      },
      {
        "characterName": "シャーク藤代",
        "personName": "子安武人"
      },
      {
        "characterName": "銭形巡",
        "personName": "森永理科"
      },
      {
        "characterName": "委員長",
        "personName": "力丸乃りこ"
      },
      {
        "characterName": "不知火明乃",
        "personName": "喜多村英梨"
      },
      {
        "characterName": "三河海",
        "personName": "小野大輔"
      },
      {
        "characterName": "ルナパパ",
        "personName": "玄田哲章"
      },
      {
        "characterName": "猿飛秀吉",
        "personName": "矢部雅史"
      },
      {
        "characterName": "猿飛悟",
        "personName": "金田朋子"
      },
      {
        "characterName": "ナレーション",
        "personName": "山崎バニラ"
      }
    ],
    "staffs": [
      {
        "role": "原作",
        "name": "木村太彦"
      },
      {
        "role": "監督",
        "name": "岸誠二"
      },
      {
        "role": "シリーズ構成",
        "name": "上江洲誠"
      },
      {
        "role": "キャラクターデザイン",
        "name": "森田和明"
      },
      {
        "role": "その他",
        "name": "月刊ガンガンWING(スクウェア・エニックス)"
      },
      {
        "role": "アニメーション制作",
        "name": "AIC"
      },
      {
        "role": "アニメーション制作",
        "name": "GONZO"
      }
    ]
  },
  "2321": {
    "watchersCount": 266,
    "episodes": [
      {
        "number": null,
        "numberText": "Episode：1",
        "title": "黒いアタッシュケース"
      },
      {
        "number": null,
        "numberText": "Episode：2",
        "title": "バシュタールの惨劇"
      },
      {
        "number": null,
        "numberText": "Episode：3",
        "title": "発令！電磁ネットワイヤー作戦 上海に墜つ…"
      },
      {
        "number": null,
        "numberText": "Episode：4",
        "title": "豪傑たちの黄昏～勝利の鐘、未だ響かず～"
      },
      {
        "number": null,
        "numberText": "Episode：5",
        "title": "真実のバシュタール！～過ぎ去りし少年のあの日々…～"
      },
      {
        "number": null,
        "numberText": "Episode：6",
        "title": "罪と罰～全てはビッグ・ファイアのために～"
      },
      {
        "number": null,
        "numberText": "Last Episode",
        "title": "大団円～散りゆくは、美しき幻の夜～"
      }
    ],
    "casts": [],
    "staffs": [
      {
        "role": "アニメーション制作",
        "name": "フェニックス・エンタテインメント"
      }
    ]
  },
  "9253": {
    "watchersCount": 1826,
    "episodes": [
      {
        "number": 1,
        "numberText": "未放送話",
        "title": "結晶多形のヴァレンティヌス"
      }
    ],
    "casts": [],
    "staffs": []
  },
  "16664": {
    "watchersCount": 2193,
    "episodes": [],
    "casts": [
      {
        "characterName": "かぐや姫",
        "personName": "朝倉あき"
      },
      {
        "characterName": "翁",
        "personName": "地井武男"
      },
      {
        "characterName": "媼",
        "personName": "宮本信子"
      },
      {
        "characterName": "捨丸",
        "personName": "高良健吾"
      }
    ],
    "staffs": [
      {
        "role": "アニメーション制作",
        "name": "スタジオジブリ"
      },
      {
        "role": "監督",
        "name": "高畑勲"
      },
      {
        "role": "脚本",
        "name": "高畑勲"
      },
      {
        "role": "脚本",
        "name": "坂口理子"
      },
      {
        "role": "音楽",
        "name": "久石譲"
      },
      {
        "role": "作画監督",
        "name": "小西賢一"
      }
    ]
  },
  "201903": {
    "watchersCount": 315,
    "episodes": [],
    "casts": [
      {
        "characterName": "かぐや",
        "personName": "夏吉ゆうこ"
      },
      {
        "characterName": "酒寄彩葉",
        "personName": "永瀬アンナ"
      }
    ],
    "staffs": [
      {
        "role": "その他",
        "name": "山下清悟"
      },
      {
        "role": "その他",
        "name": "へちま"
      },
      {
        "role": "その他",
        "name": "國井実可子"
      },
      {
        "role": "その他",
        "name": "関弘光"
      },
      {
        "role": "作画監督",
        "name": "波賀野義文"
      },
      {
        "role": "作画監督",
        "name": "永江彰浩"
      },
      {
        "role": "作画監督",
        "name": "藤田理子"
      },
      {
        "role": "作画監督",
        "name": "moaang"
      },
      {
        "role": "作画監督",
        "name": "りく"
      },
      {
        "role": "作画監督",
        "name": "へちま"
      },
      {
        "role": "作画監督",
        "name": "近岡直"
      },
      {
        "role": "その他",
        "name": "篠田貴臣"
      },
      {
        "role": "その他",
        "name": "グレンズそう"
      },
      {
        "role": "その他",
        "name": "関弘光"
      },
      {
        "role": "その他",
        "name": "山田奈月"
      },
      {
        "role": "その他",
        "name": "小池響"
      },
      {
        "role": "その他",
        "name": "ジュリアデルング"
      },
      {
        "role": "その他",
        "name": "菅沼胤"
      },
      {
        "role": "その他",
        "name": "大谷里恵"
      },
      {
        "role": "その他",
        "name": "伊久美安里"
      }
    ]
  },
  "20260116": {
    "watchersCount": 0,
    "episodes": [],
    "casts": [
      {
        "characterName": "フリーレン",
        "personName": "種﨑敦美"
      },
      {
        "characterName": "フェルン",
        "personName": "市ノ瀬加那"
      },
      {
        "characterName": "シュタルク",
        "personName": "小林千晃"
      },
      {
        "characterName": "ヒンメル",
        "personName": "岡本信彦"
      },
      {
        "characterName": "ハイター",
        "personName": "東地宏樹"
      },
      {
        "characterName": "アイゼン",
        "personName": "上田燿司"
      }
    ],
    "staffs": [
      {
        "role": "原作",
        "name": "山田鐘人、アベツカサ"
      },
      {
        "role": "監督",
        "name": "北川朋哉"
      },
      {
        "role": "シリーズ構成",
        "name": "鈴木智尋"
      },
      {
        "role": "キャラクターデザイン",
        "name": "高瀬丸、小嶋慶祐、藤中友里"
      },
      {
        "role": "音楽",
        "name": "Evan Call"
      },
      {
        "role": "アニメーション制作",
        "name": "MADHOUSE"
      }
    ]
  }
};
