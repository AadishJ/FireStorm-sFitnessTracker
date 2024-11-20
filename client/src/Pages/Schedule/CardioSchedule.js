import { useAuth } from "../../Context/AuthContext";
import { useDate } from "../../Context/DateContext";
import useAxiosInstance from "../../useAxiosInstance";

function CardioSchedule ( { cardioSchedule, handleClick, handleChange } )
{
    const { axiosInstance } = useAxiosInstance();
    const { handleLogout } = useAuth();
    const { selectedDate } = useDate();
    const handleCheckboxChange = ( e, id, exercise, type ) =>
    {
        e.stopPropagation();
        dataSetter( e, id, exercise, type ); // Call the second function
        handleChange( e, id, exercise, type );
    };
    const dataSetter = async ( e, id, exercise, type ) =>
    {
        const datas = {
            exercise: exercise,
            date: selectedDate.toLocaleDateString( 'en-US' ),
            day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
            type: type,
            isDone: false,
            workoutName: localStorage.getItem( "cardioWorkoutName" ),
        };
        try
        {
               await axiosInstance.post( "/schedule/daily", datas,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
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
    return (
        <div className="w-full min-h-screen h-full bg-gray-300 rounded-b-lg">
            <div className="flex flex-col gap-2 items-center pt-8">
                { cardioSchedule.map( ( { _id, exercise } ) =>
                {
                    return (
                        <div key={ _id } data-id={_id} className="w-4/5 h-20 bg-yellow-500 m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ ( e ) => handleClick( e.currentTarget.dataset.id,exercise,"cardio" ) }>
                            <div className="ml-2">{ exercise }</div>
                            <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={ ( e ) => handleCheckboxChange( e, e.currentTarget.dataset.id, exercise, "cardio" ) } />
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
}

export default CardioSchedule;