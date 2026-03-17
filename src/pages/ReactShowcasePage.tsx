import { useState, useEffect, useMemo, useReducer, createContext, useContext, useRef, useCallback, type ReactNode } from "react";
import { motion } from "framer-motion";

type ShowcaseItem = {
  id: number;
  name: string;
  usage: string;
  Demo: () => ReactNode;
};

function formatDemoSource(source: string) {
  return source.replace(/\s+/g, " ").replace(/\s*{\s*/g, " {\n  ").replace(/;\s*/g, ";\n  ").replace(/}\s*$/g, "\n}");
}

function extractDemoClasses(source: string) {
  const matches = [...source.matchAll(/className="([^"]+)"/g)].flatMap((m) => m[1].split(" ")).filter(Boolean);
  return [...new Set(matches)].slice(0, 12);
}

function MiniCard({ children }: { children: ReactNode }) {
  return <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center", gap: 10 }}>{children}</div>;
}

function CounterDemo({ step }: { step: number }) {
  const [count, setCount] = useState(0);
  return (
    <MiniCard>
      <motion.div key={count} initial={{ scale: 1.15, opacity: 0.4 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: 34, fontFamily: "monospace", color: "#00e5ff" }}>{count}</motion.div>
      <button type="button" onClick={() => setCount((v) => v + step)} style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>+{step}</button>
    </MiniCard>
  );
}

function ToggleDemo({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <MiniCard>
      <motion.button
        type="button"
        onClick={() => setOn((v) => !v)}
        animate={{ backgroundColor: on ? "rgba(0,229,255,0.18)" : "rgba(255,255,255,0.05)" }}
        style={{ padding: "12px 16px", borderRadius: 14, color: "white", border: "1px solid rgba(255,255,255,0.12)" }}
      >
        {label}: {on ? "ON" : "OFF"}
      </motion.button>
    </MiniCard>
  );
}

function ClockDemo() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return <MiniCard><div style={{ fontSize: 26, fontFamily: "monospace" }}>{time.toLocaleTimeString()}</div></MiniCard>;
}

