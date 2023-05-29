import React, { useState, useEffect } from "react";
import DeleteCustomerView from "./DeleteCustomerView";



export default function DeleteCustomerController(props){

    
    useEffect(() => {
        deleteCustomer();
    }, []); 



    const deleteCustomer = async (customer) => {

        const requestOptions = {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer " + props.owner.token ,         
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        };

        try{
                                                
            const response  = await fetch(props.urlPrefixe+"/customers/delete/customer", requestOptions);
            if (!response.ok) {
                return false;
            }
        const data = await response.text();
        return true;

     }catch (error) {
        
        throw error;
     }
 
 
};

return (
    <>
      <DeleteCustomerView
        deleteCustomer={(customer) => deleteCustomer(customer)}
     
       owner={props.owner} 
        logOut={props.logOut}
      />
    </>
  );
  

}