import SectionHeader from './SectionHeader';

export default function ServicesGrid({ items }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Main public service areas"
          text="Built for quick scanning on desktop and mobile, because nobody wakes up hoping to get lost in government navigation spaghetti."
        />
        <div className="cards-grid cards-grid--3">
          {items.map((item) => (
            <article key={item.title} className="card service-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
