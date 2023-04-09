import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Welcome from "./Welcome";
import SecurityController from "./SecurityController";
import SpaceController from "./SpaceController";
import { Container, Nav, Navbar } from "react-bootstrap";
import CustomerForm from "./CustomerForm";
import CustomerFormV2 from "./CustomerFormV2";
import CustomerFormV3 from "./CustomerFormV3";

export default function App() {

  const [owner, setOwner] = useState(null);

  function ownerName() {
    return owner != null ? owner.name + " " + owner.surname : "";
}

  return (
    <BrowserRouter>
      <header className="text-center bg-light">
        <h1>Les Vents Dalizés<i className="m-4 fa fa-paw text-warning"></i></h1>
      </header>
        <Navbar collapseOnSelect="true" bg="dark" variant="dark" sticky="top" expand="md">
        <Navbar.Brand className="ms-2">{ownerName()}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-2" />
        <Navbar.Collapse  id="responsive-navbar-nav">
            <Nav className="ms-auto me-2 flex-wrap">
            <Nav.Link eventKey="1" as={Link} to="/welcome">
                <i className="fa fa-paw me-2"></i>
                Accueil
            </Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/space" hidden={owner === null}>
                <i className="fa fa-user me-2"></i>
                Mon espace
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/login">
                <i className="fa fa-key me-2"></i>
                Inscription
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/customerForm">
                <i className="fa fa-key me-2"></i>
                Inscription V2
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/customerFormV2">
                <i className="fa fa-key me-2"></i>
                Inscription V2.1
            </Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/customerFormV3">
                <i className="fa fa-key me-2"></i>
                Inscription V3
            </Nav.Link>

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
         
          </Routes>
        </Container>
      </BrowserRouter> 
  );
}