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
    

    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);

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
            setIsSuccess(true);
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
            console.error('Error:', error);
            setIsSuccess(false);
            setShowModal(true);
        
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
                        
                        className="sx-10 md-8"
                       onClick={toggleShow}
                      
                        >
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

                {isEditing ?     
                <>
                    <Modal show={staticModal} onHide={handleClose} 
                        //tabIndex="-1"
                        {...setStaticModal} 
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Mise à jour finalisée  !! </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                            <h3>"Modification" </h3>
                                <br/>
                                <p>Voici le nouvel identifiant enregistré dans le systeme</p>
                                <br/>
                                <ul>
                                    <li>Username (mail) : {customer.usernameNew}</li> 
                                </ul>
                                <p>Merci de bien vouloir vous connecter de nouveau</p>

                            </>
                        </Modal.Body>
                        <Modal.Footer>

                            <>
                                
                                <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.logOut}>
                                    Retour à l'accueil

                                </Button>
                                <Button variant="success" as={Link} to="/Connect"   onClick={props.logOut}>
                                    Se connecter
                                </Button>         
                            </>
        
                        </Modal.Footer>
                    </Modal>
                </> 
                :
                <> 
                     <Modal show={staticModal} onHide={handleClose} 
                        //tabIndex="-1"
                        {...setStaticModal} 
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Mise à jour intérrompue </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <>
                                <p>Erreur :</p>
                                {errorMessage}
                            </>
                        </Modal.Body>
                        <Modal.Footer>

                            <>                
                                <Button variant="info" as={Link} to="/">
                                    Retour à l'accueil
                                </Button>
                                <Button variant="danger" onClick={handleClose}>
                                    Recommencer
                                </Button>         
                            </>
        
                        </Modal.Footer>
                    </Modal>               
                </>
                }


   
            </div>
        </>
    )
}

/*
<div class="modal fade" id="staticBackdrop" 
data-bs-backdrop="static" data-bs-keyboard="false" 
tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
*/