import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import React from "react";
import Navbar from './Navbar';

//import "../css/bootstrap.min.css";
//import Arch from "./arch";
import "../css/style.css";
import "../css/index.css"
//import "../css/fontawsome.all.min.css"

function App() {
  return (
    <div>
       <header>
        <Navbar />
      </header>
      <div className="container">
        <h1>Page d'accueil</h1>
        <p>Bienvenue sur notre site !</p>
      </div>
    </div>
  );
}

export default App;