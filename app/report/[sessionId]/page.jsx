import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export default async function Report({ params }) {
  const id = (await params).sessionId;

  return (
    <>
      <main className="report-page">
        <header>
          <h1>FAULTLINE / anonymous report</h1>
          <p><Link href="/">home</Link></p>
        </header>
        <h2>Session evidence report</h2>
        <dl className="report-summary">
          <dt>session id</dt><dd>{id}</dd>
          <dt>storage</dt><dd>local browser</dd>
          <dt>status</dt><dd>available in active learning flow</dd>
        </dl>
        <details>
          <summary>raw record</summary>
          <pre>{`session_id=${id}
storage=local browser
status=available in active learning flow`}</pre>
        </details>
        <p>This report is stored locally in the learner&apos;s browser. Return to the learning flow to view its live evidence record.</p>
        <p><Link className="main-link" href="/">Choose a scenario</Link></p>
      </main>
      <SiteFooter />
    </>
  );
}
