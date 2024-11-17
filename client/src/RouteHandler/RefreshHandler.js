import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; 

function RefreshHandler() {
    const location = useLocation();
    const navigate = useNavigate();
    const { changeAuthenticated } = useAuth(); 

    useEffect(() => {
        const token = localStorage.getItem("userName");

        if (token) {
            changeAuthenticated(true);
            if ( location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/" )
            {
                navigate("/dashboard", { replace: false });
            }
        }
    }, [location, navigate, changeAuthenticated]);

    return null; 
}

export default RefreshHandler;
