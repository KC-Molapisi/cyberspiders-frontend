import { Link } from 'react-router-dom';

export default function QuickActions({ items }) {
  return (
    <section className="section section--tight quick-links-section">
      <div className="container cards-grid cards-grid--4">
        {items.map((item) => (
          <Link key={item.title} to={item.link} className={`quick-card tone-${item.tone}`}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
