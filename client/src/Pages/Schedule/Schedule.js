import { useEffect, useState } from "react";
import getSchedule from "./GetSchedule";
import WorkoutSchedule from "./WorkoutSchedule";
import CardioSchedule from "./CardioSchedule";
import DietSchedule from "./DietSchedule";
import GymEditor from "../../UI/GymEditor";
import YogaEditor from "../../UI/YogaEditor";
import DietEditor from "../../UI/DietEditor";
import CardioEditor from "../../UI/CardioEditor";

function Schedule ()
{
    const [ gymSchedule, setGymSchedule ] = useState( [] );
    const [ yogaSchedule, setYogaSchedule ] = useState( [] );
    const [ dietSchedule, setDietSchedule ] = useState( [] );
    const [ cardioSchedule, setCardioSchedule ] = useState( [] );
    const [ editor, setEditor ] = useState( [ false, false, false, false ] );
    const [id,setId] = useState("");
    useEffect( () =>
    {
        const fetchData = async () =>
        {
            const res = await getSchedule();
            setGymSchedule( res.gymScheduleData );
            setYogaSchedule( res.yogaScheduleData );
            setDietSchedule( res.dietScheduleData );
            setCardioSchedule( res.cardioScheduleData );
        }
        fetchData();
    }, [] );
    const render = ()=>
    {
        if ( editor[0] )
        {
            return <GymEditor id={ id } handleClose={ handleClose } />
        }
        else if ( editor[1] )
        {
            return <YogaEditor id={id} handleClose={handleClose} />
        }
        else if ( editor[2] )
        {
            return <DietEditor id={id} handleClose={handleClose} />
        }
        else if ( editor[3] )
        {
            return <CardioEditor id={id} handleClose={handleClose} />
        }
    }
    const handleClose = () =>
    {
        setEditor([false,false,false,false]);
    }
    const handleClick = (id,type) =>
    {
        console.log( id, type );
        setId(id);
        if ( type === "gym" )
        {
            setEditor([true,false,false,false]);
        }
        else if ( type === "yoga" )
        {
            setEditor([false,true,false,false]);
        }
        else if ( type === "diet" )
        {
            setEditor([false,false,true,false]);
        }
        else if ( type === "cardio" )
        {
            setEditor([false,false,false,true]);
        }
    }
    return (
        <div>
            { render() }
            <div className="w-full min-h-screen bg-anotherPurple">
                <div className="h-fit flex justify-center text-white text-4xl font-bold font-outfit mt-20 ml-28 mb-4 pt-6 pb-6">
                    <div>Today's Schedule</div>
                </div>
                <form action="">
                <div className="flex justify-center gap-6 ml-32 mr-4 font-semibold text-white text-3xl font-outfit pl-2 pb-16">
                    <div className="w-2/6 border-4 border-pink-600 h-fit rounded-xl">
                        <div className="w-full h-24 bg-pink-600 flex flex-col items-center justify-center">
                            <div>
                                Workout
                            </div>
                            <div className="text-sm flex gap-2 items-center hover:underline cursor-pointer hover:after:content-['ChangePlan']">
                                Current Plan: { localStorage.getItem( "workoutName" ) }
                            </div>
                        </div>
                            <WorkoutSchedule gymSchedule={ gymSchedule } yogaSchedule={ yogaSchedule } handleClick={handleClick} />
                    </div>
                    <div className="w-2/6 border-4 border-yellow-500 h-fit rounded-xl">
                        <div className="w-full h-24 flex-col bg-yellow-500 flex items-center justify-center">
                            <div>
                                Cardio
                            </div>
                            <div className="text-sm flex gap-2 items-center hover:underline cursor-pointer hover:after:content-['ChangePlan']">
                                Current Plan: { localStorage.getItem( "cardioWorkoutName" ) }
                            </div>
                        </div>
                            <CardioSchedule cardioSchedule={ cardioSchedule } handleClick={ handleClick } />
                    </div>
                    <div className="w-2/6 border-4 border-cyan h-fit rounded-xl">
                        <div className="w-full h-24 flex-col bg-cyan flex items-center justify-center">
                            <div>
                                Diet
                            </div>
                            <div className="text-sm flex gap-2 items-center hover:underline cursor-pointer hover:after:content-['ChangePlan']">
                                Current Plan: { localStorage.getItem( "dietPlanName" ) }
                            </div>
                        </div>
                        <DietSchedule dietSchedule={ dietSchedule } handleClick={handleClick} />
                    </div>
                    </div>
                    <div className="w-full flex items-center justify-center h-20 p-20 pl-28">
                        <button type="submit" className="w-2/5 h-20 bg-blue-400 rounded-xl text-white text-2xl font-bold font-roboto">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Schedule;