import { useRef } from 'react';
import Home1 from "./Home1";
import Home2 from "./Home2";
import Home3 from "./Home3";
import Home4 from "./Home4";

function Home ()
{
    const home3Ref = useRef( null );

    const handleScroll = () =>
    {
        home3Ref.current.scrollIntoView( { behavior: 'smooth' } );
    };

    return (
        <div>
            <div className="flex items-center">
                <Home1 handleScroll={ handleScroll } />
                <Home2 />
            </div>
            <div ref={ home3Ref }> </div>
            <div>
                <Home3 />
            </div>
            <Home4 />
        </div>
    );
}

export default Home;