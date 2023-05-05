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
        id:"",
        address:{
                id:"",
                numberRoad: "",
                road:"",
                zipCode: "",
                city:"",
                country:"",
            }       
    }, []);



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
   
           setCustomer(address => ({
               ...address,
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
    const data = await  props.updateDataCustomer(address);
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

        setAddress(address => ({
            ...address,
            username: props.customerDatabase.username,
            usernameNew: props.customerDatabase.usernameNew,
        }));
    };


    return(
        <>
          
        </>
    )

    
}