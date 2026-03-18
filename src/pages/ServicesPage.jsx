import ServicesGrid from '../components/ServicesGrid';
import SectionHeader from '../components/SectionHeader';
import { services } from '../data/mockData';

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <SectionHeader
            eyebrow="Services"
            title="Public service access points"
            text="Each card here can later connect to its own backend route, form workflow or information page."
          />
        </div>
      </section>
      <ServicesGrid items={services} />
    </>
  );
}
