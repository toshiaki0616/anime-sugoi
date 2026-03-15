import { useLenis } from "../hooks/useLenis";
import { useAnimeList } from "../hooks/useAnimeData";
import Hero from "../components/home/Hero";
import AnimeGrid from "../components/home/AnimeGrid";
import PageTransition from "../components/layout/PageTransition";

export default function HomePage() {
  useLenis();
  const { data, loading } = useAnimeList();

  return (
    <PageTransition>
      <main className="home-page">
        <Hero />
        <section className="grid-section">
          <div className="section-header">
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
