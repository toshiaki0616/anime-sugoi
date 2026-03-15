import { useState, useEffect, type ReactNode } from "react";

// ============================================================
// 核心技術 (1–12)
// ============================================================

function Demo1() {
  return <div className="demo-mask-ring" />;
}

function Demo2() {
  const [morphed, setMorphed] = useState(false);
  return (
    <div className="demo-clippath-wrap" onClick={() => setMorphed((m) => !m)}>
      <div className={`demo-clippath-box ${morphed ? "morphed" : ""}`} />
      <span className="demo-hint">タップで変形</span>
    </div>
  );
}

function Demo3() {
  return (
    <div className="demo-fluid-wrap">
      <span className="demo-fluid-text">FLUID</span>
      <code className="demo-fluid-formula">min(calc(40 / 1280 * 100vw), 40px)</code>
    </div>
  );
}

function Demo4() {
  const r = 40;
  const circ = 2 * Math.PI * r;
  return (
    <svg className="demo-svg-progress" viewBox="0 0 100 100">
      <defs>
        <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#ff2d78" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} fill="none" stroke="#1a1f30" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="url(#prog-grad)" strokeWidth="8"
        strokeDasharray={circ} strokeLinecap="round" transform="rotate(-90 50 50)"
        className="demo-progress-arc" />
      <text x="50" y="55" textAnchor="middle" fill="#e8eaf0" fontSize="14" fontWeight="bold">75%</text>
    </svg>
  );
}

const CAROUSEL_CARDS = [
  { label: "01", color: "#00e5ff" },
  { label: "02", color: "#ff2d78" },
  { label: "03", color: "#a855f7" },
  { label: "04", color: "#22c55e" },
  { label: "05", color: "#f59e0b" },
];
const CARD_DEG = 360 / CAROUSEL_CARDS.length;

