import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function WorkoutName ()
{
    const {handleLogout} = useAuth();
    const navigate = useNavigate();
    const [ workoutName, setWorkoutName ] = useState( "" );
    const [ allWorkoutNames, setAllWorkoutNames ] = useState( [] );
    const [ value, setValue ] = useState( "" );

    useEffect( () =>
    {
        const currentWorkoutName = localStorage.getItem( "workoutName" );
        if ( currentWorkoutName )
        {
            navigate( "/workout" );
        }
        const getWorkoutNames = async () =>
        {
            try
            {
                const res = await axios.get( "/workout/name", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                setAllWorkoutNames( res.data.allNames.map( name => name.name ) );
            } catch ( err )
            {
                if ( err.response.status === 404 )
                {
                    alert( err?.response?.data?.message );
                    await handleLogout();
                } else
                    alert( err?.response?.data?.message );
            }
        };
        getWorkoutNames();
    }, [ navigate,handleLogout ] );
    const handleOptionChange = ( e ) =>
    {
        setWorkoutName( e.target.value );
    };
    const handleValueChange = ( e ) =>
    {
        setValue( e.target.value );
    };
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        if ( workoutName === "new" )
        {
            try
            {
                await axios.post( "/workout/name", { value }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                localStorage.setItem( "workoutName", value );
                navigate( "/workout" );
            } catch ( err )
            {
                if ( err.response.status === 404 )
                {
                    alert( err?.response?.data?.message );
                    await handleLogout();
                } else
                    alert( err?.response?.data?.message );
            }
        } else
        {
            localStorage.setItem( "workoutName", workoutName );
            navigate( "/workout" );
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-2/5 h-3/5 bg-anotherPurple flex flex-col gap-2 items-center rounded-2xl">
                <div className="text-white font-bold font-outfit text-2xl mt-4">Select Workout</div>
                <form onSubmit={ handleSubmit } className="flex flex-col gap-4 items-center">
                    <select required name="workoutName" id="workoutName" onChange={ handleOptionChange } className="mt-20 w-96 text-center bg-customYellow text-white h-20 rounded-xl text-lg border-2 border-white">
                        <option value="" defaultChecked>Select Workout</option>
                        <option value="new">Create New Workout</option>
                        { allWorkoutNames.map( ( name, index ) => (
                            <option key={ index } value={ name }>{ name }</option>
                        ) ) }
                    </select>
                    { workoutName === "new" && (
                        <div className="">
                            <label className="font-medium font-roboto text-2xl text-white">Enter Workout Name:</label>
                            <div className="flex flex-col gap-4 items-center">
                                <input type="text" className="w-96 h-12 bg-white text-center text-lg " placeholder="Enter Workout Name" value={ value } onChange={ handleValueChange } required />
                                <button type="submit" className="bg-customYellow w-40 h-12 rounded-lg font-roboto text-xl text-white">Create</button>
                            </div>
                        </div>
                    ) }{ workoutName !== "new" && workoutName !== "" && <button type="submit" className="bg-customYellow w-40 h-12 rounded-lg font-roboto text-xl text-white">Open</button> }
                </form>
            </div>
        </div>
    )
}

export default WorkoutName;