import Link from "next/link";
import { PACKS } from "@/content/packs";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main className="shell home">
        <header className="mast">
          <span className="mark">FAULTLINE</span>
          <p className="edition">PHYSICS FIELD NOTES / ISSUE 01</p>
          <Link className="nav-link" href="/evaluation">Evaluation ↗</Link>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">A reasoning instrument for imperfect explanations</p>
            <h1>BREAK<br /><span>THE MODEL.</span></h1>
          </div>
          <div className="hero-note">
            <span className="note-pin">READ THIS FIRST</span>
            <p>A correct answer can hide a broken method. Pick a case, explain what causes what, then put your idea under pressure.</p>
            <strong>NO CHATBOT. NO VIBES. JUST EVIDENCE.</strong>
          </div>
        </section>

        <section className="case-header">
          <h2>Choose a fault line</h2>
          <p>03 experiments / about 4 minutes each</p>
        </section>

        <section className="scenario-grid" aria-label="Physics scenarios">
          {PACKS.map((pack, index) => (
            <Link className={`scenario-card scenario-card-${index + 1}`} href={`/learn/${pack.id}`} key={pack.id}>
              <div className="card-topline">
                <span>CASE 0{index + 1}</span>
                <span>OPEN ↗</span>
              </div>
              <div className="card-diagram" aria-hidden="true">
                <span className="diagram-mark">{index === 0 ? "↓ ↓" : index === 1 ? "← →" : "⌒"}</span>
              </div>
              <h3>{pack.title}</h3>
              <p>{pack.problem}</p>
              <div className="card-misconception">
                <span>COMMON CLAIM</span>
                <strong>“{pack.misconception}”</strong>
              </div>
            </Link>
          ))}
        </section>

        <section className="method-strip">
          <span>ANSWER</span><i>→</i><span>EXPLAIN</span><i>→</i><span>TEST</span><i>→</i><span>REPAIR</span>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
