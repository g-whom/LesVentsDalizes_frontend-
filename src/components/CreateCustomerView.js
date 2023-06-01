

import React, { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import moment from 'moment';
import { format, parse } from 'date-fns';
import { Link } from "react-router-dom";

//import axios from 'axios';


export default function CreateCustomerView(props){

    const [readOnly, setreadOnly] = useState(false);

    /**
   * date minimal acceptée dans le datepicker des dates de naissance des nouveaux customer
   */
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 100);
    const date = new Date();
    const formattedDate = date.toISOString().substring(0, 10);

    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);


    function formatDateForDatePicker(dateStr) {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 car les mois vont de 0 à 11
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
      }

      const [modal, setModal] = useState({
        isOpen: false,
        content: '',
        header: '',
        footer: '',
      });
      
   // const dateCustomerDatase = formatDateForDatePicker(props.customerDatabase.birthdate);
  
    maxDate.setFullYear(maxDate.getFullYear() - 100);
    const [customer, setCustomer] = useState({
        name: "", 
        surname: "",
        birthdate: null,
        subscriptionDate: null,
        username: "",
        password:"",
        confirmPassword:"",
        phoneNumber:"",
        accountClosingDate: null,
        address: {
            numberRoad:"",
            road:"",
            zipCode: "",
            city: "",
            country:"" 
        }
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



    //-----------------------------------------------------------------------------------------------------
    //                                          MODAL
    //-----------------------------------------------------------------------------------------------------
    //
    const handleClose = () => {
        setShowModal(false);
        setIsSuccess(false);
        setErrorMessage("");
    
    };


    const handleInputChange = async (event) => {// handleSubmit
        event.preventDefault();
       
       try{     
           
           const { name, value } = event.target;
   
           setCustomer(customer => ({
               ...customer,
               [name]: value
           }));
//YO!
           
           //() => props.updateDataCustomer(customer)

       }catch (error) {
           console.error('Error:', error);
       }
    };


    const handleDateChange = (date, field) => {
        const dateStr = date;

        //Pour affixher le format classique
        const dateFarmatted = moment(dateStr, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").format("YYYY-MM-DD");
        console.log("la date formatte serait donc de : "+dateFarmatted);


        console.log("petit retou --- #6 BIS!!-----------------------------------");
        const dateStr6 = date;
        const dateObj6 = moment(dateStr6, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate6 = dateObj6.format('YYYY-MM-DD');

        console.log("????????? 6-BIS  :  "+formattedDate6); // output: '2023-03-28'

      

        setCustomer({ ...customer, birthdate: date });
        
      };

//-----------------------

//**************************************************** */
const handleSubmit = async (event) => {
    event.preventDefault();
    try {     
        const isUpdateSuccess = await props.creatCustomer(customer);
        if(isUpdateSuccess){   
             setShowModal(true);     
             setModal((preModal) => ({
                 ...preModal,
                 isOpen: true,
                 header: "Creation du client",
                 content: (
                 <div>
                     <h3>C'est un succès !!</h3>
                     <br />
                     <p>Vous venez de creer votre compte</p>
                     <br />
                     <ul>
                     <li>Username (mail) : {customer.username}</li>
                     </ul>
                     <p>Vous pouver vous connecter pour...</p>
                 </div>
                 ),
                 footer: (
                 <div>
                     <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.logOut}>
                     Retour à l'accueil
                     </Button>
                     <Button variant="success" as={Link} to="/Connect" onClick={props.logOut}>
                     Se connecter
                     </Button>
                 </div>

                 )
             }));
           
             
        }else{

             setShowModal(false);
             setModal((preModal) => ({
                 ...preModal,
                 isOpen: true,
                 header: "Creation du client",
                 content: (
                 <div>
                     <h3>Oh no!! Le procéssus semble avoir échoué</h3>
                 </div>
                 ),
                 footer: (
                 <div>
                     <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal" >
                     Retour à l'accueil
                     </Button>
                     <Button variant="success" as={Link} to="/createCustomerController" onClick={handleClose}>
                         Recommencer
                     </Button>
                 </div>
                 )
             }));
        }
        //() => props.updateDataCustomer(customer)

    } catch (error) {
        console.error('Error:', error);
        setShowModal(true);
        setModal((preModal) => ({
          ...preModal,
          isOpen: true,
          header: "Creation du client",
          content: (
            <div>
              <h3>Erreur lors de la création du client</h3>
            </div>
          ),
          footer: (
            <div>
              <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal">
                Retour à l'accueil
              </Button>
              <Button variant="success" as={Link} to="/loginExpress" onClick={handleClose}>
                Recommencer
              </Button>
            </div>
          )
        }));
      }
};    

//-----------------------

    return(
        <>
         <div className="container mt-4">
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nom</Form.Label>
                <Form.Control 
                type="text"  
                className="form-control" 
                // id="name" 
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
                // id="surname" 
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
                // id="birthdate" 
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
                // id="subscriptionDate" 
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
                // id="username" 
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
                type="password"  
                className="form-control" 
                // id="password" 
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


            <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirmation du mot de passe</Form.Label>
                <Form.Control 
                type="password"  
                className="form-control" 
                // id="confirmPassword" 
                name="confirmPassword" 
                value={customer.confirmPassword} 
                onChange={handleChange} 
                required 
                placeholder="Entrez votre mot de passe" />

            </Form.Group> 
            <Form.Group className="mb-3" controlId="phoneNumbername">
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control 
                type="text"  
                className="form-control" 
                //  id="phoneNumber" 
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
                //  id="numberRoad" 
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
                //  id="road" 
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
            //   id="zipCode" 
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
            //   id="city" 
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
            //   id="country" 
                name="country" 
                value={customer.country} 
                onChange={handleChange} 
                required 
                placeholder="Pays" />
            </Form.Group>
            
            
                <button type="submit" className="btn btn-primary"   onClick={toggleShow}>
                S'enregistrer
                </button>
            </Form>

            { modal.isOpen ?     
                        <>
                            <Modal show={staticModal} onHide={handleClose} 
                                //tabIndex="-1"
                                {...setStaticModal} 
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>  {modal.header} </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <>
                                    
                                    {modal.content}

                                    </>
                                </Modal.Body>
                                <Modal.Footer>

                                    <>   
                                        {modal.footer}          
                                    </>
                
                                </Modal.Footer>
                            </Modal>
                        </> 
                        :
                        <>                
                        </>
                        }
    </div>
        </>
    )
}