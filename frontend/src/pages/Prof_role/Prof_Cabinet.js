import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import '/Users/Andrei_Sviridov/Desktop/React/frontend/src/page_css/Prof_role/prof_cab.css';
import AddThesis from "/Users/Andrei_Sviridov/Desktop/React/frontend/src/pages/Prof_role/thesis_card.js";
import { AppContext } from "../../components/AppContext";
import PersonIcon from '@mui/icons-material/Person'; 
import SchoolIcon from '@mui/icons-material/School'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function ProfCabinet() {
    const { name, email, logined, type } = useContext(AppContext);
    const navigate = useNavigate();
    const [theses, setTheses] = useState([]); 
    const [allTheses, setAllTheses] = useState([]); 

    const handleClickThesis = (thesis) => {
        localStorage.setItem('selectedThesis', JSON.stringify(thesis));
        console.log(thesis);
    };

    useEffect(() => {

        fetch("http://localhost:8081/prof", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            setTheses(data);
            setAllTheses(data); 
        })
        .catch((error) => {
            console.error("Error fetching theses:", error);
        });
    
        if (logined) {
           
            fetch("http://localhost:8081/prof", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email }),
            })
            .then((response) => response.json())
            .then((userInfo) => {
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
            })
            .catch((error) => {
                console.error("Error fetching user info:", error);
            });

        }   
           
    }, [logined, email]);

    const handleClickAdd = () => {
        navigate('/add_form');
    };

    const handleAllClick_All = () => {
        setTheses(allTheses);
        navigate('/prof'); 
    };
    
    function handleShowMyThesis() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const profId = userInfo ? userInfo.id : null; 

        const myTheses = allTheses.filter(thesis => thesis.prof_id === profId); 
        setTheses(myTheses);
    }

    const getShortDescription = (desc) => {
        const shortDesc = desc.substring(0, 100);
        return shortDesc + (desc.length > 100 ? "..." : ""); 
    };

    return (
        <div className="body_prof">
            <div className="left_container"></div>
            <div className="right_container">
                <div className="top_container">
                    <div className="button-group">
                        {type === "professor" ? (
                            <>
                                <button onClick={handleAllClick_All}>ALL</button>
                                <button onClick={handleShowMyThesis}>MyThesis</button>
                                <button>Applied</button>
                                <button>Accepted</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleAllClick_All}>ALL</button>
                                <button>MyPropouse</button>
                                <button>MyAplies</button>
                                <button>Responsed</button>
                            </>
                        )}
                    </div>
                    <div className="icon-container">
                        {type === "professor" ? <PersonIcon className="icon" /> : <SchoolIcon className="icon" />}
                    </div>
                </div>
                <div className="bottom_container">
                    {theses.map(thesis => (
                        <AddThesis 
                            key={thesis.id} 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleClickThesis(thesis); 
                                navigate('/thesisinfo'); 
                            }}
                            thesisName={thesis.title}
                            number_of_aplies={thesis.number_of_applies} 
                            date_start={thesis.start_date}
                            date_end={thesis.end_date}
                            faculty={thesis.faculty}
                            study_program={thesis.study_program}
                            description={getShortDescription(thesis.description)}
                            requirements={getShortDescription(thesis.requirements)}
                            professor_name={thesis.professor_name}
                        />
                    ))}
                    {type === "professor" && (
                        <div className="add-button-container">
                            <AddCircleOutlineIcon onClick={handleClickAdd} className="add_button" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
