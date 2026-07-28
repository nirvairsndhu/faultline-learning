import Link from "next/link";
import { PACKS } from "@/content/packs";
import SiteFooter from "@/components/SiteFooter";

const scenarioMeta = {
  "vacuum-drop": "free fall / about 4 min",
  "collision-forces": "Newton's third law / about 4 min",
  "projectile-motion": "two-axis motion / about 4 min",
};

export default function Home() {
  return (
    <>
      <main className="home-page">
        <header className="home-header">
          <h1>FAULTLINE</h1>
          <nav aria-label="Main navigation">
            <Link href="#scenarios">scenarios</Link>
            {" | "}
            <Link href="/evaluation">evaluation</Link>
          </nav>
        </header>

        <div className="home-layout">
          <section className="home-intro">
            <h2>Physics reasoning checker</h2>
            <p>Pick a problem and explain your answer. The program checks the explanation and runs a small physics test.</p>
            <p><a className="main-link" href="#scenarios">View scenarios</a></p>
            <p><small>No account. Three authored problems.</small></p>
          </section>

          <section className="home-scenarios" id="scenarios">
            <h2>Scenarios</h2>
            <ol className="scenario-list" aria-label="Physics scenarios">
              {PACKS.map((pack, index) => (
                <li key={pack.id}>
                  <span className="scenario-index">0{index + 1}</span>
                  <div className="scenario-info">
                    <h3><Link href={`/learn/${pack.id}`}>{pack.title}</Link></h3>
                    <p className="scenario-meta"><small>{scenarioMeta[pack.id]}</small></p>
                    <p>{pack.problem}</p>
                  </div>
                  <Link className="scenario-start" href={`/learn/${pack.id}`}>start →</Link>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
