import { NavLink } from 'react-router-dom';
import logo from '../assets/bocra-logo.png';
import { site } from '../config/site';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/licensing', label: 'Licence Verification' },
  { to: '/contact', label: 'Complaints & Contact' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar__content">
        <NavLink to="/" className="brand">
          <img src={logo} alt="BOCRA logo" className="brand__logo-image" />
          <div>
            <h1>{site.fullName}</h1>
            <p>Consumer-ready digital services</p>
          </div>
        </NavLink>

        <nav className="navlinks" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `navlink ${isActive ? 'navlink--active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
