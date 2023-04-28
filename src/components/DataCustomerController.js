import { HttpStatusCode } from "axios";
import React, { useState, useEffect } from "react";
import DataCustomerView from "./DataCustomerView";
import axios from 'axios';



//export default function FetchEventController(props){
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


    function fetchCustomer() {
    const config = {
        headers: { "Authorization": "Bearer " + props.owner.token }
    };
    axios.get(`http://localhost:8097/customers/search/username/${props.owner.username}`, config)
        .then(response => {
        console.log("la valeur du token est : "+props.owner.token);
        console.log("la valeur de usernames est : "+props.owner.username);
        console.log("l'url est : http://localhost:8097/customers/search/username/"+props.owner.username);
        //if (!response.ok) {
            if (response.status < 200 || response.status >= 300) {
            console.log("status : "+HttpStatusCode);
            console.log("Erreur HTTP " + response.status);

            
            throw new Error("Une erreur s'est produite lors de la récupération informations du client.");
        }
        console.log(response.data);
        return response.data;
        })
        .then(json => {
        setCustomerDatabase({
            ...customerDatabase,
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


    function updateDataCustomer(){
        const requestOptions = {
            method: "PUT",
            headers: { "Authorization": "Bearer " + props.owner.token ,
                        "Content-Type": "application/json"
                    },
            body: JSON.stringify(props.customer),
            

        };

        fetch("http://localhost:8097/customers/update/data/customer", requestOptions)
        

    }
    return  (
        <>
            <DataCustomerView 


                owner={props.owner}
                setOwner={setOwner}
                customerDatabase={customerDatabase}
                setCustomerDatabase={setCustomerDatabase}
                onFetch={fetchCustomer}
                onUpdateDataCustomer={updateDataCustomer}

            
           //     ownerData
                
                
              //setOwner={setOwner}
              
              //  customer={props.customer} 

                //customer={props.customer} setCustomer={props.setCustomer}

           
               // setOwnerData={setOwnerData}
               //fetchOwner={(username, password) => fetchOwner(username, password)}
            
                
         //       updateDataCustomer={() => updateDataCustomer(props.customer)}
              
                
            />
        </>
  

    );

    

}