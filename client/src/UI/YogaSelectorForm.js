import useAxiosInstance from "../useAxiosInstance";
import Exercises from "../Assets/Data/YogaExercises.json";
import { useAuth } from "../Context/AuthContext";
import { useDate } from "../Context/DateContext";
import { useEffect } from "react";
function SelectorForm ( { setFormData, formData, setIsOpen, setExerciseAdded, exerciseAdded } )
{
    const { handleLogout } = useAuth();
    const { axiosInstance } = useAxiosInstance();
    const { selectedDate } = useDate();
    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( prevData ) =>
        {
            const newData = { ...prevData, [ name ]: value };
            if ( e.target.id === 'types' )
            {
                newData.exercise = '';
                newData.hr = '0';
                newData.min = '0';
                newData.sec = '0';
                newData.sets = '';
            } else if ( e.target.id === 'exercise' )
            {
                newData.hr = '0';
                newData.min = '0';
                newData.sec = '0';
                newData.sets = '';
            }
            return newData;
        } );
    };
    useEffect( () =>
    {
        setFormData( ( prevData ) => ( {
            ...prevData,
            date: selectedDate.toLocaleDateString( 'en-us' ),
            day: selectedDate.toLocaleDateString( 'en-us', { weekday: 'long' } )
        } ) );
    }, [ selectedDate, setFormData ] );

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axiosInstance.put( "/yoga",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } )
            alert( res.data.message );
            setExerciseAdded( !exerciseAdded );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                await handleLogout();
            } else
                alert( err?.response?.data?.message );
        }
        setFormData( { date: "", day: "", types: "", exercise: "", hr: "0", min: "0", sec: "0", sets: "" } );
        setIsOpen( [ false, false, false, false ] );
    };
    return (
        <div>
            <div className="text-center text-2xl font-outfit mb-4">Exercise Selector</div>
            <form className="flex flex-col gap-2" onSubmit={ handleSubmit }>
                <label>Select Exercise Type</label>
                <select type="text" required name="types" id="types" value={ formData.types } onChange={ handleChange } className=" p-2 rounded w-72 text-black">
                    <option value="" defaultChecked>Select Exercise Type</option>
                    { Exercises.types.map( ( part ) =>
                    {
                        return (
                            <option key={ part } value={ part }>{ part }</option>
                        );
                    } ) }
                </select>
                { formData.types && (
                    <div className="flex flex-col gap-2">
                        <label>Select Exercise</label>
                        <select name="exercise" id="exercise" required value={ formData.exercise } onChange={ handleChange } className="border p-2 rounded w-72 text-black">
                            <option value="" defaultChecked>Select Exercise</option>
                            { Exercises[ formData.types ].map( ( exercise ) =>
                            {
                                return (
                                    <option key={ exercise } value={ exercise }>{ exercise }</option>
                                )
                            }
                            ) }
                        </select>
                    </div>
                ) }
                { formData.exercise && (
                    <div className="flex flex-col gap-2">
                        <label>Duration</label>
                        <div className="flex flex-col gap-1">
                            <div>
                                <label className="mr-4" htmlFor="">Hrs:</label>
                                <input type="number" name="hr" required id="hr" value={ formData.hr } onChange={ handleChange } className="border p-2 rounded w-20 text-black" />
                            </div>
                            <div>
                                <label className="mr-4" htmlFor="">Min:</label>
                                <input type="number" name="min" required id="min" value={ formData.min } onChange={ handleChange } className="border p-2 rounded w-20 text-black" />
                            </div>
                            <div>
                                <label className="mr-4" htmlFor="">Sec:</label>
                                <input type="number" name="sec" required id="sec" value={ formData.sec } onChange={ handleChange } className="border p-2 rounded w-20 text-black" />
                            </div>
                        </div>
                        <label>Sets</label>
                        <input type="number" required name="sets" id="sets" value={ formData.sets } onChange={ handleChange } className="border p-2 rounded w-72 text-black" />
                    </div>
                ) }
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" type="submit">Save</button>
            </form>
        </div>
    );
}

export default SelectorForm;