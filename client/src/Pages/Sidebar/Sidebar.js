import { FaCalendar, FaDumbbell } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { CiGrid41 } from "react-icons/ci";
import { useState } from 'react';
import { TbYoga } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SidebarClose";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Sidebar ()
{
    const [ selected, setSelected ] = useState( "Overview" );
    const location = useLocation();
    useEffect( () =>
    {
        if ( location.pathname === "/dashboard" )
        {
            setSelected( "Overview" );
        } else if ( location.pathname.startsWith( "/workout" ) )
        {
            setSelected( "Workout" );
        } else if ( location.pathname.startsWith( "/yoga" ) )
        {
            setSelected( "Yoga" );
        } else if ( location.pathname.startsWith( "/cardio" ) )
        {
            setSelected( "Cardio" );
        } else if ( location.pathname.startsWith( "/diet" ) )
        {
            setSelected( "Diet Plan" );
        } else if ( location.pathname.startsWith( "/schedule" ) )
        {
            setSelected( "My Schedule" );
        } else if ( location.pathname.startsWith( "/progress" ) )
        {
            setSelected( "Progress" );
        }
    }, [ location.pathname, setSelected ] );
    const menuItems = [
        { name: 'Overview', icon: <CiGrid41 />, link: "/dashboard" },
        { name: 'Workout', icon: <FaDumbbell />, link: "/workout/name" },
        { name: 'Yoga', icon: <TbYoga />, link: "/yoga/name" },
        { name: 'Cardio', icon: <FaRunning />, link: "/cardio/name" },
        { name: 'Diet Plan', icon: <FaBowlFood />, link: "/diet/name" },
        { name: 'My Schedule', icon: <FaCalendar />, link: "/schedule" },
        { name: 'Progress', icon: <GiProgression />, link: "/progress" },
    ];
    const [ isOpen, setIsOpen ] = useState( false );
    const handleClose = () =>
    {
        setIsOpen( false );
    }
    const handleOpen = () =>
    {
        setIsOpen( true );
    }

    return (
        <div className="fixed z-40">
            { isOpen && <SidebarOpen menuItems={ menuItems } selected={ selected } setSelected={ setSelected } handleClose={ handleClose } /> }
            { !isOpen && <SidebarClose menuItems={ menuItems } selected={ selected } setSelected={ setSelected } handleOpen={ handleOpen } /> }
        </div>
    );
}

export default Sidebar;