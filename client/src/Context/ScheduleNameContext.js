import { createContext, useContext, useState } from "react";

const ScheduleNameContext = createContext();

export const ScheduleNameProvider = ({ children }) =>
{
    const [ name,setName ] = useState( "" );
    const changeName = ( newName )=>
    {   
        setName( newName );
    }
    return (
        <ScheduleNameContext.Provider value={ { name, changeName } }>
            { children }
        </ScheduleNameContext.Provider>
    );
}
export const useScheduleName = ()=>
{
    return useContext( ScheduleNameContext );
}