import React, { useEffect } from "react";

import Space from "./Space";

export default function SpaceController(props) {

    useEffect(() => fetchOwnerCats(), []);

    const backUrl = "http://34.163.245.227:8081/space";

    function fetchOwnerCats() {
        const requestOptions = {
            headers: { "Authorization": "Bearer " + props.owner.token }
        };
        fetch(backUrl + "/owners/" + props.owner.id + "/cats", requestOptions)
            .then(response => response.json())
            .then(json => props.setOwner({ 
                ... props.owner,
                cats: json
            }));
    }

    return (
        <Space owner={props.owner} />
    );
}