import { useState, useRef, type ReactNode } from "react";

type ShowcaseItem = {
  id: number;
  name: string;
  usage: string;
  Demo: () => ReactNode;
};

const svgWrap = { width: 220, height: 140 } as const;

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
  return [...new Set(matches)].slice(0, 12);
}

function BaseSvg({ children, viewBox = "0 0 220 140" }: { children: ReactNode; viewBox?: string }) {
  return (
    <svg viewBox={viewBox} style={svgWrap}>
      {children}
    </svg>
  );
}

function Demo1() {
  return (
    <BaseSvg>
      <path d="M10,110 C40,20 80,20 110,80 C140,140 180,30 210,70" fill="none" stroke="#00e5ff" strokeWidth="4" strokeLinecap="round" strokeDasharray="280" strokeDashoffset="280">
        <animate attributeName="stroke-dashoffset" values="280;0" dur="2.4s" repeatCount="indefinite" />
      </path>
    </BaseSvg>
  );
}

function Demo2() {
  return (
    <BaseSvg viewBox="0 0 120 120">
      <path fill="rgba(0,229,255,0.18)" stroke="#00e5ff" strokeWidth="2">
        <animate attributeName="d" dur="4s" repeatCount="indefinite" values="M60,16 L102,100 L18,100 Z;M60,12 C88,12 108,34 108,60 C108,86 88,108 60,108 C32,108 12,86 12,60 C12,34 32,12 60,12 Z;M60,18 L102,60 L60,102 L18,60 Z;M60,16 L102,100 L18,100 Z" />
      </path>
    </BaseSvg>
  );
}

function Demo3() {
  return (
    <BaseSvg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(0,229,255,0.15)" strokeWidth="8" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#00e5ff" strokeWidth="8" strokeLinecap="round" strokeDasharray="160 70">
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="2s" repeatCount="indefinite" />
      </circle>
    </BaseSvg>
  );
}

function Demo4() {
  return (
    <BaseSvg>
      <polyline fill="none" stroke="#ff2d78" strokeWidth="3" points="0,70 20,58 40,88 60,44 80,76 100,50 120,86 140,60 160,78 180,38 200,72 220,64">
        <animateTransform attributeName="transform" type="translate" from="0 0" to="-40 0" dur="2s" repeatCount="indefinite" />
      </polyline>
    </BaseSvg>
  );
}

function Demo5() {
  return (
    <BaseSvg>
      <defs>
        <filter id="liquid">
          <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" values="0.02;0.05;0.02" dur="6s" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" />
        </filter>
      </defs>
      <text x="110" y="78" textAnchor="middle" fontFamily="monospace" fontSize="28" fill="#00e5ff" filter="url(#liquid)">LIQUID</text>
    </BaseSvg>
  );
}

function Demo6() {
  return (
    <BaseSvg>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="70" r="18" fill="none" stroke="#00e5ff" strokeWidth="3" filter="url(#glow)" />
      <rect x="92" y="52" width="36" height="36" rx="6" fill="none" stroke="#ff2d78" strokeWidth="3" filter="url(#glow)" />
      <polygon points="164,48 184,92 144,92" fill="none" stroke="#a855f7" strokeWidth="3" filter="url(#glow)" />
    </BaseSvg>
  );
}

function Demo7() {
  return (
    <BaseSvg>
      <defs>
        <filter id="hue">
          <feColorMatrix type="hueRotate" values="0">
            <animate attributeName="values" values="0;180;360" dur="4s" repeatCount="indefinite" />
          </feColorMatrix>
        </filter>
      </defs>
      <rect x="30" y="40" width="160" height="60" rx="14" fill="#00e5ff" filter="url(#hue)" />
    </BaseSvg>
  );
}

function Demo8() {
  return (
    <BaseSvg>
      <defs>
        <path id="curve" d="M15,100 C55,20 120,20 205,88" />
      </defs>
      <path d="M15,100 C55,20 120,20 205,88" fill="none" stroke="rgba(255,255,255,0.12)" />
      <text fill="#00e5ff" fontFamily="monospace" fontSize="10">
        <textPath href="#curve">PANTRY CLUB SVG MOTION PANTRY CLUB SVG MOTION</textPath>
      </text>
    </BaseSvg>
  );
}

