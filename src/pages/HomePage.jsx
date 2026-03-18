import Hero from '../components/Hero';
import QuickActions from '../components/QuickActions';
import NoticesStrip from '../components/NoticesStrip';
import AboutPreview from '../components/AboutPreview';
import ServicesGrid from '../components/ServicesGrid';
import StatsStrip from '../components/StatsStrip';
import FAQSection from '../components/FAQSection';
import { faq, notices, quickLinks, services, stats } from '../data/mockData';

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickActions items={quickLinks} />
      <NoticesStrip notices={notices} />
      <AboutPreview />
      <ServicesGrid items={services.slice(0, 6)} />
      <StatsStrip stats={stats} />
      <FAQSection items={faq} />
    </>
  );
}