function FilterDemo({ seed }: { seed: string }) {
  const [query, setQuery] = useState("");
  const items = useMemo(() => Array.from({ length: 8 }, (_, i) => `${seed}-${i + 1}`), [seed]);
  const filtered = useMemo(() => items.filter((item) => item.includes(query)), [items, query]);
  return (
    <MiniCard>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="filter" style={{ width: 140, padding: "8px 10px", borderRadius: 10, background: "rgba(255,255,255,0.05)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }} />
      <div style={{ fontSize: 12, color: "#8892a4" }}>{filtered.join(", ") || "empty"}</div>
    </MiniCard>
  );
}

type Light = "red" | "green";
function reducer(state: Light) {
  return state === "red" ? "green" : "red";
}
function ReducerDemo() {
  const [state, dispatch] = useReducer(reducer, "red");
  return (
    <MiniCard>
      <div style={{ width: 28, height: 28, borderRadius: 999, background: state === "red" ? "#ff2d78" : "#22c55e", boxShadow: `0 0 18px ${state === "red" ? "#ff2d78" : "#22c55e"}` }} />
      <button type="button" onClick={() => dispatch()} style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>NEXT</button>
    </MiniCard>
  );
}

const ModeContext = createContext<{ dark: boolean; toggle: () => void }>({ dark: true, toggle: () => {} });
function ModeChip() {
  const { dark, toggle } = useContext(ModeContext);
  return <button type="button" onClick={toggle} style={{ padding: "12px 18px", borderRadius: 14, color: dark ? "white" : "#111", background: dark ? "#111827" : "#e5e7eb", border: "1px solid rgba(255,255,255,0.12)" }}>{dark ? "DARK" : "LIGHT"}</button>;
}
function ContextDemo() {
  const [dark, setDark] = useState(true);
  return <ModeContext.Provider value={{ dark, toggle: () => setDark((v) => !v) }}><MiniCard><ModeChip /></MiniCard></ModeContext.Provider>;
}

const CATEGORIES = [
  {
    name: "Hooks",
    items: [
      { id: 1, name: "Counter +1", usage: "useState の最小カウンター", Demo: () => <CounterDemo step={1} /> },
      { id: 2, name: "Counter +2", usage: "増分違いの state 更新", Demo: () => <CounterDemo step={2} /> },
      { id: 3, name: "Counter +5", usage: "派手な数値変化", Demo: () => <CounterDemo step={5} /> },
      { id: 4, name: "Live Clock", usage: "useEffect で時計を更新", Demo: ClockDemo },
      { id: 5, name: "Filter Pantry", usage: "useMemo で一覧を絞り込む", Demo: () => <FilterDemo seed="PANTRY" /> },
      { id: 6, name: "Filter Club", usage: "依存配列つきフィルター", Demo: () => <FilterDemo seed="CLUB" /> },
      { id: 7, name: "Reducer Light", usage: "useReducer で状態遷移", Demo: ReducerDemo },
      { id: 8, name: "Context Theme", usage: "useContext で共有状態切替", Demo: ContextDemo },
      { id: 9, name: "Toggle Favorite", usage: "ローカル boolean state", Demo: () => <ToggleDemo label="Favorite" /> },
      { id: 10, name: "Toggle Preview", usage: "状態切替ボタン", Demo: () => <ToggleDemo label="Preview" /> },
    ],
  },
  {
    name: "State Patterns",
    items: [
      { id: 11, name: "Toggle Archive", usage: "カード内フラグ制御", Demo: () => <ToggleDemo label="Archive" /> },
      { id: 12, name: "Toggle Debug", usage: "開閉系 UI の基本", Demo: () => <ToggleDemo label="Debug" /> },
      { id: 13, name: "Counter +10", usage: "大きい増分のデモ", Demo: () => <CounterDemo step={10} /> },
      { id: 14, name: "Filter Motion", usage: "配列絞り込みの別例", Demo: () => <FilterDemo seed="MOTION" /> },
      { id: 15, name: "Filter React", usage: "入力連動レンダリング", Demo: () => <FilterDemo seed="REACT" /> },
      { id: 16, name: "Context Theme 2", usage: "共有 state の別配置", Demo: ContextDemo },
      { id: 17, name: "Reducer Light 2", usage: "reducer 再利用", Demo: ReducerDemo },
      { id: 18, name: "Toggle Live", usage: "瞬時にUI反映する state", Demo: () => <ToggleDemo label="Live" /> },
      { id: 19, name: "Counter +3", usage: "小刻みカウント変化", Demo: () => <CounterDemo step={3} /> },
      { id: 20, name: "Counter +7", usage: "別の刻み幅", Demo: () => <CounterDemo step={7} /> },
    ],
  },
  {
    name: "UI Recipes",
    items: [
      { id: 21, name: "Toggle Compose", usage: "トグルUIの派生例", Demo: () => <ToggleDemo label="Compose" /> },
      { id: 22, name: "Toggle Cache", usage: "キャッシュ表示切替", Demo: () => <ToggleDemo label="Cache" /> },
      { id: 23, name: "Toggle Pin", usage: "ピン留め UI", Demo: () => <ToggleDemo label="Pin" /> },
      { id: 24, name: "Filter Studio", usage: "検索 UI の再利用", Demo: () => <FilterDemo seed="STUDIO" /> },
      { id: 25, name: "Filter Layout", usage: "useMemo の別パターン", Demo: () => <FilterDemo seed="LAYOUT" /> },
      { id: 26, name: "Counter +4", usage: "中間値カウンター", Demo: () => <CounterDemo step={4} /> },
      { id: 27, name: "Counter +8", usage: "やや大きめの増分", Demo: () => <CounterDemo step={8} /> },
      { id: 28, name: "Reducer Light 3", usage: "遷移ロジックの再利用", Demo: ReducerDemo },
      { id: 29, name: "Context Theme 3", usage: "Context の共有例", Demo: ContextDemo },
      { id: 30, name: "Toggle Publish", usage: "公開状態の切替", Demo: () => <ToggleDemo label="Publish" /> },
    ],
  },
  {
    name: "Effects Lab Vol.1",
    items: [
      {
        id: 31,
        name: "テキストリビール",
        usage: "1文字ずつ浮き上がるアニメーション",
        Demo: () => {
          const letters = "SUGOI".split("");
          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
              <style>{`
                @keyframes el31_rise {
                  from { opacity: 0; transform: translateY(14px); }
                  to   { opacity: 1; transform: translateY(0); }
                }
                .el31_letter {
                  display: inline-block;
                  opacity: 0;
                  animation: el31_rise 0.5s ease forwards;
                }
              `}</style>
              <div style={{ display: "flex", gap: 4 }}>
                {letters.map((ch, i) => (
                  <span
                    key={i}
                    className="el31_letter"
                    style={{
                      animationDelay: `${500 + i * 120}ms`,
                      fontSize: 32,
                      fontWeight: 700,
                      fontFamily: "monospace",
                      color: "#00e5ff",
                      letterSpacing: 2,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          );
        },
      },
      {
        id: 32,
        name: "カードチルト",
        usage: "マウス追従の3D傾き",
        Demo: () => {
          const cardRef = useRef<HTMLDivElement>(null);
          const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

          const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            const el = cardRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setTilt({ rx: -y * 20, ry: x * 20 });
          }, []);

          const handleMouseLeave = useCallback(() => {
            setTilt({ rx: 0, ry: 0 });
          }, []);

          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center", perspective: 400 }}>
              <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  width: 130,
                  height: 90,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  border: "1px solid rgba(0,229,255,0.25)",
                  display: "grid",
                  placeItems: "center",
                  cursor: "none",
                  transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transition: tilt.rx === 0 && tilt.ry === 0 ? "transform 0.4s ease" : "none",
                  boxShadow: `${-tilt.ry * 0.5}px ${tilt.rx * 0.5}px 24px rgba(0,229,255,0.18)`,
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 700, fontFamily: "monospace", color: "#00e5ff", letterSpacing: 3 }}>
                  TILT
                </span>
              </div>
            </div>
          );
        },
      },
      {
        id: 33,
        name: "スクロールフェード",
        usage: "IntersectionObserver で画面内に入ると浮上",
        Demo: () => {
          const directions = [
            { label: "↑", dir: "上から" },
            { label: "↓", dir: "下から" },
            { label: "←", dir: "左から" },
            { label: "→", dir: "右から" },
          ];
          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {directions.map(({ label, dir }) => (
                  <div
                    key={dir}
                    style={{
                      width: 76,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(0,229,255,0.07)",
                      border: "1px solid rgba(0,229,255,0.18)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 18, color: "#00e5ff" }}>{label}</span>
                    <span style={{ fontSize: 9, color: "#8892a4" }}>{dir}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        },
      },
    ],
  },
  {
    name: "Effects Lab Vol.2",
    items: [
      {
        id: 34,
        name: "マグネティックボタン",
        usage: "ホバーで引き寄せられるボタン",
        Demo: () => {
          const wrapRef = useRef<HTMLDivElement>(null);
          const [offset, setOffset] = useState({ x: 0, y: 0 });
          const [active, setActive] = useState(false);

          const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            const el = wrapRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            setOffset({ x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35 });
            setActive(true);
          }, []);

          const handleMouseLeave = useCallback(() => {
            setOffset({ x: 0, y: 0 });
            setActive(false);
          }, []);

          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
              <div
                ref={wrapRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ padding: 20, display: "inline-flex" }}
              >
                <button
                  type="button"
                  style={{
                    padding: "10px 24px",
                    borderRadius: 999,
                    background: active ? "rgba(0,229,255,0.18)" : "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(0,229,255,0.35)",
                    color: "#00e5ff",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    transition: active ? "transform 0.1s ease" : "transform 0.4s cubic-bezier(.23,1,.32,1)",
                    boxShadow: active ? "0 0 20px rgba(0,229,255,0.25)" : "none",
                  }}
                >
                  MAGNETIC
                </button>
              </div>
            </div>
          );
        },
      },
      {
        id: 35,
        name: "モーフィングBlob",
        usage: "border-radiusアニメで有機的な形変化",
        Demo: () => (
          <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
            <style>{`
              @keyframes el35_morph {
                0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                25%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                50%  { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
                75%  { border-radius: 40% 60% 60% 30% / 60% 40% 50% 70%; }
                100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
              }
              .el35_blob {
                animation: el35_morph 5s ease-in-out infinite;
              }
            `}</style>
            <div
              className="el35_blob"
              style={{
                width: 80,
                height: 80,
                background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)",
                boxShadow: "0 0 30px rgba(0,229,255,0.35)",
              }}
            />
          </div>
        ),
      },
      {
        id: 36,
        name: "パラレックスレイヤー",
        usage: "マウスで奥行き感のある視差",
        Demo: () => {
          const containerRef = useRef<HTMLDivElement>(null);
          const [pos, setPos] = useState({ x: 0, y: 0 });

          const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            setPos({ x, y });
          }, []);

          const handleMouseLeave = useCallback(() => {
            setPos({ x: 0, y: 0 });
          }, []);

          return (
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: 190,
                height: 120,
                position: "relative",
                overflow: "hidden",
                borderRadius: 12,
                background: "radial-gradient(ellipse at 50% 50%, #0f172a 0%, #020617 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Back layer */}
              <div
                style={{
                  position: "absolute",
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(124,58,237,0.25)",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${pos.x * 8}px), calc(-50% + ${pos.y * 8}px))`,
                  transition: "transform 0.1s ease",
                }}
              />
              {/* Mid layer */}
              <div
                style={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(0,229,255,0.45)",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${pos.x * 20}px), calc(-50% + ${pos.y * 20}px))`,
                  transition: "transform 0.1s ease",
                }}
              />
              {/* Front layer */}
              <div
                style={{
                  position: "absolute",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#ffffff",
                  boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                  top: "50%",
                  left: "50%",
                  transform: `translate(calc(-50% + ${pos.x * 36}px), calc(-50% + ${pos.y * 36}px))`,
                  transition: "transform 0.08s ease",
                }}
              />
            </div>
          );
        },
      },
    ],
  },
  {
    name: "Effects Lab Vol.3",
    items: [
      {
        id: 37,
        name: "ホバー発光",
        usage: "マウスオーバーで輝くグロー効果",
        Demo: () => {
          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
              <style>{`
                @keyframes el37_pulse {
                  0%   { box-shadow: 0 0 12px rgba(0,229,255,0.4), 0 0 30px rgba(0,229,255,0.15); }
                  50%  { box-shadow: 0 0 28px rgba(0,229,255,0.8), 0 0 60px rgba(0,229,255,0.35), 0 0 90px rgba(124,58,237,0.25); }
                  100% { box-shadow: 0 0 12px rgba(0,229,255,0.4), 0 0 30px rgba(0,229,255,0.15); }
                }
                .el37_glow {
                  animation: el37_pulse 2s ease-in-out infinite;
                }
              `}</style>
              <div
                className="el37_glow"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)",
                }}
              />
            </div>
          );
        },
      },
      {
        id: 38,
        name: "clip-pathリビール",
        usage: "clip-pathアニメで円形/矩形展開",
        Demo: () => {
          const [revealed, setRevealed] = useState(false);

          useEffect(() => {
            const id = setTimeout(() => setRevealed(true), 400);
            return () => clearTimeout(id);
          }, []);

          const colors = ["#00e5ff", "#7c3aed", "#22c55e"];

          return (
            <div style={{ width: 190, minHeight: 120, display: "grid", placeItems: "center" }}>
              <style>{`
                @keyframes el38_reveal {
                  from { clip-path: circle(0% at 50% 50%); opacity: 0.4; }
                  to   { clip-path: circle(75% at 50% 50%); opacity: 1; }
                }
                .el38_box {
                  animation: el38_reveal 0.6s ease forwards;
                }
              `}</style>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {colors.map((color, i) => (
                  <div
                    key={color}
                    className={revealed ? "el38_box" : undefined}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      background: color,
                      clipPath: revealed ? undefined : "circle(0% at 50% 50%)",
                      animationDelay: `${i * 150}ms`,
                      opacity: revealed ? undefined : 0,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        },
      },
      {
        id: 39,
        name: "マスクホバー",
        usage: "マスクで覗き窓エフェクト",
        Demo: () => {
          const panelRef = useRef<HTMLDivElement>(null);
          const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

          const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
            const el = panelRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }, []);

          const handleMouseLeave = useCallback(() => {
            setMouse(null);
          }, []);

          const maskImage = mouse
            ? `radial-gradient(circle 45px at ${mouse.x}px ${mouse.y}px, transparent 0%, black 100%)`
            : "none";

          return (
            <div
              ref={panelRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                width: 190,
                height: 80,
                borderRadius: 12,
                position: "relative",
                overflow: "hidden",
                cursor: "crosshair",
                background: "linear-gradient(135deg, #00e5ff 0%, #7c3aed 50%, #22c55e 100%)",
              }}
            >
              {/* Dark overlay that reveals on hover via mask */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(2,6,23,0.88)",
                  WebkitMaskImage: maskImage,
                  maskImage: maskImage,
                  transition: mouse ? "none" : "mask-image 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {!mouse && (
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", userSelect: "none" }}>
                    hover to reveal
                  </span>
                )}
              </div>
            </div>
          );
        },
      },
    ],
  },
];