function Demo9() {
  return (
    <BaseSvg>
      <defs>
        <linearGradient id="maskGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#ff2d78" />
        </linearGradient>
        <mask id="wipe">
          <rect width="220" height="140" fill="black" />
          <rect x="-220" y="0" width="220" height="140" fill="white">
            <animate attributeName="x" values="-220;220" dur="2.6s" repeatCount="indefinite" />
          </rect>
        </mask>
      </defs>
      <text x="110" y="78" textAnchor="middle" fontFamily="monospace" fontSize="28" fontWeight="bold" fill="url(#maskGrad)" mask="url(#wipe)">REVEAL</text>
    </BaseSvg>
  );
}

function Demo10() {
  return (
    <BaseSvg>
      <defs>
        <linearGradient id="animGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00e5ff"><animate attributeName="stop-color" values="#00e5ff;#ff2d78;#a855f7;#00e5ff" dur="3s" repeatCount="indefinite" /></stop>
          <stop offset="100%" stopColor="#ff2d78"><animate attributeName="stop-color" values="#ff2d78;#22c55e;#00e5ff;#ff2d78" dur="3s" repeatCount="indefinite" /></stop>
        </linearGradient>
      </defs>
      <rect x="20" y="45" width="180" height="40" rx="20" fill="url(#animGrad)" />
    </BaseSvg>
  );
}

function Demo11() {
  return (
    <BaseSvg viewBox="0 0 120 120">
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="5s" repeatCount="indefinite" />
        <rect x="46" y="10" width="28" height="28" rx="4" fill="none" stroke="#00e5ff" strokeWidth="2" />
        <rect x="46" y="82" width="28" height="28" rx="4" fill="none" stroke="#ff2d78" strokeWidth="2" />
      </g>
    </BaseSvg>
  );
}

function Demo12() {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const ref = useRef<SVGSVGElement>(null);
  const onClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 220;
    const y = ((event.clientY - rect.top) / rect.height) * 140;
    const id = Date.now();
    setRipples((current) => [...current, { id, x, y }]);
    setTimeout(() => setRipples((current) => current.filter((r) => r.id !== id)), 900);
  };
  return (
    <svg ref={ref} viewBox="0 0 220 140" style={{ ...svgWrap, cursor: "pointer" }} onClick={onClick}>
      <rect width="220" height="140" fill="transparent" />
      <text x="110" y="74" textAnchor="middle" fill="rgba(0,229,255,0.25)" fontFamily="monospace" fontSize="12">CLICK</text>
      {ripples.map((ripple) => (
        <circle key={ripple.id} cx={ripple.x} cy={ripple.y} r="1" fill="none" stroke="#00e5ff" strokeWidth="2">
          <animate attributeName="r" from="1" to="44" dur="0.8s" fill="freeze" />
          <animate attributeName="opacity" from="1" to="0" dur="0.8s" fill="freeze" />
        </circle>
      ))}
    </svg>
  );
}

function Demo13() {
  return (
    <BaseSvg viewBox="0 0 120 120">
      <path d="M60 12 C72 12 86 18 94 30 C104 46 102 62 92 74 C82 88 66 98 52 102 C36 98 22 88 14 74 C4 58 4 40 16 26 C28 14 42 10 60 12 Z" fill="none" stroke="#00e5ff" strokeWidth="2" strokeDasharray="360" strokeDashoffset="360">
        <animate attributeName="stroke-dashoffset" values="360;0" dur="2.4s" repeatCount="indefinite" />
      </path>
    </BaseSvg>
  );
}

function Demo14() {
  return (
    <BaseSvg viewBox="0 0 120 120">
      <defs>
        <pattern id="pat" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="4" fill="none" stroke="#00e5ff" strokeWidth="1" />
        </pattern>
      </defs>
      <circle cx="60" cy="60" r="48" fill="url(#pat)" />
    </BaseSvg>
  );
}

