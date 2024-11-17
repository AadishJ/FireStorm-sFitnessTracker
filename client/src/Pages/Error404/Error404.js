import { Link } from "react-router-dom";

function Error404 ()
{
    return (
        <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
            <h1 className="text-4xl text-center text-white font-outfit">Error 404:Site Not Found</h1>
            <Link to="/" className="text-white font-outfit text-2xl mt-4 hover:underline">Go to Home</Link>
        </div>
    );
}

export default Error404;