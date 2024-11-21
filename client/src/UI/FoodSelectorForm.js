import useAxiosInstance from "../useAxiosInstance";
import DietData from "../Assets/Data/Diet.json";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import { useDate } from "../Context/DateContext";

function SelectorForm ( { setFormData, formData, setIsOpen, setFoodAdded, foodAdded } )
{
    const { handleLogout } = useAuth();
    const { axiosInstance } = useAxiosInstance();
    const { selectedDate } = useDate();
    useEffect( () =>
    {
        if ( formData.food && formData.quantity > 0 )
        {
            const foodItem = DietData[ formData.meal ]?.find( item => item.name === formData.food );
            if ( foodItem )
            {
                setFormData( prevData => ( {
                    ...prevData,
                    calorie: foodItem.calories * formData.quantity
                } ) );
            }
        }
    }, [ formData.food, formData.quantity, formData.meal, setFormData ] );

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( prevData =>
        {
            const newData = { ...prevData, [ name ]: value };
            if ( e.target.id === 'meal' )
            {
                newData.food = '';
                newData.quantity = '0';
                newData.calorie = '0';
            } else if ( e.target.id === 'food' )
            {
                newData.quantity = '0';
                newData.calorie = '0';
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
            const res = await axiosInstance.put( "/diet",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                } )
            alert( res.data.message );
            setFoodAdded( !foodAdded );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                await handleLogout();
            } else
                alert( err?.response?.data?.message );
        }
        setFormData( { date: "", day: "", meal: "", food: "", quantity:"",calorie:"",  } );
        setIsOpen( [ false, false, false, false ] );
    };

    return (
        <div>
            <div className="text-center text-2xl font-outfit mb-4">Food Selector</div>
            <form className="flex flex-col gap-2" onSubmit={ handleSubmit }>
                <label>Select Meal</label>
                <select type="text" required name="meal" id="meal" value={ formData.meal } onChange={ handleChange } className="p-2 rounded w-72 text-black">
                    <option value="" defaultChecked>Select Meal</option>
                    { DietData.meal.map( ( part ) => (
                        <option key={ part } value={ part }>{ part }</option>
                    ) ) }
                </select>
                { formData.meal && (
                    <div className="flex flex-col gap-2">
                        <label>Select Food</label>
                        <select name="food" id="food" required value={ formData.food } onChange={ handleChange } className="border p-2 rounded w-72 text-black">
                            <option value="" defaultChecked>Select Food</option>
                            { DietData[ formData.meal ].map( ( food ) => (
                                <option key={ food.name } value={ food.name }>{ food.name }</option>
                            ) ) }
                        </select>
                    </div>
                ) }
                { formData.food && (
                    <div className="flex flex-col gap-2">
                        <label>Quantity</label>
                        <input type="number" name="quantity" required id="quantity" value={ formData.quantity } onChange={ handleChange } className="border p-2 rounded w-20 text-black" />
                        <label>Calories</label>
                        <input type="number" required disabled name="calorie" id="calorie" value={ formData.calorie } className="border p-2 rounded w-72 text-black" />
                    </div>
                ) }
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" type="submit">Save</button>
            </form>
        </div>
    );
}

export default SelectorForm;