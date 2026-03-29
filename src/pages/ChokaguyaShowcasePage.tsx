import { useState, useEffect } from "react";

const B = "https://www.cho-kaguyahime.com";

interface Char {
  n: string; en: string; cv: string; c: string;
  t: string; ta: string; m: string; p: string;
}
interface Cmt { name: string; role: string; text: string; }

const chars: Char[] = [
  { n:"かぐや", en:"KAGUYA", cv:"夏野ぞら", c:"#ff6bcb", t:`${B}/assets/img/character/character_0thumb.png`, ta:`${B}/assets/img/character/character_0thumb-ac.png`, m:`${B}/assets/img/character/character_0main.png`, p:"謎めいた少女。楽しいことを求めて仮想空間「クエネ」でライバー活動を始めた。天真爛漫で破天荒。彩花のことが大好き。" },
  { n:"逆咲彩花", en:"IROHA SAKAYORI", cv:"永沢アン子", c:"#6baaff", t:`${B}/assets/img/character/character_1thumb.png`, ta:`${B}/assets/img/character/character_1thumb-ac.png`, m:`${B}/assets/img/character/character_1main.png`, p:"17歳の女子高生。文武両道の優等生だが、自分で生活費と学費を稼ぐ苦労人。音楽経験があり、作曲もできる。その理由を辞めてしまった。" },
  { n:"常夜いと絵", en:"YACHIYO RUNAMI", cv:"機械沙智", c:"#c96bff", t:`${B}/assets/img/character/character_2thumb.png`, ta:`${B}/assets/img/character/character_2thumb-ac.png`, m:`${B}/assets/img/character/character_2main.png`, p:"仮想空間「クエネ」の管理人。凄腕ライバーを斬って踊って捌身できる8000歳のミステリアスなAI。" },
  { n:"帝アキラ", en:"AKIRA MIKADO", cv:"奈野自由", c:"#ff9e6b", t:`${B}/assets/img/character/character_5thumb.png`, ta:`${B}/assets/img/character/character_5thumb-ac.png`, m:`${B}/assets/img/character/character_5main.png`, p:"人気ゲーマーグループ「ブラックリスト」のリーダー。本格派のカリスマプレイヤー。" },
  { n:"駒澤鈴", en:"RAI KOMAZAWA", cv:"柏田重馬", c:"#6bffc9", t:`${B}/assets/img/character/character_6thumb.png`, ta:`${B}/assets/img/character/character_6thumb-ac.png`, m:`${B}/assets/img/character/character_6main.png`, p:"「ブラックリスト」のメンバー。乃依の兄。冷静で口数が少ない。でもノリは良く歌が得意。" },
  { n:"駒澤乃依", en:"NOI KOMAZAWA", cv:"松岡禎丞", c:"#ffe066", t:`${B}/assets/img/character/character_7thumb.png`, ta:`${B}/assets/img/character/character_7thumb-ac.png`, m:`${B}/assets/img/character/character_7main.png`, p:"「ブラックリスト」のメンバー。鈴の弟。男性ボイスで可愛く、着飾るのが好き。" },
  { n:"綾紬瑶花", en:"ROKA AYATSUMUGI", cv:"逆山花輪", c:"#ff8eb4", t:`${B}/assets/img/character/character_8thumb.png`, ta:`${B}/assets/img/character/character_8thumb-ac.png`, m:`${B}/assets/img/character/character_8main.png`, p:"彩花の友達。美容系インフルエンサー。繊細な美人。" },
  { n:"諫山真実", en:"MAMI ISAYAMA", cv:"小坂好美", c:"#ffb86b", t:`${B}/assets/img/character/character_9thumb.png`, ta:`${B}/assets/img/character/character_9thumb-ac.png`, m:`${B}/assets/img/character/character_9main.png`, p:"彩花の友達。ぐるめ系インフルエンサー。帝アキラのファン。" },
  { n:"FUSHI", en:"FUSHI", cv:"逢宮凌泉", c:"#8be8ff", t:`${B}/assets/img/character/character_4thumb.png`, ta:`${B}/assets/img/character/character_4thumb-ac.png`, m:`${B}/assets/img/character/character_4main.png`, p:"いと絵の相棒。さらさらのウシウシ。" },
  { n:"忠笑りた笑", en:"OTAKO", cv:"マイルーズそ", c:"#ffd66b", t:`${B}/assets/img/character/character_10thumb.png`, ta:`${B}/assets/img/character/character_10thumb-ac.png`, m:`${B}/assets/img/character/character_10main.png`, p:"クエネのライバー。最新情報やトーク番組を通信。" },
  { n:"乙二秘紗", en:"KOTO", cv:"豊巣夏樹", c:"#a8e06b", t:`${B}/assets/img/character/character_11thumb.png`, ta:`${B}/assets/img/character/character_11thumb-ac.png`, m:`${B}/assets/img/character/character_11main.png`, p:"クエネのライバー。縦ゲーマーで実況解説担当。" },
  { n:"犬DOGE", en:"INUDOGE", cv:"岸辺洋紀", c:"#e0a86b", t:`${B}/assets/img/character/character_3thumb.png`, ta:`${B}/assets/img/character/character_3thumb-ac.png`, m:`${B}/assets/img/character/character_3main.png`, p:"どこかで作ったオリジナルの犬。" },
];

