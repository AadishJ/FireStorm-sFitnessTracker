import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ExerciseSelector from "./ExerciseSelector";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../useAxiosInstance";
import { useAuth } from "../../Context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function Workout ()
{
    const { handleLogout } = useAuth();
    const { axiosInstance } = useAxiosInstance();
    const navigate = useNavigate();
    const week = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const [ isOpen, setIsOpen ] = useState( false );
    const [ exerciseAdded, setExerciseAdded ] = useState( false );
    const [ schedule, setSchedule ] = useState( [] );
    const [ formValues, setFormValues ] = useState( {
        name: "",
        day: "",
        bodyPart: '',
        exercise: '',
        weight: '',
        metric: 'kg',
        reps: '',
        sets: ''
    } );
    useEffect( () =>
    {
        const name = localStorage.getItem( "workoutName" );
        if ( !name )
        {
            navigate( "/workout/name" );
        } else
        {
            setFormValues( prevValues => ( { ...prevValues, name: name } ) );
            const fetchData = async () =>
            {
                try
                {
                    const res = await axiosInstance.get( "/workout/scheduler", {
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
                        await handleLogout();
                    } else
                        alert( err?.response?.data?.message );
                }
            }
            fetchData();
        }
    }, [ exerciseAdded, handleLogout, navigate, axiosInstance ] );

    const render = () =>
    {
        if ( isOpen )
        {
            return <ExerciseSelector isOpen={ isOpen } setIsOpen={ setIsOpen } formData={ formValues } setFormData={ setFormValues } setExerciseAdded={ setExerciseAdded } exerciseAdded={ exerciseAdded } />;
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
        localStorage.removeItem( "workoutName" );
        navigate( "/workout/name" );
    }
    const handleDelete = async ( e ) =>
    {
        const data = {
            exercise: e.currentTarget.dataset.exercise,
            day: e.currentTarget.dataset.day,
            scheduleName: localStorage.getItem( "workoutName" )
        };
        try
        {
                await axiosInstance.delete( "/workout/scheduler", {
                headers: {
                    "Content-Type": "application/json",
                },
                data
            } );
            setExerciseAdded( !exerciseAdded );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                // await handleLogout();
            } else
                alert( err?.response?.data?.message );
        }
    }
    return (
        <div>
            { render() }
            <div className="h-screen w-full flex justify-center mt-32">
                <div className="flex flex-col gap-4 items-center">
                    <div className="flex justify-between w-full items-center">
                        <div className="text-white text-2xl mb-4 self-center">Currently Editing: { formValues.name }</div>
                        <div className="text-white text-md hover:underline cursor-pointer flex items-center" onClick={ handleChangeSchedule }>
                            Change Selected Schedule
                            <FaArrowUpRightFromSquare className="fill-white ml-2" />
                        </div>                    </div>
                    <div className="flex gap-2 text-white justify-center">
                        { week.map( ( day ) => (
                            <div key={ day } className="flex flex-col gap-2 items-center">
                                <div className="border h-fit w-28 p-3 text-center relative group cursor-pointer bg-brightPurple" onClick={ handleClick } data-value={ day }>
                                    { day }
                                    <FaPlus className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 fill-white m-1" />
                                </div>
                                { schedule.map( ( exercise ) =>
                                {
                                    if ( exercise.day === day )
                                    {
                                        return (
                                            <div key={ exercise._id } className="flex flex-col gap-2 items-center">
                                                <div className="border h-fit w-28 p-3 px-1 text-center relative group">
                                                    <RxCross2 data-exercise={exercise.exercise} data-day={exercise.day} className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 fill-white m-1 cursor-pointer" onClick={handleDelete}/>
                                                    { exercise.exercise }
                                                </div>
                                            </div>
                                        );
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

export default Workout;