import { FaFacebook, FaInstagram, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";

function MiddleFoot ()
{
    return (
        <div className="self-start mt-16 flex gap-32 text-lg">
            <div className="flex flex-col gap-2 ">
                <div>Useful links:</div>
                <div className="hover:underline hover:cursor-pointer">Link1</div>
                <div className="hover:underline hover:cursor-pointer">Link2</div>
                <div className="hover:underline hover:cursor-pointer">Link3</div>
                <div className="hover:underline hover:cursor-pointer">Link4</div>
                <div className="hover:underline hover:cursor-pointer">Link5</div>
            </div>
            <div className="flex flex-col gap-2">
                <div>Contact Us:</div>
                <div>Phone No: XXXXXXXXXX</div>
                <div>Address: 123 Maple Avenue, Suite 456
                    Greenfield, CA 93927
                    USA</div>
                <div className="mt-4">Socials:</div>
                <div className="flex gap-3">
                <FaInstagram className="w-7 h-7" />
                <FaTwitter className="w-7 h-7" />
                <FaFacebook className="w-7 h-7" />
                    <FaLinkedin className="w-7 h-7" />
                <FaMailBulk className="w-7 h-7" />    
                </div>
            </div>
        </div>
    );
}

export default MiddleFoot;