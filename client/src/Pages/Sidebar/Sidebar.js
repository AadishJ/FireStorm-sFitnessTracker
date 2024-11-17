import { FaCalendar, FaDumbbell } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { CiGrid41 } from "react-icons/ci";
import { useState } from 'react';
import { TbYoga } from "react-icons/tb";
import { FaRunning } from "react-icons/fa";
import SidebarOpen from "./SidebarOpen";
import SidebarClose from "./SidebarClose";


function Sidebar ()
{
    const [ selected, setSelected ] = useState( 'Overview' );
    const menuItems = [
        { name: 'Overview', icon: <CiGrid41 />, link: "/dashboard" },
        { name: 'Workout', icon: <FaDumbbell />, link: "/workout/name" },
        { name: 'Yoga', icon: <TbYoga />, link: "/yoga/name" },
        {name: 'Cardio', icon: <FaRunning/>, link: "/cardio/name" },
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