function Demo15() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="12" fill="#00e5ff"><animate attributeName="r" values="12;36;12" dur="1.8s" repeatCount="indefinite" /></circle></BaseSvg>;
}
function Demo16() {
  return <BaseSvg><rect x="30" y="36" width="160" height="68" rx="10" fill="none" stroke="#ff2d78" strokeWidth="4" strokeDasharray="24 10"><animate attributeName="stroke-dashoffset" values="0;-68" dur="2s" repeatCount="indefinite" /></rect></BaseSvg>;
}
function Demo17() {
  return <BaseSvg><defs><linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#00e5ff"><animate attributeName="offset" values="-1;1" dur="2.4s" repeatCount="indefinite" /></stop><stop offset="50%" stopColor="#ffffff" /><stop offset="100%" stopColor="#ff2d78" /></linearGradient></defs><rect x="20" y="52" width="180" height="36" rx="18" fill="url(#sweep)" /></BaseSvg>;
}
function Demo18() {
  return <BaseSvg viewBox="0 0 120 120"><polygon points="60,10 72,44 108,44 78,64 88,100 60,80 32,100 42,64 12,44 48,44" fill="rgba(168,85,247,0.2)" stroke="#a855f7" strokeWidth="2"><animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="6s" repeatCount="indefinite" /></polygon></BaseSvg>;
}
function Demo19() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="4" fill="#fff" />{[0,120,240].map((deg)=><g key={deg}><animateTransform attributeName="transform" type="rotate" from={`${deg} 60 60`} to={`${deg+360} 60 60`} dur="3s" repeatCount="indefinite" /><circle cx="60" cy="18" r="6" fill={deg===0?"#00e5ff":deg===120?"#ff2d78":"#22c55e"} /></g>)}</BaseSvg>;
}
function Demo20() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48" fill="none" stroke="rgba(0,229,255,0.18)" /><circle cx="60" cy="60" r="28" fill="none" stroke="rgba(0,229,255,0.18)" /><path d="M60 60 L60 8 A52 52 0 0 1 112 60 Z" fill="rgba(0,229,255,0.26)"><animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="2s" repeatCount="indefinite" /></path><circle cx="86" cy="46" r="4" fill="#9ef7ff" /></BaseSvg>;
}
function Demo21() {
  return <BaseSvg>{[0,1,2,3,4,5].map((i)=><rect key={i} x={30+i*24} y={90-i*6} width="14" height={20+i*6} rx="7" fill={i%2===0?"#00e5ff":"#ff2d78"}><animate attributeName="height" values={`${20+i*6};${50-i*3};${20+i*6}`} dur="1s" begin={`${i*0.08}s`} repeatCount="indefinite" /></rect>)}</BaseSvg>;
}
function Demo22() {
  return <BaseSvg viewBox="0 0 120 120"><path d="M60 16 C92 16 104 40 104 60 C104 80 88 104 60 104 C32 104 16 80 16 60 C16 40 28 16 60 16 Z" fill="rgba(0,229,255,0.18)"><animate attributeName="d" values="M60 16 C92 16 104 40 104 60 C104 80 88 104 60 104 C32 104 16 80 16 60 C16 40 28 16 60 16 Z;M60 20 C88 8 108 34 100 62 C92 92 74 106 48 100 C18 94 10 64 22 40 C30 24 42 22 60 20 Z;M60 16 C92 16 104 40 104 60 C104 80 88 104 60 104 C32 104 16 80 16 60 C16 40 28 16 60 16 Z" dur="3.6s" repeatCount="indefinite" /></path></BaseSvg>;
}
function Demo23() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="42" fill="none" stroke="#00e5ff" strokeWidth="6" strokeDasharray="180 80"><animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="1.4s" repeatCount="indefinite" /></circle><circle cx="60" cy="60" r="24" fill="none" stroke="#ff2d78" strokeWidth="4" strokeDasharray="70 50"><animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="1.1s" repeatCount="indefinite" /></circle></BaseSvg>;
}
function Demo24() {
  return <BaseSvg><text x="20" y="78" fontFamily="monospace" fontSize="26" fill="#00e5ff">PANTRY<tspan dy="-10"><animate attributeName="dy" values="-10;10;-10" dur="2s" repeatCount="indefinite" /></tspan></text></BaseSvg>;
}
function Demo25() {
  return <BaseSvg viewBox="0 0 120 120"><polygon points="60,16 94,76 26,76" fill="rgba(0,229,255,0.18)" stroke="#00e5ff" /><polygon points="60,28 82,68 38,68" fill="rgba(255,45,120,0.18)" stroke="#ff2d78" /><polygon points="60,42 70,60 50,60" fill="#fff" /></BaseSvg>;
}
function Demo26() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="3" fill="#fff" />{Array.from({length:8},(_,i)=><line key={i} x1="60" y1="60" x2="60" y2="20" stroke={i%2===0?"#00e5ff":"#ff2d78"} strokeWidth="2"><animateTransform attributeName="transform" type="rotate" from={`${i*45} 60 60`} to={`${i*45} 60 60`} dur="1s" begin={`${i*0.08}s`} /><animate attributeName="opacity" values="1;0" dur="1s" begin={`${i*0.08}s`} repeatCount="indefinite" /></line>)}</BaseSvg>;
}
function Demo27() {
  return <BaseSvg><g opacity="0.5">{Array.from({length:8},(_,i)=><line key={i} x1="10" y1={20+i*14} x2="210" y2={20+i*14} stroke="rgba(255,255,255,0.08)" />)}<rect x="-220" y="0" width="220" height="140" fill="rgba(0,229,255,0.12)"><animate attributeName="x" values="-220;220" dur="2.2s" repeatCount="indefinite" /></rect></g></BaseSvg>;
}
function Demo28() {
  return <BaseSvg viewBox="0 0 120 120"><polygon points="60,12 92,30 92,66 60,84 28,66 28,30" fill="none" stroke="#00e5ff" strokeWidth="2" /><g><animateTransform attributeName="transform" type="rotate" from="0 60 48" to="360 60 48" dur="3s" repeatCount="indefinite" /><circle cx="60" cy="16" r="5" fill="#ff2d78" /></g></BaseSvg>;
}
function Demo29() {
  return <BaseSvg viewBox="0 0 120 120">{[0,1,2,3].map((i)=><circle key={i} cx="60" cy="60" r={12+i*12} fill="none" stroke="rgba(0,229,255,0.3)" strokeWidth="2"><animate attributeName="r" values={`${8+i*8};${18+i*12};${8+i*8}`} dur="1.8s" begin={`${i*0.12}s`} repeatCount="indefinite" /></circle>)}</BaseSvg>;
}
function Demo30() {
  return <BaseSvg viewBox="0 0 120 120"><circle cx="60" cy="60" r="46" fill="none" stroke="rgba(255,255,255,0.12)" /><circle cx="60" cy="60" r="28" fill="none" stroke="rgba(255,255,255,0.12)" /><circle cx="60" cy="60" r="8" fill="#00e5ff" /><circle cx="60" cy="14" r="5" fill="#ff2d78"><animate attributeName="r" values="5;9;5" dur="1.6s" repeatCount="indefinite" /></circle></BaseSvg>;
}

