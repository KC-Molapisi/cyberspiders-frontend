export default function StatsStrip({ stats }) {
  return (
    <section className="section section--tight">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
