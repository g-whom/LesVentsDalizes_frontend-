import React, { useState, useEffect } from "react";
import UpdateAddressCustomerView from "./UpdateAddressCustomerView";




    export default function LoginCustomerController(props){

        const [adresseCustomerDatabase, setAdresseCustomerDatabase] = useState({
    
            id:"",
            address:{
                id:"",
                numberRoad: "",
                road:"",
                zipCode: "",
                city:"",
                country:"",
            }         
        });


        function fetchCustomer(){

            const requestOptions = {
                headers: { "Authorization": "Bearer " + props.owner.token }
            
            };
                                                    ///search/username/{usrnameCustomer}
                                                                                           
            //fetch("http://:8097localhost/customers/search/username/"+props.owner.username, requestOptions)
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
                setAdresseCustomerDatabase({
                    ...adresseCustomerDatabase,
                    id:json.id,
                    address:{
                        id:json.address.id,
                        numberRoad: "",
                        road:"",
                        zipCode: "",
                        city:"",
                        country:"",
                    }                                  

                });
    
                })
                .catch(error => {
                console.log(error);
                // Gérer l'erreur ici
                });
        }
          
        function fetchAdressCustomer(){

            const requestOptions = {
                headers: { "Authorization": "Bearer " + props.owner.token }
            
            };
                                                    ///search/username/{usrnameCustomer}   props.urlPrefixe+
            //fetch("http://localhost:8097/customers/address/"+adresseCustomerDatabase.address.id, requestOptions)
            fetch(props.urlPrefixe+"/customers/address/"+adresseCustomerDatabase.address.id, requestOptions)
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
                setAdresseCustomerDatabase({
                    ...adresseCustomerDatabase,
                    //id:json.id,
                    address:{
                        id:json.id,
                        numberRoad: json.numberRoad,
                        road:json.road,
                        zipCode: json.zipCode,
                        city:json.city,
                        country:json.country,
                    }                                  

                });
    
                })
                .catch(error => {
                console.log(error);
                // Gérer l'erreur ici
                });
        }

        const updateAddressCustomer = async (address) => {
        
            const requestOptions = {
                method: "POST",
                headers: { "Authorization": "Bearer " + props.owner.token ,
                            "Content-Type": "application/json"
                        },
                body: JSON.stringify(address),
            
            
            }; 

            try {
               //    /new/address/customer/{idCustomer} props.urlPrefixe+

                
                //const response  = await fetch("http://localhost:8097/customers/new/address/customer/"+adresseCustomerDatabase.id, requestOptions); 
                const response  = await fetch(props.urlPrefixe+"/customers/new/address/customer/"+adresseCustomerDatabase.id, requestOptions);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Ei si nous examinions le jon depuis le controller ? :"+response.json);
                console.log("-------------------------------------------------------- :");

                //update visual
                props.setOwner({...props.owner, 
                    //id:data.id, 
                    //name:data.name, 
                    username:customer.usernameNew});

                return data;

            }catch (error) {
                console.log("c'est la catastrophe !!!");
                console.log("on a quoi comme customer ? "+customer);
                    console.error('Error:', error);
                    throw new Error('An error occurred while fetching the customers');
            }
        
        
       };

        return (
            <>
                <UpdateAddressCustomerView
                    adresseCustomerDatabase={adresseCustomerDatabase} 
                    setAdresseCustomerDatabase={setAdresseCustomerDatabase}

                   // updateDataCustomer={(customer) => updateDataCustomer(customer)}
                  //  updateLoginCustomer={(customer) => updateLoginCustomer(customer)}
                    updateAddressCustomer={(address) => updateAddressCustomer(address)}
                    fetchCustomer={fetchCustomer}
                    fetchAdressCustomer={fetchAdressCustomer}
                
                />
            </>
        )
    }

//UpdateAddressCustomerController