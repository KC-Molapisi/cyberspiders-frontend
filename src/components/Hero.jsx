import { Link } from 'react-router-dom';
import logo from '../assets/bocra-logo.png';
import { featureSlides } from '../data/mockData';
import ShuffleSlider from './ShuffleSlider';

export default function Hero() {
  return (
    <section className="hero hero--bocra-theme">
      <div className="container hero__grid">
        <div className="hero__copy">
          <img src={logo} alt="BOCRA" className="hero__corner-logo" />
          <span className="eyebrow">Botswana Communications Regulatory Authority</span>
          <h2>Modern regulation, simpler navigation, better public access.</h2>
          <p>
            This interface keeps the visual DNA of the BOCRA site while making the experience cleaner,
            calmer and easier to use for consumers, operators and the general public.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/services">
              Explore Services
            </Link>
            <Link className="btn btn--secondary" to="/about">
              View About Section
            </Link>
          </div>
        </div>

        <div className="hero__panel">
          <ShuffleSlider items={featureSlides} />
        </div>
      </div>
    </section>
  );
}