function Demo5() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % CAROUSEL_CARDS.length), 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="demo-carousel-wrap">
      <div className="demo-carousel-scene">
        <div className="demo-carousel-stage" style={{ transform: `rotateY(${-active * CARD_DEG}deg)` }}>
          {CAROUSEL_CARDS.map((card, i) => (
            <div key={i} className="demo-carousel-card"
              style={{ transform: `rotateY(${i * CARD_DEG}deg) translateZ(110px)`, background: `${card.color}18`, borderColor: card.color }}
              onClick={() => setActive(i)}>
              <span style={{ color: card.color }}>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="demo-carousel-dots">
        {CAROUSEL_CARDS.map((card, i) => (
          <button key={i} className={`demo-carousel-dot ${i === active ? "active" : ""}`}
            style={i === active ? { background: card.color } : {}}
            onClick={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
}

function Demo6() {
  return (
    <div className="demo-sticky-outer">
      <div className="demo-sticky-header">📌 STICKY HEADER</div>
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="demo-sticky-row">アイテム {i + 1}</div>
      ))}
    </div>
  );
}

function Demo7() {
  return (
    <div className="demo-bg-anim-wrap">
      <div className="demo-bg-lines" />
      <div className="demo-bg-fog" />
      <span className="demo-bg-label">流れる背景</span>
    </div>
  );
}

function Demo8() {
  return (
    <div className="demo-frame-outer">
      <span className="demo-frame-inner">フレーム装飾</span>
    </div>
  );
}

function Demo9() {
  return (
    <div className="demo-float-wrap">
      <div className="demo-float-orb" />
      <div className="demo-float-shadow" />
    </div>
  );
}

function Demo10() {
  return (
    <div className="demo-lanterns">
      <span className="demo-lantern demo-lantern-a">🏮</span>
      <span className="demo-lantern demo-lantern-b">🏮</span>
      <span className="demo-lantern demo-lantern-a">🏮</span>
    </div>
  );
}

function Demo11() {
  const [open, setOpen] = useState(false);
  return (
    <button className={`demo-hamburger ${open ? "open" : ""}`}
      onClick={() => setOpen((o) => !o)} aria-label="メニュー開閉">
      <span /><span /><span />
      <p className="demo-hint">{open ? "✕ 閉じる" : "≡ 開く"}</p>
    </button>
  );
}

function Demo12() {
  return (
    <div className="demo-hover-card">
      <span className="demo-hover-label">PCでホバー</span>
      <p className="demo-hint">@media (hover: hover) のみ適用</p>
    </div>
  );
}

// ============================================================
// 視覚エフェクト
// ============================================================

function DemoGlass() {
  return (
    <div className="demo-glass-scene">
      <div className="demo-glass-bg" />
      <div className="demo-glass-card">
        <span>Glass</span>
        <small>backdrop-filter: blur</small>
      </div>
    </div>
  );
}

function DemoNeumo() {
  return (
    <div className="demo-neumo-scene">
      <div className="demo-neumo-card">
        <div className="demo-neumo-btn">押せる</div>
      </div>
    </div>
  );
}

function DemoGlitch() {
  return (
    <div className="demo-glitch-wrap">
      <span className="demo-glitch" data-text="GLITCH">GLITCH</span>
    </div>
  );
}

function DemoAurora() {
  return (
    <div className="demo-aurora">
      <div className="demo-aurora-layer" />
      <div className="demo-aurora-layer" />
      <div className="demo-aurora-layer" />
      <span className="demo-aurora-label">Aurora</span>
    </div>
  );
}

function DemoGlow() {
  return (
    <div className="demo-glow-wrap">
      <div className="demo-glow-box">BOX</div>
      <span className="demo-glow-text">TEXT</span>
    </div>
  );
}

function DemoBlend() {
  return (
    <div className="demo-blend-scene">
      <div className="demo-blend-circles">
        <div className="demo-blend-circle blend-r" />
        <div className="demo-blend-circle blend-g" />
        <div className="demo-blend-circle blend-b" />
      </div>
      <span className="demo-blend-label">mix-blend-mode: screen</span>
    </div>
  );
}

// ============================================================
// テキスト演出
// ============================================================

function DemoTyping() {
  return (
    <div className="demo-typing">
      <span className="demo-typing-text">Hello, World!</span>
      <span className="demo-typing-cursor">|</span>
    </div>
  );
}

function DemoStrokeText() {
  return (
    <div className="demo-stroke-wrap">
      <span className="demo-stroke-text">OUTLINE</span>
      <small className="demo-hint">-webkit-text-stroke</small>
    </div>
  );
}

function DemoWave() {
  const letters = "SUGOI".split("");
  return (
    <div className="demo-wave-wrap">
      {letters.map((ch, i) => (
        <span key={i} className="demo-wave-char" style={{ animationDelay: `${i * 0.12}s` }}>
          {ch}
        </span>
      ))}
    </div>
  );
}

function DemoMarquee() {
  const items = ["ANIME", "MANGA", "KAWAII", "SUGOI", "COOL"];
  return (
    <div className="demo-marquee-outer">
      <div className="demo-marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="demo-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

function DemoSVGDraw() {
  return (
    <svg className="demo-svgdraw" viewBox="0 0 200 80">
      <defs>
        <linearGradient id="draw-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#ff2d78" />
        </linearGradient>
      </defs>
      <path d="M10,40 C50,10 80,70 120,40 C150,20 170,60 190,40"
        fill="none" stroke="url(#draw-grad)" strokeWidth="3" strokeLinecap="round"
        className="demo-svgdraw-path" />
    </svg>
  );
}

// ============================================================
// アニメーション原則
// ============================================================

const EASING_ROWS = [
  { label: "ease-in",  cls: "ease-in",  color: "#00e5ff" },
  { label: "ease-out", cls: "ease-out", color: "#ff2d78" },
  { label: "linear",   cls: "linear",   color: "#a855f7" },
];

function DemoEasing() {
  return (
    <div className="demo-easing-wrap">
      {EASING_ROWS.map((r) => (
        <div key={r.label} className="demo-easing-row">
          <span className="demo-easing-label">{r.label}</span>
          <div className="demo-easing-track">
            <div className={`demo-easing-ball ${r.cls}`} style={{ background: r.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function DemoStagger() {
  return (
    <div className="demo-stagger-wrap">
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="demo-stagger-bar"
          style={{ animationDelay: `${i * 0.1}s`, height: `${20 + i * 8}px` }} />
      ))}
    </div>
  );
}

function DemoShake() {
  const [shaking, setShaking] = useState(false);
  const trigger = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
  };
  return (
    <div className="demo-shake-wrap">
      <div className={`demo-shake-input ${shaking ? "shaking" : ""}`}>❌ 入力エラー</div>
      <button className="demo-shake-btn" onClick={trigger}>送信</button>
    </div>
  );
}

// ============================================================
// 3D & インタラクション
// ============================================================

function DemoFlip() {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="demo-flip-scene" onClick={() => setFlipped((f) => !f)}>
      <div className={`demo-flip-card ${flipped ? "flipped" : ""}`}>
        <div className="demo-flip-face front">FRONT<br /><small>クリック</small></div>
        <div className="demo-flip-face back">BACK<br /><small>クリック</small></div>
      </div>
    </div>
  );
}

function DemoIso() {
  return (
    <div className="demo-iso-scene">
      <div className="demo-iso-box">
        <div className="iso-face iso-top" />
        <div className="iso-face iso-left" />
        <div className="iso-face iso-right" />
      </div>
    </div>
  );
}

// ============================================================
// レイアウト & スクロール
// ============================================================

const SNAP_SECTIONS = [
  { label: "🌊 海", bg: "rgba(0,229,255,0.1)" },
  { label: "🏔 山", bg: "rgba(34,197,94,0.1)" },
  { label: "🌸 花", bg: "rgba(255,45,120,0.1)" },
  { label: "⭐ 星", bg: "rgba(245,158,11,0.1)" },
];

function DemoSnapScroll() {
  return (
    <div className="demo-snap-outer">
      {SNAP_SECTIONS.map((s, i) => (
        <div key={i} className="demo-snap-item" style={{ background: s.bg }}>{s.label}</div>
      ))}
    </div>
  );
}

function DemoSkeleton() {
  return (
    <div className="demo-skeleton-card">
      <div className="demo-skeleton demo-sk-img" />
      <div className="demo-skeleton-lines">
        <div className="demo-skeleton demo-sk-line" style={{ width: "80%" }} />
        <div className="demo-skeleton demo-sk-line" style={{ width: "60%" }} />
        <div className="demo-skeleton demo-sk-line" style={{ width: "70%" }} />
      </div>
    </div>
  );
}

function DemoScrollDriven() {
  return (
    <div className="demo-scrolldriven-outer">
      <div className="demo-scrolldriven-progress" />
      <div className="demo-scrolldriven-content">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="demo-scrolldriven-item">Item {i + 1}</div>
        ))}
      </div>
      <p className="demo-scrolldriven-note">↓スクロールでバーが伸びる</p>
    </div>
  );
}

// ============================================================
// カテゴリ定義
// ============================================================

function DemoOrbitPulse() {
  return (
    <div className="demo-orbit-wrap">
      <div className="demo-orbit-core" />
      <div className="demo-orbit-ring demo-orbit-ring-a">
        <span className="demo-orbit-dot" />
      </div>
      <div className="demo-orbit-ring demo-orbit-ring-b">
        <span className="demo-orbit-dot" />
      </div>
    </div>
  );
}

function DemoLoadingBands() {
  return (
    <div className="demo-loadingbands-wrap" aria-label="loading bands">
      {"LOADING".split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="demo-loadingbands-char"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

function DemoShutterReveal() {
  return (
    <div className="demo-shutter-wrap">
      <div className="demo-shutter-panel" />
      <div className="demo-shutter-panel demo-shutter-panel-b" />
      <span className="demo-shutter-text">REVEAL</span>
    </div>
  );
}

function DemoRippleField() {
  return (
    <div className="demo-ripple-wrap">
      <span className="demo-ripple-circle demo-ripple-circle-a" />
      <span className="demo-ripple-circle demo-ripple-circle-b" />
      <span className="demo-ripple-circle demo-ripple-circle-c" />
      <div className="demo-ripple-core" />
    </div>
  );
}

function DemoRollingLoader() {
  return (
    <div className="demo-rolling-wrap">
      <div className="demo-rolling-track">
        <span className="demo-rolling-ball" />
        <span className="demo-rolling-ball" />
        <span className="demo-rolling-ball" />
      </div>
      <small className="demo-hint">offset timing loop</small>
    </div>
  );
}

function DemoSplitLayers() {
  return (
    <div className="demo-splitlayers-wrap" aria-label="split layers">
      <span className="demo-splitlayers-back">PANTRY CLUB</span>
      <span className="demo-splitlayers-front">PANTRY CLUB</span>
    </div>
  );
}

function DemoLiftCard() {
  return (
    <div className="demo-liftcard-wrap">
      <div className="demo-liftcard-glow" />
      <div className="demo-liftcard-card">
        <small>CASE STUDY</small>
        <strong>Motion Card</strong>
      </div>
    </div>
  );
}

function DemoSwingBadge() {
  return (
    <div className="demo-swingbadge-wrap">
      <div className="demo-swingbadge-pin" />
      <div className="demo-swingbadge-tag">HELLO</div>
    </div>
  );
}

function DemoStretchType() {
  return (
    <div className="demo-stretchtype-wrap" aria-label="stretch type">
      {"MOTION".split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="demo-stretchtype-char"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
}

function DemoStackTicker() {
  const words = ["PANTRY", "CLUB", "MOTION"];
  return (
    <div className="demo-stackticker-wrap" aria-label="stack ticker">
      <div className="demo-stackticker-viewport">
        <div className="demo-stackticker-track">
          {[...words, ...words].map((word, index) => (
            <span key={`${word}-${index}`} className="demo-stackticker-item">{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoOutlineBadge() {
  return (
    <div className="demo-outlinebadge-wrap">
      <span className="demo-outlinebadge-fill">PANTRY CLUB</span>
      <span className="demo-outlinebadge-stroke">PANTRY CLUB</span>
    </div>
  );
}

function DemoCornerSweep() {
  return (
    <div className="demo-cornersweep-wrap">
      <div className="demo-cornersweep-card">
        <span className="demo-cornersweep-label">ARCHIVE 04</span>
      </div>
    </div>
  );
}

function DemoDepthMarquee() {
  return (
    <div className="demo-depthmarquee-wrap" aria-label="depth marquee">
      <div className="demo-depthmarquee-row demo-depthmarquee-row-a">
        <span>PANTRY CLUB</span>
        <span>PANTRY CLUB</span>
        <span>PANTRY CLUB</span>
      </div>
      <div className="demo-depthmarquee-row demo-depthmarquee-row-b">
        <span>MOTION STUDY</span>
        <span>MOTION STUDY</span>
        <span>MOTION STUDY</span>
      </div>
    </div>
  );
}

function DemoScanlineMask() {
  return (
    <div className="demo-scanline-wrap">
      <span className="demo-scanline-text">PANTRY CLUB</span>
      <div className="demo-scanline-bar" />
    </div>
  );
}

function DemoPulseGrid() {
  return (
    <div className="demo-pulsegrid-wrap">
      {Array.from({ length: 16 }, (_, index) => (
        <span
          key={index}
          className="demo-pulsegrid-cell"
          style={{ animationDelay: `${(index % 4) * 0.08 + Math.floor(index / 4) * 0.08}s` }}
        />
      ))}
    </div>
  );
}

function DemoRotatingBorder() {
  return (
    <div className="demo-rotatingborder-wrap">
      <div className="demo-rotatingborder-card">
        <span>FRAME</span>
      </div>
    </div>
  );
}

function DemoDotMatrix() {
  return (
    <div className="demo-dotmatrix-wrap">
      {"CLUB".split("").map((char, index) => (
        <span key={`${char}-${index}`} className="demo-dotmatrix-char">{char}</span>
      ))}
    </div>
  );
}

function DemoEqualizer() {
  return (
    <div className="demo-equalizer-wrap">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} className="demo-equalizer-bar" style={{ animationDelay: `${index * 0.08}s` }} />
      ))}
    </div>
  );
}

function DemoPrismButton() {
  return (
    <button className="demo-prismbutton-wrap" type="button">
      <span>OPEN</span>
    </button>
  );
}

function DemoEchoText() {
  return (
    <div className="demo-echotext-wrap">
      <span className="demo-echotext-layer">PANTRY</span>
      <span className="demo-echotext-layer">PANTRY</span>
      <span className="demo-echotext-layer">PANTRY</span>
    </div>
  );
}

function DemoLadderBars() {
  return (
    <div className="demo-ladderbars-wrap">
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} className="demo-ladderbars-step" style={{ animationDelay: `${index * 0.1}s` }} />
      ))}
    </div>
  );
}

function DemoSpotlightSweep() {
  return (
    <div className="demo-spotlight-wrap">
      <span className="demo-spotlight-text">STAGE</span>
      <div className="demo-spotlight-beam" />
    </div>
  );
}

function DemoTiltStack() {
  return (
    <div className="demo-tiltstack-wrap">
      <span className="demo-tiltstack-card demo-tiltstack-card-a" />
      <span className="demo-tiltstack-card demo-tiltstack-card-b" />
      <span className="demo-tiltstack-card demo-tiltstack-card-c" />
    </div>
  );
}

function DemoRadarSweep() {
  return (
    <div className="demo-radar-wrap">
      <span className="demo-radar-ring demo-radar-ring-a" />
      <span className="demo-radar-ring demo-radar-ring-b" />
      <span className="demo-radar-ring demo-radar-ring-c" />
      <div className="demo-radar-sweep" />
      <div className="demo-radar-dot" />
    </div>
  );
}

function DemoPixelBlink() {
  return (
    <div className="demo-pixelblink-wrap">
      {Array.from({ length: 25 }, (_, index) => (
        <span
          key={index}
          className="demo-pixelblink-pixel"
          style={{ animationDelay: `${(index % 5) * 0.05 + Math.floor(index / 5) * 0.05}s` }}
        />
      ))}
    </div>
  );
}

function DemoRibbonFlip() {
  return (
    <div className="demo-ribbonflip-wrap">
      <span className="demo-ribbonflip-front">NEW</span>
      <span className="demo-ribbonflip-back">LIVE</span>
    </div>
  );
}

function DemoOrbitText() {
  return (
    <div className="demo-orbittext-wrap">
      <span className="demo-orbittext-core">PC</span>
      <div className="demo-orbittext-ring">
        <span className="demo-orbittext-word">PANTRY CLUB PANTRY CLUB</span>
      </div>
    </div>
  );
}

function DemoPrismLoader() {
  return (
    <div className="demo-prismloader-wrap">
      <span className="demo-prismloader-face demo-prismloader-face-a" />
      <span className="demo-prismloader-face demo-prismloader-face-b" />
      <span className="demo-prismloader-face demo-prismloader-face-c" />
    </div>
  );
}

function DemoRingSteps() {
  return (
    <div className="demo-ringsteps-wrap">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} className="demo-ringsteps-ring" style={{ animationDelay: `${index * 0.2}s` }} />
      ))}
    </div>
  );
}

function DemoWaveDots() {
  return (
    <div className="demo-wavedots-wrap">
      {Array.from({ length: 8 }, (_, index) => (
        <span key={index} className="demo-wavedots-dot" style={{ animationDelay: `${index * 0.08}s` }} />
      ))}
    </div>
  );
}

function DemoTunnelRings() {
  return (
    <div className="demo-tunnelrings-wrap">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="demo-tunnelrings-ring" style={{ animationDelay: `${index * 0.16}s` }} />
      ))}
    </div>
  );
}

