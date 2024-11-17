import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () =>
{
    const location = useLocation(); // Get the current location (route)

    useEffect( () =>
    {
        window.scrollTo( 0, 0 ); // Scroll to the top of the page on route change
    }, [ location ] );

    return null;
};

export default ScrollToTop;
