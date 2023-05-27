import React, { useState, useEffect } from "react";
import UpdatePasswordCustomerView from "./UpdatePasswordCustomerView";



export default function UpdatePasswordCustomerController(props){

    
    useEffect(() => {
        updatePasswordCustomer();
    }, []); 



    const updatePasswordCustomer = async (passwordDto) => {

        const requestOptions = {
            method: 'POST',
            headers: { 
                "Authorization": "Bearer " + props.owner.token ,         
                "Content-Type": "application/json",
            },
            body: JSON.stringify(passwordDto),
        };

          try{
                                                        
          const response  = await fetch(props.urlPrefixe+"/customers/update/password/customer", requestOptions);
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
      <UpdatePasswordCustomerView
        updatePasswordCustomer={(passwordDto) => updatePasswordCustomer(passwordDto)}
       // UpdatePasswordCustomerController={UpdatePasswordCustomerController}
       owner={props.owner} 
        logOut={props.logOut}
      />
    </>
  );
  

}