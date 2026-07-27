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
          <p className="eyebrow">Physics reasoning practice</p>
          <h1>Understand how your answer works.</h1>
          <p className="hero-description">Faultline helps you test the reasoning behind a physics answer. Choose a scenario, explain your method, run a focused simulation, and revise your model.</p>
          <a className="button" href="#scenarios">Choose a scenario</a>
        </section>

        <section className="scenarios-section" id="scenarios">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Scenarios</p>
              <h2>Choose a topic</h2>
            </div>
            <p>Each activity takes about four minutes.</p>
          </div>
          <div className="scenario-grid" aria-label="Physics scenarios">
            {PACKS.map((pack, index) => (
              <Link className="scenario-card" href={`/learn/${pack.id}`} key={pack.id}>
                <span className="scenario-number">0{index + 1}</span>
                <div>
              <h3>{pack.title}</h3>
              <p>{pack.problem}</p>
                </div>
                <span className="card-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="how-it-works">
          <div className="section-heading">
            <div>
              <p className="eyebrow">How it works</p>
              <h2>A short, focused process</h2>
            </div>
          </div>
          <div className="steps-grid">
            {[
              ["01", "Answer", "Commit to an answer before seeing the intervention."],
              ["02", "Explain", "Describe the causal relationship in your own words."],
              ["03", "Test", "Make a prediction and run a local simulation."],
              ["04", "Repair", "Revise your model and apply it to a new context."],
            ].map(([number, title, description]) => (
              <div className="step-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