const cmts: Cmt[] = [
  { name:"山下成孝", role:"監督", text:"音楽とアニメーションの融合を目指しました。クエネの世界を通じて、創作の楽しさと人と人との繋がりを描きたかったのです。" },
  { name:"ryo(supercell)", role:"楽曲提供", text:"かぐやと彩花の物語に寄り添う楽曲を作れたことを嬉しく思います。ニコのお役に立てるような新しい挑戦ができました。" },
  { name:"夏野ぞら", role:"かぐや役", text:"かぐやの破天荒さと繊細さの両方を大切に演じました。彩花との掛け合いとても楽しかったです。" },
];

const CSS = `
@keyframes cks-spin { to { transform:rotate(360deg) } }
@keyframes cks-float {
  0%{opacity:0;transform:translateY(0) scale(.5)}
  20%{opacity:.55}
  50%{transform:translateY(-80px) scale(1)}
  80%{opacity:.3}
  100%{opacity:0;transform:translateY(-150px) scale(.2)}
}
@keyframes cks-up { from{opacity:0;transform:translateY(35px)} to{opacity:1;transform:translateY(0)} }
@keyframes cks-slideL { from{opacity:0;transform:translateX(-25px)} to{opacity:1;transform:translateX(0)} }
@keyframes cks-gpan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes cks-arr { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(8px);opacity:1} }
@keyframes cks-pulse { 0%,100%{box-shadow:0 0 15px rgba(255,107,203,.1)} 50%{box-shadow:0 0 35px rgba(255,107,203,.28)} }
@keyframes cks-pop { from{opacity:0;transform:scale(.82) translateY(18px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes cks-fadein { from{opacity:0} to{opacity:1} }
`;

