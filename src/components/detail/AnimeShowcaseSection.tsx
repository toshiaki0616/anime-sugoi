import { useState, useEffect, useRef, useCallback } from "react";

// ─── Character Data ───
const characters = [
  { id: 0, name: "かぐや", nameEn: "KAGUYA", cv: "夏野ぞら", color: "#ff6bcb", profile: "謎めいた少女。楽しいことを求めて仮想空間でライバー活動を始めた。天真爛漫で破天荒。", emoji: "🌙" },
  { id: 1, name: "逆咲彩花", nameEn: "IROHA SAKAYORI", cv: "永沢アン子", color: "#6baaff", profile: "17歳の女子高生。学校では文武両道の優等生だが、自分で生活費と学費を稼ぐ苦労人。音楽の才能を持つ。", emoji: "🎵" },
  { id: 2, name: "常夜いと絵", nameEn: "YACHIYO", cv: "機械沙智", color: "#c96bff", profile: "仮想空間の管理人。凄腕ライバーを斬って踊って捌身できる8000歳のミステリアスなAI。", emoji: "✨" },
  { id: 3, name: "帝アキラ", nameEn: "AKIRA MIKADO", cv: "奈野自由", color: "#ff9e6b", profile: "人気ゲーマーグループのリーダー。本格派のカリスマプレイヤーで派手な演出が好き。", emoji: "⚡" },
  { id: 4, name: "駒澤鈴", nameEn: "RAI KOMAZAWA", cv: "柏田重馬", color: "#6bffc9", profile: "ゲーマーグループのメンバー。乙女の友で冷静で口数が少ない。でもノリは良く歌が得意。", emoji: "🤖" },
  { id: 5, name: "綾紬瑶花", nameEn: "ROKA AYATSUMUGI", cv: "逆山花輪", color: "#ffdb6b", profile: "彩花の友達。美容系インフルエンサー。陰で平凡で彩花が気にしていた点細な美人。", emoji: "🌸" },
];

// ─── News Data ───
const newsItems = [
  { date: "2026.03.15", text: "Blu-ray第3巻 特典情報を公開しました" },
  { date: "2026.03.10", text: "第12話放送情報を更新しました" },
  { date: "2026.03.05", text: "スペシャルイベント開催決定！" },
  { date: "2026.02.28", text: "サウンドトラックCD発売情報を公開" },
  { date: "2026.02.20", text: "コラボカフェ第2弾 詳細を公開しました" },
];

// ─── Glitch Text Component ───
const GlitchText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [glitch, setGlitch] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={className} style={{
      position: "relative",
      display: "inline-block",
      textShadow: glitch
        ? "2px 0 #ff00de, -2px 0 #00f0ff, 0 2px #ffe600"
        : "none",
      transform: glitch ? `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)` : "none",
      transition: "text-shadow 0.05s, transform 0.05s",
    }}>
      {children}
    </span>
  );
};

