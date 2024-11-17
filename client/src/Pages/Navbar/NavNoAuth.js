import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaDumbbell } from "react-icons/fa";
function NavNoAuth() {
    return (
        <div className="fixed top-0 z-50 w-screen bg-backPurple shadow-lg">
            <div className="text-white flex justify-between items-center drop-shadow-lg">
                <Link to="/">
                    <div className="flex flex-col items-center mx-8 my-4">
                        <div className="flex items-center">F
                            <FaDumbbell className="fill-white rotate-90" />
                        TNESS</div>
                        <div>TRACKER</div>
                    </div>
                </Link>
                <div className="flex gap-4 justify-center items-center mx-8 my-4">
                    <div className="flex justify-start items-center relative gap-2 mx-8">
                        <FaSearch className="fill-gray-500 absolute left-2 w-4" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-lightPurple w-96 rounded-lg p-4 pl-10 h-10 text-lg"
                        />
                    </div>
                    <Link to="/login">
                        <div className="border-brightPurple w-24 h-10 border-2 flex items-center justify-center rounded-full hover:cursor-pointer hover:border-none hover:bg-brightPurple">
                            Login
                        </div>
                    </Link>
                    <Link to="/signup">
                        <div className="bg-brightPurple rounded-full w-24 h-10 flex justify-center items-center hover:cursor-pointer hover:bg-backPurple hover:border-brightPurple hover:border-2">
                            Signup
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NavNoAuth;
