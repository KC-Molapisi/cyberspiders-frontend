import SectionHeader from './SectionHeader';

export default function Journeys({ journeys }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="User Journeys"
          title="Entry points tailored to who is visiting"
          description="Instead of making everyone dig through everything, the portal directs them by role. Sensible. Civilized. Efficient."
        />
        <div className="cards-grid cards-grid--4">
          {journeys.map((journey) => (
            <article key={journey} className="card journey-card">
              <h3>{journey}</h3>
              <p>Focused actions, guidance, notices, and relevant resources.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
