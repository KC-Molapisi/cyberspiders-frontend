import AboutSlider from '../components/AboutSlider';
import SectionHeader from '../components/SectionHeader';

export default function AboutPage() {
  return (
    <>
      <section className="page-hero page-hero--about">
        <div className="container">
          <SectionHeader
            eyebrow="About"
            title="A grouped section for profile, mandate, leadership and careers"
            text="This keeps the experience simpler for users while still giving BOCRA enough room to look official and well organised."
          />
        </div>
      </section>
      <AboutSlider />
    </>
  );
}
