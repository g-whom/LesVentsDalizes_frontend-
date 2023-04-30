import { HttpStatusCode } from "axios";
import React, { useState, useEffect } from "react";
import DataCustomerView from "./DataCustomerView"




    export default function DataCustomerController(props){


        const [customerDatabase, setCustomerDatabase] = useState({
            id: "",
            name: "", 
            surname: "",
            username:"",
            birthdate: "",
            phoneNumber:""
          });
    
        const [owner, setOwner] = useState();
        useEffect(() => {
            fetchCustomer();
        }, []); // Le tableau vide en second argument indique que useEffect() ne doit s'exécuter qu'une seule fois, à l'initialisation du composant.

    function fetchCustomer(){

        const requestOptions = {
            headers: { "Authorization": "Bearer " + props.owner.token }
        
        };
                                                ///search/username/{usrnameCustomer}
        fetch("http://localhost:8097/customers/search/username/"+props.owner.username, requestOptions)
        .then(response => {
            console.log("la valeur du token est : "+props.owner.token);
            console.log("la valeur de usernames est : "+props.owner.username);
            console.log("l'url est : http://localhost:8097/customers/search/username/"+props.owner.username);
            if (!response.ok) {
                console.log("status : "+HttpStatusCode);
                console.log("Erreur HTTP " + response.status);
                throw new Error("Une erreur s'est produite lors de la récupération informations du client.");
            }
           // console.log(response.json())
            return response.json();

        })
        .then(json => {
            setCustomerDatabase({
                ...customerDatabase,
               // token: props.owner.token,
                id:json.id,
                name: json.name, 
                surname: json.surname,
                username:json.username,
                birthdate: json.birthdate,
                phoneNumber: json.phoneNumber,
            });
            //console.log(customerDatabase);
            //console.log(json);
        
            })
            .catch(error => {
            console.log(error);
            // Gérer l'erreur ici
            });
        }

//------------------------------------------------------------------------------------------
        const updateDataCustomer = async (customer) => {
        
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "Bearer " + props.owner.token ,
                            "Content-Type": "application/json"
                        },
                body: JSON.stringify(customer),
            
            
            }; 

            try {
        
        
            //  const handleFormSubmit = async (customerDatabase) => {
            //console.log("verifiont le nom mis a joutr : "+props.customer.name);

                console.log('on est dans la requestOtions : '+customer);
                console.log('on est dans la requestOtions name : '+customer.name);

//                const response = await fetch("http://localhost:8097/customers/update/data/customer", requestOptions)
                const response  = await fetch("http://localhost:8097/customers/update/data/customer", requestOptions); //let resJson = await res.json();

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            }catch (error) {
                console.log("c'est la catastrophe !!!")
                    console.error('Error:', error);
                    throw new Error('An error occurred while fetching the customers');
            }
/*
        if (res.status === 200) {
          setName("");
          setEmail("");
          setMessage("User created successfully");
        } else {
          setMessage("Some error occured");
        }
*/        
        
       };
            /*        .then((response) => {
                        if (!response.ok) {
                //          setShowModal(true);
                //         setIsSuccess(false);
                            //handleError();
                            //alert("Network response was not ok");
                            //alert("Erreur HTTP"+response.status);
                            throw new Error("Erreur HTTP " + response.status);
                        
                        }
                        console.log("on progress°");
                            //handleSuccess();
                        //setShowModal(true);
                        //setIsSuccess(true);
                        console.log("voiyon voir le resultata  dans le controleur? : "+ response.json)
                      //  return response.json();
                        //--------------------------------------------------

                    })
                .then((data) => {
                console.log(data);
                })
                .catch((error) => {
                //alert("oups", error);
                //alert("oups, voici les potentiels erreurs  : "+ error);
                //console.error("There was an error!", error);
                setErrorMessage("" +error);
                });
                

                // Gérer la réponse de l'API
              //  const responseData = await response.json();
             //   console.log(responseData);
                //**************************************************** /
            */  
          //  }
       //     }
     //   }}
    return  (
        <>


            
            <DataCustomerView 
            
                owner={props.owner}
                setOwner={setOwner}
                                                 customerDatabase={customerDatabase}
                setCustomerDatabase={setCustomerDatabase}

                                               //     onSubmit={handleSaveClick}


    

                                                   onUpdateDataCustomer={updateDataCustomer}

                                                   

                updateDataCustomer={(customer) => updateDataCustomer(customer)}

              //  onSubmit={() => props.updateDataCustomer(customer)} 
                
            />
        </>
  

    );

    

t}