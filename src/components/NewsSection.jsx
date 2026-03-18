import SectionHeader from './SectionHeader';

export default function NewsSection({ news }) {
  return (
    <section className="section section--muted">
      <div className="container">
        <SectionHeader
          eyebrow="News & Alerts"
          title="Latest public updates"
          description="Cards are ready to be populated from the backend news API."
          centered
        />
        <div className="cards-grid cards-grid--3">
          {news.map((item) => (
            <article key={item.title} className="card news-card">
              <div className="news-card__media" />
              <span className="pill">{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.date}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