const CATEGORIES = [
  {
    name: "SVG Core",
    items: [
      { id: 1, name: "Path Draw", usage: "stroke-dashoffset で線を描く", Demo: Demo1 },
      { id: 2, name: "Morph Shape", usage: "SMIL animate で d 属性を変形", Demo: Demo2 },
      { id: 3, name: "Arc Spinner", usage: "円弧の回転ローダー", Demo: Demo3 },
      { id: 4, name: "Waveform", usage: "polyline の波形スクロール", Demo: Demo4 },
      { id: 5, name: "Displacement", usage: "feTurbulence と feDisplacementMap", Demo: Demo5 },
      { id: 6, name: "Glow Filter", usage: "feGaussianBlur の発光", Demo: Demo6 },
      { id: 7, name: "Hue Rotate", usage: "feColorMatrix で色相回転", Demo: Demo7 },
      { id: 8, name: "Text Path", usage: "パスに沿って文字を流す", Demo: Demo8 },
      { id: 9, name: "Mask Reveal", usage: "mask を使ったワイプ", Demo: Demo9 },
      { id: 10, name: "Animated Gradient", usage: "stop-color のループ変化", Demo: Demo10 },
    ],
  },
  {
    name: "SVG Motion",
    items: [
      { id: 11, name: "Transform Orbit", usage: "animateTransform で回転", Demo: Demo11 },
      { id: 12, name: "Click Ripple", usage: "React state と SVG の波紋", Demo: Demo12 },
      { id: 13, name: "Spiral Stroke", usage: "渦巻きパスの描画", Demo: Demo13 },
      { id: 14, name: "Pattern Fill", usage: "pattern を円形にクリップ", Demo: Demo14 },
      { id: 15, name: "Pulse Circle", usage: "半径の脈動アニメーション", Demo: Demo15 },
      { id: 16, name: "Dash Border", usage: "破線の流れる矩形", Demo: Demo16 },
      { id: 17, name: "Gradient Sweep", usage: "グラデーションの横流れ", Demo: Demo17 },
      { id: 18, name: "Rotating Star", usage: "星形ポリゴンの回転", Demo: Demo18 },
      { id: 19, name: "Orbit Dots", usage: "複数のドットを周回させる", Demo: Demo19 },
      { id: 20, name: "Radar Sweep", usage: "レーダー状の回転扇形", Demo: Demo20 },
    ],
  },
  {
    name: "SVG UI Pack",
    items: [
      { id: 21, name: "Equalizer Bars", usage: "高さの異なるバーアニメ", Demo: Demo21 },
      { id: 22, name: "Blob Pulse", usage: "有機的な輪郭の変化", Demo: Demo22 },
      { id: 23, name: "Ring Loader", usage: "二重リングの回転", Demo: Demo23 },
      { id: 24, name: "Text Wave", usage: "文字位置の波打ち", Demo: Demo24 },
      { id: 25, name: "Prism", usage: "多層三角形の構成", Demo: Demo25 },
      { id: 26, name: "Spark Burst", usage: "線分の放射アニメ", Demo: Demo26 },
      { id: 27, name: "Scan Lines", usage: "走査線の横切り", Demo: Demo27 },
      { id: 28, name: "Hex Orbit", usage: "六角形と周回ドット", Demo: Demo28 },
      { id: 29, name: "Tunnel Rings", usage: "奥行き方向へ広がる輪", Demo: Demo29 },
      { id: 30, name: "Target Ping", usage: "ターゲットの脈動", Demo: Demo30 },
    ],
  },
];

