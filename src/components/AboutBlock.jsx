import SectionHeader from './SectionHeader';

export default function AboutBlock() {
  return (
    <section className="section">
      <div className="container split-grid">
        <div className="visual-panel">
          <div className="visual-panel__inner">
            <span className="eyebrow">Official Overview</span>
            <h3>Modern public service, minus the dusty maze.</h3>
          </div>
        </div>
        <div>
          <SectionHeader
            eyebrow="About BOCRA"
            title="Built for trust, clarity, and faster digital access"
            description="The platform design focuses on simple navigation, quick public actions, and a cleaner experience for services, notices, licensing, and consumer support."
          />
          <button className="button button--secondary">Read More</button>
        </div>
      </div>
    </section>
  );
}