function DemoSkewPanels() {
  return (
    <div className="demo-skewpanels-wrap">
      <span className="demo-skewpanels-panel" />
      <span className="demo-skewpanels-panel" />
      <span className="demo-skewpanels-panel" />
    </div>
  );
}

function DemoBeamButton() {
  return (
    <button className="demo-beambutton-wrap" type="button">
      <span>ENTER</span>
    </button>
  );
}

function DemoOrbitBadges() {
  return (
    <div className="demo-orbitbadges-wrap">
      <div className="demo-orbitbadges-core">PC</div>
      <span className="demo-orbitbadges-badge demo-orbitbadges-a">UI</span>
      <span className="demo-orbitbadges-badge demo-orbitbadges-b">CSS</span>
      <span className="demo-orbitbadges-badge demo-orbitbadges-c">LAB</span>
    </div>
  );
}

function DemoFoldingSquares() {
  return (
    <div className="demo-foldingsquares-wrap">
      <span className="demo-foldingsquares-cell" />
      <span className="demo-foldingsquares-cell" />
      <span className="demo-foldingsquares-cell" />
      <span className="demo-foldingsquares-cell" />
    </div>
  );
}

function DemoSignalBars() {
  return (
    <div className="demo-signalbars-wrap">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className="demo-signalbars-bar" />
      ))}
    </div>
  );
}

