import { createContext, useContext, useState } from "react";
import useAxiosInstance from "../useAxiosInstance";

const AuthContext = createContext();

export const AuthProvider = ( { children, navigate } ) =>
{
    const { axiosInstance } = useAxiosInstance();
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const changeAuthenticated = ( state ) =>
    {
        setIsAuthenticated( state );
    }

    const handleLogout = async () =>
    {
        try
        {
            const res = await axiosInstance.post( "/dashboard", {}, {
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
        localStorage.removeItem( "yogaWorkoutName" );
        localStorage.removeItem( "cardioWorkoutName" );
        localStorage.removeItem( "dietPlanName" );
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