import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({auth,children}) => {
    return !auth ? <Navigate to="/" replace/> : children  
}
export default ProtectedRoute;