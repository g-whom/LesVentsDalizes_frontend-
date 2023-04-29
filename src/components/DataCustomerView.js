import React, { useState, useEffect } from "react";
import{fetchCustomer, updateDataCustomer} from "./DataCustomerController";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function DataCustomerView(props){

    const [readOnly, setreadOnly] = useState(false);
    

    const[customer, setCustomer] = useState({
        id: "",
        name: "", //props.ownerData.name, 
        surname: "",
        username:"",
        birthdate: "",
        phoneNumber:""}, []);


    const handleBothIsEditClickAndTogglereadOnly = async (event) => {
       // event.preventDefault();
        handleEditClick();
        handleTogglereadOnly();
    }
        
    function handleTogglereadOnly() {
            setreadOnly(!readOnly);
    }

   /* 
    useEffect(() => {
        setCustomer(prevState => ({
            ...prevState,     
            id: props.setOwnerData.id,
            name: props.setOwnerData.name,
            surname: props.setOwnerData.surname,
            username: props.setOwnerData.username,
            birthdate: props.setOwnerData.birthdate,
            phoneNumber: props.setOwnerData.phoneNumber,
            }));
        }, [props.setOwnerData]);
        */

      //  [props.setOwnerData]
    //---------------------
    //props.setOwnerData);
   // setCustomer( props.setOwnerData);

    const [isEditing, setIsediting] = useState(false);
/*
    useEffect(() => {
        props.fetchCustomer().then((data) => setCustomer(data));
        }, [])
*/

    const handleInputChange = (event) => {
        
        const { name, value } = event.target;
        setCustomer({ ...customer, [name]: value });
    };

    /*

    const handleSubmit = async (event) => {
    event.preventDefault();
    */

    const handleEditClick = async (event) => {
        event.preventDefault();
        setIsediting(true);
        handleTogglereadOnly()
      };
    
      const handleSaveClick = async (event) => {
        event.preventDefault();
       props.updateDataCustomer(user);
       setIsediting(false);
      };


    return(
        <>
            <div className="container mt-4">
                <Button variant="primary" type="submit" >
                    Mode affichage 
                </Button> 
                 
                <Button variant="secondary" type="submit" >
                    Mode modification
                </Button> 
                   
                <br/>
                <Form 
                onSubmit={handleEditClick}
  
                >

                <Form.Group className="mb-3 d-none" >
                    
                    <Form.Label>Id</Form.Label>
                    <Form.Control 
                    type="text"  
                   // className="form-control" 
                    id="id" 
                    name="id" 
                    
                    readOnly={true}
                    value={props.customerDatabase.id} 
                    onChange={handleInputChange} 
                   // disable={!isEditing}
                    required 
                    placeholder="Pour votre id " />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Nom</Form.Label>
                    <Form.Control 
                    type="text"  
                    className="form-control" 
                    id="name" 
                    name="name" 
                    disabled 
                    readOnly={false}
                    value={props.customerDatabase.name} 
                    onChange={handleInputChange} 
                  // disable={!isEditing}
                    required 
                    placeholder="Enter votre nom" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control 
                    type="text"  
                    className="form-control" 
                    id="surname" 
                    name="surname" 
                    readOnly={readOnly}
                    value={props.customerDatabase.surname} 
                    onChange={handleInputChange} 
                 //   disable={!isEditing}
                    required 
                    placeholder="Enter votre prénom" />
                </Form.Group>

                <Form.Group className="mb-3 d-none">
                    <Form.Label>identifiant</Form.Label>
                    <Form.Control 
                    type="text"  
                    className="form-control" 
                    id="username" 
                    name="username" 
                    readOnly={true}
                    value={props.customerDatabase.username} 
                    onChange={handleInputChange} 
                  // disable={!isEditing}
                    required 
                    placeholder="Enter votre identifiant" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Date de naissance</Form.Label>
                    <Form.Control 
                    type="text"  
                    className="form-control" 
                    id="birthdate" 
                    name="birthdate" 
                  //  dateFormat="yyyy-MM-dd"
                    readOnly={readOnly}
                    value={props.customerDatabase.birthdate} 
                    onChange={handleInputChange} 
                  //  disable={!isEditing}
                    required 
                    placeholder="Enter votre date de naissance" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Numéro de téléphone</Form.Label>
                    <Form.Control 
                    type="text"  
                    className="form-control" 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    readOnly={readOnly}
                    value={props.customerDatabase.phoneNumber} 
                    onChange={handleInputChange} 
                  //  disable={!isEditing}
                    required 
                    placeholder="Enter votre numero de téléphone" />
                </Form.Group>                
                
                {isEditing ? 
                (
                    <Button type="submit" onClick={handleSaveClick}>
                    Enregistrer les modifications
                    </Button>

                ) : (
                    <>
                    

                    <Button variant="warning" type="submit" onClick={handleEditClick}>
                    Modifier mes données
                    </Button> 

                    <Button variant="danger" type="" >
                    Supprimer du systeme
                    </Button>
                    </>
                )}
                </Form>
            </div>
        </>
    )
}
/* 
export default function FetchEventController(props){
*/