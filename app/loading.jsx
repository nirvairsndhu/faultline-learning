export default function Loading() {
  return (
    <div className="route-loading" role="status" aria-live="polite">
      <span className="mark">FAULTLINE</span>
      <div className="loading-track"><span /></div>
      <small>loading experiment…</small>
    </div>
  );
}
