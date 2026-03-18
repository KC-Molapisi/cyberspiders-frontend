import SectionHeader from '../components/SectionHeader';

export default function LicensingPage() {
  return (
    <>
      <section className="page-hero page-hero--licensing">
        <div className="container">
          <SectionHeader
            eyebrow="Licensing"
            title="Licence verification and application pathway"
            text="This page is ready for a real verification form, status checker and application workflow once your backend endpoints are connected."
          />
        </div>
      </section>

      <section className="section">
        <div className="container cards-grid cards-grid--2">
          <div className="card">
            <h3>Verify a licence</h3>
            <form className="contact-form">
              <input type="text" placeholder="Licence number" />
              <input type="text" placeholder="Entity name" />
              <button type="button" className="btn btn--primary">
                Verify now
              </button>
            </form>
          </div>

          <div className="card card--soft">
            <h3>Connect to backend later</h3>
            <p>
              Hook this form into <code>licensingApi.verify()</code> in <code>src/api/endpoints.js</code>.
            </p>
            <p>
              You can also add application submission, licence categories, document upload and status
              history here.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
