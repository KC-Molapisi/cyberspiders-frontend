export default function SupportCTA() {
  return (
    <section className="section">
      <div className="container cta-grid">
        <div className="cta-card cta-card--primary">
          <span className="eyebrow">Support</span>
          <h2>Need help with a service?</h2>
          <p>Guide users to assisted support, chatbot tools, or service desks.</p>
          <button className="button button--dark">Get Support</button>
        </div>
        <div className="cta-card">
          <span className="eyebrow">Consumer Help</span>
          <h2>Submit or track a complaint</h2>
          <p>Connect this card to complaint APIs and self-service tracking later.</p>
          <button className="button button--secondary">Open Complaint Desk</button>
        </div>
      </div>
    </section>
  );
}
