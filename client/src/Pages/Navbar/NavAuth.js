import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
import DateSelector from "./DateSelector";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function NavAuth ()
{
    const name = localStorage.getItem( "userName" );
    const firstLetter = name.charAt( 0 ).toUpperCase();
    const location = useLocation();
    useEffect( () =>
    {
        const navbar = document.querySelector( '.navbar' );
        if ( location.pathname === '/schedule' )
        {
            navbar.classList.add( 'bg-anotherPurple' );
            navbar.classList.remove( 'bg-backPurple' );
        } else
        {
            navbar.classList.add( 'bg-backPurple' );
            navbar.classList.remove( 'bg-backLightPurple' );
        }
    }, [ location ] );
    return (
        <div className="navbar fixed top-0 z-10 w-full shadow-lg">
            <div className="text-white flex justify-between items-center mx-8 my-4">
                <Link to="/">
                    <div className="flex flex-col items-center font-medium">
                        <div className="flex items-center">F
                            <FaDumbbell className="fill-white rotate-90" />
                            TNESS</div>
                        <div>TRACKER</div>
                    </div>
                </Link>
                <div className="flex gap-4 justify-center items-center">
                    <DateSelector />
                    <div className="flex justify-start items-center relative gap-2">
                        <FaSearch className="fill-gray-500 absolute left-2 w-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-lightPurple w-96 rounded-lg p-4 pl-10 h-10 text-lg"
                        />
                    </div>
                    <Link to="/dashboard">
                        <div className="border-brightPurple w-24 h-10 border-2 flex items-center justify-center rounded-full hover:cursor-pointer hover:border-none hover:bg-brightPurple">
                            Dashboard
                        </div>
                    </Link>
                    <Link to="/profile" className="bg-brightPurple rounded-full w-12 h-12 flex justify-center items-center hover:cursor-pointer hover:bg-backPurple hover:border-brightPurple hover:border-2">
                        {firstLetter}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavAuth;
