import React, { useState, useEffect } from "react";
import UpdateAddressCustomerView from "./UpdateAddressCustomerView";




    export default function UpdateAddressCustomerConntroller(props){

        const [adresseCustomerDatabase, setAdresseCustomerDatabase] = useState({
            username:"",
            addressDto:{
                    id:"",
                    numberRoad: "",
                    road:"",
                    zipCode: "",
                    city:"",
                    country:"",
                } 
                    
        });



        useEffect(() => {
            fetchCustomer();
        }, []); // Le tableau vide en second argument indique que useEffect() ne doit s'exécuter qu'une seule fois, à l'initialisation du composant.



        /**
         * WIP retrouver l'adresse d'un customer
         */
        function fetchCustomer(){

            const requestOptions = {
                
                headers: { 
                    "Authorization": "Bearer " + props.owner.token,       
            
                }
            
            };

            fetch(props.urlPrefixe+"/customers/search/address/customer/"+props.owner.id, requestOptions)
            .then(response => {
                if (!response.ok) {
                    console.log("status : "+HttpStatusCode);
                    console.log("Erreur HTTP " + response.status);
                    throw new Error("Une erreur s'est produite lors de la récupération informations du client.");
                }
                console.log("la valeur du token est : "+props.owner.token);
                console.log("la valeur de usernames est : "+props.owner.username);

               // console.log(response.json())
                return response.json();
    
            })
            .then(json => {
                setAdresseCustomerDatabase({
                    ...adresseCustomerDatabase,
                    username: props.owner.username,
                    addressDto:{...adresseCustomerDatabase.addressDto,
                        id:json.id,
                        numberRoad: json.numberRoad,
                        road: json.road,
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
         
        /**
         * WARNONG - switcher avec le contenur de FetchCustomer
         */
        function fetchAdressCustomer(){

            const requestOptions = {
                method: "POST",
                headers: { 
                    "Authorization": "Bearer " + props.owner.token,
                    "Content-Type": "application/json"
            
                },
                body: JSON.stringify(props.owner.username),
            
            };
                                                    ///search/username/{usrnameCustomer}   props.urlPrefixe+
            //fetch("http://localhost:8097/customers/address/"+adresseCustomerDatabase.addressDto.id, requestOptions)
            fetch(props.urlPrefixe+"/customers/address/"+props.owner.id, requestOptions)
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
                    username: props.owner.username,
                    addressDto:{
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

        /**
         *  Wip new adresse
         * @param { } address 
         * @returns 
         */
        const updateAddressCustomer = async (address) => {
        
            const requestOptions = {
                method: 'POST',
                headers: { "Authorization": "Bearer " + props.owner.token ,
                            "Content-Type": "application/json"
                        },
                body: JSON.stringify({username:props.owner.username, addressDto:address}),
            
            
            }; 

            try {
                const response  = await fetch(props.urlPrefixe+"/customers/update/address/customer", requestOptions);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Ei si nous examinions le jSon depuis le controller ? :"+response.json);
                console.log("Affichons data : "+data);
                console.log("-------------------------------------------------------- :");
                return data;

            }catch (error) {
                console.error('Error (depuis le controlleur):', error);
                    throw new Error('An error occurred while fetching the custaddressWithUsernameDtoomers');
            }
        
        
       };

        return (
            <>
                <UpdateAddressCustomerView
                    adresseCustomerDatabase={adresseCustomerDatabase} 
                    setAdresseCustomerDatabase={setAdresseCustomerDatabase}
                    
                    updateAddressCustomer={(address) => updateAddressCustomer(address)}
                    fetchCustomer={fetchCustomer}
                    fetchAdressCustomer={fetchAdressCustomer}
                
                />
            </>
        )
    }

