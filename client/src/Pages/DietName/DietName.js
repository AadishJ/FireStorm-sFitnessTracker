import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function DietName ()
{
    const {handleLogout} = useAuth();
    const navigate = useNavigate();
    const [ planName, setPlanName ] = useState( "" );
    const [ allPlanNames, setAllPlanNames ] = useState( [] );
    const [ value, setValue ] = useState( "" );

    useEffect( () =>
    {
        const currentDietPlan = localStorage.getItem( "dietPlanName" );
        if ( currentDietPlan )
        {
            navigate( "/diet" );
        }
        const getPlanNames = async () =>
        {
            try
            {
                const res = await axios.get( "/diet/name", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                setAllPlanNames( res.data.allNames.map( name => name.name ) );
            } catch ( err )
            {
                if ( err.response.status === 404 )
                {
                    alert( err?.response?.data?.message );
                    await handleLogout();
                } else
                    alert( err?.response?.data?.message );
            }
        };
        getPlanNames();
    }, [ navigate,handleLogout ] );
    const handleOptionChange = ( e ) =>
    {
        setPlanName( e.target.value );
    };
    const handleValueChange = ( e ) =>
    {
        setValue( e.target.value );
    };
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        if ( planName === "new" )
        {
            try
            {
                await axios.post( "/diet/name", { value }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                } );
                localStorage.setItem( "dietPlanName", value );
                navigate( "/diet" );
            } catch ( err )
            {
                if ( err.response.status === 404 )
                {
                    alert( err?.response?.data?.message );
                    await handleLogout();
                } else
                    alert( err?.response?.data?.message );
            }
        } else
        {
            localStorage.setItem( "dietPlanName", planName );
            navigate( "/diet" );
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-2/5 h-3/5 bg-anotherPurple flex flex-col gap-2 items-center rounded-2xl">
                <div className="text-white font-bold font-outfit text-2xl mt-4">Select Diet Plan</div>
                <form onSubmit={ handleSubmit } className="flex flex-col gap-4 items-center">
                    <select required name="planName" id="planName" onChange={ handleOptionChange } className="mt-20 w-96 text-center bg-customYellow text-white h-20 rounded-xl text-lg border-2 border-white">
                        <option value="" defaultChecked>Select Diet Plan</option>
                        <option value="new" className="">Create New Plan</option>
                        { allPlanNames.map( ( name, index ) => (
                            <option className="" key={ index } value={ name }>{ name }</option>
                        ) ) }
                    </select>
                    { planName === "new" && (
                        <div className="">
                            <label className="font-medium font-roboto text-2xl text-white">Enter Plan Name:</label>
                            <div className="flex flex-col gap-4 items-center">
                                <input type="text" className="w-96 h-12 bg-white text-center text-lg " placeholder="Enter Plan Name" value={ value } onChange={ handleValueChange } required />
                                <button type="submit" className="bg-customYellow w-40 h-12 rounded-lg font-roboto text-xl text-white">Create</button>
                            </div>
                        </div>
                    ) }{ planName !== "new" && planName !== "" && <button type="submit" className="bg-customYellow w-40 h-12 rounded-lg font-roboto text-xl text-white">Open</button> }
                </form>
            </div>
        </div>
    )
}

export default DietName;