function DemoFlipWords() {
  return (
    <div className="demo-flipwords-wrap">
      <div className="demo-flipwords-track">
        <span>CREATE</span>
        <span>MOTION</span>
        <span>CREATE</span>
      </div>
    </div>
  );
}

function DemoDiagonalGrid() {
  return (
    <div className="demo-diagonalgrid-wrap">
      <div className="demo-diagonalgrid-overlay" />
      <span className="demo-diagonalgrid-text">GRID</span>
    </div>
  );
}

function DemoHaloBadge() {
  return (
    <div className="demo-halobadge-wrap">
      <div className="demo-halobadge-ring" />
      <div className="demo-halobadge-chip">PANTRY CLUB</div>
    </div>
  );
}

const CATEGORIES = [
  {
    name: "核心技術",
    items: [
      { id:  1, name: "mask-composite: exclude",            usage: "円形くり抜き",                         Demo: Demo1         },
      { id:  2, name: "clip-path polygon() + bodyクラス",   usage: "スクロール連動モーフィング",            Demo: Demo2         },
      { id:  3, name: "CSS変数流体スケーリング",             usage: "min(calc(N / --vw-min * 100vw), Npx)", Demo: Demo3         },
      { id:  4, name: "SVG stroke-dasharray",               usage: "円形プログレスバー",                    Demo: Demo4         },
      { id:  5, name: "preserve-3d + perspective",          usage: "3Dカルーセル・コイン回転",              Demo: Demo5         },
      { id:  6, name: "position: sticky 多重ネスト",        usage: "視差スクロール",                        Demo: Demo6         },
      { id:  7, name: "background-position アニメーション", usage: "スプライト再生・テキストスクロール・霧", Demo: Demo7         },
      { id:  8, name: "::before/::after + SVGマスク",       usage: "アイコン・フレーム装飾",                Demo: Demo8         },
      { id:  9, name: "translateY 往復",                    usage: "浮遊エフェクト",                        Demo: Demo9         },
      { id: 10, name: "逆フェーズ2アニメーション",           usage: "提灯の交互点滅",                        Demo: Demo10        },
      { id: 11, name: "ハンバーガー→X変形",                 usage: "純CSS transform",                       Demo: Demo11        },
      { id: 12, name: "@media (hover: hover)",              usage: "タッチデバイス除外",                    Demo: Demo12        },
    ],
  },
  {
    name: "視覚エフェクト",
    items: [
      { id: 13, name: "グラスモーフィズム",   usage: "backdrop-filter: blur + 半透明ボーダー", Demo: DemoGlass  },
      { id: 14, name: "ニューモーフィズム",   usage: "同色ダブル box-shadow で浮き出し",       Demo: DemoNeumo  },
      { id: 15, name: "グリッチ効果",         usage: "clip-path + translate + mix-blend",      Demo: DemoGlitch },
      { id: 16, name: "オーロラ背景",         usage: "radial-gradient 多重 + animation",       Demo: DemoAurora },
      { id: 17, name: "発光 (Glow)",          usage: "box-shadow / text-shadow で光の滲み",    Demo: DemoGlow   },
      { id: 18, name: "ブレンドモード",       usage: "mix-blend-mode: screen / multiply",      Demo: DemoBlend  },
    ],
  },
  {
    name: "テキスト演出",
    items: [
      { id: 19, name: "タイピングエフェクト",        usage: "width + steps() + カーソル点滅",    Demo: DemoTyping    },
      { id: 20, name: "中抜き文字",                  usage: "-webkit-text-stroke + color: transparent", Demo: DemoStrokeText },
      { id: 21, name: "ウェーブテキスト",            usage: "translateY stagger + animation-delay", Demo: DemoWave   },
      { id: 22, name: "マーキー / インフィニティループ", usage: "translateX(-50%) linear infinite", Demo: DemoMarquee },
      { id: 23, name: "SVG手書き線 (筆致再現)",      usage: "stroke-dashoffset アニメーション",  Demo: DemoSVGDraw   },
    ],
  },
  {
    name: "アニメーション原則",
    items: [
      { id: 24, name: "イージング比較",   usage: "ease-in / ease-out / linear の違い",      Demo: DemoEasing },
      { id: 25, name: "スタッガー",       usage: "animation-delay を順番にずらして連続動作", Demo: DemoStagger },
      { id: 26, name: "シェイク (エラー)", usage: "translateX 往復 @keyframes でエラー振動",  Demo: DemoShake  },
    ],
  },
  {
    name: "3D & インタラクション",
    items: [
      { id: 27, name: "フリップカード",     usage: "rotateY(180deg) + backface-visibility: hidden", Demo: DemoFlip },
      { id: 28, name: "アイソメトリック",   usage: "rotateX(60deg) rotateZ(45deg) で等角投影",      Demo: DemoIso  },
    ],
  },
  {
    name: "レイアウト & スクロール",
    items: [
      { id: 29, name: "スクロールスナップ",           usage: "scroll-snap-type: x mandatory",                Demo: DemoSnapScroll  },
      { id: 30, name: "スケルトン・シマー",           usage: "background-position linear-gradient で光沢",   Demo: DemoSkeleton    },
      { id: 31, name: "Scroll-driven Animation",      usage: "animation-timeline: scroll() — Chrome 115+",   Demo: DemoScrollDriven },
    ],
  },
  {
    name: "Inspired Motions",
    items: [
      { id: 32, name: "Orbit Pulse", usage: "rotate + nested rings + delayed orbital dots", Demo: DemoOrbitPulse },
      { id: 33, name: "Loading Bands", usage: "per-letter stagger + translateY + glow fade", Demo: DemoLoadingBands },
      { id: 34, name: "Shutter Reveal", usage: "sliding panels + masked text reveal", Demo: DemoShutterReveal },
      { id: 35, name: "Ripple Field", usage: "concentric scale waves + center pulse", Demo: DemoRippleField },
      { id: 36, name: "Rolling Loader", usage: "staggered bounce + track lighting", Demo: DemoRollingLoader },
      { id: 37, name: "Split Layers", usage: "offset text layers + subtle drift + mix contrast", Demo: DemoSplitLayers },
      { id: 38, name: "Lift Card", usage: "hoverless floating card + sheen + ambient glow", Demo: DemoLiftCard },
      { id: 39, name: "Swing Badge", usage: "pendulum rotation around top anchor", Demo: DemoSwingBadge },
      { id: 40, name: "Stretch Type", usage: "scaleY / translateY stagger for elastic typography", Demo: DemoStretchType },
      { id: 41, name: "Stack Ticker", usage: "vertical loop ticker with stacked branding words", Demo: DemoStackTicker },
      { id: 42, name: "Outline Badge", usage: "filled text + outline clone + offset drift", Demo: DemoOutlineBadge },
      { id: 43, name: "Corner Sweep", usage: "diagonal sheen + framed card corners", Demo: DemoCornerSweep },
      { id: 44, name: "Depth Marquee", usage: "two marquee rows with parallax speed difference", Demo: DemoDepthMarquee },
    ],
  },
  {
    name: "Auto Batch",
    items: [
      { id: 45, name: "Scanline Mask", usage: "moving scanline over branding text", Demo: DemoScanlineMask },
      { id: 46, name: "Pulse Grid", usage: "grid cells pulsing on a diagonal rhythm", Demo: DemoPulseGrid },
      { id: 47, name: "Rotating Border", usage: "conic-gradient border rotating around a card", Demo: DemoRotatingBorder },
      { id: 48, name: "Dot Matrix", usage: "pixel-like glowing typography", Demo: DemoDotMatrix },
      { id: 49, name: "Equalizer", usage: "staggered vertical bars like audio levels", Demo: DemoEqualizer },
      { id: 50, name: "Prism Button", usage: "iridescent button sheen with depth", Demo: DemoPrismButton },
      { id: 51, name: "Echo Text", usage: "stacked duplicate text with drifting offsets", Demo: DemoEchoText },
      { id: 52, name: "Ladder Bars", usage: "sequential bars rising like steps", Demo: DemoLadderBars },
      { id: 53, name: "Spotlight Sweep", usage: "soft beam crossing a stage wordmark", Demo: DemoSpotlightSweep },
      { id: 54, name: "Tilt Stack", usage: "floating stacked cards with offset motion", Demo: DemoTiltStack },
      { id: 55, name: "Radar Sweep", usage: "rotating radar beam over concentric rings", Demo: DemoRadarSweep },
      { id: 56, name: "Pixel Blink", usage: "pixel grid blinking in wave order", Demo: DemoPixelBlink },
      { id: 57, name: "Ribbon Flip", usage: "two-faced label rotating on the X axis", Demo: DemoRibbonFlip },
      { id: 58, name: "Orbit Text", usage: "circular word track rotating around a core", Demo: DemoOrbitText },
      { id: 59, name: "Prism Loader", usage: "triangle faces phasing with delayed opacity", Demo: DemoPrismLoader },
      { id: 60, name: "Ring Steps", usage: "nested rings scaling outward in sequence", Demo: DemoRingSteps },
    ],
  },
  {
    name: "Auto Batch 2",
    items: [
      { id: 61, name: "Wave Dots", usage: "dots bouncing in a traveling wave", Demo: DemoWaveDots },
      { id: 62, name: "Tunnel Rings", usage: "rings scaling like a forward tunnel", Demo: DemoTunnelRings },
      { id: 63, name: "Skew Panels", usage: "angled panels sliding with stagger", Demo: DemoSkewPanels },
      { id: 64, name: "Beam Button", usage: "button with sweeping light beam", Demo: DemoBeamButton },
      { id: 65, name: "Orbit Badges", usage: "three labels orbiting around a center", Demo: DemoOrbitBadges },
      { id: 66, name: "Folding Squares", usage: "2x2 loader folding by opacity and scale", Demo: DemoFoldingSquares },
      { id: 67, name: "Signal Bars", usage: "signal-strength style stepped bars", Demo: DemoSignalBars },
      { id: 68, name: "Flip Words", usage: "vertical text flip ticker", Demo: DemoFlipWords },
      { id: 69, name: "Diagonal Grid", usage: "moving diagonal grid over a panel", Demo: DemoDiagonalGrid },
      { id: 70, name: "Halo Badge", usage: "center chip with breathing halo ring", Demo: DemoHaloBadge },
    ],
  },
];

