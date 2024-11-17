import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ( { children, navigate } ) =>
{
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const changeAuthenticated = ( state ) =>
    {
        setIsAuthenticated( state );
    }

    const handleLogout = async () =>
    {
        try
        {
            const res = await axios.post( "/dashboard", {}, {
                headers: {
                    "Content-Type": "application/json",
                },
            } );
            alert( res.data.message );
        } catch ( err )
        {
            alert( err?.response?.data?.message );
        }
        localStorage.removeItem( "workoutName" );
        localStorage.removeItem("yogaWorkoutName")
        localStorage.removeItem( "userName" );
        changeAuthenticated( false );
        setTimeout( () => navigate( "/" ), 100 );
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, changeAuthenticated, handleLogout } }>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () =>
{
    return useContext( AuthContext );
}