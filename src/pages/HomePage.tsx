import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "../hooks/useLenis";
import { useAnimeList } from "../hooks/useAnimeData";
import Hero from "../components/home/Hero";
import FeaturedShowcase from "../components/home/FeaturedShowcase";
import AnimeGrid from "../components/home/AnimeGrid";
import PageTransition from "../components/layout/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  useLenis();
  const { data, loading } = useAnimeList();
  const sectionHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = sectionHeaderRef.current;
    if (!header) return;
    gsap.fromTo(
      header,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          once: true,
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <PageTransition>
      <main className="home-page">
        <Hero animeCount={data.length} />
        <FeaturedShowcase animeList={data} />
        <section className="grid-section">
          <div ref={sectionHeaderRef} className="section-header">
            <h2 className="section-heading">
              <span className="section-num">// 001</span>
              今季の注目作
            </h2>
            <p className="section-lead">
              シーズンの熱量が伝わる作品を、ビジュアルと空気感ごと拾い上げるセレクション。
            </p>
          </div>
          <div className="grid-shell">
            <div className="grid-shell-line grid-shell-line-top" aria-hidden="true" />
            <div className="grid-shell-line grid-shell-line-bottom" aria-hidden="true" />
            <AnimeGrid animeList={data} loading={loading} />
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
