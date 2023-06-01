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
            {/*}
          <li><a href="/">Accueil</a></li>
          <li><a href="/linkNavbar">Liens de navigation</a></li>
          <li><a href="/contactInformation">Contact</a></li>
          <li><a href="/socialNetworks">Réseaux sociaux</a></li>
            */}
          <li><a href="/copyrightAndLegalNotices">Copyright et mentions légales</a></li> 
          <li>by J. VENT</li>
          {/*}
          <li><a href="/usefulLinks">Liens utiles</a></li>
          <li><a href="/creditsAndAttributions">Crédits et attributions</a></li>
          <li><a href="/newsletterSubscription">Abonnement à la newsletter</a></li>
        */}
        </ul>
      </nav>
      <button className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="hamburger"></span>
        {isMenuOpen ? 'Masquer le bas de page' : 'Afficher le bas de page'}
      </button>
    </footer>
  );
};

export default Footer;
