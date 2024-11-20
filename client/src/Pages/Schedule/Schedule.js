import { useEffect, useState } from "react";
import getSchedule from "./GetSchedule";
import WorkoutSchedule from "./WorkoutSchedule";
import CardioSchedule from "./CardioSchedule";
import DietSchedule from "./DietSchedule";
import EditorSetup from "../../UI/EditorSetup";
import { useDate } from "../../Context/DateContext";
import { useAuth } from "../../Context/AuthContext";
import useAxiosInstance from "../../useAxiosInstance";
import GetScheduleNames from "./GetScheduleNames";
import ExerciseSelector from "../../UI/WorkoutExerciseSelector";

function Schedule ()
{
    const { axiosInstance } = useAxiosInstance();
    const { selectedDate } = useDate();
    const { handleLogout } = useAuth();
    const [ gymSchedule, setGymSchedule ] = useState( [] );
    const [ yogaSchedule, setYogaSchedule ] = useState( [] );
    const [ dietSchedule, setDietSchedule ] = useState( [] );
    const [ cardioSchedule, setCardioSchedule ] = useState( [] );
    const [ exercise, setExercise ] = useState( "" );
    const [ editor, setEditor ] = useState( [ false, false, false, false ] );
    const [ id, setId ] = useState( "" );
    const [ data, setData ] = useState( [] );
    const [ name, setName ] = useState( {} );
    const [ workoutName, setWorkoutName ] = useState( "" );
    const [ yogaWorkoutName, setYogaWorkoutName ] = useState( "" );
    const [ dietPlanName, setDietPlanName ] = useState( "" );
    const [ cardioWorkoutName, setCardioWorkoutName ] = useState( "" );
    const [ exerciseAdded, setExerciseAdded ] = useState( false );
    const [ formOpen, setFormOpen ] = useState( [false, false, false, false] );
    const [ workoutFormValues, setWorkoutFormValues ] = useState( {
        date:"",
        day: "",
        bodyPart: '',
        exercise: '',
        weight: '',
        metric: 'kg',
        reps: '',
        sets: ''
    } )
    useEffect( () =>
    {
        const fetchData = async () =>
        {
            const res = await getSchedule( selectedDate, handleLogout, axiosInstance );
            setGymSchedule( res.allGymExercise );
            setYogaSchedule( res.yogaScheduleData );
            setDietSchedule( res.dietScheduleData );
            setCardioSchedule( res.cardioScheduleData );
        }
        fetchData();
    }, [ selectedDate, handleLogout, axiosInstance, dietPlanName, cardioWorkoutName, workoutName, yogaWorkoutName,exerciseAdded ] );
    useEffect( () =>
    {
        const fetchNames = async () =>
        {
            const names = await GetScheduleNames( axiosInstance, handleLogout, setExerciseAdded );
            setName( names );
            setWorkoutName( localStorage.getItem( "workoutName" ) );
            setYogaWorkoutName( localStorage.getItem( "yogaWorkoutName" ) );
            setDietPlanName( localStorage.getItem( "dietPlanName" ) );
            setCardioWorkoutName( localStorage.getItem( "cardioWorkoutName" ) );
        }
        fetchNames();
    }, [ axiosInstance, handleLogout ] );
    const render = () =>
    {
        if ( editor[ 0 ] )
        {
            return <EditorSetup type={ "gym" } id={ id } exercise={ exercise } handleClose={ handleClose } editor={ editor } setEditor={ setEditor } />
        }
        else if ( editor[ 1 ] )
        {
            return <EditorSetup type={ "yoga" } id={ id } exercise={ exercise } handleClose={ handleClose } editor={ editor } setEditor={ setEditor } />
        }
        else if ( editor[ 2 ] )
        {
            return <EditorSetup type={ "diet" } id={ id } exercise={ exercise } handleClose={ handleClose } editor={ editor } setEditor={ setEditor } />
        }
        else if ( editor[ 3 ] )
        {
            return <EditorSetup type={ "cardio" } id={ id } exercise={ exercise } handleClose={ handleClose } editor={ editor } setEditor={ setEditor } />
        }
    }
    const handleClose = () =>
    {
        setEditor( [ false, false, false, false ] );
    }
    const handleClick = ( id, exercise, type ) =>
    {
        setId( id );
        setExercise( exercise );
        if ( type === "gym" )
        {
            setEditor( [ true, false, false, false ] );
        }
        else if ( type === "yoga" )
        {
            setEditor( [ false, true, false, false ] );
        }
        else if ( type === "diet" )
        {
            setEditor( [ false, false, true, false ] );
        }
        else if ( type === "cardio" )
        {
            setEditor( [ false, false, false, true ] );
        }
    }
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const res = await axiosInstance.post( "/schedule", data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            alert( res.data.message );
        } catch ( err )
        {
            if ( err.response.status === 404 )
            {
                alert( err?.response?.data?.message );
                handleLogout();
            } else
            {
                alert( err?.response?.data?.message );
            }
        }
    }
    const handleChange = ( e, id, exercise, type, meal ) =>
    {
        if ( e.currentTarget.checked )
        {
            if ( meal )
            {
                setData( [ ...data,
                {
                    _id: id,
                    food: exercise,
                    type: type,
                    day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                    date: selectedDate.toLocaleDateString( 'en-US' ),
                    isDone: e.currentTarget.checked,
                    meal: meal
                }
                ] );
            } else
            {
                setData( [ ...data,
                {
                    _id: id,
                    exercise: exercise,
                    type: type,
                    day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                    date: selectedDate.toLocaleDateString( 'en-US' ),
                    isDone: e.currentTarget.checked
                }
                ] );
            }
        } else
        {
            const newData = data.filter( ( item ) => item._id !== id );
            setData( newData );
        }
    }
    const handleWorkoutNameChange = ( e ) =>
    {
        setWorkoutName( e.target.value );
        localStorage.setItem( "workoutName", e.target.value );
    }
    const handleYogaNameChange = ( e ) =>
    {
        setYogaWorkoutName( e.target.value );
        localStorage.setItem( "yogaWorkoutName", e.target.value );
    }
    const handleCardioNameChange = ( e ) =>
    {
        setCardioWorkoutName( e.target.value );
        localStorage.setItem( "cardioWorkoutName", e.target.value );
    }
    const handleDietNameChange = ( e ) =>
    {
        setDietPlanName( e.target.value );
        localStorage.setItem( "dietPlanName", e.target.value );
    }
    const render2 = ( e ) =>
    {
        if ( formOpen[ 0 ] )
        {
            return <ExerciseSelector isOpen={ formOpen[0] } setIsOpen={ setFormOpen } formData={ workoutFormValues } setFormData={ setWorkoutFormValues } setExerciseAdded={ setExerciseAdded } exerciseAdded={ exerciseAdded } />;
        } else if ( formOpen[ 1 ] )
        {

        }
        else
        {
            return null;
        }
    }
    return (
        <div>
            { render2() }
            { render() }
            <div className="w-full min-h-screen bg-anotherPurple">
                <div className="h-fit flex justify-center text-white text-4xl font-bold font-outfit mt-20 ml-28 mb-4 pt-6 pb-6">
                    <div>Today's Schedule</div>
                </div>
                <form onSubmit={ handleSubmit }>
                    <div className="flex justify-center gap-6 ml-32 mr-4 font-semibold text-white text-3xl font-outfit pl-2 pb-16">
                        <div className="w-2/6 border-4 border-pink-600 h-fit rounded-xl">
                            <div className="w-full h-24 bg-pink-600 flex flex-col items-center justify-center">
                                <div>
                                    Workout
                                </div>
                                <div className="flex text-sm justify-between items-center w-full px-4">
                                    <div>
                                        <label htmlFor="">Current Workout Plan:</label>
                                        <select name="" id="" className="bg-pink-600" value={ workoutName } onChange={ handleWorkoutNameChange }>
                                            { name.workoutNames?.map( ( item, index ) => <option key={ index } value={ item.name }>{ item.name }</option> ) }
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="">Current Yoga Plan:</label>
                                        <select name="" id="" className="bg-pink-600" value={ yogaWorkoutName } onChange={ handleYogaNameChange }>
                                            { name.yogaNames?.map( ( item, index ) => <option key={ index } value={ item.name }>{ item.name }</option> ) }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <WorkoutSchedule gymSchedule={ gymSchedule } yogaSchedule={ yogaSchedule } handleClick={ handleClick } handleChange={ handleChange } setFormOpen={setFormOpen} />
                        </div>
                        <div className="w-2/6 border-4 border-yellow-500 h-fit rounded-xl">
                            <div className="w-full h-24 flex-col bg-yellow-500 flex items-center justify-center">
                                <div>
                                    Cardio
                                </div>
                                <div className="flex text-sm justify-center items-center w-full mx-8">
                                    <div>
                                        <label htmlFor="">Current Cardio Plan:</label>
                                        <select name="" id="" className="bg-yellow-500" value={ cardioWorkoutName } onChange={ handleCardioNameChange }>
                                            { name.cardioNames?.map( ( item, index ) => <option key={ index } value={ item.name }>{ item.name }</option> ) }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <CardioSchedule cardioSchedule={ cardioSchedule } handleClick={ handleClick } handleChange={ handleChange } />
                        </div>
                        <div className="w-2/6 border-4 border-cyan h-fit rounded-xl">
                            <div className="w-full h-24 flex-col bg-cyan flex items-center justify-center">
                                <div>
                                    Diet
                                </div>
                                <div className="flex text-sm justify-center items-center w-full mx-8">
                                    <div>
                                        <label htmlFor="">Current Diet Plan:</label>
                                        <select name="" id="" className="bg-cyan" value={ dietPlanName } onChange={ handleDietNameChange }>
                                            { name.dietNames?.map( ( item, index ) => <option key={ index } value={ item.name }>{ item.name }</option> ) }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <DietSchedule dietSchedule={ dietSchedule } handleClick={ handleClick } handleChange={ handleChange } />
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center h-20 p-20 pl-28">
                        <button type="submit" className="w-2/5 h-20 ml-24 bg-blue-400 rounded-xl text-white text-2xl font-bold font-roboto">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Schedule;