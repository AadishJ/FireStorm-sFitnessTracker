function DietSchedule ({ dietSchedule, handleClick })
{
    return (
        <div className="w-full min-h-screen h-full bg-gray-300 rounded-b-lg">
            <div className="flex flex-col gap-2 items-center pt-8">
                <div className="text-black  border-b-2 w-80 text-center border-black">Breakfast</div>
                { dietSchedule.map( ( { _id, food,meal } ) =>
                {
                    if ( meal === "Breakfast" )
                    {
                        return (
                            <div key={ _id } className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ () => handleClick( _id,"diet" ) }>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() }/>
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
                            <div key={ _id } className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ () => handleClick( _id,"diet" ) }>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() }/>
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
                            <div key={ _id } className="w-4/5 h-20 bg-cyan m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={()=>handleClick(_id,"diet")}>
                                <div className="ml-2">{ food }</div>
                                <input type="checkbox" className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() }/>
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