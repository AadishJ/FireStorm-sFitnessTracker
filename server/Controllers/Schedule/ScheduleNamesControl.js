const cardioName = require( "../../Models/CardioName" );
const dietName = require( "../../Models/DietName" );
const workoutName = require( "../../Models/WorkoutName" );
const yogaName = require( "../../Models/YogaName" );

async function handleScheduleNamesGet ( req, res )
{
    const userId = req.user._id;
    try
    {
        const workoutNames = await workoutName.find( { userId: userId } );
        const cardioNames = await cardioName.find( { userId: userId } );
        const yogaNames = await yogaName.find( { userId: userId } );
        const dietNames = await dietName.find( { userId: userId } );
        return res.status( 200 ).json( { workoutNames, cardioNames, yogaNames, dietNames } );
    }catch(err)
    {
        return res.status( 500 ).json( { message:"Cannot fetch Schedule Names" } );
    }

}

async function handleScheduleNamesPost ( req, res )
{

}

module.exports = { handleScheduleNamesGet, handleScheduleNamesPost };