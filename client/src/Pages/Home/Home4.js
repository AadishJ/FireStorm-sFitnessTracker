import platforms from "../../Assets/Images/Platforms.png";
function Home4 ()
{
    return (
        <div>
            <div className="w-full h-10 bg-white"></div>
            <div className="w-full h-5/6 bg-somePurple">
                <div className="flex flex-col justify-center items-center">
                    <div className="text-white text-5xl mt-8 font-semibold">YOU CAN FIND US ON</div>
                    <img src={ platforms } alt="" />
                </div>
            </div>
            <div className="w-full h-10 bg-white"></div>
        </div>
    );
}

export default Home4;