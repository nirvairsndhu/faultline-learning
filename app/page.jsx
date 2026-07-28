import Link from "next/link";
import { PACKS } from "@/content/packs";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="shell home">
        <header className="mast">
          <span className="mark">FAULTLINE</span>
          <span className="build-label">hackathon build / v0.1</span>
          <nav className="site-nav" aria-label="Main navigation">
            <Link className="nav-link" href="/evaluation">Evaluation</Link>
          </nav>
        </header>

        <section className="hero">
          <div className="hero-main">
            <p className="eyebrow">Physics reasoning / built for the demo</p>
            <h1>Correct answer.<br />Broken method?</h1>
            <p className="hero-description">Faultline checks the reasoning behind a physics answer, finds the relationship that went wrong, and lets you test it in a small simulation.</p>
            <a className="button" href="#scenarios">Try a scenario ↓</a>
          </div>
          <aside className="hero-aside">
            <p className="aside-label">What happens</p>
            <ol>
              <li>You pick an answer</li>
              <li>You explain why</li>
              <li>We map the causal claim</li>
              <li>You test and repair it</li>
            </ol>
            <p className="aside-note">AI interprets the words. Local code checks the physics.</p>
          </aside>
        </section>

        <section className="scenarios-section" id="scenarios">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Pick one to start</p>
              <h2>Three things we can test right now</h2>
            </div>
            <p>~4 min each, no account needed</p>
          </div>
          <div className="scenario-grid" aria-label="Physics scenarios">
            {PACKS.map((pack, index) => (
              <Link className={`scenario-card card-${index + 1}`} href={`/learn/${pack.id}`} key={pack.id}>
                <div className="card-top">
                  <span className="scenario-number">0{index + 1}</span>
                  <span className="card-status">ready</span>
                </div>
                <h3>{pack.title}</h3>
                <p>{pack.problem}</p>
                <div className="common-claim">
                  <small>Common claim:</small>
                  <span>{pack.misconception}</span>
                </div>
                <span className="card-arrow" aria-hidden="true">Open →</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="how-it-works">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Under the hood</p>
              <h2>The demo path</h2>
            </div>
          </div>
          <div className="process-line" aria-label="Learning process">
            <span>answer</span><b>→</b><span>explain</span><b>→</b><span>map</span><b>→</b><span>predict</span><b>→</b><span>simulate</span><b>→</b><span>repair</span>
          </div>
          <p className="deadline-note">Current scope: 3 authored physics packs. More later.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
