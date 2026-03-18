import { useState } from 'react';
import { aboutSlides } from '../data/mockData';
import SectionHeader from './SectionHeader';

export default function AboutSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = aboutSlides[activeIndex];

  return (
    <section className="section">
      <div className="container">
        <SectionHeader
          eyebrow="About section"
          title="One section, multiple official stories"
          text="Use this shuffle-style layout to keep profile, mandate, leadership and careers connected in one clean flow."
        />

        <div className="about-slider">
          <div className="about-slider__tabs" role="tablist" aria-label="About tabs">
            {aboutSlides.map((slide, index) => (
              <button
                key={slide.kicker}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                className={`about-slider__tab ${activeIndex === index ? 'about-slider__tab--active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                {slide.kicker}
              </button>
            ))}
          </div>

          <div className="about-slider__panel card">
            <span className="eyebrow">{active.kicker}</span>
            <h3>{active.heading}</h3>
            <p>{active.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
