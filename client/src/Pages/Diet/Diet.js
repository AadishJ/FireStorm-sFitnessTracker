import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import FoodSelector from "./FoodSelector";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosInstance";
import { useAuth } from "../../Context/AuthContext";

function Diet ()
{
    const { logoutHandle } = useAuth();
    const navigate = useNavigate();
    const week = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const [ isOpen, setIsOpen ] = useState( false );
    const [ foodAdded, setFoodAdded ] = useState( false );
    const [ schedule, setSchedule ] = useState( [] );
    const [ formValues, setFormValues ] = useState( {
        name: "",
        day: "",
        meal: '',
        food: '',
        quantity: '0',
        calorie: '0',
    } );
    useEffect( () =>
    {
        const name = localStorage.getItem( "dietPlanName" );
        if ( !name )
        {
            navigate( "/diet/name" );
        } else
        {
            setFormValues( prevValues => ( { ...prevValues, name: name } ) );
            const fetchData = async () =>
            {
                try
                {
                    const res = await axios.get( "/diet/scheduler", {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        params: {
                            name: name,
                        },
                    } )
                    setSchedule( res.data.reqSchedule );
                } catch ( err )
                {
                    if ( err.response.status === 404 )
                    {
                        alert( err?.response?.data?.message );
                        await logoutHandle();
                    } else
                        alert( err?.response?.data?.message );
                }
            }
            fetchData();
        }
    }, [ logoutHandle, navigate, foodAdded ] );

    const render = () =>
    {
        if ( isOpen )
        {
            return <FoodSelector isOpen={ isOpen } setIsOpen={ setIsOpen } formData={ formValues } setFormData={ setFormValues } setFoodAdded={ setFoodAdded } foodAdded={ foodAdded } />;
        } else
        {
            return null;
        }
    };

    const handleClick = ( e ) =>
    {
        setFormValues( { ...formValues, day: e.currentTarget.dataset.value } );
        setIsOpen( true );
    };
    const handleChangeSchedule = () =>
    {
        localStorage.removeItem( "dietPlanName" );
        navigate( "/diet/name" );
    }

    return (
        <div>
            { render() }
            <div className="h-screen w-full flex justify-center  mt-32 ">
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-white text-2xl mb-4 self-center">Currently Editing: { formValues.name }</div>
                        <div className="text-white text-md mb-4 hover:underline cursor-pointer" onClick={ handleChangeSchedule }>Change Selected Schedule</div>
                    </div>
                    <div className="flex gap-2 text-white justify-center">
                        { week.map( ( day ) => (
                            <div key={ day } className="flex flex-col gap-2 items-center">
                                <div className="border h-fit w-28 p-3 text-center relative group cursor-pointer bg-brightPurple" onClick={ handleClick } data-value={ day }>
                                    { day }
                                    <FaPlus className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 fill-white m-1" />
                                </div>
                                <div className="bg-yellow-300 w-full h-8 text-black font-roboto font-semibold flex items-center justify-center">BREAKFAST</div>
                                { schedule.map( ( food ) =>
                                {
                                    if ( food.day === day )
                                    {
                                        if ( food.meal === "Breakfast" )
                                        {
                                            return (
                                                <div key={ food._id } className="flex flex-col gap-2 items-center">
                                                    <div className="border h-fit w-28 p-3 px-1 text-center">{ food.food }</div>
                                                </div>
                                            );
                                        } else
                                        {
                                            return null;
                                        }
                                    } else
                                    {
                                        return null;
                                    }
                                } ) }
                                <div className="bg-filterPink w-full h-8 text-black font-roboto font-semibold flex items-center justify-center">LUNCH</div>
                                { schedule.map( ( food ) =>
                                {
                                    if ( food.day === day )
                                    {
                                        if ( food.meal === "Lunch" )
                                        {
                                            return (
                                                <div key={ food._id } className="flex flex-col gap-2 items-center">
                                                    <div className="border h-fit w-28 p-3 px-1 text-center">{ food.food }</div>
                                                </div>
                                            );
                                        } else
                                        {
                                            return null;
                                        }
                                    } else
                                    {
                                        return null;
                                    }
                                } ) }
                                <div className="bg-cyan w-full h-8 text-black font-roboto font-semibold flex items-center justify-center">DINNER</div>
                                { schedule.map( ( food ) =>
                                {
                                    if ( food.day === day )
                                    {
                                        if ( food.meal === "Dinner" )
                                        {
                                            return (
                                                <div key={ food._id } className="flex flex-col gap-2 items-center">
                                                    <div className="border h-fit w-28 p-3 px-1 text-center">{ food.food }</div>
                                                </div>
                                            );
                                        } else
                                        {
                                            return null;
                                        }
                                    } else
                                    {
                                        return null;
                                    }
                                } ) }
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diet;