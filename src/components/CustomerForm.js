import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';


function CustomerForm(props) {
/*
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  */
  

  const [customer, setCustomer] = useState({
     name: "", 
     surname: "",
     birthdate: "",
     subscriptionDate:"",
     email: "",
     password:"",
     phoneNumber:"",
     accountClosingDate:""
     });

  const [address, setAddress] = useState({
    numberRoad:"",
    road:"",
    zipCode: "",
    city: "",
    country:"",   
  });
/*
  const handleAddressInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: {
        ...prevCustomerr.address,
        [name]: value
      }
    }));
  };
*/


  const onChange = (event) => {
    const { name, value } = event.target;
    setCustomer({
      ...customer,
      [name]: value,
    });
  };

  const onAddressChange = (event) => {
    const { name, value } = event.target;
    setCustomer({
      ...customer,
      address: {
        ...customer.address,
        [name]: value,
      },
    });
  };
/************************************* */

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: customer.name,
      surname: customer.surname,
      birthdate: customer.birthdate,
      subscriptionDate: customer.subscriptionDate,
      email: customer.email,
      password: customer.password,
      phoneNumber: customer.phoneNumber,
      accountClosingDate: null,
      address: {
        numberRoad: address.numberRoad,
        road: address.road,
        zipCode: address.zipCode,
        city: address.city,
        country: address.country, 

      },
    };

    //urlPrefixe+

    //fetch("http://localhost:8097/regisration/customer/new", {  
    fetch(urlPrefixe+"/regisration/customer/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">                                           
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" placeholder="Entrer votre nom" value={customer.name} onChange={(e) => customer.name(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={customer.surname} onChange={(e) => setCustomer.surname(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={customer.birthdate} onChange={(e) => setCustomer.birthdate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Date de souscprition</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={customer.subscriptionDate} onChange={(e) => setCustomer.subscriptionDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={customer.email} onChange={(e) => setCustomer.email(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Mot de passe </Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={customer.password} onChange={(e) => setCustomer.password(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicStreet">
        <Form.Label>phoneNumber</Form.Label>
        <Form.Control type="text" placeholder="Enter street" value={customer.phoneNumber} onChange={(e) => setCustomer.phoneNumber(e.target.value)} />
      </Form.Group> 

      <Form.Group controlId="formBasicStreet">
        <Form.Label>accountClosingDate</Form.Label>
        <Form.Control type="text" placeholder="Enter street" value={customer.accountClosingDate} onChange={(e) => setCustomer.accountClosingDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicCity">
        <Form.Label>Numéro de voie</Form.Label>
        <Form.Control type="text" placeholder="Entrer le numéro de voie" value={address.numberRoad} onChange={(e) => setAddress.numberRoad(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Voie</Form.Label>
        <Form.Control type="text" placeholder="Entrez la voie" value={address.road} onChange={(e) => setAddress.road(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicZipCode">
        <Form.Label>Code postal</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre code postal" value={address.zipCode} onChange={(e) => setAddress.zipCode(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Ville</Form.Label>
        <Form.Control type="text" placeholder="Enter la voie" value={address.city} onChange={(e) => setAddress.city(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Pays</Form.Label>
        <Form.Control type="text" placeholder="Enter la voie" value={address.country} onChange={(e) => setAddress.country(e.target.value)} />
      </Form.Group>


      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
}
export default CustomerForm;
