import useAxiosInstance from "../../useAxiosInstance";
import Exercises from "../../Assets/Data/Exercises.json";
import { useAuth } from "../../Context/AuthContext";
function SelectorForm ( { setFormData, formData, setIsOpen, setExerciseAdded, exerciseAdded } )
{
    const { axiosInstance } = useAxiosInstance();
    const { handleLogout } = useAuth();
    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( prevData ) =>
        {
            const newData = { ...prevData, [ name ]: value };
            if ( e.target.id === 'bodyPart' )
            {
                newData.exercise = '';
                newData.weight = '';
                newData.reps = '';
                newData.sets = '';
            } else if ( e.target.id === 'exercise' )
            {
                newData.weight = '';
                newData.reps = '';
                newData.sets = '';
            }
            return newData;
        } );
    };
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axiosInstance.post( '/workout/scheduler', formData,
                {
                    headers: {
                        'Content-Type': 'application/JSON',
                    }
                }
            );
            setExerciseAdded( !exerciseAdded );
            alert( res?.data.message );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                await handleLogout();
            } else
                alert( err?.response?.data?.message );
        }
        setFormData( { name: "", day: "", bodyPart: "", exercise: "", weight: "", metric: "kg", reps: "", sets: "" } );
        setIsOpen( false );
    }
    return (
        <div>
            <div className="text-center text-2xl font-outfit mb-4">Exercise Selector</div>
            <form className="flex flex-col gap-2" onSubmit={ handleSubmit }>
                <label>Select Body Part</label>
                <select type="text" required name="bodyPart" id="bodyPart" value={ formData.bodyPart } onChange={ handleChange } className=" p-2 rounded w-72 text-black">
                    <option value="" defaultChecked>Select Body Part</option>
                    { Exercises.bodyParts.map( ( part ) =>
                    {
                        return (
                            <option key={ part } value={ part }>{ part }</option>
                        );
                    } ) }
                </select>
                { formData.bodyPart && (
                    <div className="flex flex-col gap-2">
                        <label>Select Exercise</label>
                        <select name="exercise" id="exercise" required value={ formData.exercise } onChange={ handleChange } className="border p-2 rounded w-72 text-black">
                            <option value="" defaultChecked>Select Exercise</option>
                            { Exercises[ formData.bodyPart ].map( ( exercise ) =>
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
                        <label>Weight</label>
                        <div className="flex gap-1">
                            <input type="number" name="weight" required id="weight" value={ formData.weight } onChange={ handleChange } className="border p-2 rounded w-60 text-black" />
                            <select name="metric" id="metric" required className='text-black' value={ formData.metric } onChange={ handleChange } >
                                <option value="kg">KG</option>
                                <option value="lbs">LBS</option>
                            </select>
                        </div>
                        <label>Sets</label>
                        <input type="number" required name="sets" id="sets" value={ formData.sets } onChange={ handleChange } className="border p-2 rounded w-72 text-black" />
                        <label>Repetitions</label>
                        <input type="number" required name="reps" id="reps" value={ formData.reps } onChange={ handleChange } className="border p-2 rounded w-72 text-black" />
                    </div>
                ) }
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" type="submit">Save</button>
            </form>
        </div>
    );
}

export default SelectorForm;