import { useState } from 'react';
import SectionHeader from './SectionHeader';

export default function FAQSection({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section section--muted">
      <div className="container">
        <SectionHeader
          eyebrow="Help"
          title="Frequently asked questions"
          text="These starter answers are placeholders you can later replace with API-driven content."
        />
        <div className="faq-list">
          {items.map((item, index) => (
            <article key={item.q} className="faq-item">
              <button type="button" className="faq-item__question" onClick={() => setOpenIndex(index)}>
                <span>{item.q}</span>
                <span>{openIndex === index ? '–' : '+'}</span>
              </button>
              {openIndex === index ? <p className="faq-item__answer">{item.a}</p> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
