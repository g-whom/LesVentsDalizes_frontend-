import React, { useState } from "react";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
// old import Modal from 'react-modal';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//import axios from 'axios';
import { Link } from "react-router-dom";
//


function CustomerFormV3() {
  // const [selectedDate, setSelectedDate] = useState(null);
  const date = new Date();
  /**
   * stocke la date du
   *  // toISOString() retourne la date au format ISO (aaaa-mm-jjT...) 
  // substring(0, 10) récupère les 10 premiers caractères de cette chaîne, 
  qui correspondent à la date au format aaaa-mm-jj.

   */
  const formattedDate = date.toISOString().substring(0, 10);
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalContent, setModalContent] = useState('');
  

  /**
   * date minimal acceptée dans le datepicker des dates de naissance des nouveaux customer
   */
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 100);
  const [customer, setCustomer] = useState({
    name: "", 
    surname: "",
    birthdate: null,
    subscriptionDate: null,
    username: "",
    password:"",
    phoneNumber:"",
    accountClosingDate: null,
    address: {
        numberRoad:"",
        road:"",
        zipCode: "",
        city: "",
        country:"", 
    }/*
    roles:[
      {id:"3"}]*/
    
});

const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "numberRoad" || name === "road" || name === "zipCode" || name === "city" || name === "country") {
      setCustomer(prevCustomer => ({
        ...prevCustomer,
        address: {
          ...prevCustomer.address,
          [name]: value
        }
      }));
    } else {
      setCustomer(prevCustomer => ({
        ...prevCustomer,
        [name]: value
      }));
    }
  };

  const handleDateChange = (date, field) => {
    setCustomer({ ...customer, [field]: date });
  };

//********************** */
function handleSuccess() {
  setModalContent('Opération réussie !');
  setShowModal(true);
}

function handleError() {
  setModalContent('Erreur : opération échouée');
  setShowModal(true);
}

function closeModal() {
  setShowModal(false);
  setModalContent('');
  // rediriger vers une autre page ici si nécessaire
}


const handleClose = () => {
  setShowModal(false);
  setIsSuccess(false);
  setErrorMessage("");

};

/**
 * WF : afin de rediriger vers la page d'acceuil
 */
