import React, { useState } from 'react';
import '../css/footer.css';

const Footer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <footer className="footer">
      <nav className={`footer-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/about">À propos</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/mentionLegales">Mentions Légales</a></li>
        </ul>
      </nav>
      <button className="menu-toggle" onClick={toggleMenu}>
        <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
      </button>
    </footer>
  );
};

export default Footer;

