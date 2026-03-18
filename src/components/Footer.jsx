import { NavLink } from 'react-router-dom';
import { site } from '../config/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <h3>{site.name}</h3>
          <p>{site.tagline}</p>
        </div>

        <div>
          <h4>Navigation</h4>
          <div className="footer__links">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/licensing">Licensing</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </div>

        <div>
          <h4>Social media</h4>
          <div className="footer__links">
            {site.socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
