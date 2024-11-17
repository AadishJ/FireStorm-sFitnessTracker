import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const DateProvider = ( { children } ) =>
{
    const [ selectedDate, setSelectedDate ] = useState( new Date() );
    const changeDate = ( date ) =>
    {
        setSelectedDate( date );
    }
    return (
        <DateContext.Provider value={ { selectedDate, changeDate } }>
            {children}
        </DateContext.Provider>
    )
}
export const useDate = () =>
{
    return useContext( DateContext );
}