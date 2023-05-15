import React, { useState, useEffect } from "react";
import {fetchCustomer, fetchAdressCustomer, updateAddressCustomer} from "./UpdateAddressCustomerController";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import UpdateAddressCustomerController from "./UpdateAddressCustomerController";



export default function UpdateAddressCustomerView(props) {


    const [readOnly, setreadOnly] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isEditing, setIsediting] = useState(false);
    //const dateCustomerDatase = formatDateForDatePicker(props.customerLogin.birthdate);

    const[address, setAddress] = useState({
       // username:"",
   //     addressDto:{
             //   id:"",
                numberRoad: "",
                road:"",
                zipCode: "",
                city:"",
                country:"",
      //      }       
    }, []);


    const [staticModal, setStaticModal] = useState(false);
    const toggleShow = () => setStaticModal(!staticModal);

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

           console.log("Depuis la vu que donne adresse [AVANT]? "+address);
   
           setAddress((prevAddress) => ({
               ...prevAddress,
                [name]: value
            

 /*     OLD      
            //   ...prevAddress,
               addressDto: {
                ...prevAddress.addressDto,
                [name]: value
              }

*/

           }));

           console.log("Depuis la vu que donne adresse [APRES]? "+address);
           
           //() => props.updateDataCustomer(address)

       }catch (error) {
            setIsSuccess(false);
           console.error('Error:', error);
       }
       console.log("dernier etape");
       
       setIsSuccess(true);


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
    const data = await  props.updateAddressCustomer(address);
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
  //                                          LAST
  //-----------------------------------------------------------------------------------------------------
  //

    //????
    function handleTogglereadOnly() {
        setreadOnly(!readOnly);
    }


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

        setAddress((prevAddress) => ({

            ...prevAddress,
                numberRoad: props.adresseCustomerDatabase.addressDto.numberRoad,
                road:  props.adresseCustomerDatabase.addressDto.road,
                zipCode:  props.adresseCustomerDatabase.addressDto.zipCode,
                city:  props.adresseCustomerDatabase.addressDto.city,
                country: props.adresseCustomerDatabase.addressDto.country,
           

 /* OLD

            ...prevAddress,
            username: props.adresseCustomerDatabase.username,
            addressDto:{...prevAddress.addressDto, 
               // id:0,
                numberRoad: props.adresseCustomerDatabase.addressDto.numberRoad,
                road:  props.adresseCustomerDatabase.addressDto.road,
                zipCode:  props.adresseCustomerDatabase.addressDto.zipCode,
                city:  props.adresseCustomerDatabase.addressDto.city,
                country: props.adresseCustomerDatabase.addressDto.country,
            } 
          

*/
        }));
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

         
         
                <Form.Group className="mb-3" >
                        <Form.Label>Numéro de voie </Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="numberRoad" name="numberRoad" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.adresseCustomerDatabase.addressDto.numberRoad}
                               onChange={handleInputChange}  
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="numberRoad" 
                                    name="numberRoad" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.adresseCustomerDatabase.addressDto.numberRoad} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.adresseCustomerDatabase.addressDto.numberRoad} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>

                <Form.Group className="mb-3" >
                        <Form.Label>Nom de la voie </Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="road" name="road" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.adresseCustomerDatabase.addressDto.road}
                               onChange={handleInputChange}  
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="road" 
                                    name="road" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.adresseCustomerDatabase.addressDto.road} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.adresseCustomerDatabase.addressDto.road} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>         
   
                <Form.Group className="mb-3" >
                        <Form.Label>Dépaertement </Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="zipCode" name="zipCode" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.adresseCustomerDatabase.addressDto.zipCode}
                               onChange={handleInputChange}   
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="zipCode" 
                                    name="zipCode" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.adresseCustomerDatabase.addressDto.zipCode} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.adresseCustomerDatabase.addressDto.zipCode} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>

                <Form.Group className="mb-3" >
                        <Form.Label>Ville </Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="city" name="city" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.adresseCustomerDatabase.addressDto.city}
                               onChange={handleInputChange}   
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="city" 
                                    name="city" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.adresseCustomerDatabase.addressDto.city} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.adresseCustomerDatabase.addressDto.city} 
                                </Form.Text>
                            </>
                        }               
                </Form.Group>

                <Form.Group className="mb-3" >
                        <Form.Label>Pays </Form.Label>
                        {!isEditing ? 
                            <>
                                <Form.Control 
                                type="text"  className="form-control" 
                                id="country" name="country" 
                                disabled readOnly
                                //value= {props.customerDatabase.name} 
                               // onChange={handleInputChange} 
                               defaultValue={props.adresseCustomerDatabase.addressDto.country}
                               onChange={handleInputChange}   
                                required 
                                />
                            </>
                            :
                            <>
                                <Form.Control 
                                    type="text"  
                                    className="form-control" 
                                    id="country" 
                                    name="country" 
                                    onChange={handleInputChange} 
                                    onBlur={handleInputChange} 
                                    placeholder= {props.adresseCustomerDatabase.addressDto.country} 
                                    required 
                              
                                />
                                <Form.Text className="text-muted">
                                    Ancienne valeur :   {props.adresseCustomerDatabase.addressDto.country} 
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
                                <p>Voici l'adresse enregistré dans le systeme</p>
                                <br/>
                                <ul>
                                    <li>Numéro de voie : {address.numberRoad}</li> 
                                    <li>Voie           : {address.road}</li> 
                                    <li>Département    : {address.zipCode}</li> 
                                    <li>Ville          : {address.city}</li> 
                                    <li>Pays           : {address.country}</li> 
                                </ul>
                                

                            </>
                        </Modal.Body>
                        <Modal.Footer>

                            <>
                                
                                <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.logOut}>
                                    Retour à l'accueil

                                </Button>
                                <Button variant="success" as={Link} to="/Connect"   onClick={props.logOut}>
                                    Apporter dezs modifications
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