function Sec({ id, title, sub, color, children }: {
  id?: string; title: string; sub: string; color?: string;
  children: React.ReactNode;
}) {
  const co = color || "#ff6bcb";
  return (
    <section id={id} style={{ padding: "80px 28px", maxWidth: 860, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 32 }}>
        <h2 style={{ fontWeight: 900, fontSize: 26, background: `linear-gradient(90deg,${co},#6baaff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{title}</h2>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.3)" }}>{sub}</span>
      </div>
      {children}
    </section>
  );
}

function NI({ d, t }: { d: string; t: string }) {
  return (
    <div
      style={{ display: "flex", gap: 16, padding: "14px 0", alignItems: "baseline", borderBottom: "1px solid rgba(255,255,255,.04)", cursor: "pointer", transition: "padding .3s" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "10px"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.paddingLeft = "0"; }}
    >
      <span style={{ fontSize: 11, color: "#ff6bcb", letterSpacing: 1, whiteSpace: "nowrap" }}>{d}</span>
      <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{t}</span>
    </div>
  );
}

type Page = "top" | "news" | "music" | "goods" | "special";

const anchors = ["movie", "introduction", "story", "character", "staffcast"];

export default function ChokaguyaShowcasePage() {
  const [pg, setPg] = useState<Page>("top");
  const [menu, setMenu] = useState(false);
  const [ac, setAc] = useState(0);
  const [hc, setHc] = useState(-1);
  const [sy, setSy] = useState(0);
  const [cmt, setCmt] = useState<number | null>(null);
  const [ld, setLd] = useState(true);
  const [lp, setLp] = useState(0);

  useEffect(() => {
    let p = 0;
    const t = setInterval(() => {
      p += Math.random() * 20 + 8;
      if (p >= 100) {
        setLp(100); clearInterval(t);
        setTimeout(() => setLd(false), 400);
      } else { setLp(Math.floor(p)); }
    }, 100);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const h = () => setSy(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  function go(id: string) {
    setMenu(false);
    if (anchors.includes(id)) {
      setPg("top");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 60);
    } else {
      setPg(id as Page);
      window.scrollTo({ top: 0 });
    }
  }

  const pcolors = ["#ff6bcb", "#6baaff", "#c96bff", "#ffe600", "#6bffc9"];
  const particles = Array.from({ length: 25 }, (_, i) => (
    <div key={i} style={{
      position: "absolute",
      width: 3 + (i % 5) * 1.3, height: 3 + (i % 5) * 1.3,
      borderRadius: "50%", background: pcolors[i % 5],
      left: `${(i * 31 + 13) % 97}%`, top: `${(i * 23 + 5) % 93}%`,
      opacity: 0,
      filter: i % 3 === 0 ? "blur(1px)" : "none",
      animation: `cks-float ${3.5 + (i % 4) * 1.5}s ${i * 0.3}s infinite ease-in-out`,
    }} />
  ));

  const menuItems = [
    { id: "top", label: "TOP" }, { id: "news", label: "NEWS" }, { id: "movie", label: "MOVIE" },
    { id: "introduction", label: "INTRODUCTION" }, { id: "story", label: "STORY" },
    { id: "music", label: "MUSIC" }, { id: "character", label: "CHARACTER" },
    { id: "staffcast", label: "STAFF/CAST" }, { id: "goods", label: "GOODS" }, { id: "special", label: "SPECIAL" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg,#0a001a 0%,#120025 35%,#0d0020 65%,#0a001a 100%)", fontFamily: "system-ui, -apple-system, sans-serif", color: "#fff", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ローディング */}
      {ld && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "linear-gradient(135deg,#0a001a,#1a0030,#0d0020)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 100, height: 100, borderRadius: "50%", border: "2px solid rgba(255,107,203,.12)", borderTopColor: "#ff6bcb", borderRightColor: "#6baaff", animation: "cks-spin 1.2s linear infinite", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", border: "2px solid rgba(201,107,255,.12)", borderBottomColor: "#c96bff", animation: "cks-spin .8s linear infinite reverse" }} />
          </div>
          <div style={{ fontSize: 14, letterSpacing: 8, fontWeight: 700, color: "rgba(255,255,255,.45)", marginBottom: 18 }}>LOADING</div>
          <div style={{ width: 200, height: 2, background: "rgba(255,255,255,.06)", borderRadius: 1 }}>
            <div style={{ width: `${lp}%`, height: "100%", background: "linear-gradient(90deg,#ff6bcb,#6baaff,#c96bff)", transition: "width .12s" }} />
          </div>
        </div>
      )}

      {/* パーティクル */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }}>{particles}</div>

      {/* ヘッダー */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 28px", background: sy > 50 ? "rgba(10,0,26,.93)" : "transparent", backdropFilter: sy > 50 ? "blur(14px)" : "none", transition: "all .4s", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: sy > 50 ? "1px solid rgba(255,107,203,.08)" : "1px solid transparent" }}>
        <span onClick={() => go("top")} style={{ cursor: "pointer", fontWeight: 900, fontSize: 15, background: "linear-gradient(90deg,#ff6bcb,#c96bff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>超かぐや姫！</span>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 9, letterSpacing: 2, color: "rgba(255,255,255,.3)" }}>OFFICIAL</span>
          <div onClick={() => setMenu(!menu)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 4, padding: 6, zIndex: 1001 }}>
            <div style={{ width: 20, height: 1.5, background: menu ? "#ff6bcb" : "#fff", transition: "all .3s", transform: menu ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <div style={{ width: 20, height: 1.5, background: "#fff", transition: "all .2s", opacity: menu ? 0 : 1 }} />
            <div style={{ width: 20, height: 1.5, background: menu ? "#ff6bcb" : "#fff", transition: "all .3s", transform: menu ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </div>
          <span onClick={() => setMenu(!menu)} style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.5)", cursor: "pointer" }}>MENU</span>
        </div>
      </header>

      {/* メニューオーバーレイ */}
      {menu && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(10,0,26,.97)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 18, animation: "cks-fadein .25s" }}>
          {menuItems.map((item, i) => (
            <span key={item.id} onClick={() => go(item.id)}
              style={{ fontSize: 14, letterSpacing: 6, fontWeight: 700, color: "rgba(255,255,255,.8)", cursor: "pointer", transition: "color .3s", animation: `cks-up .35s ${i * 0.04}s both` }}
              onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = "#ff6bcb"; }}
              onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = "rgba(255,255,255,.8)"; }}
            >{item.label}</span>
          ))}
        </div>
      )}

      {/* コメントモーダル */}
      {cmt !== null && (
        <div onClick={() => setCmt(null)} style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "cks-fadein .25s" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "linear-gradient(135deg,#1a0030,#0d0020)", border: "1px solid rgba(255,107,203,.2)", borderRadius: 20, padding: 36, maxWidth: 460, width: "100%", animation: "cks-pop .4s cubic-bezier(.34,1.56,.64,1)", boxShadow: "0 20px 60px rgba(255,107,203,.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 3, color: "#ff6bcb", marginBottom: 4 }}>COMMENT</div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{cmts[cmt].name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{cmts[cmt].role}</div>
              </div>
              <span onClick={() => setCmt(null)} style={{ fontSize: 18, color: "rgba(255,255,255,.3)", cursor: "pointer" }}>✕</span>
            </div>
            <div style={{ width: 30, height: 2, background: "linear-gradient(90deg,#ff6bcb,transparent)", marginBottom: 18 }} />
            <p style={{ fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,.75)" }}>{cmts[cmt].text}</p>
          </div>
        </div>
      )}

      {/* ── サブページ: NEWS ── */}
      {pg === "news" && (
        <div style={{ paddingTop: 100, maxWidth: 860, margin: "0 auto", padding: "100px 28px 80px" }}>
          <span onClick={() => go("top")} style={{ fontSize: 11, color: "rgba(255,255,255,.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,.1)", padding: "5px 14px", borderRadius: 100 }}>← TOP</span>
          <Sec title="NEWS" sub="最新情報">
            <NI d="2026.03.15" t="Blu-ray第3巻 特典情報を公開しました" />
            <NI d="2026.03.10" t="第12話放送情報を更新" />
            <NI d="2026.03.05" t="スペシャルイベント開催決定！" />
            <NI d="2026.02.28" t="サウンドトラックCD発売情報" />
            <NI d="2026.02.22" t="かぐやポップショップ開催決定" />
            <NI d="2026.02.20" t="1週間限定場公開スタート！" />
            <NI d="2026.01.22" t="Netflix世界独占配信スタート！" />
          </Sec>
        </div>
      )}

      {/* ── サブページ: MUSIC ── */}
      {pg === "music" && (
        <div style={{ paddingTop: 100, maxWidth: 860, margin: "0 auto", padding: "100px 28px 80px" }}>
          <span onClick={() => go("top")} style={{ fontSize: 11, color: "rgba(255,255,255,.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,.1)", padding: "5px 14px", borderRadius: 100 }}>← TOP</span>
          <Sec title="MUSIC" sub="音楽" color="#c96bff">
            <div style={{ display: "flex", gap: 16, marginBottom: 20, borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: 10 }}>
              {["MV", "アーティスト", "CD", "通信"].map((tab, i) => (
                <span key={i} style={{ fontSize: 12, color: i === 0 ? "#ff6bcb" : "rgba(255,255,255,.4)", cursor: "pointer", letterSpacing: 2 }}>{tab}</span>
              ))}
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.8 }}>楽曲情報・MVへのリンクは準備中です。</p>
          </Sec>
        </div>
      )}

      {/* ── サブページ: GOODS ── */}
      {pg === "goods" && (
        <div style={{ paddingTop: 100, maxWidth: 860, margin: "0 auto", padding: "100px 28px 80px" }}>
          <span onClick={() => go("top")} style={{ fontSize: 11, color: "rgba(255,255,255,.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,.1)", padding: "5px 14px", borderRadius: 100 }}>← TOP</span>
          <Sec title="Goods" sub="関連商品" color="#ffe600">
            <div style={{ padding: "60px 0", textAlign: "center", fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,.3)", letterSpacing: 4 }}>COMING SOON</div>
          </Sec>
        </div>
      )}

      {/* ── サブページ: SPECIAL ── */}
      {pg === "special" && (
        <div style={{ paddingTop: 100, maxWidth: 860, margin: "0 auto", padding: "100px 28px 80px" }}>
          <span onClick={() => go("top")} style={{ fontSize: 11, color: "rgba(255,255,255,.4)", cursor: "pointer", border: "1px solid rgba(255,255,255,.1)", padding: "5px 14px", borderRadius: 100 }}>← TOP</span>
          <Sec title="SPECIAL" sub="スペシャル" color="#6bffc9">
            <p style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.8 }}>前売り日場特典イラスト等の情報はこちら。</p>
          </Sec>
        </div>
      )}

      {/* ── トップページ ── */}
      {pg === "top" && (
        <div>
          {/* ニュースティッカー */}
          <div style={{ position: "relative", zIndex: 3, marginTop: 56, background: "rgba(255,107,203,.05)", borderTop: "1px solid rgba(255,107,203,.08)", borderBottom: "1px solid rgba(255,107,203,.08)", padding: "7px 24px", fontSize: 11, color: "rgba(255,255,255,.45)", overflow: "hidden", whiteSpace: "nowrap" }}>
            <span style={{ color: "#ff6bcb", fontWeight: 700, marginRight: 12, letterSpacing: 2, fontSize: 10 }}>HOT NEWS</span>
            クエネ感謝祭 VRイベント！クラウドファンディング開始
          </div>

          {/* ヒーロー */}
          <section style={{ minHeight: "100vh", position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}>
            <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,107,203,.12) 0%,transparent 70%)", top: -80, right: -120, transform: `translateY(${sy * 0.25}px)` }} />
            <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(107,170,255,.1) 0%,transparent 70%)", bottom: -60, left: -80, transform: `translateY(${sy * -0.18}px)` }} />
            <div style={{ animation: "cks-up 1s .2s both", position: "relative", zIndex: 3 }}>
              <h1 style={{ fontWeight: 900, fontSize: "clamp(34px,7vw,76px)", lineHeight: 1.2, background: "linear-gradient(135deg,#ff6bcb,#ff9ec4,#c96bff,#6baaff,#6bffc9)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "cks-gpan 5s linear infinite" }}>超かぐや姫！</h1>
              <div style={{ fontSize: "clamp(10px,1.5vw,14px)", letterSpacing: 4, color: "rgba(255,255,255,.4)", marginTop: 8, animation: "cks-slideL .8s .5s both" }}>COSMIC PRINCESS KAGUYA!</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.8, maxWidth: 480, margin: "24px auto 0", animation: "cks-slideL .8s .7s both" }}>日本最古の物語が、今ライブステージで生まれ変わる――</p>
              <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,.35)", animation: "cks-slideL .8s .9s both" }}>2026年1月22日（木）よりNetflixにて世界独占配信</div>
              <div style={{ marginTop: 50, animation: "cks-up .8s 1.2s both" }}>
                <span style={{ fontSize: 9, letterSpacing: 4, color: "rgba(255,255,255,.25)" }}>SCROLL</span>
                <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom,rgba(255,107,203,.5),transparent)", margin: "8px auto 0", animation: "cks-arr 2s infinite" }} />
              </div>
            </div>
          </section>

          {/* NEWS（トップ） */}
          <Sec id="newssec" title="NEWS" sub="最新情報">
            <NI d="2026.03.15" t="Blu-ray第3巻 特典情報を公開しました" />
            <NI d="2026.03.10" t="第12話放送情報を更新" />
            <NI d="2026.03.05" t="スペシャルイベント開催決定！" />
            <NI d="2026.02.28" t="サウンドトラックCD発売情報" />
            <div style={{ textAlign: "right", marginTop: 16 }}>
              <span onClick={() => go("news")}
                style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.3)", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = "#ff6bcb"; }}
                onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = "rgba(255,255,255,.3)"; }}
              >MORE →</span>
            </div>
          </Sec>

          {/* MOVIE */}
          <Sec id="movie" title="MOVIE" sub="映像" color="#c96bff">
            <div style={{ width: "100%", aspectRatio: "16/9", background: "linear-gradient(135deg,rgba(201,107,255,.08),rgba(107,170,255,.08))", borderRadius: 12, border: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, opacity: .3 }}>▶</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {cmts.map((c, i) => (
                <button key={i} onClick={() => setCmt(i)}
                  style={{ padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(255,107,203,.25)", background: "rgba(255,107,203,.06)", color: "#ff6bcb", fontSize: 10, letterSpacing: 1, cursor: "pointer", transition: "all .3s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,203,.15)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 16px rgba(255,107,203,.2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,203,.06)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
                >{c.name}コメント</button>
              ))}
            </div>
          </Sec>

          {/* INTRODUCTION */}
          <Sec id="introduction" title="INTRODUCTION" sub="イントロダクション" color="#ffe600">
            <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20, lineHeight: 1.7, color: "rgba(255,255,255,.85)" }}>日本最古の物語「かぐや姫」×「豪華なカロP連合」</h3>
            <p style={{ fontSize: 13, lineHeight: 2.2, color: "rgba(255,255,255,.55)" }}>
              数々のアニメーション作品のオープニング映像演出を手掛けてきた<strong style={{ color: "rgba(255,255,255,.9)" }}>アニメーションクリエイター・山下成孝が</strong>物語に寄り添ったヒューマンで情緒的な絵作りと、3Dのカメラワークを活かした迫力のアクションで世界中のアニメファンに鮮烈な印象を残している。
            </p>
            <p style={{ fontSize: 13, lineHeight: 2.2, color: "rgba(255,255,255,.55)", marginTop: 16 }}>
              <strong style={{ color: "rgba(255,255,255,.9)" }}>「超かぐや姫！」は、"歌"で繋がる少女たちの結の物語。</strong>主題歌を含む劇中歌には<strong style={{ color: "rgba(255,255,255,.9)" }}>ryo (supercell)</strong>を筆頭に錚々たるカロP連が参加。<strong style={{ color: "rgba(255,255,255,.9)" }}>スタジオンコリア × スタジオクロット</strong>がアニメーション制作を担う。
            </p>
          </Sec>

          {/* STORY */}
          <Sec id="story" title="STORY" sub="ストーリー" color="#6baaff">
            <img src={`${B}/assets/img/story/story_img.jpg`} alt="" style={{ width: "100%", borderRadius: 12, marginBottom: 28, display: "block" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.8, marginBottom: 20, color: "rgba(255,255,255,.85)" }}>夢と希望の集まる仮想空間「クエネ」、少女たちの出会い、そして奇跡のステージが幕を開ける――</h3>
            <p style={{ fontSize: 13, lineHeight: 2.2, color: "rgba(255,255,255,.55)" }}>今より少しだけ先の未来。都会の進学校に通う17歳の女子高生・逆咲彩花は、バイトと学業の両立に追われる日々。そんなある日、<strong style={{ color: "rgba(255,255,255,.9)" }}>彩花は一色に光り輝くゲーミング電池を見つけた。</strong></p>
            <div style={{ marginTop: 24, padding: "16px 24px", borderLeft: "3px solid #ff6bcb", borderRadius: "0 8px 8px 0", background: "rgba(255,107,203,.04)", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,.85)", fontStyle: "italic" }}>「これは、まだ誰も見たことのない、ある姫の物語。」</div>
          </Sec>

          {/* CHARACTER */}
          <Sec id="character" title="CHARACTER" sub="登場人物" color="#ffe600">
            {/* サムネイル一覧 */}
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "center", marginBottom: 36 }}>
              {chars.map((c, i) => (
                <div key={i} onClick={() => setAc(i)} onMouseEnter={() => setHc(i)} onMouseLeave={() => setHc(-1)}
                  style={{ width: 66, textAlign: "center", padding: 3, borderRadius: 8, cursor: "pointer", border: ac === i ? `2px solid ${c.c}` : "2px solid rgba(255,255,255,.06)", background: ac === i ? `${c.c}10` : "transparent", transition: "all .3s", transform: ac === i ? "translateY(-3px)" : "none" }}>
                  <img src={hc === i || ac === i ? c.ta : c.t} alt={c.n}
                    style={{ width: 54, height: 66, objectFit: "cover", borderRadius: 4, display: "block", margin: "0 auto 2px" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".2"; }} />
                  <div style={{ fontSize: 8, color: ac === i ? c.c : "rgba(255,255,255,.4)", lineHeight: 1.2 }}>{c.n}</div>
                </div>
              ))}
            </div>

            {/* キャラクター詳細 */}
            <div key={ac} style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center", animation: "cks-up .45s ease-out" }}>
              <img src={chars[ac].m} alt={chars[ac].n}
                style={{ width: 220, borderRadius: 16, display: "block", animation: "cks-pulse 3s infinite", flexShrink: 0 }}
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = ".2"; (e.target as HTMLImageElement).style.height = "300px"; }} />
              <div style={{ flex: 1, minWidth: 220, maxWidth: 360 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: chars[ac].c, marginBottom: 6 }}>{chars[ac].en}</div>
                <h3 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6, background: `linear-gradient(90deg,#fff,${chars[ac].c})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{chars[ac].n}</h3>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginBottom: 20 }}><span style={{ color: chars[ac].c, fontWeight: 700 }}>CV</span> {chars[ac].cv}</div>
                <div style={{ width: 30, height: 2, background: `linear-gradient(90deg,${chars[ac].c},transparent)`, marginBottom: 18 }} />
                <h4 style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.3)", marginBottom: 8 }}>PROFILE</h4>
                <p style={{ fontSize: 13, lineHeight: 2, color: "rgba(255,255,255,.65)" }}>{chars[ac].p}</p>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
              <button onClick={() => setAc((ac - 1 + chars.length) % chars.length)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 13 }}>←</button>
              <button onClick={() => setAc((ac + 1) % chars.length)} style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,.1)", background: "transparent", color: "#fff", cursor: "pointer", fontSize: 13 }}>→</button>
            </div>
          </Sec>

          {/* STAFF/CAST */}
          <Sec id="staffcast" title="STAFF/CAST" sub="スタッフ・キャスト" color="#6bffc9">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <h3 style={{ fontSize: 12, letterSpacing: 3, color: "#6bffc9", marginBottom: 14 }}>STAFF</h3>
                {[
                  ["監督", "山下成孝"],
                  ["メインテーマ", "常夜いと絵(cv.機械沙智)"],
                  ["ED", "かぐや×いと絵"],
                  ["劇中歌", "ryo / yuigot / Aqu3ra"],
                  ["劇中歌", "HoneyWorks / 40mP / kz"],
                  ["脚本", "夏野ぞら / 山下成孝"],
                  ["キャラデザ", "ジメま / 永末彰浩"],
                  ["音楽", "コートピュシュ"],
                  ["制作", "ンコリア / クロット"],
                ].map(([role, name], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,.3)", minWidth: 60, fontWeight: 700 }}>{role}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{name}</span>
                  </div>
                ))}
              </div>
              <div>
                <h3 style={{ fontSize: 12, letterSpacing: 3, color: "#ff6bcb", marginBottom: 14 }}>CAST</h3>
                {chars.slice(0, 9).map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,.03)" }}>
                    <span style={{ fontSize: 10, color: c.c, minWidth: 60, fontWeight: 700 }}>{c.n}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>{c.cv}</span>
                  </div>
                ))}
              </div>
            </div>
          </Sec>

          {/* フッター */}
          <footer style={{ padding: "44px 28px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,.03)" }}>
            <span onClick={() => go("top")} style={{ cursor: "pointer", fontWeight: 900, fontSize: 14, background: "linear-gradient(90deg,#ff6bcb,#c96bff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block", marginBottom: 14 }}>超かぐや姫！</span>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 12 }}>
              {["X", "YouTube", "TikTok", "Instagram"].map((s) => (
                <span key={s} style={{ fontSize: 9, color: "rgba(255,255,255,.15)" }}>{s}</span>
              ))}
            </div>
            <div onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,.25)", cursor: "pointer", marginBottom: 10 }}>TO TOP ↑</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.1)" }}>©ンコリア・パインエンジンボーズ</div>
          </footer>
        </div>
      )}
    </div>
  );
}
