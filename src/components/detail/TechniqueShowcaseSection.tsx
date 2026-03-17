import { useState, useEffect, useRef, useCallback } from "react";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TECHNIQUE SHOWCASE COMPONENT
// アニメ公式サイトの動的表現を分解・解説するセクション
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ─── Code Block Component ───
const CodeBlock = ({ code, label }: { code: string; label?: string }) => (
  <div style={{
    marginTop: 16, borderRadius: 10,
    background: "rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.06)",
    overflow: "hidden",
  }}>
    {label && (
      <div style={{
        padding: "8px 16px",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10, letterSpacing: 1,
        color: "rgba(255,255,255,0.35)",
        textTransform: "uppercase",
      }}>{label}</div>
    )}
    <pre style={{
      padding: 16, margin: 0,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12, lineHeight: 1.7,
      color: "rgba(255,255,255,0.7)",
      overflowX: "auto",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    }}>{code}</pre>
  </div>
);

// ─── Section Header ───
const TechniqueHeader = ({ number, title, subtitle, color }: { number: number; title: string; subtitle: string; color?: string }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11, letterSpacing: 3,
      color: color || "#ff6bcb",
      marginBottom: 8,
    }}>
      TECHNIQUE {number.toString().padStart(2, "0")}
    </div>
    <h2 style={{
      fontFamily: "'Zen Kaku Gothic New', sans-serif",
      fontWeight: 900, fontSize: 28,
      color: "#fff",
      marginBottom: 6,
    }}>{title}</h2>
    <p style={{
      fontSize: 13, color: "rgba(255,255,255,0.4)",
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: 1,
    }}>{subtitle}</p>
  </div>
);

// ─── Explanation Text ───
const Explanation = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    fontSize: 14, lineHeight: 2,
    color: "rgba(255,255,255,0.65)",
    marginBottom: 20,
    paddingLeft: 16,
    borderLeft: "2px solid rgba(255,255,255,0.06)",
  }}>{children}</div>
);

