import SectionHeader from '../components/SectionHeader';

export default function ConsumersPage() {
  return (
    <section className="section page-shell">
      <div className="container">
        <SectionHeader
          eyebrow="Consumers"
          title="Complaint support and public guidance"
          description="A clean entry point for complaint filing, help content, and tracking tools."
        />
        <div className="cards-grid cards-grid--2">
          <article className="card">
            <h3>Submit Complaint</h3>
            <p>Connect this module to POST complaint submissions from the backend.</p>
            <form className="form-grid">
              <input className="input" placeholder="Full name" />
              <input className="input" placeholder="Email address" />
              <input className="input input--full" placeholder="Issue summary" />
              <textarea className="input input--full textarea" placeholder="Describe your issue" />
              <button type="button" className="button button--primary">Submit Complaint</button>
            </form>
          </article>
          <article className="card">
            <h3>Track Complaint</h3>
            <p>Use a complaint reference number to retrieve status later.</p>
            <input className="input" placeholder="Enter reference number" />
            <button className="button button--secondary">Track Status</button>
          </article>
        </div>
      </div>
    </section>
  );
}
