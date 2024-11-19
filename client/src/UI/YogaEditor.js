import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useDate } from "../Context/DateContext";
import useAxiosInstance from "../useAxiosInstance";
function YogaEditor ( { id, exerciseName } )
{
    const { selectedDate } = useDate();
    const { handleLogout } = useAuth();
    const {axiosInstance} = useAxiosInstance();
    const [ exercise, setExercise ] = useState( {} );
    const [ setsCount, setSetsCount ] = useState( null );
    const [ formData, setFormData ] = useState( {
        exercise: "",
        hr: [],
        min: [],
        sec: [],
        sets: "",
        day: "",
        date: "",
        isDone: false,
    } );
    useEffect( () =>
    {
        try
        {
            const fetchData = async () =>
            {
                const res = await axiosInstance.get( "/yoga", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        id: id,
                        exercise: exerciseName,
                    }
                } );
                if ( !res.data.reqExercise )
                {
                    setExercise( res.data.reqExercise1[ 0 ] );
                    setSetsCount( setsCount || res.data.reqExercise1[ 0 ].sets );
                    setFormData( {
                        exercise: res.data.reqExercise1[ 0 ].exercise,
                        hr: res.data.reqExercise1[ 0 ].hr,
                        min: res.data.reqExercise1[ 0 ].min,
                        sec: res.data.reqExercise1[ 0 ].sec,
                        sets: setsCount,
                        day: res.data.reqExercise1[ 0 ].day,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        isDone: false,
                    } )
                } else
                {
                    setExercise( res.data.reqExercise[ 0 ] );
                    setSetsCount( setsCount || res.data.reqExercise[ 0 ].sets );
                    setFormData( {
                        exercise: res.data.reqExercise[ 0 ].exercise,
                        hr: Array( setsCount ).fill( res.data.reqExercise[ 0 ].hr.toString() ),
                        min: Array( setsCount ).fill( res.data.reqExercise[ 0 ].min.toString() ),
                        sec: Array( setsCount ).fill( res.data.reqExercise[ 0 ].sec.toString() ),
                        sets: setsCount,
                        day: res.data.reqExercise[ 0 ].day,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        isDone: false,
                    } );
                }
            }
            fetchData();
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err.response.data.message || "Cannot fetch exercise" );
            } else
            {
                alert( err.response.data.message || "Cannot fetch exercise" );
            }
        }
    }, [ id, exerciseName, selectedDate, setsCount, axiosInstance ] );

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
            const res = await axiosInstance.post( "/yoga", formData, {
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
                    <div className="flex ml-14 gap-14">
                        <div>Hrs</div>
                        <div>Mins</div>
                        <div>Secs</div>
                    </div>
                    { Array.from( { length: setsCount } ).map( ( _, i ) => (
                        <div key={ i }>
                            <div className="flex gap-2 m-2">
                                <div>{ `Set-${ i + 1 }:` }</div>
                                <div className="flex gap-2">
                                    <input type="number" name="hr" data-index={ i } className="w-20 text-black text-center pl-3 rounded-md" value={ formData.hr[ i ] } onChange={ handleChange } />
                                </div>
                                <div className="flex gap-2">
                                    <input type="number" name="min" data-index={ i } className="w-20 text-black text-center pl-3 rounded-md" value={ formData.min[ i ] } onChange={ handleChange } />
                                </div>
                                <div className="flex gap-2">
                                    <input type="number" name="sec" data-index={ i } className="w-20 text-black text-center pl-3 rounded-md" value={ formData.sec[ i ] } onChange={ handleChange } />
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

export default YogaEditor;