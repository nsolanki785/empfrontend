
import Header from "./header";
import React, { useEffect, useState,useContext } from "react";
import SideBar from "./sidebar";


const Layout = ({children}) => {
    
    return(
        <>


<Header/> 
<SideBar/>
<div class="p-4 sm:ml-64">
   <div class="p-4   mt-14">
            {children}   
   </div>
</div>
        </>
    )
    
}

export default Layout