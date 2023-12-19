import React,{useState,useEffect} from "react";
import { AthentificationToken, auth } from "../../utils/config";

const Athentification = ({children}) => {
    const [authtoken,setToken] = useState("");

    useEffect(()=>{
        if (auth) {
            setToken(auth)
        }
    },[auth])
    console.log("Authtoke",authtoken)
 
    return(
        <>
            <AthentificationToken.Provider value={{authtoken,setToken}}>
                {children}
            </AthentificationToken.Provider>
        </>
    )
}


export default Athentification;