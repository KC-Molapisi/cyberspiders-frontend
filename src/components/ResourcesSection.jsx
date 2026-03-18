import SectionHeader from './SectionHeader';

export default function ResourcesSection({ resources }) {
  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="Resources"
          title="Everything official in one library"
          description="Acts, forms, guides, and publications should be obvious to find. Radical concept, I know."
        />
        <div className="cards-grid cards-grid--4">
          {resources.map((resource) => (
            <article key={resource} className="card resource-card">
              <h3>{resource}</h3>
              <p>Open the latest documents and guidance.</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