// ─── Tag Component ───
const Tag = ({ children, color = "#ff6bcb" }: { children: React.ReactNode; color?: string }) => (
  <span style={{
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 100,
    fontSize: 10,
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: 1,
    color: color,
    border: `1px solid ${color}44`,
    background: `${color}11`,
    marginRight: 6,
    marginBottom: 4,
  }}>{children}</span>
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN SHOWCASE COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function TechniqueShowcaseSection() {
  // ── State for interactive demos ──
  const [loadingDemo, setLoadingDemo] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [parallaxY, setParallaxY] = useState<number>(0);
  const [activeChar, setActiveChar] = useState<number>(0);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [particleCount, setParticleCount] = useState<number>(20);
  const [scrollDemoY, _setScrollDemoY] = useState<number>(0);
  const [navSolid, setNavSolid] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrollDemoRef = useRef<HTMLDivElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const registerSection = useCallback((id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el;
  }, []);

  const isVisible = (id: string): boolean => visibleSections.has(id);

  // Loading demo
  const runLoadingDemo = () => {
    setLoadingDemo(true);
    setLoadProgress(0);
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        setLoadProgress(100);
        clearInterval(timer);
        setTimeout(() => setLoadingDemo(false), 800);
      } else {
        setLoadProgress(Math.floor(progress));
      }
    }, 140);
  };

  // Characters for demo
  const chars = [
    { name: "キャラA", color: "#ff6bcb", emoji: "🌙" },
    { name: "キャラB", color: "#6baaff", emoji: "🎵" },
    { name: "キャラC", color: "#c96bff", emoji: "✨" },
    { name: "キャラD", color: "#ffe600", emoji: "⚡" },
  ];

  const techniques = [
    { id: "t1", title: "ローディングアニメーション", en: "Loading Animation" },
    { id: "t2", title: "パーティクルシステム", en: "Particle System" },
    { id: "t3", title: "パララックス効果", en: "Parallax Scrolling" },
    { id: "t4", title: "スクロール連動フェードイン", en: "Scroll-triggered Reveal" },
    { id: "t5", title: "グリッチテキスト", en: "Glitch Text Effect" },
    { id: "t6", title: "キャラクター切替演出", en: "Character Switch Animation" },
    { id: "t7", title: "ナビバートランジション", en: "Navbar Transition" },
    { id: "t8", title: "ハンバーガーメニュー", en: "Hamburger Menu Overlay" },
    { id: "t9", title: "グラデーション＆カラー設計", en: "Gradient & Color System" },
    { id: "t10", title: "ホバーインタラクション", en: "Hover Micro-interactions" },
  ];

  // suppress unused warning
  void scrollDemoY;
  void scrollDemoRef;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#08070e",
      fontFamily: "'Zen Kaku Gothic New', sans-serif",
      color: "#fff",
      position: "relative",
    }}>
      <style>{`
        @keyframes particleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 0.7; }
          50% { transform: translateY(-60px) scale(1); }
          80% { opacity: 0.5; }
          100% { opacity: 0; transform: translateY(-120px) scale(0.2); }
        }
        @keyframes loadSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes charPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,203,0.2); }
          50% { box-shadow: 0 0 50px rgba(255,107,203,0.5), 0 0 100px rgba(107,170,255,0.2); }
        }
        @keyframes backgroundPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes borderGlow {
          0%, 100% { border-color: rgba(255,107,203,0.2); }
          50% { border-color: rgba(107,170,255,0.5); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes scrollArrow {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(8px); opacity: 1; }
        }

        .demo-box {
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.015);
          overflow: hidden;
          position: relative;
        }
        .demo-label {
          position: absolute;
          top: 12px; right: 12px;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(0,0,0,0.6);
          border: 1px solid rgba(255,255,255,0.08);
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
          z-index: 10;
        }
        .technique-section {
          padding: 80px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          max-width: 900px;
          margin: 0 auto;
        }
        .btn-demo {
          padding: 10px 24px;
          border-radius: 8px;
          border: 1px solid rgba(255,107,203,0.3);
          background: rgba(255,107,203,0.08);
          color: #ff6bcb;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.3s;
          letter-spacing: 1px;
        }
        .btn-demo:hover {
          background: rgba(255,107,203,0.18);
          border-color: #ff6bcb;
          box-shadow: 0 0 20px rgba(255,107,203,0.2);
        }
        .char-card {
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 16px;
          text-align: center;
        }
        .char-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 12px 40px rgba(255,107,203,0.2);
        }
        .hover-demo-item {
          padding: 16px 20px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .hover-demo-item:hover {
          padding-left: 28px;
          background: rgba(255,107,203,0.06);
          border-color: rgba(255,107,203,0.25);
          box-shadow: 0 4px 20px rgba(255,107,203,0.1);
        }
        .nav-link-demo {
          position: relative;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          font-size: 12px;
          letter-spacing: 2px;
          padding-bottom: 4px;
          cursor: pointer;
          transition: color 0.3s;
        }
        .nav-link-demo::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, #ff6bcb, #6baaff);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .nav-link-demo:hover { color: #ff6bcb; }
        .nav-link-demo:hover::after { transform: scaleX(1); }
      `}</style>

      {/* ━━ PAGE HEADER ━━ */}
      <header style={{
        padding: "80px 32px 60px",
        maxWidth: 900, margin: "0 auto",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: 4,
          color: "rgba(255,255,255,0.25)",
          marginBottom: 16,
        }}>
          ANIMATION TECHNIQUE BREAKDOWN
        </div>
        <h1 style={{
          fontWeight: 900, fontSize: "clamp(28px, 5vw, 48px)",
          lineHeight: 1.3,
          background: "linear-gradient(135deg, #ff6bcb, #c96bff, #6baaff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 16,
        }}>
          動的表現テクニック分解
        </h1>
        <p style={{
          fontSize: 15, lineHeight: 1.9,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 600,
        }}>
          アニメ公式サイトで使われている動的表現を10のテクニックに分解。
          各手法のしくみ、実装コード、ライブデモを確認できます。
        </p>

        {/* ── Index ── */}
        <div style={{
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 8,
        }}>
          {techniques.map((t, i) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              style={{
                display: "flex", gap: 10, alignItems: "center",
                textDecoration: "none",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.01)",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,107,203,0.2)";
                e.currentTarget.style.background = "rgba(255,107,203,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              }}
            >
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: "#ff6bcb", minWidth: 20,
              }}>{(i + 1).toString().padStart(2, "0")}</span>
              <span style={{
                fontSize: 12, color: "rgba(255,255,255,0.6)",
              }}>{t.title}</span>
            </a>
          ))}
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 01: LOADING ANIMATION
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t1" className="technique-section">
        <TechniqueHeader number={1} title="ローディングアニメーション" subtitle="Loading Screen Animation" color="#ff6bcb" />

        <Explanation>
          ページ読み込み時に全画面ローディングを表示。回転する二重リング、プログレスバー、
          レインボーシマーのテキストを組み合わせて「読み込み中」の没入感を演出する。
          完了後にフェードアウトしてメインコンテンツへ遷移。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#ff6bcb">CSS @keyframes</Tag>
          <Tag color="#6baaff">setInterval</Tag>
          <Tag color="#c96bff">border animation</Tag>
          <Tag color="#ffe600">background-clip: text</Tag>
        </div>

        {/* Live Demo */}
        <div className="demo-box" style={{ height: 280, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="demo-label">LIVE DEMO</div>
          {loadingDemo ? (
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                border: "2px solid rgba(255,107,203,0.15)",
                borderTopColor: "#ff6bcb", borderRightColor: "#6baaff",
                animation: "loadSpin 1.2s linear infinite",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: "50%",
                  border: "2px solid rgba(201,107,255,0.15)",
                  borderBottomColor: "#c96bff",
                  animation: "loadSpin 0.8s linear infinite reverse",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 20 }}>🌙</span>
                </div>
              </div>
              <div style={{
                fontFamily: "Orbitron, sans-serif", fontSize: 12, letterSpacing: 6,
                background: "linear-gradient(90deg, #ff6bcb, #6baaff, #c96bff, #ff6bcb)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                animation: "shimmer 2s linear infinite",
                marginBottom: 16,
              }}>LOADING</div>
              <div style={{
                width: 160, height: 2, background: "rgba(255,255,255,0.08)",
                borderRadius: 1, margin: "0 auto", overflow: "hidden",
              }}>
                <div style={{
                  width: `${loadProgress}%`, height: "100%",
                  background: "linear-gradient(90deg, #ff6bcb, #6baaff)",
                  transition: "width 0.15s",
                }} />
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 8,
              }}>{loadProgress}%</div>
            </div>
          ) : (
            <button className="btn-demo" onClick={runLoadingDemo}>
              ▶ ローディングを再生
            </button>
          )}
        </div>

        <CodeBlock label="核心の仕組み" code={`// 1. 二重リング: borderの一部だけ色を付けて回転
border: "2px solid rgba(255,107,203,0.15)"
borderTopColor: "#ff6bcb"   // ← 上辺だけ色を変える
animation: "loadSpin 1.2s linear infinite"

// 2. 内側リングは逆回転
animation: "loadSpin 0.8s linear infinite reverse"

// 3. シマーテキスト: background-clipでテキストにグラデ適用
background: "linear-gradient(90deg, #ff6bcb, #6baaff, ...)"
backgroundSize: "200% auto"   // ← 2倍幅にして
animation: "shimmer 2s linear infinite" // ← スライドさせる
WebkitBackgroundClip: "text"

// 4. プログレスバー: setIntervalで段階的に進める
progress += Math.random() * 18 + 5  // ランダム増分でリアル感`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 02: PARTICLE SYSTEM
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t2" className="technique-section">
        <TechniqueHeader number={2} title="パーティクルシステム" subtitle="Floating Particle Layer" color="#6baaff" />

        <Explanation>
          画面全体にランダム配置された小さな光の粒が浮遊する演出。
          position: fixed のレイヤーに配置し、CSSアニメーションだけで実現。
          JSライブラリ不要で軽量。各パーティクルにランダムなサイズ・色・速度・遅延を付与。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#6baaff">CSS only</Tag>
          <Tag color="#ff6bcb">position: fixed</Tag>
          <Tag color="#c96bff">ランダムパラメータ</Tag>
          <Tag color="#6bffc9">pointerEvents: none</Tag>
        </div>

        {/* Live Demo */}
        <div className="demo-box" style={{ height: 250, position: "relative" }}>
          <div className="demo-label">LIVE DEMO</div>
          {Array.from({ length: particleCount }).map((_, i) => {
            const colors = ["#ff6bcb", "#6baaff", "#c96bff", "#ffe600", "#6bffc9", "#ff9e6b"];
            const size = 3 + (i % 7) * 1.5;
            return (
              <div key={i} style={{
                position: "absolute",
                width: size, height: size, borderRadius: "50%",
                background: colors[i % 6],
                left: `${(i * 37 + 13) % 95}%`,
                top: `${(i * 23 + 7) % 85}%`,
                opacity: 0,
                filter: `blur(${i % 3 === 0 ? 1 : 0}px)`,
                animation: `particleFloat ${3 + (i % 5) * 1.2}s ${i * 0.3}s infinite ease-in-out`,
                pointerEvents: "none",
              }} />
            );
          })}
          <div style={{
            position: "absolute", bottom: 16, left: 16, right: 16,
            display: "flex", alignItems: "center", gap: 12, zIndex: 10,
          }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
              個数: {particleCount}
            </span>
            <input
              type="range" min="5" max="50" value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              style={{ flex: 1, accentColor: "#6baaff" } as React.CSSProperties}
            />
          </div>
        </div>

        <CodeBlock label="生成ロジック" code={`// パーティクル生成: 配列からランダムパラメータを付与
const particles = Array.from({ length: 40 }, (_, i) => ({
  size: Math.random() * 8 + 3,          // 3〜11px
  color: colors[i % 6],                  // 6色ローテーション
  left: \`\${Math.random() * 100}%\`,       // ランダム横位置
  top: \`\${Math.random() * 100}%\`,        // ランダム縦位置
  blur: Math.random() * 2,               // ボケ具合
  duration: 4 + Math.random() * 6,       // 4〜10秒で1周期
}));

// CSSアニメーション: 浮遊→消滅のループ
@keyframes particleFloat {
  0%   { opacity: 0; transform: translateY(0) scale(0.5); }
  20%  { opacity: 0.8; }                   // ふわっと出現
  50%  { transform: translateY(-80px) scale(1); }  // 上昇
  80%  { opacity: 0.6; }                   // 薄れ始め
  100% { opacity: 0; transform: translateY(-160px) scale(0.3); }
}`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 03: PARALLAX
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t3" ref={parallaxRef} className="technique-section">
        <TechniqueHeader number={3} title="パララックス効果" subtitle="Parallax Scrolling Effect" color="#c96bff" />

        <Explanation>
          スクロール量に応じて背景要素を異なる速度で動かすことで奥行き感を生む。
          window.scrollYを取得し、各レイヤーに異なる係数を掛けてtransformに適用。
          超かぐや姫サイトではグラデーションのオーブ（球体）3層で使用。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#c96bff">window.scrollY</Tag>
          <Tag color="#6baaff">transform: translateY</Tag>
          <Tag color="#ff6bcb">速度係数</Tag>
          <Tag color="#ffe600">passive: true</Tag>
        </div>

        <div className="demo-box" style={{ height: 300, overflow: "hidden" }}>
          <div className="demo-label">LIVE DEMO — スクロールに連動中</div>
          {/* Layer 1: slow */}
          <div style={{
            position: "absolute",
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,107,203,0.25) 0%, transparent 70%)",
            top: 20, right: 40,
            transform: `translateY(${parallaxY * 0.08}px)`,
          }} />
          {/* Layer 2: medium */}
          <div style={{
            position: "absolute",
            width: 150, height: 150, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(107,170,255,0.2) 0%, transparent 70%)",
            bottom: 20, left: 30,
            transform: `translateY(${parallaxY * -0.05}px)`,
          }} />
          {/* Layer 3: fast */}
          <div style={{
            position: "absolute",
            width: 100, height: 100, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,107,255,0.2) 0%, transparent 70%)",
            top: "40%", left: "50%",
            transform: `translate(-50%, -50%) translateY(${parallaxY * 0.12}px)`,
          }} />
          <div style={{
            position: "absolute", bottom: 20, left: 20,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
            color: "rgba(255,255,255,0.3)",
          }}>
            scrollY: {Math.floor(parallaxY)}px
          </div>
        </div>

        <CodeBlock label="速度係数の使い分け" code={`// スクロール量を取得（passiveでパフォーマンス確保）
useEffect(() => {
  const handle = () => setScrollY(window.scrollY);
  window.addEventListener("scroll", handle, { passive: true });
  return () => window.removeEventListener("scroll", handle);
}, []);

// 各レイヤーに異なる係数を掛ける
<背景レイヤー1>  transform: translateY(\${scrollY * 0.3}px)   // 遅い
<背景レイヤー2>  transform: translateY(\${scrollY * -0.2}px)  // 逆方向
<背景レイヤー3>  transform: translateY(\${scrollY * 0.15}px)  // 中間

// 係数が大きい = より速く動く = 手前に見える
// マイナス値 = 逆方向に動く = 独立した動きで奥行き感UP`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 04: SCROLL-TRIGGERED REVEAL
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t4" ref={registerSection("t4-demo")} className="technique-section">
        <TechniqueHeader number={4} title="スクロール連動フェードイン" subtitle="IntersectionObserver Reveal" color="#6bffc9" />

        <Explanation>
          IntersectionObserverで要素がビューポートに入ったタイミングを検知し、
          CSSトランジションでフェードイン＋スライドを発火させる。
          各子要素にtransition-delayを設定して「段階的出現」を実現。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#6bffc9">IntersectionObserver</Tag>
          <Tag color="#ff6bcb">transition-delay</Tag>
          <Tag color="#6baaff">threshold: 0.15</Tag>
        </div>

        <div className="demo-box" style={{ padding: 32 }}>
          <div className="demo-label">LIVE DEMO</div>
          <div style={{
            display: "flex", flexDirection: "column", gap: 12, marginTop: 8,
          }}>
            {["NEWS 最新情報", "STORY あらすじ", "CHARACTER 登場人物", "MUSIC 音楽", "STAFF スタッフ"].map((item, i) => (
              <div key={i} style={{
                padding: "14px 20px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                opacity: isVisible("t4-demo") ? 1 : 0,
                transform: isVisible("t4-demo") ? "translateX(0)" : "translateX(-40px)",
                transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.12}s`,
              } as React.CSSProperties}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: "#6bffc9", marginRight: 12,
                }}>0{i + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <CodeBlock label="IntersectionObserverの設定" code={`// 1. Observerを作成（threshold: 15%見えたら発火）
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => new Set([...prev, entry.target.id]));
      }
    });
  },
  { threshold: 0.15 }
);

