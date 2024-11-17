function CardioSchedule ({ cardioSchedule,handleClick })
{
    return (
        <div className="w-full min-h-screen h-full bg-gray-300 rounded-b-lg">
            <div className="flex flex-col gap-2 items-center pt-8">
                { cardioSchedule.map( ( { _id, exercise } ) =>
                {
                    return (
                        <div key={ _id } className="w-4/5 h-20 bg-yellow-500 m-2 flex items-center justify-between rounded-md cursor-pointer" onClick={ () => handleClick( _id,"cardio" ) }>
                            <div className="ml-2">{ exercise }</div>
                            <input type="checkbox" className=" w-5 h-5 mr-5 border-white" onClick={ ( e ) => e.stopPropagation() } />
                        </div>
                    );
                } ) }
            </div>
        </div>
    );
}

export default CardioSchedule;