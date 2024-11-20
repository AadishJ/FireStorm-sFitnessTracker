import { useEffect, useState } from "react";
import useAxiosInstance from "../useAxiosInstance";
import { useDate } from "../Context/DateContext";
import { useAuth } from "../Context/AuthContext";
function GymEditor ( { id, exerciseName } )
{
    const { selectedDate } = useDate();
    const { handleLogout } = useAuth();
    const {axiosInstance} = useAxiosInstance();
    const [ exercise, setExercise ] = useState( {} );
    const [ setsCount, setSetsCount ] = useState( null );
    const [ formData, setFormData ] = useState( { weight: [], metric: [], reps: [], sets: [], day: "", exercise: "", date: "", isDone: false, } );
    useEffect( () =>
    {
        try
        {
            const fetchData = async () =>
            {
                const res = await axiosInstance.get( "/workout", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        id: id,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        exercise: exerciseName,
                    }

                } );
                //if the exercise is already added and the user is trying to update the exercise
                if ( !res.data.reqExercise )
                {
                    setExercise( res.data.reqExercise1[ 0 ] );
                    setSetsCount( setsCount || res.data.reqExercise1[ 0 ].sets );
                    setFormData( {
                        weight: res.data.reqExercise1[ 0 ].weight,
                        metric: res.data.reqExercise1[ 0 ].metric,
                        reps: res.data.reqExercise1[ 0 ].reps,
                        sets: setsCount,
                        day: res.data.reqExercise1[ 0 ].day,
                        exercise: res.data.reqExercise1[ 0 ].exercise,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        isDone: false,
                    } )
                }
                //if the exercise is not added and the user is trying to add the exercise
                else
                {
                    setExercise( res.data.reqExercise[ 0 ] );
                    setSetsCount( setsCount || res.data.reqExercise[ 0 ].sets );
                    setFormData( {
                        weight: Array( setsCount ).fill( res.data.reqExercise[ 0 ].weight.toString() ),
                        metric: Array( setsCount ).fill( res.data.reqExercise[ 0 ].metric.toString() ),
                        reps: Array( setsCount ).fill( res.data.reqExercise[ 0 ].reps.toString() ),
                        sets: setsCount,
                        day: res.data.reqExercise[ 0 ].day,
                        exercise: res.data.reqExercise[ 0 ].exercise,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        isDone: false,
                    } );
                }
            }
            fetchData();
        } catch ( err )
        {
            if ( err?.response?.status === 404 )
            {
                alert( err?.response?.data?.message || "Cannot fetch exercise" );
            } else
            {
                alert( err?.response?.data?.message || "Cannot fetch exercise" );
            }
        }
    }, [ id, selectedDate, setsCount, exerciseName, handleLogout, axiosInstance ] );
    const handleChange = ( e ) =>
    {
        const { name, value, dataset } = e.target;
        const index = dataset.index;

        setFormData( ( prevData ) =>
        {
            const newData = { ...prevData };
            newData[ name ][ index ] = value;
            return newData;
        } );
    };
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axiosInstance.post( "/workout", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            } );
            alert( res.data.message );
        } catch ( err )
        {
            if ( err?.response?.status === 404 )
            {
                alert( err?.response?.data?.message || "Cannot save exercise" );
                await handleLogout();
            } else
            {
                alert( err?.response?.data?.message || "Cannot save exercise" );
            }
        }
    }
    const handleAddSet = () =>
    {
        setSetsCount( setsCount + 1 );
    }
    const handleRemoveSet = () =>
    {
        if ( setsCount > 1 )
        {
            setSetsCount( setsCount - 1 );
        }
    }
    return (
        <div>
            <div className="text-white">
                <form onSubmit={ handleSubmit } className="flex flex-col items-center font-roboto">
                    <div className="text-2xl mb-5 font-outfit underline">
                        { exercise.exercise }
                    </div>
                    <div className="flex ml-9 gap-8">
                        <div>Weight</div>
                        <div>Metric</div>
                        <div>Reps</div>
                    </div>
                    { Array.from( { length: setsCount } ).map( ( _, i ) => (
                        <div key={ i }>
                            <div className="flex gap-2 m-2">
                                <div>{ `Set-${ i + 1 }:` }</div>
                                <div className="flex gap-2">
                                    <input type="number" name="weight" data-index={ i } className="w-20 text-black text-center pl-3 rounded-md" value={ formData.weight[ i ] } onChange={ handleChange } />
                                </div>
                                <div className="flex gap-2">
                                    <select type="number" name="metric" data-index={ i } value={ formData.metric[ i ] } defaultValue={""} className="text-black w-14 rounded-md text-center" onChange={ handleChange }>
                                        <option value="" disabled >Metric</option>
                                        <option value="kg">KG</option>
                                        <option value="lbs">LBS</option>
                                    </select>
                                </div>
                                <div className="flex gap-2">
                                    <input type="number" name="reps" data-index={ i } value={ formData.reps[ i ] } className="w-20 text-black text-center pl-3 rounded-md" onChange={ handleChange } />
                                </div>
                            </div>
                        </div>
                    ) ) }
                    <div className="flex gap-4 items-center mt-2">
                        <div onClick={ handleAddSet } className="border-2 border-white p-1 rounded-lg cursor-pointer hover:underline">Add Set</div>
                        <div onClick={ handleRemoveSet } className="border-2 border-white p-1 rounded-lg cursor-pointer hover:underline">Remove Set</div>
                    </div>
                    <button type="submit" className="bg-green-500 text-xl rounded-md p-2 mt-5 w-20">Save</button>
                </form>
            </div>
        </div>
    );
}

export default GymEditor;