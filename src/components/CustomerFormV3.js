import React, { useState } from "react";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
//
import { Form, Button } from 'react-bootstrap';

function CustomerFormV3() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    alert("Jéjé")
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
          alert("Network response was not ok");
          alert("Erreur HTTP"+response.status);
          throw new Error("Erreur HTTP " + response.status);
          //throw new Error("Network response was not ok");
        }
        alert("on est sencé avoir un Json monsieur");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert("oups", error);
        alert("Les potentiels erreurs sont : "+ error);
        console.error("There was an error!", error);
      });
     /* */
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={customer.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={customer.surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthdate">Birthdate</label>
          <Datepicker
            className="form-control"
            id="birthdate"
            name="birthdate"
            selected={customer.birthdate}
            onChange={(date) => handleDateChange(date, "birthdate")}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subscriptionDate">subscriptionDate</label>
          <Datepicker
            
            className="form-control"
            id="subscriptionDate"
            name="subscriptionDate"
            selected={customer.subscriptionDate}
            onChange={(date) => handleDateChange(date, "subscriptionDate")}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </div>
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
          <label htmlFor="accountClosingDate">accountClosingDate</label>
          <Datepicker
            
            className="form-control"
            id="accountClosingDate"
            name="accountClosingDate"
            selected={customer.accountClosingDate}
            onChange={(date) => handleDateChange(date, "accountClosingDate")}
            dateFormat="yyyy-MM-dd"
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
      </form>
    </div>
  );
}

export default CustomerFormV3;
