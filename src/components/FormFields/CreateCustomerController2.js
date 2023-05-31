import { HttpStatusCode } from "axios";
import React, { useState, useEffect } from "react";

import CreateCustomerView2 from "./CreateCustomerView2";





export default function CreateCustomerController(props){


    const creatCustomer = async (customer) => {

        const requestOptions = {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer ",// + props.owner.token ,         
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        };

          try{
          
          const response  = await fetch(props.urlPrefixe+"/security/register", requestOptions);
          if (!response.ok) {
             return false;
         }
         const data = await response.text();
         return true;

     }catch (error) {
        
        throw error;
     }
 
 
};







    return(
        <>
            <CreateCustomerView2

            

            creatCustomer={(customer) => creatCustomer(customer)}

            />

        
        </>
    )
}