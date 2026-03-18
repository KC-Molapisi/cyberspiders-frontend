import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import LicensingPage from './pages/LicensingPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="licensing" element={<LicensingPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
}
