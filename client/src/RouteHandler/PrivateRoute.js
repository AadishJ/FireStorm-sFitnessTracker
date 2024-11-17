import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext'; // Adjust the import according to your project structure

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); 
    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            const timer = setTimeout(() => {
                setShouldRedirect(true);
            }, 2000); // 2-second delay

            return () => clearTimeout(timer); // Cleanup the timer on component unmount
        }
    }, [isAuthenticated]);

    if (shouldRedirect) {
         <Navigate to="/login" />;
    }

    return isAuthenticated ? element : null;
};

export default PrivateRoute;