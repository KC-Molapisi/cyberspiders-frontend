import { Link } from 'react-router-dom';
import SectionHeader from './SectionHeader';

export default function AboutPreview() {
  return (
    <section className="section section--muted">
      <div className="container split-grid split-grid--balanced">
        <div className="info-card info-card--warm">
          <SectionHeader
            eyebrow="About BOCRA"
            title="Keep the institution visible without burying users in clutter"
            text="The site can feel recognisably BOCRA while still behaving like a modern public platform. That means straightforward language, fewer dead ends and stronger section grouping."
          />
          <Link to="/about" className="btn btn--secondary">
            Open About Section
          </Link>
        </div>
        <div className="info-card info-card--plain">
          <ul className="feature-list">
            <li>Unified profile, mandate, leadership and careers section</li>
            <li>Room for official notices and resources</li>
            <li>Backend-ready forms and verification pathways</li>
            <li>Floating chatbot for site navigation support</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
