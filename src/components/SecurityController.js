import React from "react";

    //import LoginExpress from "./LoginExpress";
    import Login from "./Login";
    
    export default function SecurityController(props) {
    
        const backUrl = "http://localhost:8097/security";
    
        function fetchOwner(username, password) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password})
            };
            fetch(backUrl + "/authorize", requestOptions)
            .then((response) => {
                if (!response.ok) {
                  // Si la réponse n'est pas OK, afficher le retour HTTP dans la console
                  console.log("Erreur HTTP :", response.status, response.statusText);
                } else {
                  // Si la réponse est OK, récupérer le JSON de la réponse
                  return response.json();
                }
              })
              .then((json) => {
                // Traiter les données de la réponse JSON
                // dans cet exemple, nous utilisons les données pour mettre à jour l'état de l'application
                props.setOwner({
                  token: json.token,
                  id: json.owner.id,
                  name: json.owner.name,
                  surname: json.owner.surname,
                });
              })
              .catch((error) => {
                console.error("Erreur lors de la requête :", error);
              });
        }
    
        return (
            <Login fetchOwner={(username, password) => fetchOwner(username, password)} />
        ); 
    }