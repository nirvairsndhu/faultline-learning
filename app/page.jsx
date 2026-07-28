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
          <p className="project-label">Hackathon physics project</p>
          <h1>Check the reasoning behind a physics answer.</h1>
          <p className="hero-description">Faultline finds the relationship that went wrong in an explanation, then lets you test it with a small simulation.</p>
          <a className="button" href="#scenarios">Choose a scenario</a>
        </section>

        <section className="scenarios-section" id="scenarios">
          <div className="section-heading">
            <h2>Scenarios</h2>
            <p>About 4 minutes each. No account needed.</p>
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

        <section className="how-it-works">
          <h2>How it works</h2>
          <ol>
            <li>Pick an answer and explain your method.</li>
            <li>Faultline maps the causal relationships in your explanation.</li>
            <li>Run a simulation and rewrite the part that was wrong.</li>
          </ol>
          <p className="scope-note">Current version has 3 physics scenarios. We ran out of hackathon time before adding more.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
