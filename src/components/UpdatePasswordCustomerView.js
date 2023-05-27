import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function UpdatePasswordCustomerView(props) {

    const [readOnly, setreadOnly] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const[passwordDto, setPasswordDto] = useState({
              username: props.owner.username,
              password:"",
              passwordNew: "",
              passwordNewBis:"",      
     }, []);
 
     const [modal, setModal] = useState({
        isOpen: false,
        content: '',
        header: '',
        footer: '',
      });

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

        const handleSubmit = async (event) => {
        event.preventDefault();
        try {     
            const isUpdateSuccess = await props.updatePasswordCustomer(passwordDto);
            if(isUpdateSuccess){   
                 setShowModal(true);     
                 setModal((preModal) => ({
                     ...preModal,
                     isOpen: true,
                     header: "Mise à jour du mot de passe",
                     content: (
                     <div>
                         <h3>C'est un succès !!</h3>
                         <br />
                         <p>Vous venez de mettre à jour votre mot de passe dans le system</p>
                         <br />
                         <ul>
                         <li>Username (mail) : {passwordDto.username}</li>
                         <li>Mot de pass : ***** :p </li>
                         </ul>
                         <p>Vous pouver vous connecter pour des à présent avec vorte nouveau mot de passe.</p>
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
                         <h3>Oh no!! Le procéssus semble avoir échoué</h3>
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
                  <h3>Erreur lors de la tentative de modification de votre mot de passe</h3>
                  <p>{error.message}</p> // Afficher le message d'erreur capturé
                </div>
              ),
              footer: (
                <div>
                  <Button variant="info" as={Link} to="/" className="btn btn-secondary" >
                    Retour à l'accueil
                  </Button>
                  <Button variant="success" as={Link} to="/updatePasswordCustomerController" className="btn btn-warning"  onClick={handleClose}>
                    Recommencer
                  </Button>
                </div>
              )
            }));
          }
    };    


        //????
        function handleTogglereadOnly() {
            setreadOnly(!readOnly);
        }


        const handleChange = (event) => {
            const { name, value } = event.target;

            setPasswordDto(prevPasswordDto => ({
                ...prevPasswordDto,
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
                    <Form.Label>Saisissez votre du mot de passe actuel</Form.Label>
                    <Form.Control 
                    type="password"  
                    className="form-control" 
                    name="password" 
                    value={passwordDto.password} 
                    onChange={handleChange} 
                    required 
                    placeholder="Entrez votre mot de passe actuel" />
                </Form.Group>             

                <Form.Group className="mb-3" controlId="passwordNew">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control 
                    type="passwordNew"  
                    className="form-control" 
                    name="passwordNew" 
                    value={passwordDto.passwordNew} 
                    onChange={handleChange} 
                    required 
                    placeholder="Entrez votre nouveau mot de passe" />
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


                <Form.Group className="mb-3" controlId="passwordNewBis">
                    <Form.Label>Confirmation du mot de passe</Form.Label>
                    <Form.Control 
                    type="password"  
                    className="form-control" 
                    name="passwordNewBis" 
                    value={passwordDto.passwordNewBis} 
                    onChange={handleChange} 
                    required 
                    placeholder="Entrez votre nouveau mot de passe" />
                </Form.Group> 
                
                
                    <button type="submit" className="btn btn-primary"   onClick={toggleShow}>
                    S'enregistrer
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