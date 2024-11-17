import { useState, useEffect } from "react";

const ProgressProvider = ( { valueStart, valueEnd, children } ) =>
{
    const [ value, setValue ] = useState( valueStart );

    useEffect( () =>
    {
        const timeout = setTimeout( () => setValue( valueEnd ), 500 );
        return () => clearTimeout( timeout );
    }, [ valueEnd ] );

    return children( value );
};

export default ProgressProvider;
