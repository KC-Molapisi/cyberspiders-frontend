import { useEffect, useMemo, useState } from 'react';

export default function ShuffleSlider({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [items.length]);

  const active = items[index];
  const preview = useMemo(
    () => items.filter((_, itemIndex) => itemIndex !== index).slice(0, 3),
    [index, items]
  );

  return (
    <div className={`feature-slider tone-${active.tone}`}>
      <div className="feature-slider__active">
        <div className={`feature-slider__dot tone-fill-${active.tone}`} />
        <div>
          <p className="feature-slider__label">Featured Area</p>
          <h3>{active.title}</h3>
          <p>{active.text}</p>
        </div>
      </div>

      <div className="feature-slider__queue">
        {preview.map((item) => (
          <button
            type="button"
            key={item.title}
            className="feature-slider__queue-item"
            onClick={() => setIndex(items.findIndex((candidate) => candidate.title === item.title))}
          >
            <span className={`mini-dot tone-fill-${item.tone}`} />
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
