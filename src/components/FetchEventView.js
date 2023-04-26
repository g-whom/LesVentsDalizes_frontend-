import React from "react";

export default function FetchEventView(props) {

    return props.owner.token != null ?(
        <div>
            <button className="btn btn-primary m-3" onClick={() => props.onFetch()}>
                afficher les evenements
            </button>
            {props.events}
        </div>
    ):<></>;
}