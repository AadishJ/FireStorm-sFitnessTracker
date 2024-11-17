import { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthContext"; 
import NavAuth from "./NavAuth";
import NavNoAuth from "./NavNoAuth";


function Navbar() {
    const { isAuthenticated } = useAuth(); 
    const [loggedInUser, setLoggedInUser] = useState("");

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("userName"));
    }, [isAuthenticated]);

 

    const render = () => {
        if (!isAuthenticated) {
            return (
                <NavNoAuth/>
            );
        } else {
            return (
                <NavAuth loggedInUser={loggedInUser} />
            );
        }
    };

    return (
        <div>
            { render() }
        </div>
    );
}

export default Navbar;
