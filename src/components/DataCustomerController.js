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
    

        useEffect(() => {
            fetchCustomer();
        }, []); // Le tableau vide en second argument indique que useEffect() ne doit s'exécuter qu'une seule fois, à l'initialisation du composant.

    function fetchCustomer(){

        const requestOptions = {
            headers: { "Authorization": "Bearer " + props.owner.token }
        
        };
  
        fetch(props.urlPrefixe+"/customers/search/username/"+props.owner.username, requestOptions)
        .then(response => {         
            if (!response.ok) {
                throw new Error("Une erreur s'est produite lors de la récupération informations du client.");
            }

           console.log("Url fetch (DAtaCustomerController) : "+props.urlPrefixe+"/customers/search/username/"+props.owner.username);
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
                /*
                    const url = `${props.urlPrefixe}/customers/update/data/customer?bindingResult=${encodeURIComponent(JSON.stringify(bindingResult))}`;
                    const response = await fetch(url, requestOptions); 
                */

                const response  = await fetch(props.urlPrefixe+"/customers/update/data/customer", requestOptions);

                

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                //update visual
                props.setOwner({...props.owner, id:data.id, name:data.name, surname:data.surname});

                return data;

            }catch (error) {

                    console.error('Error:', error);
                    throw new Error('An error occurred while fetching the customers');
            }      
       };

    return  (
        <>


            
            <DataCustomerView 
 
                customerDatabase={customerDatabase}
                setCustomerDatabase={setCustomerDatabase}
                onUpdateDataCustomer={updateDataCustomer}
                updateDataCustomer={(customer) => updateDataCustomer(customer)}
                fetchCustomer={fetchCustomer}
                
            />
        </>
  

  
    );   

}