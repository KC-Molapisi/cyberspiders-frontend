export default function ServiceFinder() {
  return (
    <section className="section">
      <div className="container finder-card">
        <div>
          <span className="eyebrow">AI-Style Service Finder</span>
          <h2>Tell the portal what you need</h2>
          <p>Use this as a frontend-ready search module and later connect it to search, forms, and recommendation APIs.</p>
        </div>
        <div className="finder-card__controls">
          <input className="input" placeholder="Example: I want to verify a license" />
          <button className="button button--primary">Find My Service</button>
        </div>
      </div>
    </section>
  );
}
