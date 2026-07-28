import Link from "next/link";
import { PACKS } from "@/content/packs";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <main>
        <header>
          <h1>FAULTLINE</h1>
          <nav aria-label="Main navigation">
            <Link href="/evaluation">evaluation results</Link>
          </nav>
        </header>

        <section>
          <h2>Physics reasoning checker</h2>
          <p>Pick a problem, answer it, and explain why. The program checks the explanation and runs a small local physics test.</p>
          <p><a className="main-link" href="#scenarios">View scenarios</a></p>
        </section>

        <section id="scenarios">
          <h2>Available scenarios</h2>
          <p>There are only three right now.</p>
          <ol className="scenario-list" aria-label="Physics scenarios">
            {PACKS.map((pack, index) => (
              <li key={pack.id}>
                <h3><Link href={`/learn/${pack.id}`}>{pack.title}</Link></h3>
                <p>{pack.problem}</p>
                <p><small>common wrong idea: {pack.misconception}</small></p>
                <Link href={`/learn/${pack.id}`}>start scenario {index + 1}</Link>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
