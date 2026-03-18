import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChatbot from '../components/FloatingChatbot';

export default function MainLayout() {
  return (
    <div className="site-shell">
      <TopBar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  );
}
