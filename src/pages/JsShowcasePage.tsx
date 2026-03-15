import { useState, useEffect, useCallback, type ReactNode } from "react";

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

function PulseBar({ color, label }: { color: string; label: string }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 800);
    return () => clearInterval(id);
  }, []);
  return (
    <MiniCard>
      <div style={{ width: 130, height: 12, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden" }}>
        <div style={{ width: on ? "100%" : "25%", height: "100%", background: color, transition: "width .35s ease" }} />
      </div>
      <small style={{ color: "#8892a4" }}>{label}</small>
    </MiniCard>
  );
}

function DotLoop({ label }: { label: string }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((v) => (v + 1) % 4), 600);
    return () => clearInterval(id);
  }, []);
  return (
    <MiniCard>
      <div style={{ display: "flex", gap: 8 }}>
        {Array.from({ length: 4 }, (_, i) => <span key={i} style={{ width: 14, height: 14, borderRadius: 999, background: i === index ? "#00e5ff" : "rgba(255,255,255,0.1)" }} />)}
      </div>
      <small style={{ color: "#8892a4" }}>{label}</small>
    </MiniCard>
  );
}

function ToggleDemo({ label }: { label: string }) {
  const [on, setOn] = useState(false);
  return (
    <MiniCard>
      <button type="button" onClick={() => setOn((v) => !v)} style={{ padding: "12px 18px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.12)", background: on ? "rgba(0,229,255,0.18)" : "rgba(255,255,255,0.04)", color: "white" }}>
        {label}: {on ? "ON" : "OFF"}
      </button>
    </MiniCard>
  );
}

function CountDemo({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const run = useCallback(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1);
      setCount(Math.floor(target * p));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return (
    <MiniCard>
      <div style={{ fontSize: 32, fontFamily: "monospace", color: "#00e5ff" }}>{count}</div>
      <button type="button" onClick={run} style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)" }}>START</button>
    </MiniCard>
  );
}

function CATEGORIESBuilder(): { name: string; items: ShowcaseItem[] }[] {
  return [
    {
      name: "Core APIs",
      items: [
        { id: 1, name: "Pulse Meter Cyan", usage: "setInterval で進捗を反復", Demo: () => <PulseBar color="#00e5ff" label="refresh bus" /> },
        { id: 2, name: "Pulse Meter Pink", usage: "色違いの周期バー", Demo: () => <PulseBar color="#ff2d78" label="render queue" /> },
        { id: 3, name: "Pulse Meter Green", usage: "状態反転の最小例", Demo: () => <PulseBar color="#22c55e" label="sync state" /> },
        { id: 4, name: "Dot Loop A", usage: "順送りのループ表現", Demo: () => <DotLoop label="watch queue" /> },
        { id: 5, name: "Dot Loop B", usage: "ローディングドット", Demo: () => <DotLoop label="idle task" /> },
        { id: 6, name: "Dot Loop C", usage: "4ステップの点灯移動", Demo: () => <DotLoop label="job state" /> },
        { id: 7, name: "Toggle Feature", usage: "クリックで true / false 制御", Demo: () => <ToggleDemo label="Feature" /> },
        { id: 8, name: "Toggle Preview", usage: "UIスイッチの最小構成", Demo: () => <ToggleDemo label="Preview" /> },
        { id: 9, name: "Toggle Debug", usage: "イベント駆動の状態切替", Demo: () => <ToggleDemo label="Debug" /> },
        { id: 10, name: "Count Up 120", usage: "requestAnimationFrame で数値遷移", Demo: () => <CountDemo target={120} /> },
      ],
    },
    {
      name: "Interaction",
      items: [
        { id: 11, name: "Count Up 999", usage: "target 値違いのカウントアップ", Demo: () => <CountDemo target={999} /> },
        { id: 12, name: "Count Up 2048", usage: "大きい数値への遷移", Demo: () => <CountDemo target={2048} /> },
        { id: 13, name: "Pulse Meter Violet", usage: "setInterval + style 変更", Demo: () => <PulseBar color="#a855f7" label="violet bus" /> },
        { id: 14, name: "Pulse Meter Amber", usage: "オレンジ系の進捗表現", Demo: () => <PulseBar color="#f59e0b" label="upload" /> },
        { id: 15, name: "Toggle Capture", usage: "ローカル state の切替", Demo: () => <ToggleDemo label="Capture" /> },
        { id: 16, name: "Toggle Pin", usage: "フラグUIのサンプル", Demo: () => <ToggleDemo label="Pinned" /> },
        { id: 17, name: "Dot Loop D", usage: "別ラベルのループ演出", Demo: () => <DotLoop label="delta flow" /> },
        { id: 18, name: "Dot Loop E", usage: "待機アニメの別案", Demo: () => <DotLoop label="batch sync" /> },
        { id: 19, name: "Dot Loop F", usage: "状態インデックス可視化", Demo: () => <DotLoop label="phase step" /> },
        { id: 20, name: "Count Up 77", usage: "小さい目標値の遷移", Demo: () => <CountDemo target={77} /> },
      ],
    },
    {
      name: "UI Patterns",
      items: [
        { id: 21, name: "Toggle Archive", usage: "ON/OFFバッジ UI", Demo: () => <ToggleDemo label="Archive" /> },
        { id: 22, name: "Toggle Live", usage: "ライブ表示の切替", Demo: () => <ToggleDemo label="Live" /> },
        { id: 23, name: "Pulse Meter Red", usage: "警告風のバー表現", Demo: () => <PulseBar color="#ef4444" label="signal" /> },
        { id: 24, name: "Pulse Meter Lime", usage: "監視系メーターの雰囲気", Demo: () => <PulseBar color="#84cc16" label="watcher" /> },
        { id: 25, name: "Count Up 512", usage: "中規模値の演出", Demo: () => <CountDemo target={512} /> },
        { id: 26, name: "Count Up 3600", usage: "長い数値レンジ", Demo: () => <CountDemo target={3600} /> },
        { id: 27, name: "Dot Loop G", usage: "ループローダーの別案", Demo: () => <DotLoop label="render pass" /> },
        { id: 28, name: "Toggle Cache", usage: "キャッシュ表示の切替", Demo: () => <ToggleDemo label="Cache" /> },
        { id: 29, name: "Pulse Meter Sky", usage: "青系の進捗表示", Demo: () => <PulseBar color="#38bdf8" label="sky line" /> },
        { id: 30, name: "Count Up 42", usage: "最小構成の数字アニメ", Demo: () => <CountDemo target={42} /> },
      ],
    },
  ];
}

const CATEGORIES = CATEGORIESBuilder();

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

export default function JsShowcasePage() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const sourceCode = selectedItem ? formatDemoSource(selectedItem.Demo.toString()) : "";
  const classNames = selectedItem ? extractDemoClasses(selectedItem.Demo.toString()) : [];

  return (
    <div className="css-showcase-page">
      <header className="showcase-header">
        <h1 className="showcase-title">JavaScript技術ショーケース</h1>
        <p className="showcase-subtitle">30のJavaScript / Web API表現を体験できるデモ集</p>
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
