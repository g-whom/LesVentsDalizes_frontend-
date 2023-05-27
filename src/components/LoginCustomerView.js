import React, { useState, useEffect } from "react";
import {fetchCustomer, updateLoginCustomer} from "./LoginCustomerController";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import LoginCustomerController from "./LoginCustomerController";



export default function LoginCustomerView(props) {

    const [modal, setModal] = useState({
        isOpen: false,
        content: '',
        header: '',
        footer: '',
      });

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
     
    /**
     * <h3>this method will update in real time all the changes made on the new identifier</h3>
     * @param {*} event 
     * 
     * @Author: J.VENT
     */
    const handleInputChange = async (event) => {// handleSubmit
        event.preventDefault();
       
       try{     
           // setIsSuccess(true);
           const { name, value } = event.target;
   
           setCustomer(customer => ({
               ...customer,
               [name]: value
           }));


       }catch (error) {
            console.log(error);
            //on gere la modal apres !!
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


    /**
    * <h3>This method executes the update of the connection identfier</h3>.
    * 
    *<p>Depending on the succesnot of this execution a modal will be displayed on the screens</p>
    *
    * @Author: JVENT
    * @param {*} event 
    */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("PEtit apercu de customer avant l'envoie hein !! : "+customer.usernameNew)
           
            const isUpdateSuccess = await props.updateDataCustomer(customer);
            if(isUpdateSuccess){   
                 setShowModal(true);     
                 setModal((preModal) => ({
                     ...preModal,
                     isOpen: true,
                     header: "Modification de l'identifiant de connexion (mail) ",
                     content: (
                     <div>
                         <h3>C'est un succès !!</h3>
                         <br />
                         <p>Voici votre nouvel identifiant enregistré dans le système</p>
                         <br />
                         <ul>
                         <li>Username (mail) : {customer.usernameNew}</li>
                         </ul>
                         <p>Afin de prendre en compte ce changement vous allez $etre déconnecté.</p>
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
                     isOpen: false,
                     header: "Modification de l'identifiant de connexion (mail) ",
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
                         <Button variant="success" as={Link} to="/Connect" onClick={handleClose}>
                             Recommencer
                         </Button>
                     </div>
                     )
                 }));
            }
            //() => props.updateDataCustomer(customer)
 
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
                            Modifier mon identifiant de connexion
                        </Button> 
                       
                    </>
                )}
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