type ShowcaseItem = {
  id: number;
  name: string;
  usage: string;
  Demo: () => ReactNode;
};

function formatDemoSource(source: string) {
  return source
    .replace(/\s+/g, " ")
    .replace(/\)\s*=>\s*/g, ") => ")
    .replace(/\s*{\s*/g, " {\n  ")
    .replace(/;\s*/g, ";\n  ")
    .replace(/}\s*$/g, "\n}");
}

function extractDemoClasses(source: string) {
  const matches = [...source.matchAll(/className="([^"]+)"/g)]
    .flatMap((match) => match[1].split(" "))
    .filter(Boolean);

  return [...new Set(matches)].slice(0, 10);
}

// ============================================================
// ShowcaseCard
// ============================================================

function ShowcaseCard({ id, name, usage, Demo, onSelect }: ShowcaseItem & {
  onSelect: (item: ShowcaseItem) => void;
}) {
  return (
    <article
      className="showcase-card"
      role="button"
      tabIndex={0}
      onClick={() => onSelect({ id, name, usage, Demo })}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect({ id, name, usage, Demo });
        }
      }}
    >
      <div className="showcase-card-head">
        <span className="showcase-num">{String(id).padStart(2, "0")}</span>
        <div>
          <h2 className="showcase-tech-name">{name}</h2>
          <p className="showcase-tech-usage">{usage}</p>
        </div>
      </div>
      <div className="showcase-demo-area">
        <Demo />
      </div>
    </article>
  );
}

