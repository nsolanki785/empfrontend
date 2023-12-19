import React, { Children } from "react";
import { Navigate } from "react-router-dom";

const NonProtectedRoute = ({auth,children}) => {
     return auth ? <Navigate to="/dashboard" /> : children
}

export default NonProtectedRoute;