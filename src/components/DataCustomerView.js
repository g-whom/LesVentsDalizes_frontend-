import React, { useState, useEffect } from "react";
import{fetchCustomer, updateDataCustomer} from "./DataCustomerController";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Datepicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { format, parse } from 'date-fns';
import { Link } from "react-router-dom";
//import { fetchCustomers } from './fetch';


export default function DataCustomerView(props){

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

//-------------------------------------------------------------------
function convertDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  
function formatDateForDatePicker(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 car les mois vont de 0 à 11
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  
  const dateCustomerDatase = formatDateForDatePicker(props.customerDatabase.birthdate);

    const[customer, setCustomer] = useState({
        id: "",
        name: "" ,
        surname:  "",
        username:  "",
        birthdate:  "",
        phoneNumber:  ""}, []);




    const handleBothIsEditClickAndTogglereadOnly = async (event) => {
       // event.preventDefault();
        handleEditClick();
        handleTogglereadOnly();
    }




    //-----------------------------------------------------------------------------------------------------
    //                                          MODAL
    //-----------------------------------------------------------------------------------------------------
    //
        const handleClose = () => {
            setShowModal(false);
            setIsSuccess(false);
            setErrorMessage("");
        
        };
      
    //-----------------------------------------------------------------------------------------------------
    //                                          PHASE : URL back with POST
    //-----------------------------------------------------------------------------------------------------
    //
    
    const handleInputChange = async (event) => {// handleSubmit
         event.preventDefault();
        
        try{     
            
            const { name, value } = event.target;
    
            setCustomer(customer => ({
                ...customer,
                [name]: value
            }));


        }catch (error) {
            console.error('Error:', error);
        }
    };


  //-----------------------------------------------------------------------------------------------------
  //                                          PHASE : Modale spéciale retour affichage info
  //-----------------------------------------------------------------------------------------------------
  //
  /**
   * WIP: déclenche la fermetute de la modale et appel le mode consultation des données customer
   */
    function handleCloseAndEditClick(event){
        event.preventDefault();
        handleClose();
        props.fetchCustomer;
    }

//YO! Mis en comme 
                const handleSubmit = async (event) => {
                    event.preventDefault();
                    try {
                    const data = await  props.updateDataCustomer(customer);

                        setIsSuccess(true);
                        setShowModal(true);
                    } catch (error) {
                        setIsSuccess(false);
                        setShowModal(true);
                    console.error('Error:', error);
                    }
                };
                
    //_____________________________________________________________________________________________________
        
    function handleTogglereadOnly() {
            setreadOnly(!readOnly);
    }

    const [isEditing, setIsediting] = useState(false);

    /**
     * WIP: declecneh le formulaire de modification
     * - copies les données de l'utilisateur actuelles avant eventuelle modifications
     */
    const handleEditClick = async (event) => {
        event.preventDefault();
        setIsediting(true);
        handleTogglereadOnly();

        console.log("quelle est la date de naissance ?? : "+props.customerDatabase.birthdate)
        console.log('bus : '+ dateCustomerDatase)

        console.log("petit retou --- #6 !!-----------------------------------");
        const dateStr6 = 'Tue Mar 28 2023 00:00:00 GMT+0200 (heure d’été d’Europe centrale)';
        const dateObj6 = moment(dateStr6, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        const formattedDate6 = dateObj6.format('YYYY-MM-DD');

        console.log("??????????00  :  "+formattedDate6); // output: '2023-03-28'

       setCustomer(customer => ({
            ...customer,
            id: props.customerDatabase.id,
            username: props.customerDatabase.username,
            name: props.customerDatabase.name,
            surname: props.customerDatabase.surname,
            phoneNumber: props.customerDatabase.phoneNumber,
            //date du jour si non selectionnée par l'utilisateur
            birthdate:date
       }));
      };
    
        //const handleSaveClick = async (event) => {
        function handleSaveClick(event)  {    
            event.preventDefault();
            console.log("on va bientot proceder a l'enregistrement : "+customer)
                            //   props.onFetch()
        
            props.updateDataCustomer(customer);
                            // onFormSubmit(customer);

                            //--------------------------------------
                            // props.onFormSubmit(customer);

            console.log("alors ? que vaut customer (nom) dans la VIEW ?"+customer.name);
            setIsediting(false);
           
                            // props.updateDataCustomer;
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

    return(
        <>
            <div className="container mt-4">
      
                   
                <br/>
                <Form   

                   method="POST"
                onSubmit={handleSubmit}

                   // onFetch={handleSaveClick}//{handleEditClick}
  
                >
                <Form.Group className="mb-3" hidden>
                        <Form.Label>id</Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="id" name="id" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.customerDatabase.id}
                               onChange={handleInputChange}    
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="id" 
                                    name="id" 
                                    onChange={handleInputChange}  
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    A degager :   {props.customerDatabase.id} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>
                
                <Form.Group className="mb-3" >
                        <Form.Label>Nom</Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="name" name="name" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.customerDatabase.name}
                               onChange={handleInputChange}    
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="name" 
                                    name="name" 
                                    onChange={handleInputChange}  
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Nom précédent :   {props.customerDatabase.name} 
                                </Form.Text>
                            </>
                        }
                </Form.Group>

                <Form.Group className="mb-3" >
                        <Form.Label>Prénom</Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="surname" name="surname" 
                                disabled readOnly
                                defaultValue= {props.customerDatabase.surname} 
                                onChange={handleInputChange}   
                                onBlur={handleInputChange} 
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  className="form-control" 
                                    id="surname"  name="surname" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.customerDatabase.surname} 
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Prénom précédent :   {props.customerDatabase.surname} 
                                </Form.Text>
                            </>
                        }
                </Form.Group>


                <Form.Group className="mb-3" >
                        <Form.Label>Date de naissance</Form.Label>
                        {!isEditing ? 
                            <>
                                <Datepicker 
                                    type="text"  className="form-control" 
                                    id="birthdate" name="birthdate"
                                   selected={customer.birthdate} 
                                    disabled readOnly
                                    value= {props.customerDatabase.birthdate} 
                                    onChange={handleInputChange} 
                                    //onChange={(date) => handleDateChange(date, "birthdate")}   
                                    required 
                                />
                            </>
                            :
                            <>
                                <Datepicker 
                                    type="text"  className="form-control" 
                                    id="birthdate"  name="birthdate" 
                                    selected={customer.birthdate}  
                                   // value={formattedDate}
                                    //onChange={handleInputChange}
                                    onChange={(date) => handleDateChange(date, "birthdate")}
                                    placeholder= {props.customerDatabase.birthdate} 
                                    dateFormat="yyyy-MM-dd"
                                    minDate={maxDate} 
                                    maxDate={new Date()}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Date de naissance précédente :   {props.customerDatabase.birthdate} 
                                </Form.Text>
                            </>
                        }
                </Form.Group>
         
         
                <Form.Group className="mb-3" hidden>
                        <Form.Label>username</Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="username" name="username" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.customerDatabase.username}
                               onChange={handleInputChange}    
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="username" 
                                    name="username" 
                                    onChange={handleInputChange}  
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    A degager :   {props.customerDatabase.username} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>

                <Form.Group className="mb-3" >
                        <Form.Label>Numéro de téléphone</Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="phoneNumber" name="phoneNumber" 
                                disabled readOnly
                                defaultValue= {props.customerDatabase.phoneNumber} 
                                onChange={handleInputChange}    
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  className="form-control" 
                                    id="phoneNumber"  name="phoneNumber" 
                                    onChange={handleInputChange}  
                                    placeholder= {props.customerDatabase.phoneNumber} 
                                    required
                                />
                                <Form.Text className="text-muted">
                                    Numéro de téléphone précédent :   {props.customerDatabase.phoneNumber} 
                                </Form.Text>
                            </>
                        }
                </Form.Group>
               
                
                {isEditing ? 
                (
                    <Button 
                        type="submit"
                       // onSubmit={handleSaveClick} 
                        
                        className="sx-10 md-8">
                    Enregistrer les modifications
                    </Button>

                ) : (
                    <>
                        <Button 
                            variant="warning" 
                            className="sx-12 md-8 btn-lg" 
                            type="submit" 
                            onClick={handleEditClick}
                        >
                            Modifier mes données
                        </Button> 
                    </>
                )}
                </Form>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isSuccess ? "Mise à jour finalisée  !! " : "Mise à jour intérrompue"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isSuccess ? 
                            <>
                                <h3>"Modification" </h3>
                                <br/>
                                <p>Voici vos informations enregistrées dans le système</p>
                                <br/>
                                <ul>
                                    <li>Nom : {customer.name}</li>
                                    <li>Prénom : {customer.surname}</li>
                                    <li>Date de naissance : {moment(customer.birthdate).format("YYYY-MM-DD")}</li>
                                    <li>Numéro de Téléphone: {customer.phoneNumber}</li>       
                                </ul>



                            </>
                            : 
                            <>
                                {errorMessage}
                            </>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                    {isSuccess ? (
                        <>
                        <Button variant="info" as={Link} to="/"  >
                            Retour à l'accueil
                        </Button>
                        <Button variant="success" as={Link} to="/DataCustomerController" onClick={handleCloseAndEditClick}>
                            Apporter des modifications
                        </Button>         
                        </>
                    ) : (
                        <>
                        <Button variant="info" as={Link} to="/">
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
        </>
    )
}
