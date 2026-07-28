import Link from "next/link";
import { PACKS } from "@/content/packs";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="shell home">
        <header className="mast">
          <span className="mark">FAULTLINE</span>
          <nav className="site-nav" aria-label="Main navigation">
            <Link className="nav-link" href="/evaluation">Evaluation</Link>
          </nav>
        </header>

        <section className="hero">
          <h1>Faultline</h1>
          <p className="hero-description">A small tool for checking the reasoning behind a physics answer.</p>
          <a className="button" href="#scenarios">View scenarios</a>
        </section>

        <section className="scenarios-section" id="scenarios">
          <div className="section-heading">
            <h2>Choose a scenario</h2>
            <p>No account needed.</p>
          </div>
          <div className="scenario-list" aria-label="Physics scenarios">
            {PACKS.map((pack, index) => (
              <Link className="scenario-row" href={`/learn/${pack.id}`} key={pack.id}>
                <span className="scenario-number">{index + 1}.</span>
                <div>
                  <h3>{pack.title}</h3>
                  <p>{pack.problem}</p>
                  <small>Common mistake: {pack.misconception}</small>
                </div>
                <span className="row-link">Start →</span>
              </Link>
            ))}
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
