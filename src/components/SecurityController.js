import React from "react";

import Login from "./Login";

export default function SecurityController(props) {

    const backUrl = "http://34.163.245.227:8081/security";

    function fetchOwner(login, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: login, password: password})
        };
        fetch(backUrl + "/authorize", requestOptions)
            .then(response => response.json())
            .then(json => props.setOwner({ 
                token: json.token,
                id: json.owner.id,
                name: json.owner.name,
                surname: json.owner.surname
            }));
    }

    return (
        <Login fetchOwner={(login, password) => fetchOwner(login, password)} />
    ); 
}