function ShowcaseCard({ id, name, usage, Demo, onSelect }: ShowcaseItem & { onSelect: (item: ShowcaseItem) => void }) {
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

export default function SvgShowcasePage() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const sourceCode = selectedItem ? formatDemoSource(selectedItem.Demo.toString()) : "";
  const classNames = selectedItem ? extractDemoClasses(selectedItem.Demo.toString()) : [];

  return (
    <div className="css-showcase-page">
      <header className="showcase-header">
        <h1 className="showcase-title">SVG技術ショーケース</h1>
        <p className="showcase-subtitle">30のSVG表現を体験できるデモ集</p>
      </header>
      {CATEGORIES.map((category) => (
        <section key={category.name}>
          <h2 className="showcase-category-title">{category.name}</h2>
          <div className="showcase-grid">
            {category.items.map((item) => (
              <ShowcaseCard key={item.id} {...item} onSelect={setSelectedItem} />
            ))}
          </div>
        </section>
      ))}

      {selectedItem && (
        <div className="showcase-code-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="showcase-code-modal" onClick={(event) => event.stopPropagation()}>
            <button className="showcase-code-close" onClick={() => setSelectedItem(null)} aria-label="close code preview">×</button>
            <div className="showcase-code-head">
              <div>
                <div className="showcase-code-kicker">USE THIS EFFECT</div>
                <h2 className="showcase-code-title">{String(selectedItem.id).padStart(2, "0")} / {selectedItem.name}</h2>
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
              <pre className="showcase-code-pre"><code>{classNames.map((className) => `.${className}`).join("\n") || "(inline SVG attributes only)"}</code></pre>
            </div>
            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Demo Function Source</h3>
              <pre className="showcase-code-pre"><code>{sourceCode}</code></pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
