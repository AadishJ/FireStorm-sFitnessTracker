import useAxiosInstance from "../../useAxiosInstance";
import { useState } from "react";
import { MdDriveFileRenameOutline, MdEmail, MdPassword } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignupDark ()
{
    const {axiosInstance} = useAxiosInstance();
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState( {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isGoogle: Boolean,
    } );
    const handleSuccess = async ( res ) =>
    {
        try
        {
            formData.isGoogle = true;
            const decoded = jwtDecode( res.credential );
            formData.email = decoded.email;
            formData.name = decoded.name;
            await axiosInstance.post( "/signup", formData, {
                headers:
                {
                    "Content-Type": "application/json",
                },
            } );
            alert( "Success" );
            localStorage.setItem( "userName", decoded.name );
            navigate( "/dashboard" );
        } catch ( err )
        {
            if ( err.response.status === 400 || err.response.status === 404 || err.response.status === 409 )
            {
                alert( err.response.data.message );
            }
            else
            {
                alert( "Unexpected error occured" );
            }
        }
    }
    const handleFailure = ( res ) =>
    {
        alert( "Failure" );
    }
    const handleSubmit = async ( e ) =>
    {
        e.preventDefault();
        formData.isGoogle = false;
        if ( formData.confirmPassword !== formData.password )
        {
            alert( "Password and Confirm Password do not match" );
            return;
        }
        try
        {
            const response = await axiosInstance.post( "/signup", formData, {
                headers:
                {
                    "Content-Type": "application/json",
                },
            } );
            alert( response.data.message );
            navigate( "/login" )
        } catch ( err )
        {
            if ( err.response.status === 400 || err.response.status === 404 || err.response.status === 409 )
            {
                alert( err.response.data.message );
            } else
            {
                alert( "Unexpected error occured" );
            }
        }
    }
    const handleChange = ( e ) =>
    {
        setFormData( {
            ...formData,
            [ e.target.name ]: e.target.value,
        } );
    };
    return (
        <div className="flex items-center justify-center">
            <div className="bg-anotherPurple w-2/6 h-5/6 pb-5 mt-40 mb-32">
                <form onSubmit={ handleSubmit } className="text-white flex flex-col items-center mt-4 text-2xl font-roboto font-semibold gap-4">
                    <div className="mb-8 text-3xl font-outfit">
                        SIGN UP
                    </div>
                    <div className="relative flex items-center justify-center">
                        <MdDriveFileRenameOutline className="absolute left-0 fill-anotherPurple ml-4" />
                        <div className="absolute left-0 text-anotherPurple ml-12 mb-1 text-4xl font-normal">|</div>
                        <input type="text" placeholder="Name" name="name" className="border-2 font-normal pl-16 py-2 text-lg rounded-lg text-gray-600 w-80" required value={ formData.name } onChange={ handleChange } />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <MdEmail className="absolute left-0 fill-anotherPurple ml-4" />
                        <div className="absolute left-0 text-anotherPurple ml-12 mb-1 text-4xl font-normal">|</div>
                        <input type="text" placeholder="Email or Phone" name="email" className="border-2 font-normal pl-16 py-2 text-lg rounded-lg text-gray-600 w-80" required value={ formData.email } onChange={ handleChange } />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <MdPassword className="absolute left-0 fill-anotherPurple ml-4" />
                        <div className="absolute left-0 text-anotherPurple ml-12 mb-1 text-4xl font-normal">|</div>
                        <input type="password" placeholder="Password" name="password" className="border-2 font-normal pl-16 py-2 text-lg rounded-lg text-gray-600 w-80" required value={ formData.password } onChange={ handleChange } />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <MdPassword className="absolute left-0 fill-anotherPurple ml-4" />
                        <div className="absolute left-0 text-anotherPurple ml-12 mb-1 text-4xl font-normal">|</div>
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" className="border-2 font-normal pl-16 py-2 text-lg rounded-lg text-gray-600 w-80" required value={ formData.confirmPassword } onChange={ handleChange } />
                    </div>
                    <button className="w-80 bg-brightPurple py-2 rounded-lg">Submit</button>
                    <div className="text-lg">or Signup With</div>
                </form>
                <div className="flex flex-col items-center mt-2 mr-2">
                    <GoogleLogin
                        onSuccess={ handleSuccess }
                        onError={ handleFailure }
                        text="signup_with"
                    />
                    <Link className="text-white font-roboto font-semibold mt-5 hover:underline" to="/login">Already a Member? Login Now</Link>
                </div>
            </div>
        </div>
    );
}

export default SignupDark;