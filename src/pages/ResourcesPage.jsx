import SectionHeader from '../components/SectionHeader';
import { resources } from '../data/mockData';

export default function ResourcesPage() {
  return (
    <section className="section page-shell">
      <div className="container">
        <SectionHeader
          eyebrow="Resources"
          title="Acts, forms, guidelines, and publications"
          description="A document center ready for backend-powered downloads and categorization."
        />
        <div className="cards-grid cards-grid--4">
          {resources.map((item) => (
            <article key={item} className="card resource-card">
              <h3>{item}</h3>
              <p>Open latest content</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
