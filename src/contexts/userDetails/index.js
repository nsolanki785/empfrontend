import React,{useState,useEffect} from "react";
import { AthentificationToken, auth,UserData } from "../../utils/config";

const UserDetails = ({children}) => {
    const [userDetails,setUserdetails] = useState({});

    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('userDetails'))) {
            setUserdetails(JSON.parse(localStorage.getItem('userDetails')))
        }
    },[auth])
 
    return(
        <>
            <UserData.Provider value={{userDetails,setUserdetails}}>
                {children}
            </UserData.Provider>
        </>
    )
}


export default UserDetails;