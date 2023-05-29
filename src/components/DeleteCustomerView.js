import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function DeleteCustomerView(props) {
    const [readOnly, setreadOnly] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const[customer, setCustomer] = useState({
              username: props.owner.username,
              password:"",
     
     }, []);
 
     const [modal, setModal] = useState({
        isOpen: false,
        content: '',
        header: '',
        footer: '',
      });

     const [staticModal, setStaticModal] = useState(false);
     const toggleShow = () => setStaticModal(!staticModal);



     const handleClose = () => {
        setShowModal(false);
        setIsSuccess(false);
        setErrorMessage("");
    
    };

        const handleSubmit = async (event) => {
        event.preventDefault();
        try {     
            const isDeleteSuccess = await props.deleteCustomer(customer);
            if(isDeleteSuccess){   
                 setShowModal(true);     
                 setModal((preModal) => ({
                     ...preModal,
                     isOpen: true,
                     header: "Suppression de votre compte",
                     content: (
                     <div>
                         <h3>C'est un succès !!</h3>
                         <br />
                         <p>Vous venez de supprimer votre compte du systeme</p>
                         <br />
                         <p>Dans le cas ou vous auriez des prestations à venir, un mail sera envoyé au administrateur 
                            afin qu'il puisse prendre contacte avec vous pour faire le point sur des dis prestations.</p>
                     </div>
                     ),
                     footer: (
                     <div>
                         <Button variant="info" as={Link} to="/" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.logOut}>
                         Se deconnecter
                         </Button>
                     </div>
    
                     )
                 }));
               
                 
            }else{
    
                 setShowModal(false);
                 setModal((preModal) => ({
                     ...preModal,
                     isOpen: true,
                     header: "Mise à jour du mot de passe",
                     content: (
                     <div>
                         <h3>La suppréssion de votre compte semble avoir échouée !!!</h3>
                     </div>
                     ),
                     footer: (
                     <div>
                         <Button variant="info" as={Link} to="/" className="btn btn-secondary"  >
                         Retour à l'accueil
                         </Button>
                         <Button variant="success" as={Link} to="/updatePasswordCustomerController" className="btn btn-warning"  onClick={handleClose}>
                             Recommencer
                         </Button>
                     </div>
                     )
                 }));
            }
           
    
        } catch (error) {
            console.error('Error:', error);
            setShowModal(true);
            setModal((preModal) => ({
              ...preModal,
              isOpen: true,
              header: "Mise à jour du mot de passe",
              content: (
                <div>
                  <h3>Erreur lors de la tentative de suppréssion de votre compte</h3>
                </div>
              ),
              footer: (
                <div>
                  <Button variant="info" as={Link} to="/" className="btn btn-secondary" >
                    Retour à l'accueil
                  </Button>
                  <Button variant="success" as={Link} to="/deleteCustomerController" className="btn btn-warning"  onClick={handleClose}>
                    Recommencer
                  </Button>
                </div>
              )
            }));
          }
    };  

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCustomer(prevCustomer => ({
            ...prevCustomer,
            [name]: value
        }));
        
    };

    return(
        <>
               <div className="container mt-4">             
                <br/>
                <Form   

                    method="POST"
                    onSubmit={handleSubmit}

                >      
   

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Saisissez votre du mot de passe </Form.Label>
                    <Form.Control 
                    type="password"  
                    className="form-control" 
                    name="password" 
                    value={customer.password} 
                    onChange={handleChange} 
                    required 
                    placeholder="Entrez votre mot de passe actuel" />
                </Form.Group>             

 

                
                
                    <button type="submit" className="btn btn-primary"   onClick={toggleShow}>
                    Supprimer mon compte
                    </button>
                </Form>

                { modal.isOpen ?     
                            <>
                                <Modal show={staticModal} onHide={handleClose} 

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