// ============================================================
// Page
// ============================================================

export default function CssShowcasePage() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const sourceCode = selectedItem ? formatDemoSource(selectedItem.Demo.toString()) : "";
  const classNames = selectedItem ? extractDemoClasses(selectedItem.Demo.toString()) : [];

  return (
    <div className="css-showcase-page">
      <header className="showcase-header">
        <h1 className="showcase-title">CSS技術ショーケース</h1>
        <p className="showcase-subtitle">60のCSS技術を体験できるデモ集</p>
      </header>

      {CATEGORIES.map((cat) => (
        <section key={cat.name}>
          <h2 className="showcase-category-title">{cat.name}</h2>
          <div className="showcase-grid">
            {cat.items.map((item) => (
              <ShowcaseCard key={item.id} {...item} onSelect={setSelectedItem} />
            ))}
          </div>
        </section>
      ))}

      {selectedItem && (
        <div className="showcase-code-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="showcase-code-modal" onClick={(event) => event.stopPropagation()}>
            <button className="showcase-code-close" onClick={() => setSelectedItem(null)} aria-label="close code preview">
              ×
            </button>
            <div className="showcase-code-head">
              <div>
                <div className="showcase-code-kicker">USE THIS EFFECT</div>
                <h2 className="showcase-code-title">
                  {String(selectedItem.id).padStart(2, "0")} / {selectedItem.name}
                </h2>
                <p className="showcase-code-usage">{selectedItem.usage}</p>
              </div>
              <div className="showcase-code-preview">
                <selectedItem.Demo />
              </div>
            </div>

            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Prompt Hint</h3>
              <pre className="showcase-code-pre"><code>{`この表現を使ってください: ${selectedItem.name} (#${String(selectedItem.id).padStart(2, "0")})`}</code></pre>
            </div>

            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Detected Class Names</h3>
              <pre className="showcase-code-pre"><code>{classNames.map((className) => `.${className}`).join("\n")}</code></pre>
            </div>

            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Demo Function Source</h3>
              <pre className="showcase-code-pre"><code>{sourceCode}</code></pre>
            </div>

            <p className="showcase-code-note">
              CSS 本体は <code>src/index.css</code>、デモ構造は <code>src/pages/CssShowcasePage.tsx</code> にあります。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
