import React from "react";
import FetchEventController from "./FetchEventController";
import FetchEventView from "./FetchEventView";
//import { Link }  from "react-router-dom";
import LoginExpress from "./LoginExpress";
import DataCustomerController from "./DataCustomerController";


    
    export default function SecurityController(props) {
      //
    
        //const backUrl = "http://localhost:8097/security";
        //              http://34.155.56.140
        const backUrl = props.urlPrefixe+"/security";
    
        function fetchOwner(username, password) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password})
            };
            fetch(backUrl + "/authorize", requestOptions)
            .then((response) => {
                if (!response.ok) {
                  console.log("Erreur HTTP :", response.status, response.statusText);
                 // window.location.href ="/connect" ;
                 
                } else {
                  return response.json();
                }
              })
              .then(json => { 
                props.setOwner({ 
                token: json.token,
                id: json.owner.id,
                name: json.owner.name,
                surname: json.owner.surname,
                username: json.owner.username,
            }) 
          } )

              .catch((error) => {
                console.error("Erreur lors de la requête :", error);
              });
        }
    
        return (
            <>
              <LoginExpress fetchOwner={(username, password) => fetchOwner(username, password)} />
              <FetchEventController  owner={()=>props.owner} /> 
             
          
            </>  
        ); 
    }