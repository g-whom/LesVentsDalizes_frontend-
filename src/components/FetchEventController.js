import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "whatwg-fetch";
//import { json } from "react-router-dom";

import FetchEventView from "./FetchEventView"



export default function FetchEventController(props){

    const [events, setEvents]= useState([]);
    //WIP  
   // useEffect(() => fetchEvents(), [props.owner]);

    function fetchEvents(){

    const requestOptions = {
        headers: { "Authorization": "Bearer " + props.owner.token }
    
    };

        fetch("http://localhost:8097/events/show/all", requestOptions)
        
            .then(response => {
                if (!response.ok) {
                    throw new Error("Une erreur  s'est produite lors de la récupération des événements.");
                }
                return response.json();

            })
            .then(json => setEvents(()=>{
                const events=[];

                for (let i = 0; i< json.length; i++){
                    events.push(
                        <li key={nanoid()}>{json[i].label}</li>
                    );
                }
                return <ul>{events}</ul>

            }))
            .catch(error => {
                console.log("| Oups .. Error fetching events: ", error);
                setEvents("Une erreur s'est produite lors du chargement des événements.");
            });
    }

    return (
        <>
            <FetchEventView owner={props.owner}  events={events} onFetch={() => fetchEvents()}/>
        </>
  

    );
}
