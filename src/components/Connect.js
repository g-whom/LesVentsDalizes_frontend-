import React, { useState } from "react";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


export default function Connect(){

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    

    const handleChange = (event) => {

    };

    const handleLogin = () => {
        // Simuler une connexion réussie
        // Vous pouvez remplacer cette logique avec votre propre logique d'authentification
        setTimeout(() => {
          setIsLoggedIn(true);
          setUsername("JohnDoe"); // Remplacez par le nom d'utilisateur de l'utilisateur connecté
        }, 1000);
      };
    
      const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername("");
      };
    
    return(
        <>
        <div className="container mt-4">
          <Form onSubmit={handleChange}>
              {isLoggedIn ? (
              <div className="container mt-4">
                <h1>Bienvenue, {username}!</h1>
                <Button onClick={handleLogout}>Déconnexion</Button>
              </div>
              ) : (
              <div>
                  <Form.Group className="mb-3" controlId="zero">
                    <Form.Label>Identifiant</Form.Label>
                    <Form.Control 
                      type="text"  
                      className="form-control" 
                      //id="zero" 
                      name="zero" 
                      //value="test2"
                      onChange={handleChange} 
                      required 
                      placeholder="Votre adresse email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="un">
                <Form.Label>Mot de passe</Form.Label>
                    <Form.Control 
                      type="password"  
                      className="form-control" 
                      //id="un" 
                      name="un" 
                      //value="test"
                      onChange={handleChange} 
                      required 
                      placeholder="Votre mot de passe" />
                      <Form.Text className="text-muted">
                        Mot de passe oublié ?!  
                      </Form.Text>
                </Form.Group>
                <Button type="submit" className="btn btn-primary" onClick={handleLogout} >Connexion</Button>
              </div>
            )}

         
          </Form>
        </div>
        </>
    )
}

