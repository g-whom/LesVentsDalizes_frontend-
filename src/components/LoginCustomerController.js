import React, { useState, useEffect } from "react";
import LoginCustomerView from "./LoginCustomerView";




    export default function LoginCustomerController(props){

        const [customerDatabase, setCustomerDatabase] = useState({
    
            username:"",
            usernamenew:""
         
        });


        useEffect(() => {
            fetchCustomer();
        }, []);

        function fetchCustomer(){

            const requestOptions = {
                headers: { "Authorization": "Bearer " + props.owner.token }
            
            };

            fetch(props.urlPrefixe+"/customers/search/username/"+props.owner.username, requestOptions)
            .then(response => {
                console.log("la valeur du token est : "+props.owner.token);
                console.log("la valeur de usernames est : "+props.owner.username);

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
                    username:json.username,
                    usernameNew:json.username,
                   

                });
    
                })
                .catch(error => {
                console.log(error);
                // Gérer l'erreur ici
                });
        }
          

        //--------------------

        const updateDataCustomer = async (customer) => {
        
            const requestOptions = {
                method: 'POST',
                headers: { 
                    "Authorization": "Bearer " + props.owner.token ,         
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(customer),
            
            }; 

            try {
               
                const response  = await fetch(props.urlPrefixe+"/customers/update/username/customer", requestOptions);
          
                if (!response.ok) {
                   // throw new Error(`HTTP error! Status: ${response.status}`);
                    return false;
                }
                const data = await response.json();
                console.log("Ei si nous examinions le jon depuis le controller ? :"+response.json);
                console.log("-------------------------------------------------------- :");

                //update username
                props.setOwner({...props.owner, 
                    username:customer.usernameNew}
                    );

                //return data;
                return true;

            }catch (error) {
                /*console.log("c'est la catastrophe !!!");
                console.log("on a quoi comme customer ? "+customer);
                console.error('Error:', error); */
                   // throw new Error('An error occurred while fetching the customers');
                return false;
            }
        
        
       };
        //-------------------

        return(
            <> 
                <LoginCustomerView 

                
                  customerDatabase={customerDatabase} setCustomerDatabase={setCustomerDatabase}
                  updateDataCustomer={(customer) => updateDataCustomer(customer)}
                    updateLoginCustomer={(customer) => updateLoginCustomer(customer)}
                    fetchCustomer={fetchCustomer}
                    logOut={props.logOut}
                    
                />
        </>

        );
    }