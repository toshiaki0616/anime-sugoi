import { useState, useEffect, useMemo, useReducer, createContext, useContext, type ReactNode } from "react";
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
        <p className="showcase-subtitle">30のReact表現を体験できるデモ集</p>
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
