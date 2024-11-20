import useAxiosInstance from "../../useAxiosInstance";
import { useDate } from "../../Context/DateContext";
import { useAuth } from "../../Context/AuthContext";
function WorkoutSchedule ( { gymSchedule, yogaSchedule, handleClick, handleChange } )
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
    const dataSetter = async(e,id,exercise,type) =>
    {
        var datas;
        if ( type === "gym" )
        {
             datas = {
                exercise: exercise,
                date: selectedDate.toLocaleDateString( 'en-US' ),
                day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                type: type,
                isDone: false,
                workoutName: localStorage.getItem( "workoutName" ),
            };
        } else
        {
             datas = {
                 exercise: exercise,
                 date: selectedDate.toLocaleDateString( 'en-US' ),
                 day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
                 type: type,
                 isDone: false,
                 workoutName: localStorage.getItem( "yogaWorkoutName" ),
            }
            }
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
                <div className="text-black border-b-2 w-80 text-center border-black p-0.5">Strength Training</div>
                { gymSchedule.map( ( { _id, exercise } ) =>
                {
                    return (
                        
                        <div key={ _id } data-id={_id} className="w-4/5 h-20 bg-pink-600 m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={(e) => handleClick(e.currentTarget.dataset.id,exercise,"gym" ) }>
                            <div className="ml-2">{ exercise }</div>
                            <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={ ( e ) => handleCheckboxChange( e,e.currentTarget.dataset.id, exercise, "gym" )} />
                        </div>
                    );
                } ) }
                <div className="text-black border-b-2 w-80 text-center border-black">Asanas</div>
                { yogaSchedule.map( ( { _id, exercise, } ) =>
                {
                    return (
                        <div key={ _id } data-id={_id} className="w-4/5 h-20 bg-pink-600 m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ ( e ) => handleClick(  e.currentTarget.dataset.id,exercise,"yoga" ) }>
                            <div className="ml-2">{ exercise }</div>
                            <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={( e ) => handleCheckboxChange( e,e.currentTarget.dataset.id, exercise, "yoga" ) } />
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
}

export default WorkoutSchedule;