const handleRedirectToHomePage = () =>{
  window.location.href="../" 
}
//*********************** */

  const handleSubmit = async (event) => {
    event.preventDefault();

    //alert("Jéjé")
    const requestOptions = {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        //'Access-Control-Allow-Origin': '*'

       },
      body: JSON.stringify(customer),
    };   
    //http://localhost:8097/regisration/customer/new

    //etch("http://localhost:8097/security/register", requestOptions)
    fetch(props.urlPrefixe+"/security/register", requestOptions)

    

    /*
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
    */
      .then((response) => {
        if (!response.ok) {
          setShowModal(true);
          setIsSuccess(false);
            //handleError();
          //alert("Network response was not ok");
          //alert("Erreur HTTP"+response.status);
          throw new Error("Erreur HTTP " + response.status);
          //throw new Error("Network response was not ok");
        }
          //handleSuccess();
        setShowModal(true);
        setIsSuccess(true);
        //alert("on est sencé avoir un Json monsieur");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        //alert("oups", error);
        //alert("oups, voici les potentiels erreurs  : "+ error);
        //console.error("There was an error!", error);
        setErrorMessage("" +error);
      });
     /* */
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="name" 
          name="name" 
          value={customer.name} 
          onChange={handleChange} 
          required 
          placeholder="Enter votre nom" />
        <Form.Text className="text-muted">
          On va éviter les pseudonyme n'est-ce pas
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="surname">
        <Form.Label>Prénom</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="surname" 
          name="surname" 
          value={customer.surname} 
          onChange={handleChange} 
          required 
          placeholder="Enter votre prénom" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="birthdate">
        <Form.Label>Date de naissance</Form.Label>
        <Datepicker 
          type="text"  
          className="form-control" 
          id="birthdate" 
          name="birthdate" 
          selected={customer.birthdate} 
          onChange={(date) => handleDateChange(date, "birthdate")}
          dateFormat="yyyy-MM-dd"
          minDate={maxDate} 
          maxDate={new Date()}
          //maxDate={new Date()}
          //filterDate={date => date.getDay() != 6 && date.getDay() != 0}
          //isClearable
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
         // scrollableMonthYearDropdown
          required 
          placeholder="Selectionnez votre date de naissance" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="subscriptionDate" hidden>
        <Form.Label>Date de souscription</Form.Label>
        <Datepicker 
            type="text"  
            className="form-control" 
            id="subscriptionDate" 
            name="subscriptionDate" 
            value={formattedDate}
            onChange={(date) => handleDateChange(date, "subscriptionDate")}
            //dateFormat="yyyy-MM-dd"
            disabled
            readOnly
            required 
         />
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control 
          type="username"  
          className="form-control" 
          id="username" 
          name="username" 
          value={customer.username} 
          onChange={handleChange} 
          required 
          placeholder="Entrez votre email" />
          <Form.Text className="text-muted">
            Petit rappel, votre email sera votre identifiant de connexion.
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="password" 
          name="password" 
          value={customer.password} 
          onChange={handleChange} 
          required 
          placeholder="Entrez votre mot de passe" />
          <Form.Text className="text-muted">
            Il est fortement recommander de privilegier un bon mot de passe car les pirates ne sont jamais loin. 
            <ul>
              Alors il faudrait au minimum : 
              <li>8 caractères</li>
              <li>1 minuscule</li>
              <li>1 majuscule</li>
              <li>1 caratère spécial</li>
              <li>1 caractère accentué</li>
            </ul>
            
          </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumbername">
        <Form.Label>Numéro de téléphone</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="phoneNumber" 
          name="phoneNumber" 
          value={customer.phoneNumber} 
          onChange={handleChange} 
          required 
          placeholder="Entrez votre numéro de téléphone" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="numberRoad">
        <Form.Label>Numéro de voie</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="numberRoad" 
          name="numberRoad" 
          value={customer.numberRoad} 
          onChange={handleChange} 
          required 
          placeholder="Numéro de voie" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="nuroadmberRoad">
        <Form.Label>Voie et nom de voie</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="road" 
          name="road" 
          value={customer.road} 
          onChange={handleChange} 
          required 
          placeholder="Nom de voie" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="zipCode">
        <Form.Label>Code postal</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="zipCode" 
          name="zipCode" 
          value={customer.zipCode} 
          onChange={handleChange} 
          required 
          placeholder="Code postal" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>Ville</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="city" 
          name="city" 
          value={customer.city} 
          onChange={handleChange} 
          required 
          placeholder="Ville" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="country">
        <Form.Label>Pays</Form.Label>
        <Form.Control 
          type="text"  
          className="form-control" 
          id="country" 
          name="country" 
          value={customer.country} 
          onChange={handleChange} 
          required 
          placeholder="Pays" />
      </Form.Group>
       
      
        <button type="submit" className="btn btn-primary">
          S'enregistrer
        </button>
      </Form>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isSuccess ? "Félicitation !! " : "Inscription intérrompue"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSuccess ? "Votre inscription s'est bien éffectuée." : errorMessage}
        </Modal.Body>
        <Modal.Footer>
          {isSuccess ? (
            <>
              <Button variant="info" as={Link} to="/"  /*onClick={handleRedirectToHomePage}*/>
                Retour à l'accueil
              </Button>
              <Button variant="success" as={Link} to="/loginExpress"onClick={handleClose}>
                Se connecter
              </Button>         
            </>
          ) : (
            <>
              <Button variant="info" onClick={handleRedirectToHomePage}>
                Retour à l'accueil
              </Button>
              <Button variant="danger" onClick={handleClose}>
                Recommencer
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerFormV3;
