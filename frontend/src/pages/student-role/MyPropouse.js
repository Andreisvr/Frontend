import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../components/AppContext";
import BACKEND_URL from "../../server_link";

export default function MyPropouses({ 

    thesisName, 
    professor_id,
    applied_data,
    professor_name,
    description,
   
    state,
    id
}) 
{
    const { handleThesisId,handleStud_id } = useContext(AppContext); 
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    

    function MyPropouses_Info()
     { 
        //   console.log('merge')
        handleThesisId(id); 
        handleStud_id(professor_id);
        navigate('/MyPropouse_Info');
    }

     


    if(state =='accepted' || state =='confirmed' ){
        return
    }
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        if (date.getTime() === 0) return ''; 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    
    async function handleWithdrawApplication(id,e) {
          e.preventDefault();
          e.stopPropagation();
        
        console.log(id);
        fetch(`${BACKEND_URL}/withdrawApplication/${id}`, { 
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to withdraw thesis");
            console.log("Thesis withdrawn successfully.");
        })
        .catch(error => console.error("Error withdrawing thesis:", error));
        await new Promise((resolve) => setTimeout(resolve, 300));

        window.location.reload();
       
    }

    const getShortDescription = (desc) => (desc ? `${desc.substring(0, 25)}${desc.length > 100 ? "..." : ""}` : "");


    return (
        <form className="applied_form" onClick={MyPropouses_Info}>
           
              
                <p className="title text">Title: {getShortDescription(thesisName)}</p>
                <p className="text">Professor: {professor_name}</p>
                <p className="text">Description: {getShortDescription(description) || "Loading..."}</p>
                <p className="text" >Answer : {state}</p>
                <p className="text">Applied Date: {formatDate(applied_data)}</p>
               

                <button className= 'withdraw_btn' onClick={(e) => handleWithdrawApplication(id,e)}>Remove</button>
            
        </form>

      
        
    );
}