// ─── Main Component ───
export default function AnimeShowcaseSection() {
  const [activeChar, setActiveChar] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for scroll-triggered animations
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

  return (
    <div style={{
      fontFamily: "'Zen Kaku Gothic New', sans-serif",
      color: "#fff",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @keyframes as-particleFloat {
          0% { opacity: 0; transform: translateY(0) scale(0.5); }
          20% { opacity: 0.8; }
          50% { transform: translateY(-80px) scale(1); }
          80% { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(-160px) scale(0.3); }
        }

        @keyframes as-heroSlideIn {
          0% { opacity: 0; transform: translateY(60px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes as-heroTagline {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes as-fadeInUp {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes as-fadeInLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes as-fadeInRight {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes as-borderGlow {
          0%, 100% { border-color: rgba(255,107,203,0.3); }
          50% { border-color: rgba(107,170,255,0.6); }
        }

        @keyframes as-scrollArrow {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(10px); opacity: 1; }
        }

        @keyframes as-charPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,203,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,107,203,0.6), 0 0 80px rgba(107,170,255,0.3); }
        }

        @keyframes as-backgroundPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .as-char-thumb {
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          border: 2px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .as-char-thumb:hover {
          transform: translateY(-8px) scale(1.05);
          border-color: rgba(255,107,203,0.6);
          box-shadow: 0 12px 40px rgba(255,107,203,0.3);
        }
        .as-char-thumb.as-active {
          border-color: #ff6bcb;
          box-shadow: 0 8px 32px rgba(255,107,203,0.4);
          transform: translateY(-4px);
        }

        .as-section-enter {
          opacity: 0;
          transform: translateY(50px);
        }
        .as-section-visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .as-news-item {
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 20px;
          align-items: baseline;
          cursor: pointer;
          transition: all 0.3s;
        }
        .as-news-item:hover {
          padding-left: 12px;
          background: rgba(255,107,203,0.05);
        }

        .as-staff-row {
          display: flex;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          gap: 16px;
        }
      `}</style>

      {/* ── ANIME SHOWCASE Badge Header ── */}
      <div style={{
        textAlign: "center",
        padding: "48px 32px 32px",
        position: "relative",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 24px",
          border: "1px solid rgba(255,107,203,0.3)",
          borderRadius: 100,
          background: "rgba(255,107,203,0.06)",
          marginBottom: 16,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#ff6bcb",
            boxShadow: "0 0 8px #ff6bcb",
          }} />
          <span style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: 11, letterSpacing: 4,
            color: "rgba(255,255,255,0.7)",
          }}>ANIME SHOWCASE</span>
          <div style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#6baaff",
            boxShadow: "0 0 8px #6baaff",
          }} />
        </div>

        <h2 style={{
          fontFamily: "'Zen Kaku Gothic New', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(28px, 5vw, 56px)",
          background: "linear-gradient(135deg, #ff6bcb 0%, #ff9ec4 25%, #c96bff 50%, #6baaff 75%, #6bffc9 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "as-backgroundPan 6s linear infinite",
          lineHeight: 1.2,
          marginBottom: 8,
        }}>
          <GlitchText>超かぐや姫！</GlitchText>
        </h2>

        <p style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: 11, letterSpacing: 6,
          color: "rgba(255,255,255,0.35)",
        }}>
          COSMIC PRINCESS KAGUYA
        </p>

        <div style={{
          width: 60, height: 1,
          margin: "24px auto 0",
          background: "linear-gradient(90deg, transparent, #ff6bcb, transparent)",
        }} />
      </div>

      {/* ── NEWS Section ── */}
      <section
        id="as-news"
        ref={registerSection("as-news")}
        className={isVisible("as-news") ? "as-section-visible" : "as-section-enter"}
        style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto", position: "relative" }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
          <h2 style={{
            fontFamily: "Orbitron, sans-serif", fontWeight: 900,
            fontSize: 32, letterSpacing: 4,
            background: "linear-gradient(90deg, #ff6bcb, #6baaff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>NEWS</h2>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>最新情報</span>
        </div>

        <div>
          {newsItems.map((item, i) => (
            <div
              key={i}
              className="as-news-item"
              style={{
                opacity: isVisible("as-news") ? 1 : 0,
                transform: isVisible("as-news") ? "translateX(0)" : "translateX(-30px)",
                transition: `all 0.5s ${i * 0.1}s`,
              } as React.CSSProperties}
            >
              <span style={{
                fontFamily: "Orbitron, sans-serif", fontSize: 12,
                color: "#ff6bcb", letterSpacing: 1, whiteSpace: "nowrap",
              }}>{item.date}</span>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "right", marginTop: 24 }}>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif", fontSize: 11,
              letterSpacing: 3, color: "rgba(255,255,255,0.4)",
              cursor: "pointer", transition: "color 0.3s",
            }}
            onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = "#ff6bcb"; }}
            onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = "rgba(255,255,255,0.4)"; }}
          >
            MORE →
          </span>
        </div>
      </section>

      {/* ── STORY Section ── */}
      <section
        id="as-story"
        ref={registerSection("as-story")}
        className={isVisible("as-story") ? "as-section-visible" : "as-section-enter"}
        style={{
          padding: "80px 32px", position: "relative",
          background: "linear-gradient(180deg, transparent, rgba(255,107,203,0.03), transparent)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "Orbitron, sans-serif", fontWeight: 900,
              fontSize: 32, letterSpacing: 4,
              background: "linear-gradient(90deg, #c96bff, #6baaff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>STORY</h2>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>あらすじ</span>
          </div>

          <div style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(255,107,203,0.08), rgba(107,170,255,0.08))",
            border: "1px solid rgba(255,255,255,0.06)",
            padding: 40,
            animation: isVisible("as-story") ? "as-borderGlow 4s infinite" : "none",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 200, height: 200, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(201,107,255,0.15), transparent)",
              transform: `translateY(${(scrollY - 800) * 0.1}px)`,
            }} />

            <h3 style={{
              fontSize: 20, fontWeight: 700, lineHeight: 1.8,
              marginBottom: 24,
              background: "linear-gradient(90deg, #fff, rgba(255,255,255,0.8))",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              夢と希望の集まる仮想空間＜ツクヨミ＞。<br />
              少女たちの出会い、そして別れのためのステージが、幕を開ける――
            </h3>

            <p style={{
              fontSize: 14, lineHeight: 2.2,
              color: "rgba(255,255,255,0.6)",
            }}>
              今より少しだけ先の未来。都内の進学校に通う17歳の女子高生・逆咲彩花は、バイトと学業の両立に励む超絶多忙な日々を送っていた。日々の癒やしは、仮想空間＜ツクヨミ＞のトップライバー・常夜いと絵の配信を見ること。
            </p>

            <p style={{
              fontSize: 14, lineHeight: 2.2,
              color: "rgba(255,255,255,0.6)",
              marginTop: 16,
            }}>
              そんなある日の帰り道、彩花は七色に光り輝くゲーミング電柱を見つける。中から現れた謎の少女・かぐや。二人はツクヨミでライバー活動を始め、少しずつ打ち解けていく――
            </p>

            <div style={{
              marginTop: 32, padding: "16px 24px",
              background: "rgba(255,107,203,0.06)",
              borderLeft: "3px solid #ff6bcb",
              borderRadius: "0 8px 8px 0",
              fontSize: 15, fontWeight: 700,
              color: "rgba(255,255,255,0.9)",
              fontStyle: "italic",
            }}>
              これは、まだ誰も見たことがない「かぐや姫」の物語。
            </div>
          </div>
        </div>
      </section>

      {/* ── CHARACTER Section ── */}
      <section
        id="as-character"
        ref={registerSection("as-character")}
        className={isVisible("as-character") ? "as-section-visible" : "as-section-enter"}
        style={{ padding: "80px 32px", position: "relative" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "Orbitron, sans-serif", fontWeight: 900,
              fontSize: 32, letterSpacing: 4,
              background: "linear-gradient(90deg, #ffe600, #ff6bcb)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>CHARACTER</h2>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>登場人物</span>
          </div>

          {/* Character thumbnails */}
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            justifyContent: "center", marginBottom: 48,
          }}>
            {characters.map((char, i) => (
              <div
                key={char.id}
                className={`as-char-thumb${activeChar === i ? " as-active" : ""}`}
                onClick={() => setActiveChar(i)}
                style={{
                  width: 80, height: 100,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: 6,
                  background: activeChar === i
                    ? `linear-gradient(135deg, ${char.color}22, ${char.color}11)`
                    : "rgba(255,255,255,0.02)",
                  opacity: isVisible("as-character") ? 1 : 0,
                  transform: isVisible("as-character") ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.4s ${i * 0.08}s`,
                } as React.CSSProperties}
              >
                <span style={{ fontSize: 28 }}>{char.emoji}</span>
                <span style={{
                  fontSize: 10, color: activeChar === i ? char.color : "rgba(255,255,255,0.5)",
                  textAlign: "center", lineHeight: 1.3,
                  transition: "color 0.3s",
                }}>{char.name}</span>
              </div>
            ))}
          </div>

          {/* Active character detail */}
          <div
            key={activeChar}
            style={{
              display: "flex", gap: 40, alignItems: "flex-start",
              flexWrap: "wrap", justifyContent: "center",
              animation: "as-fadeInUp 0.5s ease-out",
            }}
          >
            {/* Character visual placeholder */}
            <div style={{
              width: 280, height: 380,
              borderRadius: 20,
              background: `linear-gradient(135deg, ${characters[activeChar].color}15, ${characters[activeChar].color}08)`,
              border: `1px solid ${characters[activeChar].color}33`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 100,
              position: "relative",
              overflow: "hidden",
              animation: "as-charPulse 3s ease-in-out infinite",
            }}>
              {/* Decorative scan lines */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} style={{
                  position: "absolute", left: 0, right: 0,
                  height: 1, top: `${i * 5}%`,
                  background: "rgba(255,255,255,0.02)",
                }} />
              ))}
              <span style={{ position: "relative", zIndex: 1 }}>
                {characters[activeChar].emoji}
              </span>
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: `linear-gradient(to top, ${characters[activeChar].color}22, transparent)`,
              }} />
            </div>

            {/* Character info */}
            <div style={{ flex: 1, minWidth: 260, maxWidth: 400 }}>
              <div style={{
                fontFamily: "Orbitron, sans-serif", fontSize: 11,
                letterSpacing: 4, color: characters[activeChar].color,
                marginBottom: 8,
              }}>
                {characters[activeChar].nameEn}
              </div>
              <h3 style={{
                fontSize: 36, fontWeight: 900, marginBottom: 8,
                background: `linear-gradient(90deg, #fff, ${characters[activeChar].color})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {characters[activeChar].name}
              </h3>
              <div style={{
                fontSize: 13, color: "rgba(255,255,255,0.4)",
                marginBottom: 24,
              }}>
                <span style={{ color: characters[activeChar].color, fontWeight: 700 }}>CV</span>{" "}
                {characters[activeChar].cv}
              </div>

              <div style={{
                width: 40, height: 2,
                background: `linear-gradient(90deg, ${characters[activeChar].color}, transparent)`,
                marginBottom: 24,
              }} />

              <p style={{
                fontSize: 14, lineHeight: 2,
                color: "rgba(255,255,255,0.7)",
              }}>
                {characters[activeChar].profile}
              </p>
            </div>
          </div>

          {/* Character navigation arrows */}
          <div style={{
            display: "flex", justifyContent: "center",
            gap: 16, marginTop: 40,
          }}>
            <button
              onClick={() => setActiveChar((prev) => (prev - 1 + characters.length) % characters.length)}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.03)",
                color: "#fff", fontSize: 18, cursor: "pointer",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff6bcb";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,203,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >←</button>
            <button
              onClick={() => setActiveChar((prev) => (prev + 1) % characters.length)}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.03)",
                color: "#fff", fontSize: 18, cursor: "pointer",
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff6bcb";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,107,203,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
              }}
            >→</button>
          </div>
        </div>
      </section>

      {/* ── MUSIC Section ── */}
      <section
        id="as-music"
        ref={registerSection("as-music")}
        className={isVisible("as-music") ? "as-section-visible" : "as-section-enter"}
        style={{
          padding: "80px 32px", position: "relative",
          background: "linear-gradient(180deg, transparent, rgba(107,170,255,0.04), transparent)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "Orbitron, sans-serif", fontWeight: 900,
              fontSize: 32, letterSpacing: 4,
              background: "linear-gradient(90deg, #6baaff, #c96bff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>MUSIC</h2>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>音楽</span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {[
              { title: "Ex-Otogibanashi", artist: "常夜いと絵(cv.機械沙智)", type: "メインテーマ", color: "#c96bff" },
              { title: "ray 超かぐや姫！Ver.", artist: "かぐや × いと絵", type: "エンディングテーマ", color: "#ff6bcb" },
              { title: "劇中歌", artist: "ryo(supercell)", type: "楽曲提供", color: "#6baaff" },
              { title: "劇中歌", artist: "HoneyWorks", type: "楽曲提供", color: "#ffe600" },
            ].map((track, i) => (
              <div
                key={i}
                style={{
                  padding: 24,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "all 0.4s",
                  opacity: isVisible("as-music") ? 1 : 0,
                  transform: isVisible("as-music") ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 0.1}s`,
                } as React.CSSProperties}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${track.color}66`;
                  el.style.background = `${track.color}08`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "rgba(255,255,255,0.06)";
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  fontFamily: "Orbitron, sans-serif", fontSize: 9,
                  letterSpacing: 2, color: track.color, marginBottom: 12,
                }}>{track.type}</div>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#fff" }}>
                  {track.title}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
                  {track.artist}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STAFF Section ── */}
      <section
        id="as-staff"
        ref={registerSection("as-staff")}
        className={isVisible("as-staff") ? "as-section-visible" : "as-section-enter"}
        style={{ padding: "80px 32px", position: "relative" }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 40 }}>
            <h2 style={{
              fontFamily: "Orbitron, sans-serif", fontWeight: 900,
              fontSize: 32, letterSpacing: 4,
              background: "linear-gradient(90deg, #6bffc9, #6baaff)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>STAFF / CAST</h2>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>スタッフ・キャスト</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Staff */}
            <div style={{ minWidth: 260 }}>
              <h3 style={{
                fontFamily: "Orbitron, sans-serif", fontSize: 14,
                letterSpacing: 4, color: "#6bffc9", marginBottom: 20,
              }}>STAFF</h3>
              {[
                ["監督", "山下清悟"],
                ["脚本", "夏生さえり / 山下清悟"],
                ["キャラデザ", "へちま / 永江彰浩"],
                ["美術監督", "宍戸太一"],
                ["音楽", "コーニッシュ"],
                ["制作", "スタジオコロリド / クロマト"],
              ].map(([role, name], i) => (
                <div key={i} className="as-staff-row" style={{
                  opacity: isVisible("as-staff") ? 1 : 0,
                  transform: isVisible("as-staff") ? "translateX(0)" : "translateX(-20px)",
                  transition: `all 0.4s ${i * 0.08}s`,
                } as React.CSSProperties}>
                  <span style={{
                    fontSize: 11, color: "rgba(255,255,255,0.35)",
                    minWidth: 80, fontWeight: 700,
                  }}>{role}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{name}</span>
                </div>
              ))}
            </div>

            {/* Cast */}
            <div style={{ minWidth: 260 }}>
              <h3 style={{
                fontFamily: "Orbitron, sans-serif", fontSize: 14,
                letterSpacing: 4, color: "#ff6bcb", marginBottom: 20,
              }}>CAST</h3>
              {characters.map((char, i) => (
                <div key={i} className="as-staff-row" style={{
                  opacity: isVisible("as-staff") ? 1 : 0,
                  transform: isVisible("as-staff") ? "translateX(0)" : "translateX(20px)",
                  transition: `all 0.4s ${i * 0.08}s`,
                } as React.CSSProperties}>
                  <span style={{
                    fontSize: 11, color: char.color,
                    minWidth: 80, fontWeight: 700,
                  }}>{char.name}</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{char.cv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
