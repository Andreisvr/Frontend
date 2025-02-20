// AddApplies.js
import React  from "react";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AppContext } from "../../components/AppContext";
export default function MyApplied({ 
    thesisName, 
    faculty, 
    study_program, 
    applied_data,
    professor_name,
    study_year,
    stud_name,
    prof_email,
    id, 
 }) {
    const navigate = useNavigate();
    const { handleThesisId} = useContext(AppContext); 
   
    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        if (date.getTime() === 0) return ''; 
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }


    const handleWithdraw = (id) => {
        
        fetch(`https://backend-tau.onrender.com/myaply/${id}`, { 
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            if (!response.ok) throw new Error("Failed to withdraw thesis");
            
        })
        .catch(error => console.error("Error withdrawing thesis:", error));
        window.location.reload();
    };

    function go_info(){
        handleThesisId(id);
        navigate('/Applied_info')

    }
    const getShortDescription = (desc) => (desc ? `${desc.substring(0, 25)}${desc.length > 100 ? "..." : ""}` : "");

    return (
        <form className="applied_form" onClick={go_info}>
            <p className="text title">Title: {getShortDescription(thesisName)}</p>
    
    
            
                    <p className="text ">Professor Name: {professor_name}</p>
                  
                    <p className="text">Email: {prof_email || "Loading..."}</p>
                    <p className="text">Faculty: {faculty} {study_program && `Program: ${study_program}`}</p>
                  
                    <p className="text ">Applied Date: {formatDate(applied_data)}</p>
                    <button 
                        className="withdraw_btn" 
                        type="button" 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleWithdraw(id); 
                        }}
                    >
                        Withdraw Aplication
                    </button>
               
            
    
           
        </form>
    );
}
