import ContactPanel from '../components/ContactPanel';
import SectionHeader from '../components/SectionHeader';

export default function ContactPage() {
  return (
    <>
      <section className="page-hero page-hero--contact">
        <div className="container">
          <SectionHeader
            eyebrow="Contact"
            title="Complaints, enquiries and public support"
            text="A clear contact experience matters. Users should not need detective training to report a problem."
          />
        </div>
      </section>
      <ContactPanel />
    </>
  );
}
