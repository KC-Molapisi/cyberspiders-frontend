export default function ContactPanel() {
  return (
    <section className="section">
      <div className="container cards-grid cards-grid--2">
        <div className="card">
          <h3>Contact and complaints</h3>
          <p>
            Add your real form handling here. The layout is ready for backend integration through the
            contact API module.
          </p>
          <form className="contact-form">
            <input type="text" placeholder="Full name" />
            <input type="email" placeholder="Email address" />
            <select defaultValue="">
              <option value="" disabled>
                Select enquiry type
              </option>
              <option>General enquiry</option>
              <option>Complaint</option>
              <option>Licence support</option>
            </select>
            <textarea rows="5" placeholder="Write your message" />
            <button type="button" className="btn btn--primary">
              Submit enquiry
            </button>
          </form>
        </div>

        <div className="card card--soft">
          <h3>Public support information</h3>
          <p>Email: info@example.org</p>
          <p>Phone: +267 000 0000</p>
          <p>Hours: Monday to Friday, 08:00 to 17:00</p>
          <p>
            You can also place complaint tracking guidance, office map details or branch information in
            this panel.
          </p>
        </div>
      </div>
    </section>
  );
}
