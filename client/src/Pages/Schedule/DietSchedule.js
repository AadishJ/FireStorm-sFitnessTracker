import { useAuth } from "../../Context/AuthContext";
import { useDate } from "../../Context/DateContext";
import useAxiosInstance from "../../useAxiosInstance";

function DietSchedule ({ dietSchedule, handleClick,handleChange })
{
    const { axiosInstance } = useAxiosInstance();
    const { handleLogout } = useAuth();
    const { selectedDate } = useDate();
    const handleCheckboxChange = ( e, id, food, type,meal ) =>
    {
        e.stopPropagation();
        dataSetter( e, id, food, type,meal ); // Call the second function
        handleChange( e, id, food, type,meal );
    };
    const dataSetter = async ( e, id, food, type,meal ) =>
    {
        const datas = {
            food: food,
            meal: meal,
            date: selectedDate.toLocaleDateString( 'en-US' ),
            day: selectedDate.toLocaleDateString( 'en-US', { weekday: 'long' } ),
            type: type,
            isDone: false,
            planName: localStorage.getItem( "dietPlanName" ),
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
                <div className="text-black  border-b-2 w-80 text-center border-black">Breakfast</div>
                { dietSchedule.map( ( { _id, food,meal } ) =>
                {
                    const id = _id;
                    if ( meal === "Breakfast" )
                    {
                        return (
                            <div key={ id } data-id={ _id } className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ ( e ) => handleClick( e.currentTarget.dataset.id,food,"diet" ) }>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={ ( e ) => handleCheckboxChange( e, e.currentTarget.dataset.id,food, "diet",meal ) } />
                            </div>
                        );
                    } else
                    {
                        return null;
                    }
                } ) }
                <div className="text-black border-b-2 w-80 text-center border-black">Lunch</div>
                { dietSchedule.map( ( { _id, food,meal } ) =>
                {
                    if ( meal === "Lunch" )
                    {
                        return (
                            <div key={ _id } data-id={ _id } className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ ( e ) => handleClick( e.currentTarget.dataset.id,food,"diet",meal ) }>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={ ( e ) => handleChange( e, e.currentTarget.dataset.id,food, "diet",meal ) } />
                            </div>
                        );
                    }else
                    {
                        return null;
                    }
                } ) }
                <div className="text-black border-b-2 w-80 text-center border-black">Dinner</div>
                { dietSchedule.map( ( { _id, food,meal } ) =>
                {
                    if ( meal === "Dinner" )
                    {
                        return (
                            <div key={ _id } data-id={_id} className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={(e)=>handleClick(e.currentTarget.dataset.id,food,"diet")}>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" data-id={ _id } className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } onChange={(e)=>handleChange(e,e.currentTarget.dataset.id,food,"diet",meal)}/>
                            </div>
                        );
                    }else
                    {
                        return null;
                    }
                } ) }
            </div>
        </div>
    );
}

export default DietSchedule;