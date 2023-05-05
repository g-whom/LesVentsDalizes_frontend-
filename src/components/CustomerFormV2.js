import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';


function CustomerFormV2(props) {
/*
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  */

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [subscriptionDate, setSubscriptionDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [accountClosingDate, setAccountClosingDate] = useState('');


  const [numberRoad, setNumberRoad] = useState('');
  const [road, setRoad] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity ] = useState('');
  const [country, setCountry] = useState('');
  

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
      ...address,
      [name]: value,
    },
  });
};
/************************************* */

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      name: name,
      surname: surname,
      birthdate: birthdate,
      subscriptionDate: subscriptionDate,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      accountClosingDate: null,
      address: {
        numberRoad: numberRoad,
        road: road,
        zipCode: zipCode,
        city: city,
        country: country, 

      },
    };
    
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
        <Form.Control type="text" placeholder="Entrer votre nom" value={name} onChange={(e) => name(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Prénom</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Date de naissance</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicName">
        <Form.Label>Date de souscprition</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={subscriptionDate} onChange={(e) => setSubscriptionDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setSmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Mot de passe </Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicStreet">
        <Form.Label>phoneNumber</Form.Label>
        <Form.Control type="text" placeholder="Enter street" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </Form.Group> 

      <Form.Group controlId="formBasicStreet">
        <Form.Label>accountClosingDate</Form.Label>
        <Form.Control type="text" placeholder="Enter street" value={accountClosingDate} onChange={(e) => setAccountClosingDate(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicCity">
        <Form.Label>Numéro de voie</Form.Label>
        <Form.Control type="text" placeholder="Entrer le numéro de voie" value={numberRoad} onChange={(e) => setNumberRoad(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Voie</Form.Label>
        <Form.Control type="text" placeholder="Entrez la voie" value={road} onChange={(e) => setRoad(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicZipCode">
        <Form.Label>Code postal</Form.Label>
        <Form.Control type="text" placeholder="Entrez votre code postal" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Ville</Form.Label>
        <Form.Control type="text" placeholder="Enter la voie" value={city} onChange={(e) => setCity(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicState">
        <Form.Label>Pays</Form.Label>
        <Form.Control type="text" placeholder="Enter la voie" value={country} onChange={(e) => setCountry(e.target.value)} />
      </Form.Group>


      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  );
}
export default CustomerFormV2;
