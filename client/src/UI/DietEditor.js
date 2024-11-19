import { useEffect, useState } from "react";
import useAxiosInstance from "../useAxiosInstance";
import { useDate } from "../Context/DateContext";
import { useAuth } from "../Context/AuthContext";

function DietEditor ( { id, dietName } )
{
    const { selectedDate } = useDate();
    const {axiosInstance} = useAxiosInstance();
    const { handleLogout } = useAuth();
    const [ diet, setDiet ] = useState( {} );
    const [ calorieValue, setCalorieValue ] = useState( 0 );
    const [ oneCalorie, setOneCalorie ] = useState( 0 );
    const [ formData, setFormData ] = useState( {
        food: "",
        meal: "",
        day: "",
        date: "",
        quantity: "",
        calorie: "",
        isDone: false,
    } );

    useEffect( () =>
    {
        const fetchData = async () =>
        {
            try
            {
                const res = await axiosInstance.get( "/diet", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    params: {
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        id: id,
                        diet: dietName,
                    }
                } );

                if ( !res.data.reqDiet )
                {
                    setDiet( res.data.reqDiet1[ 0 ] );
                    setFormData( {
                        food: res.data.reqDiet1[ 0 ].food,
                        meal: res.data.reqDiet1[ 0 ].meal,
                        day: res.data.reqDiet1[ 0 ].day,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        quantity: res.data.reqDiet1[ 0 ].quantity,
                        calorie: res.data.reqDiet1[ 0 ].calorie,
                        isDone: false,
                    } );
                    setOneCalorie( res.data.reqDiet1[ 0 ].calorie / res.data.reqDiet1[ 0 ].quantity );
                } else
                {
                    setDiet( res.data.reqDiet[ 0 ] );
                    setFormData( {
                        food: res.data.reqDiet[ 0 ].food,
                        meal: res.data.reqDiet[ 0 ].meal,
                        day: res.data.reqDiet[ 0 ].day,
                        date: selectedDate.toLocaleDateString( 'en-US' ),
                        quantity: res.data.reqDiet[ 0 ].quantity,
                        calorie: res.data.reqDiet[ 0 ].calorie,
                        isDone: false,
                    } );
                    setOneCalorie( res.data.reqDiet[ 0 ].calorie / res.data.reqDiet[ 0 ].quantity );
                }
            } catch ( err )
            {
                alert( err.response.data.message );
            }
        };

        fetchData();
    }, [ selectedDate, id, dietName, handleLogout, axiosInstance ] );

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        const newCalorie = name === "quantity" ? value * oneCalorie : formData.calorie;
        setFormData( {
            ...formData,
            [ name ]: value,
            calorie: newCalorie,
        } );
        setCalorieValue( newCalorie );
    };

    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axiosInstance.post( "/diet", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            } );
            alert( res.data.message );
        } catch ( err )
        {
            alert( err.response.data.message );
        }
    };

    return (
        <div>
            <div className="text-white">
                <form onSubmit={ handleSubmit } className="flex flex-col items-center font-roboto">
                    <div className="text-2xl mb-5 font-outfit underline">
                        { diet.food }
                    </div>
                    <div className="flex align-center gap-7 mb-4">
                        <div>Quantity</div>
                        <div>Calories</div>
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="quantity"
                            className="w-20 text-black text-center pl-3 rounded-md p-1"
                            value={ formData.quantity }
                            onChange={ handleChange }
                        />
                        <input
                            type="number"
                            name="calorie"
                            disabled
                            className="w-20 text-black text-center pl-3 rounded-md p-1"
                            value={ calorieValue || formData.calorie }
                            onChange={ handleChange }
                        />
                    </div>
                    <button type="submit" className="bg-green-500 text-xl rounded-md p-2 mt-5 w-20">Save</button>
                </form>
            </div>
        </div>
    );
}

export default DietEditor;