function ShowcaseCard({ id, name, usage, Demo, onSelect }: ShowcaseItem & { onSelect: (item: ShowcaseItem) => void }) {
  return (
    <article className="showcase-card" role="button" tabIndex={0} onClick={() => onSelect({ id, name, usage, Demo })}>
      <div className="showcase-card-head">
        <span className="showcase-num">{String(id).padStart(2, "0")}</span>
        <div>
          <h2 className="showcase-tech-name">{name}</h2>
          <p className="showcase-tech-usage">{usage}</p>
        </div>
      </div>
      <div className="showcase-demo-area"><Demo /></div>
    </article>
  );
}

export default function ReactShowcasePage() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const sourceCode = selectedItem ? formatDemoSource(selectedItem.Demo.toString()) : "";
  const classNames = selectedItem ? extractDemoClasses(selectedItem.Demo.toString()) : [];

  return (
    <div className="css-showcase-page">
      <header className="showcase-header">
        <h1 className="showcase-title">React技術ショーケース</h1>
        <p className="showcase-subtitle">39のReact表現を体験できるデモ集</p>
      </header>
      {CATEGORIES.map((category) => (
        <section key={category.name}>
          <h2 className="showcase-category-title">{category.name}</h2>
          <div className="showcase-grid">
            {category.items.map((item) => <ShowcaseCard key={item.id} {...item} onSelect={setSelectedItem} />)}
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
              <div className="showcase-code-preview"><selectedItem.Demo /></div>
            </div>
            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Prompt Hint</h3>
              <pre className="showcase-code-pre"><code>{`この表現を使ってください: ${selectedItem.name} (#${String(selectedItem.id).padStart(2, "0")})`}</code></pre>
            </div>
            <div className="showcase-code-block">
              <h3 className="showcase-code-label">Detected Class Names</h3>
              <pre className="showcase-code-pre"><code>{classNames.map((className) => `.${className}`).join("\n") || "(inline styles only)"}</code></pre>
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
