import { FaDumbbell } from "react-icons/fa";
import { IoIosArrowDroprightCircle, IoIosLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
function SidebarClose ( { menuItems, selected, setSelected, handleOpen } )
{
    const {handleLogout} = useAuth();
    return (
        <div className="absolute top-0 left-0 w-28 h-screen bg-pinkPurple text-white font-medium font-outfit z-40">
            <div  className="flex flex-col items-center shadow-sm  w-28 relative">
                <Link to="/dashboard" className="flex items-center mt-6 ">
                    <FaDumbbell className="fill-white w-8 h-8" />
                </Link>
                <IoIosArrowDroprightCircle onClick={ handleOpen } className="w-12 h-20 rounded-full absolute fill-white z-50 top-64 left-20 ml-2" />
                <div className="h-0.5 py-0.5 rounded-full mt-5 bg-backPurple w-20"></div>
            </div>
            <div className="flex flex-col items-center justify-start gap-6 h-full">
                <div className=""></div>
                { menuItems.map( ( item ) => (
                    <Link key={ item.name } to={ item.link }>
                        <div
                            className={ `cursor-pointer hover:underline hover:bg-backPurple w-20 h-10 items-center flex gap-2 justify-center rounded-md ${ selected === item.name ? 'bg-backPurple text-white' : '' }` }
                            onClick={ () => setSelected( item.name ) }
                        >
                            { item.icon }
                        </div>
                    </Link>
                ) ) }
                <div onClick={ handleLogout } className=" mt-20 cursor-pointer hover:underline hover:text-lg hover:bg-backPurple w-20 h-10 text-xl items-center flex gap-2 justify-center rounded-md">
                    <IoIosLogOut />
                </div>
            </div>
        </div>
    );
}

export default SidebarClose;
