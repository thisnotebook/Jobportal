import {createContext, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const internshipContext = createContext();

const InternshipProvider = ({children}) => {
    const [user, setUser] = useState();
    const [selectedInternship, setSelectedInternship] = useState();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    //     setUser(userInfo);
    //     if (!userInfo) {
    //         navigate('/');
    //     }
    // }, [navigate]);
    return (
        <internshipContext.Provider value={
            {
                user,
                setUser,
                selectedInternship,
                setSelectedInternship,
            }
        }
        >
            {children}
        </internshipContext.Provider>
    )
}

export const InternshipState = () => {
    return useContext(internshipContext);
}

export default InternshipProvider;