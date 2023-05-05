import React, { useState, useEffect } from "react";
import {fetchCustomer, updateLoginCustomer} from "./LoginCustomerController";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import LoginCustomerController from "./LoginCustomerController";



export default function LoginCustomerView(props) {

    const [readOnly, setreadOnly] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsediting] = useState(false);
    //const dateCustomerDatase = formatDateForDatePicker(props.customerLogin.birthdate);
    const[customer, setCustomer] = useState({
            username:  "",
            usernameNew:  "",}, []);



    function handleTogglereadOnly() {
        setreadOnly(!readOnly);
    }
    

    //-----------------------------------------------------------------------------------------------------
    //                                          MODAL
    //-----------------------------------------------------------------------------------------------------
    
    const handleClose = () => {
        setShowModal(false);
        setIsSuccess(false);
        setErrorMessage("");
    
    };
     
     //-----------------------------------------------------------------------------------------------------
    //                                          PHASE : URL back with POST
    //-----------------------------------------------------------------------------------------------------
    //
    //POUR LES UPDATE
    const handleInputChange = async (event) => {// handleSubmit
        event.preventDefault();
       
       try{     
           
           const { name, value } = event.target;
   
           setCustomer(customer => ({
               ...customer,
               [name]: value
           }));
           
           //() => props.updateDataCustomer(customer)

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
    // handleEditClick();
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        console.log("Quelles sont les valeurs de customer ? : "+customer.username+" and "+customer.usernameNew);
        const data = await  props.updateDataCustomer(customer);
        console.log("Ei si nous examinions le jon depuis lA VIEW >>>>>  ? :"+data);
        console.log(" ######################################################## ")

        console.log(data);
        console.log(" ######################################################## ")
            setIsSuccess(true);
            setShowModal(true);
        } catch (error) {
            setIsSuccess(false);
            setShowModal(true);
        console.error('Error:', error);
        }
    };    


  //-----------------------------------------------------------------------------------------------------
  //                                          LASTE
  //-----------------------------------------------------------------------------------------------------
  //

    /**
    * WIP: declecneh le formulaire de modification
    * - copies les données de l'utilisateur actuelles avant eventuelle modifications
    */
    const handleEditClick = async (event) => {
        // WAIT !! const handleEditClick (event) => {
        event.preventDefault();
        setIsediting(true);
        handleTogglereadOnly();

//    console.log("quelle est la date de naissance ?? : "+props.customerDatabase.birthdate)
//    console.log('bus : '+ dateCustomerDatase)

//    console.log("petit retou --- #6 !!-----------------------------------");
//    const dateStr6 = 'Tue Mar 28 2023 00:00:00 GMT+0200 (heure d’été d’Europe centrale)';
//    const dateObj6 = moment(dateStr6, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
//    const formattedDate6 = dateObj6.format('YYYY-MM-DD');

//    console.log("??????????00  :  "+formattedDate6); // output: '2023-03-28'

        setCustomer(customer => ({
            ...customer,
            username: props.customerDatabase.username,
            usernameNew: props.customerDatabase.usernameNew,
        }));
    };

    //***************************** */

    return(
        <>
        
            <div className="container mt-4">
                
                   
                <br/>
                <Form   

                    method="POST"
                    onSubmit={handleSubmit}

                   // onFetch={handleSaveClick}//{handleEditClick}
  
                >


//--------------------
    Date de naissance out
    
//----------------
         
         
                <Form.Group className="mb-3" >
                        <Form.Label>login (mail)</Form.Label>
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
                                    id="usernameNew" 
                                    name="usernameNew" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.customerDatabase.usernameNew} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.customerDatabase.username} 
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
                <Modal show={showModal} onHide={handleClose} data-bs-target="#staticBackdrop" id="staticBackdrop" data-bs-backdrop="static" >
                    <Modal.Header closeButton>
                        <Modal.Title>{isSuccess ? "Mise à jour finalisée  !! " : "Mise à jour intérrompue"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isSuccess ? 
                            <>
                                <h3>"Modification" </h3>
                                <br/>
                                <p>Voici le nouvel identifiant enregistré dans le systeme</p>
                                <br/>
                                <ul>
                                    <li>Username (mail) : {customer.usernameNew}</li> 
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
                            
                            <Button variant="info" as={Link} to="/" data-bs-dismiss="modal"  >
                                Retour à l'accueil
                            </Button>
                            <Button variant="success" as={Link} to="/LoginCustomerController" onClick={handleCloseAndEditClick}>
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