import React from 'react';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.auth.user); // Ensure this selector points to the actual auth state
    let location = useLocation();

    console.log(user);

    if (!user) {
        // Redirect to login if not authenticated
        alert("You need to login first.");
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
