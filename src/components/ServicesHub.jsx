import SectionHeader from './SectionHeader';

export default function ServicesHub({ services }) {
  return (
    <section className="section section--muted">
      <div className="container">
        <SectionHeader
          eyebrow="Services Hub"
          title="Core services arranged for fast action"
          description="A smart, minimal grid that can later be powered by backend service records."
          centered
        />
        <div className="cards-grid cards-grid--3">
          {services.map((service) => (
            <article key={service.title} className="card service-card">
              <div className="service-card__icon" />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="text-button">Learn more</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
