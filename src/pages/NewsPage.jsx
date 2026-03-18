import SectionHeader from '../components/SectionHeader';
import { news } from '../data/mockData';

export default function NewsPage() {
  return (
    <section className="section page-shell">
      <div className="container">
        <SectionHeader
          eyebrow="News"
          title="News, alerts, and official publications"
          description="This layout is ready for pagination, search, and category filtering later."
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
