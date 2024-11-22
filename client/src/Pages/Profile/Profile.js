import useAxiosInstance from "../../useAxiosInstance";
import { useEffect, useState } from "react";

function Profile ()
{
    const { axiosInstance } = useAxiosInstance();
    const [ formValues, setFormValues ] = useState( {
        name: "",
        gender: "",
        age: "",
        height: "",
        weight: "",
        goal: "",
        activityLevel: "",
    } );
    useEffect( () =>
    {
        const getFormValues = async () =>
        {
            try
            {
                const res = await axiosInstance.get( "./profile", {
                    headers: {
                        "Content-Type": "JSON",
                    },
                } )
                const profile = res.data.profile;
                const name = localStorage.getItem( "userName" );
                if ( !profile )
                {
                    setFormValues( { name } );
                }else
                    setFormValues( { name, gender: profile.gender, age: profile.age, height: profile.height, weight: profile.weight, goal: profile.goal, activityLevel: profile.activityLevel } );
            } catch ( err )
            {
                alert( err?.response?.data.message );
            }
        }
        getFormValues();
    }, [ axiosInstance ] )
    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormValues( ( prevData ) =>
        {
            const newData = { ...prevData, [ name ]: value };
            return newData;
        } );
    }
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        try
        {
            const updatedValues = {
                ...formValues,
                name: localStorage.getItem( "userName" ),
            };
            const res = await axiosInstance.post( "/profile", updatedValues, {
                headers: {
                    "Content-Type": "application/json",
                },
            } );
            alert( res.data.message );
        } catch ( err )
        {
            alert( err?.response?.data?.message );
        }
    };
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-4/6 h-5/6 bg-backLightPurple mt-20 flex flex-col gap-4">
                <div className="text-4xl font-outfit font-semibold text-white mt-4 self-center">Profile</div>
                <form onSubmit={ handleSubmit } className="text-white m-14 flex flex-col gap-6 flex-wrap justify-center items-start">
                    <div className="flex items-center justify-center gap-4">
                        <label >Name</label>
                        <input disabled className="text-center font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-full h-8" type="text" name="name" value={ formValues.name } placeholder="Enter your Name" onChange={ handleChange } />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Age</label>
                        <input className="text-center font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-12 h-8" name="age" value={ formValues.age } placeholder="Age" onChange={ handleChange } />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Gender</label>
                        <select className="text-center font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-24  h-8" name="gender" value={ formValues.gender } placeholder="Gender" onChange={ handleChange }>
                            <option value="" default disabled>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Height (in inch)</label>
                        <input className="text-center pl-3 font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-24 h-8" name="height" type="number" value={ formValues.height } placeholder="Height" onChange={ handleChange } />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Weight (in Kg)</label>
                        <input className="text-center pl-3 font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-24 h-8" name="weight" type="number" value={ formValues.weight } placeholder="Weight" onChange={ handleChange } />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Goal</label>
                        <input className="text-center font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-32 pl-4 h-8" type="number" name="goal" value={ formValues.goal } placeholder="Goal Weight" onChange={ handleChange } />
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <label>Activity Level</label>
                        <select className="text-center pl-3 font-roboto border-2 border-pinkPurple bg-backLightPurple placeholder:text-white placeholder:opacity-70 w-44 h-8" name="activityLevel" value={ formValues.activityLevel } onChange={ handleChange }>
                            <option value="" default disabled>Activity Level</option>
                            <option value="sedentary">Sedentary</option>
                            <option value="light">Light</option>
                            <option value="moderate">Moderate</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                    <button className="bg-cyan text-white w-full h-10 rounded-md" type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;