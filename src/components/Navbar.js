import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">L.V.D (logo)</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">Accueil</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">Accueil</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#">connextion</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">inscription </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">inscription V2</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">inscription V2.1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">inscription V3</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">connect</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
