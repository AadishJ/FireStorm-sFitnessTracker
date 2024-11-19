import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ExerciseSelector from "./ExerciseSelector";
import { useNavigate } from "react-router-dom";
import useAxiosInstance from "../../useAxiosInstance";
import { useAuth } from "../../Context/AuthContext";

function Yoga ()
{
    const { logoutHandle } = useAuth();
    const { axiosInstance}  = useAxiosInstance();
    const navigate = useNavigate();
    const week = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
    const [ isOpen, setIsOpen ] = useState( false );
    const [ exerciseAdded, setExerciseAdded ] = useState( false );
    const [ schedule, setSchedule ] = useState( [] );
    const [ formValues, setFormValues ] = useState( {
        name: "",
        day: "",
        types: '',
        exercise: '',
        sec: '0',
        min: '0',
        hr: '0',
        sets: ''
    } );
    useEffect( () =>
    {
        const name = localStorage.getItem( "yogaWorkoutName" );
        if ( !name )
        {
            navigate( "/yoga/name" );
        } else
        {
            setFormValues( prevValues => ( { ...prevValues, name: name } ) );
            const fetchData = async () =>
            {
                try
                {
                    const res = await axiosInstance.get( "/yoga/scheduler", {
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
    }, [ logoutHandle, navigate, exerciseAdded, axiosInstance ] );

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
        localStorage.removeItem( "yogaWorkoutName" );
        navigate( "/yoga/name" );
    }

    return (
        <div>
            { render() }
            <div className="h-screen w-full flex justify-center mt-32">
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
                                { schedule.map( ( exercise ) =>
                                {
                                    if ( exercise.day === day )
                                    {
                                        return (
                                            <div key={ exercise._id } className="flex flex-col gap-2 items-center">
                                                <div className="border h-fit w-28 p-3 px-1 text-center">{ exercise.exercise }</div>
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

export default Yoga;