// 2. 各セクションを監視登録
Object.values(sectionsRef.current).forEach(el => {
  if (el) observer.observe(el);
});

// 3. 子要素にdynamicなdelayを付与
{items.map((item, i) => (
  <div style={{
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-40px)",
    transition: \`all 0.6s \${i * 0.12}s\`,  // ← i番目 × 0.12秒
  }} />
))}`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 05: GLITCH TEXT
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t5" className="technique-section">
        <TechniqueHeader number={5} title="グリッチテキスト" subtitle="Glitch / Distortion Text Effect" color="#ffe600" />

        <Explanation>
          ランダムな間隔でtext-shadowを一瞬だけRGB分離させ、同時にtransformで微量ずらすことで
          デジタルノイズ感を表現。setIntervalでランダム発火、短時間で元に戻す。
          サイバー・SF系アニメサイトでよく使われる手法。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#ffe600">text-shadow</Tag>
          <Tag color="#ff6bcb">RGB分離</Tag>
          <Tag color="#6baaff">setInterval + random</Tag>
        </div>

        <div className="demo-box" style={{
          height: 200, display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", gap: 20,
        }}>
          <div className="demo-label">LIVE DEMO</div>
          <div style={{
            fontWeight: 900, fontSize: 42,
            background: "linear-gradient(135deg, #ff6bcb, #c96bff, #6baaff)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "backgroundPan 4s linear infinite",
            textShadow: glitchActive
              ? "3px 0 #ff00de, -3px 0 #00f0ff, 0 3px #ffe600"
              : "none",
            transform: glitchActive
              ? `translate(${Math.random() * 3 - 1.5}px, ${Math.random() * 3 - 1.5}px)`
              : "none",
            transition: "text-shadow 0.05s, transform 0.05s",
          }}>
            超かぐや姫！
          </div>
          <button className="btn-demo" onClick={() => {
            setGlitchActive(true);
            setTimeout(() => setGlitchActive(false), 200);
          }}>
            ▶ グリッチ発火
          </button>
        </div>

        <CodeBlock label="グリッチの仕組み" code={`// ランダム間隔でグリッチを発火
useEffect(() => {
  const interval = setInterval(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 150); // 150msだけ
  }, 3000 + Math.random() * 4000); // 3〜7秒ごと
  return () => clearInterval(interval);
}, []);

// text-shadowでRGB分離を表現
textShadow: glitch
  ? "2px 0 #ff00de,    // 赤紫を右にずらす
     -2px 0 #00f0ff,   // シアンを左にずらす
     0 2px #ffe600"     // 黄色を下にずらす
  : "none"

// 同時にtransformで位置も微妙にブレさせる
transform: glitch
  ? \`translate(\${Math.random()*2-1}px, \${Math.random()*2-1}px)\`
  : "none"`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 06: CHARACTER SWITCH
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t6" className="technique-section">
        <TechniqueHeader number={6} title="キャラクター切替演出" subtitle="Character Selection & Transition" color="#ff9e6b" />

        <Explanation>
          サムネイルクリックで詳細が切り替わる際、Reactのkey属性を変更して
          コンポーネントを再マウントさせ、fadeInUpアニメを再発火。
          選択中キャラのテーマカラーが全体に伝搬し、ボーダーやシャドウが動的に変化。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#ff9e6b">key remount</Tag>
          <Tag color="#ff6bcb">テーマカラー伝搬</Tag>
          <Tag color="#c96bff">cubic-bezier</Tag>
          <Tag color="#6baaff">box-shadow pulse</Tag>
        </div>

        <div className="demo-box" style={{ padding: 32 }}>
          <div className="demo-label">LIVE DEMO</div>
          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 28 }}>
            {chars.map((c, i) => (
              <div
                key={i}
                className="char-card"
                onClick={() => setActiveChar(i)}
                style={{
                  width: 80,
                  borderColor: activeChar === i ? c.color : "rgba(255,255,255,0.08)",
                  background: activeChar === i ? `${c.color}15` : "transparent",
                  boxShadow: activeChar === i ? `0 4px 20px ${c.color}33` : "none",
                } as React.CSSProperties}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{c.emoji}</div>
                <div style={{
                  fontSize: 11, color: activeChar === i ? c.color : "rgba(255,255,255,0.5)",
                  transition: "color 0.3s",
                }}>{c.name}</div>
              </div>
            ))}
          </div>

          {/* Detail (key forces remount → animation replays) */}
          <div
            key={activeChar}
            style={{
              textAlign: "center",
              padding: 24,
              borderRadius: 12,
              border: `1px solid ${chars[activeChar].color}33`,
              background: `${chars[activeChar].color}08`,
              animation: "fadeInUp 0.45s ease-out, charPulse 3s ease-in-out infinite",
            } as React.CSSProperties}
          >
            <div style={{ fontSize: 48, marginBottom: 12 }}>{chars[activeChar].emoji}</div>
            <div style={{
              fontFamily: "Orbitron, sans-serif", fontSize: 18,
              fontWeight: 700, color: chars[activeChar].color,
              marginBottom: 4,
            }}>{chars[activeChar].name}</div>
            <div style={{
              fontSize: 12, color: "rgba(255,255,255,0.4)",
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              テーマカラー: {chars[activeChar].color}
            </div>
          </div>
        </div>

        <CodeBlock label="key remountテクニック" code={`// key属性が変わるとReactはコンポーネントを再マウントする
// → CSSアニメーションが再実行される
<div
  key={activeChar}  // ← これが切替のたびに変わる
  style={{
    animation: "fadeInUp 0.45s ease-out",
    border: \`1px solid \${chars[activeChar].color}33\`,
    // テーマカラーがボーダー・背景・テキストに伝搬
  }}
>

// サムネイルのホバー演出
.char-thumb:hover {
  transform: translateY(-8px) scale(1.05);  // 浮き上がる
  box-shadow: 0 12px 40px rgba(color, 0.3); // 影が広がる
}
// cubic-bezier(0.4, 0, 0.2, 1) で自然な減速感`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 07: NAVBAR TRANSITION
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t7" className="technique-section">
        <TechniqueHeader number={7} title="ナビバートランジション" subtitle="Scroll-aware Navbar" color="#6baaff" />

        <Explanation>
          スクロール位置に応じてナビバーの背景が透明→半透明に変化。
          backdrop-filter: blurで磨りガラス効果を追加し、
          border-bottomのカラーも連動して変わる。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#6baaff">backdrop-filter</Tag>
          <Tag color="#ff6bcb">条件付きスタイル</Tag>
          <Tag color="#c96bff">transition: all 0.4s</Tag>
        </div>

        <div className="demo-box" style={{ height: 200, position: "relative", overflow: "hidden" }}>
          <div className="demo-label">LIVE DEMO</div>
          {/* Simulated navbar */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "12px 24px",
            background: navSolid ? "rgba(10, 0, 26, 0.92)" : "transparent",
            backdropFilter: navSolid ? "blur(16px)" : "none",
            borderBottom: navSolid ? "1px solid rgba(255,107,203,0.15)" : "1px solid transparent",
            transition: "all 0.4s",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            zIndex: 5,
          }}>
            <span style={{
              fontFamily: "Orbitron, sans-serif", fontSize: 11, fontWeight: 700,
              background: "linear-gradient(90deg, #ff6bcb, #c96bff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>✦ LOGO</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["NEWS", "STORY", "CHAR"].map((n) => (
                <span key={n} className="nav-link-demo"
                  style={{ fontFamily: "Orbitron, sans-serif" }}>{n}</span>
              ))}
            </div>
          </div>
          {/* Background content */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(255,107,203,0.1), rgba(107,170,255,0.1))",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 48, opacity: 0.3 }}>🌙</span>
          </div>
          {/* Toggle button */}
          <div style={{
            position: "absolute", bottom: 16, left: 0, right: 0,
            textAlign: "center", zIndex: 10,
          }}>
            <button className="btn-demo" onClick={() => setNavSolid(!navSolid)}
              style={{ borderColor: "rgba(107,170,255,0.3)", color: "#6baaff", background: "rgba(107,170,255,0.08)" }}>
              {navSolid ? "透明に戻す" : "スクロール後の状態にする"}
            </button>
          </div>
        </div>

        <CodeBlock label="条件分岐スタイル" code={`// scrollY > 80px で背景を切り替え
background: scrollY > 80
  ? "rgba(10, 0, 26, 0.92)"  // 半透明ダーク
  : "transparent"             // 完全透明

backdropFilter: scrollY > 80
  ? "blur(16px)"              // 磨りガラス
  : "none"

borderBottom: scrollY > 80
  ? "1px solid rgba(255,107,203,0.1)"  // アクセント線
  : "1px solid transparent"            // 見えない線

transition: "all 0.4s"  // スムーズに変化`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 08: HAMBURGER MENU
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t8" className="technique-section">
        <TechniqueHeader number={8} title="ハンバーガーメニュー" subtitle="Fullscreen Menu Overlay" color="#ff6bcb" />

        <Explanation>
          三本線がクリックで×に変形（rotate + translate）。
          全画面オーバーレイがblur付きで展開し、
          メニュー項目が上からstagger（時差）アニメーションで出現。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#ff6bcb">transform: rotate</Tag>
          <Tag color="#6baaff">backdrop-filter: blur</Tag>
          <Tag color="#c96bff">stagger animation</Tag>
        </div>

        <div className="demo-box" style={{ height: 300, position: "relative" }}>
          <div className="demo-label">LIVE DEMO</div>

          {/* Hamburger icon */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              position: "absolute", top: 20, right: 20,
              cursor: "pointer", zIndex: 20,
              display: "flex", flexDirection: "column", gap: 5, padding: 8,
            }}
          >
            <div style={{
              width: 22, height: 2,
              background: menuOpen ? "#ff6bcb" : "#fff",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <div style={{
              width: 22, height: 2, background: "#fff",
              transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1,
            }} />
            <div style={{
              width: 22, height: 2,
              background: menuOpen ? "#ff6bcb" : "#fff",
              transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </div>

          {/* Overlay */}
          {menuOpen && (
            <div style={{
              position: "absolute", inset: 0, zIndex: 15,
              background: "rgba(10, 0, 26, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: 16,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 16,
            }}>
              {["NEWS", "STORY", "CHARACTER", "MUSIC", "STAFF"].map((item, i) => (
                <span key={item} style={{
                  fontFamily: "Orbitron, sans-serif", fontWeight: 700,
                  fontSize: 20, letterSpacing: 6,
                  color: "rgba(255,255,255,0.8)",
                  opacity: 0,
                  animation: `fadeInUp 0.4s ${i * 0.08}s forwards`,
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                  onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = "#ff6bcb"; }}
                  onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = "rgba(255,255,255,0.8)"; }}
                >{item}</span>
              ))}
            </div>
          )}

          {/* Background */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: 0.2,
          }}>
            <span style={{ fontSize: 64 }}>🌸</span>
          </div>
        </div>

        <CodeBlock label="×変形のCSS" code={`// 三本線 → × の変形
// 上の線: 45度回転 + 右下に移動
transform: menuOpen
  ? "rotate(45deg) translate(5px, 5px)"
  : "none"

// 真ん中の線: 消える
opacity: menuOpen ? 0 : 1

// 下の線: -45度回転 + 右上に移動
transform: menuOpen
  ? "rotate(-45deg) translate(5px, -5px)"
  : "none"

// メニュー項目のstagger出現
{items.map((item, i) => (
  <span style={{
    opacity: 0,
    animation: \`fadeInUp 0.4s \${i * 0.08}s forwards\`,
    // 0s → 0.08s → 0.16s → 0.24s ...
  }} />
))}`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 09: GRADIENT & COLOR
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t9" className="technique-section">
        <TechniqueHeader number={9} title="グラデーション＆カラー設計" subtitle="Animated Gradient System" color="#c96bff" />

        <Explanation>
          超かぐや姫サイトの特徴はbackground-sizeを200%にしてアニメーションで
          スライドさせる「流れるグラデーション」。テキストにはbackground-clipで適用。
          radial-gradientの重ね合わせで光のオーブも作成。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#c96bff">background-size: 200%</Tag>
          <Tag color="#ff6bcb">background-clip: text</Tag>
          <Tag color="#6baaff">radial-gradient</Tag>
        </div>

        <div className="demo-box" style={{ padding: 32 }}>
          <div className="demo-label">LIVE DEMO</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
            {/* Flowing gradient text */}
            <div style={{
              fontWeight: 900, fontSize: 36,
              background: "linear-gradient(135deg, #ff6bcb, #c96bff, #6baaff, #6bffc9, #ffe600, #ff6bcb)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              animation: "backgroundPan 5s linear infinite",
            }}>
              流れる虹グラデ
            </div>

            {/* Gradient orbs */}
            <div style={{
              position: "relative", width: "100%", height: 120,
              borderRadius: 12, overflow: "hidden",
              background: "#0a001a",
            }}>
              <div style={{
                position: "absolute", width: 180, height: 180, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,107,203,0.3) 0%, transparent 70%)",
                top: -40, right: 20,
              }} />
              <div style={{
                position: "absolute", width: 140, height: 140, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(107,170,255,0.25) 0%, transparent 70%)",
                bottom: -30, left: 40,
              }} />
              <div style={{
                position: "absolute", width: 100, height: 100, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(201,107,255,0.2) 0%, transparent 70%)",
                top: 20, left: "45%",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10, color: "rgba(255,255,255,0.3)",
              }}>
                radial-gradient × 3レイヤー
              </div>
            </div>

            {/* Border glow */}
            <div style={{
              padding: "16px 32px",
              borderRadius: 12,
              border: "1px solid rgba(255,107,203,0.3)",
              animation: "borderGlow 3s infinite",
              fontSize: 13, color: "rgba(255,255,255,0.6)",
            }}>
              ボーダーグロウ（border-colorアニメ）
            </div>
          </div>
        </div>

        <CodeBlock label="流れるグラデーションの作り方" code={`// テキストに流れるグラデーション
background: "linear-gradient(135deg, #ff6bcb, #c96bff, #6baaff, #ff6bcb)"
backgroundSize: "200% auto"     // 横幅を2倍に
WebkitBackgroundClip: "text"    // テキスト形状に切り抜き
WebkitTextFillColor: "transparent" // テキスト色を透明に

@keyframes backgroundPan {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }  // 右に流れる
  100% { background-position: 0% 50%; }    // 左に戻る
}

// 光のオーブ: radial-gradientで中心から外へ減衰
background: "radial-gradient(circle,
  rgba(255,107,203,0.3) 0%,   // 中心: 半透明ピンク
  transparent 70%)"            // 外周: 透明`} />
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
           TECHNIQUE 10: HOVER INTERACTIONS
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="t10" className="technique-section" style={{ borderBottom: "none" }}>
        <TechniqueHeader number={10} title="ホバーインタラクション" subtitle="Hover Micro-interactions" color="#ffe600" />

        <Explanation>
          ホバー時にpadding-leftを増やして「押し込み」感を出す、
          border-colorとbox-shadowを連動させる、::after疑似要素で下線を
          scaleXで展開する、など小さなインタラクションの積み重ねが全体の質を上げる。
        </Explanation>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          <Tag color="#ffe600">padding-left shift</Tag>
          <Tag color="#ff6bcb">::after underline</Tag>
          <Tag color="#6baaff">translateY + scale</Tag>
          <Tag color="#c96bff">cubic-bezier easing</Tag>
        </div>

        <div className="demo-box" style={{ padding: 32 }}>
          <div className="demo-label">LIVE DEMO — ホバーしてみて</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, marginTop: 8 }}>
            {["ニュースアイテム：左にスライド", "ストーリーカード：背景がじんわり変化", "キャラサムネ：浮き上がり＋影拡大"].map((text, i) => (
              <div key={i} className="hover-demo-item">
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: "#ffe600", marginRight: 10,
                }}>{(i + 1).toString().padStart(2, "0")}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Nav link underline demo */}
          <div style={{
            display: "flex", gap: 24, justifyContent: "center",
            padding: "20px 0",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}>
            {["NEWS", "STORY", "CHAR", "MUSIC"].map((n) => (
              <span key={n} className="nav-link-demo"
                style={{
                  fontFamily: "Orbitron, sans-serif", fontSize: 12, letterSpacing: 3,
                }}>
                {n}
              </span>
            ))}
          </div>
          <div style={{
            textAlign: "center", marginTop: 8,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, color: "rgba(255,255,255,0.25)",
          }}>
            ↑ ナビリンクにホバーすると下線が左からスライドイン
          </div>
        </div>

        <CodeBlock label="::afterで下線アニメーション" code={`// CSSの疑似要素で下線を作る
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, #ff6bcb, #6baaff);
  transform: scaleX(0);          // 初期: 幅ゼロ
  transform-origin: left;         // 左端から展開
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.nav-link:hover::after {
  transform: scaleX(1);           // ホバー: 全幅に展開
}

// ニュースアイテムの押し込み
.news-item:hover {
  padding-left: 12px;             // 左パディング追加
  background: rgba(255,107,203,0.05); // 背景をうっすら
}`} />
      </section>

      {/* ━━ FOOTER ━━ */}
      <footer style={{
        padding: "60px 32px", textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        maxWidth: 900, margin: "0 auto",
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, letterSpacing: 3,
          color: "rgba(255,255,255,0.2)",
          marginBottom: 12,
        }}>
          10 TECHNIQUES BREAKDOWN
        </div>
        <div style={{
          fontWeight: 900, fontSize: 20,
          background: "linear-gradient(90deg, #ff6bcb, #c96bff, #6baaff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          marginBottom: 20,
        }}>
          動的表現テクニック分解
        </div>
        <p style={{
          fontSize: 12, lineHeight: 1.8,
          color: "rgba(255,255,255,0.3)",
          maxWidth: 500, margin: "0 auto",
        }}>
          これらのテクニックを組み合わせることで、
          アニメ公式サイトのような没入感のあるWebページを構築できます。
          anime-sugoiプロジェクトの各作品ページに応用してみてください。
        </p>
      </footer>
    </div>
  );
}
