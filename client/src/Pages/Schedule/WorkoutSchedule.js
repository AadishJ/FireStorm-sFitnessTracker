import useAxiosInstance from "../../useAxiosInstance";
import { useDate } from "../../Context/DateContext";
import { useAuth } from "../../Context/AuthContext";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
function WorkoutSchedule ( { gymSchedule, yogaSchedule, handleClick, handleChange,setFormOpen } )
{
    const { axiosInstance } = useAxiosInstance();
    const { handleLogout } = useAuth();
    const { selectedDate } = useDate();
    const [ExerciseData,setExerciseData]=useState([]);
    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                const res = await axiosInstance.get( "/schedule/daily", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                    }
                } );

                setExerciseData( res.data.data );
            } catch ( err )
            {
                if ( err.response.status === 404 )
                    {
                        alert( err?.response?.data?.message );
                        handleLogout();
                    } else
                    {
                        alert( err?.response?.data?.message );
                    }
                }
            }
            fetchData();
    },[axiosInstance,selectedDate,handleLogout]);   
    const handleCheckboxChange = ( e, id, exercise, type ) =>
    {
        e.stopPropagation();
        dataSetter( e, id, exercise, type ); // Call the second function
        handleChange( e, id, exercise, type );
    };
    const dataSetter = async(e,id,exercise,type) =>
    {
        var datas;
        if ( type === "gym" )
        {
             datas = {
                exercise: exercise,
                date: selectedDate.toLocaleDateString( 'en-US' ),
                day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                type: type,
                isDone: false,
                workoutName: localStorage.getItem( "workoutName" ),
            };
        } else
        {
             datas = {
                 exercise: exercise,
                 date: selectedDate.toLocaleDateString( 'en-US' ),
                 day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                 type: type,
                 isDone: false,
                 workoutName: localStorage.getItem( "yogaWorkoutName" ),
            }
            }
        try
        {
                 await axiosInstance.post( "/schedule/daily", datas,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                handleLogout();
            } else
            {
                alert( err?.response?.data?.message );
            }
        }
    }
    const handleWorkoutOpen = () =>
    {
        setFormOpen( [ true, false, false, false ] );
    }
    const handleYogaOpen = () =>
    {
        setFormOpen( [ false, false, true, false ] );
    }
    const isChecked=( exercise, type )=>
    {
            for(let i=0;i<ExerciseData.length;i++)
            {
                if(ExerciseData[i].exercise===exercise)
                {
                    return ExerciseData[i].isDone;
                }
            }
        return null;
    }
    return (
        <div className="w-full min-h-screen h-full bg-gray-300 rounded-b-lg">
            <div className="flex flex-col gap-2 items-center pt-8">
                <div className="text-black border-b-2 w-80 text-center items-center border-black p-0.5 flex gap-2 justify-evenly">
                    Strength Training
                    <div onClick={handleWorkoutOpen} className="cursor-pointer"><FaPlus className="fill-pink-600"/></div>
                </div>
                { gymSchedule.map( ( { _id, exercise } ) =>
                {
                    return (                        
                        <div key={ _id } data-id={ _id } className="w-4/5 h-20 bg-pink-600 m-2 flex items-center justify-between rounded-md cursor-pointer relative group" onClick={ ( e ) => handleClick( e.currentTarget.dataset.id, exercise, "gym" ) }>
                            <div className="ml-4">{ exercise }</div>
                            <input type="checkbox" data-id={ _id } defaultChecked={isChecked(exercise,"gym")} className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={ ( e ) => handleCheckboxChange( e,e.currentTarget.dataset.id, exercise, "gym" )} />
                        </div>
                    );
                } ) }
                <div className="text-black border-b-2 w-80 text-center items-center border-black p-0.5 flex gap-2 justify-evenly">
                        Asanas
                    <div onClick={ handleYogaOpen } className="cursor-pointer"><FaPlus className="fill-pink-600"/></div>
                </div>
                { yogaSchedule.map( ( { _id, exercise, } ) =>
                {
                    return (
                        <div key={ _id } data-id={_id} className="w-4/5 h-20 bg-pink-600 m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ ( e ) => handleClick(  e.currentTarget.dataset.id,exercise,"yoga" ) }>
                            <div className="ml-4">{ exercise }</div>
                            <input type="checkbox" data-id={ _id } defaultChecked={ isChecked( exercise, "yoga" ) } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={( e ) => handleCheckboxChange( e,e.currentTarget.dataset.id, exercise, "yoga" ) } />
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
}

export default WorkoutSchedule;