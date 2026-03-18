export default function NoticesStrip({ notices }) {
  return (
    <section className="section section--tight">
      <div className="container notice-strip">
        {notices.map((notice) => (
          <p key={notice}>{notice}</p>
        ))}
      </div>
    </section>
  );
}
