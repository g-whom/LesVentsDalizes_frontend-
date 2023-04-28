import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Welcome from "./Welcome";
import SecurityController from "./SecurityController";
import SpaceController from "./SpaceController";
import { Container, Nav, Navbar} from "react-bootstrap";
import{DropdownButton, Dropdown, NavDropdown} from "react-bootstrap";
import CustomerForm from "./CustomerForm";
import CustomerFormV2 from "./CustomerFormV2";
import CustomerFormV3 from "./CustomerFormV3";
import Connect from "./Connect";
import LoginExpress from "./LoginExpress";
import FetchEventController from "./FetchEventController";
import DataCustomerController from "./DataCustomerController";


import "../css/fontawesome.all.min.css";



//import Login from "./Login";

export default function App() {

  const [owner, setOwner] = useState(null);
  const [events, setEvents] = useState(null);

  function ownerName() {
    return owner != null ? 
    (
      owner.id + " : "+owner.name + " " + owner.surname //+ " " + owner.token 
      
    ) :""; 
}

//-------
const logOut = () => {
  // Gérer l'événement de clic ici
  console.log("Le lien a été cliqué !");
  setOwner(null);  
  window.location.href ="/"
};
//-----
function showAllEvents(){
  return owner != null ? (
    <>
            <Nav.Link eventKey="4" as={Link}  to="/FetchEventController"  >
                <i className="fa-light fa-list-ul"></i>
                Evennements [WIP]
              </Nav.Link>
    </>
  ) : (
    <>
    </>
  ) 
}

/**
 * WIP: Menu pour les prestation (Customer)
 * @returns 
 */
function handlePerformMenu(){
  return owner != null ?(
    <>    
        <NavDropdown  title={<i className="fa-duotone fa-masks-theater me-2"> [wait] Prestations</i> } > 
          <NavDropdown.Item eventKey="option1"> [wait] Mes demandes</NavDropdown.Item>
          <NavDropdown.Item eventKey="option2">[wait] Calendrier</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="option4">[wait]Devis</NavDropdown.Item>
        </NavDropdown>   
    </>
  ) : (<></>)
}


/**
 * WIP: Menu pour la gestion de comtpe (Customer)
 * @returns 
 */
function handleAccount(){
  return owner != null ?(
    <>    
        <NavDropdown  title={<i className="fa fa-address-card me-2"> Mon compte [WIP]</i> } > 
          <NavDropdown.Item eventKey="option1" as={Link}  to="/DataCustomerController" > [wait] Mes informations personelles</NavDropdown.Item>
          <NavDropdown.Item eventKey="option2">[wait] Mon adresse</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="option4">[wait] Mes identifiants</NavDropdown.Item>
        </NavDropdown>   
    </>
  ) : (<></>)
}

/**
 * WIP : affiche les liens de connexion | inscription ou deconnection
 * @returns 
 */
function connectDisconect(){
  return owner != null ? (
            <>
              <Nav.Link eventKey="4" as={Link} to="/"  onClick={logOut}>
                <i className="fa-sharp solid fa-right-from-bracket"></i>
                Deconnection [WIP]
              </Nav.Link>
              
            </>
        ) : (
          <>
            <Nav.Link eventKey="3" as={Link} to="/customerFormV3"   >
                <i className="fa-sharp fa-light fa-memo-pad"></i>
                Inscription [ok]
              </Nav.Link>
              <Nav.Link eventKey="4" as={Link} to="/loginExpress" >
                <i className="fa fa-key me-2"></i>
               
                Connexion [ok]
            </Nav.Link>
          </>
        )
  

}

  return (
    <BrowserRouter>
      <header className="text-center bg-light">
        <h1>Les Vents Dalizés<i className="fa-sharp fa-light fa-wind"></i></h1>
      </header>
        <Navbar collapseOnSelect="true" bg="dark" variant="dark" sticky="top" expand="md">
        <Navbar.Brand className="ms-2">{ownerName()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-2" />
        <Navbar.Collapse  id="responsive-navbar-nav">
            <Nav className="ms-auto me-2 flex-wrap">
            <Nav.Link eventKey="1" as={Link} to="/welcome">
               
                Accueil
            </Nav.Link>
            <Nav.Link eventKey="2"  hidden={owner == null} >   
            </Nav.Link> 
            {handlePerformMenu()}
            {handleAccount()}
            {showAllEvents()}
            {connectDisconect()}
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Container className="bg-light pt-3">
          <Routes>
              <Route exact path="/" element={<Welcome />} />
              <Route exact path="/welcome" element={<Welcome />} />
              <Route exact path="/space" element={<SpaceController owner={owner} setOwner={setOwner}/>} />
              <Route exact path="/login" element={<SecurityController owner={owner} setOwner={setOwner} />} />
              <Route exact path="/customerform" element={<CustomerForm  />} />
              <Route exact path="/customerformV2" element={<CustomerFormV2  />} />
              <Route exact path="/customerformV3" element={<CustomerFormV3  />} />
              <Route exact path="/connect" element={<Connect  />} />
              <Route exact path="/FetchEventController" element={<FetchEventController owner={owner} setOwner={setOwner} />} />
              <Route exact path="/loginExpress" element={<SecurityController owner={owner} setOwner={setOwner} />} />
              <Route exact path="/DataCustomerController" element={<DataCustomerController owner={owner} setOwner={setOwner} />} />
          </Routes>
        </Container>
      </BrowserRouter> 
  );
}