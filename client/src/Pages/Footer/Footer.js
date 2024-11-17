import LeftFoot from "./LeftFoot";
import MiddleFoot from "./MiddleFoot";
import RightFoot from "./RightFoot";

function Footer ()
{
    return (
        <div>
            <div className=" h-96 mt-10 bg-footerPurple text-white flex items-center justify-between pl-12">
                <LeftFoot />
                <MiddleFoot />
                <RightFoot/>
            </div>

        </div>
    );
}

export default Footer;