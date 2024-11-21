import { useEffect, useState } from "react";
import ScheduleCard from "../../UI/ScheduleCard";
import getSchedule from "./GetSchedule";
import useAxiosInstance from "../../useAxiosInstance";
import { useAuth } from "../../Context/AuthContext";
import { useDate } from "../../Context/DateContext";
import { Link } from "react-router-dom";

function MySchedule ()
{
    const { handleLogout } = useAuth();
    const { axiosInstance } = useAxiosInstance();
    const { selectedDate } = useDate();
    const [ gymSchedule, setGymSchedule ] = useState( [] );
    const [ yogaSchedule, setYogaSchedule ] = useState( [] );
    // const [ dietSchedule, setDietSchedule ] = useState( [] );
    // const [ cardioSchedule, setCardioSchedule ] = useState( [] );

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            const res = await getSchedule( selectedDate, handleLogout, axiosInstance );
            setGymSchedule( res.allGymExercise );
            setYogaSchedule( res.allYogaExercise );
            // setDietSchedule( res.allDietFood );
            // setCardioSchedule( res.allCardioExercise );
        }
        fetchData();
    }, [ axiosInstance, handleLogout, selectedDate ] );
    return (
        <div>
            <div className="flex flex-col">
                <div className="mr-24 flex flex-col gap-4 font-roboto">
                    <div className="flex text-white items-center justify-between">
                        <div className="">
                            My Schedule
                        </div>
                        <Link to="/schedule" className="text-xs hover:underline">
                            View All
                        </Link>
                    </div>
                    { gymSchedule.map( ( schedule, index ) =>
                    {
                        if ( index > 2 )
                        {
                            return null;
                        } else
                        {
                            return (
                                <div className="text-white" key={ index }>
                                    <ScheduleCard number={ index } schedule={ schedule } />
                                </div>
                            )
                        }
                    } ) }
                    { yogaSchedule.map( ( schedule, index ) =>
                    {
                        if ( index > 2 )
                        {
                            return null;
                        } else
                        {
                            return (
                                <div className="text-white" key={ index }>
                                    <ScheduleCard number={ index } schedule={ schedule } />
                                </div>
                            )
                        }
                    } ) }
                </div>
            </div>
        </div>
    );
}

export default MySchedule;