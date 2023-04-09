import React, { useState } from "react";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
// old import Modal from 'react-modal';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from 'axios';
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
    email: "",
    password:"",
    phoneNumber:"",
    accountClosingDate: null,
    address: {
        numberRoad:"",
        road:"",
        zipCode: "",
        city: "",
        country:"", 
    },
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
    fetch("http://localhost:8097/regisration/customer/new", requestOptions)

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
        console.error("There was an error!", error);
        setErrorMessage(""+error);
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

      <Form.Group className="mb-3" controlId="birthdate" hidden>
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

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email (sera votre login)</Form.Label>
        <Form.Control 
          type="email"  
          className="form-control" 
          id="email" 
          name="email" 
          value={customer.email} 
          onChange={handleChange} 
          required 
          placeholder="Entrez votre email" />
      </Form.Group>


        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={customer.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberRoad">Number and road name</label>
          <input
            type="text"
            className="form-control"
            id="numberRoad"
            name="numberRoad"
            value={customer.address.numberRoad}
            onChange={handleChange}
            required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="road">Road name</label>
          <input
            type="text"
            className="form-control"
            id="road"
            name="road"
            value={customer.address.road}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip code</label>
          <input
            type="text"
            className="form-control"
            id="zipCode"
            name="zipCode"
            value={customer.address.zipCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={customer.address.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="form-control"
            id="country"
            name="country"
            value={customer.address.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
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
            <Button variant="success" onClick={handleClose}>
              Continue
            </Button>
          ) : (
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CustomerFormV3;
