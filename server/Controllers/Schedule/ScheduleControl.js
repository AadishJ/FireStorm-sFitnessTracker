const gymSchedule = require( "../../Models/ScheduleModel" );
const yogaSchedule = require( "../../Models/YogaScheduleModel" );
const cardioSchedule = require( "../../Models/CardioScheduleModel" );
const dietSchedule = require( "../../Models/DietScheduleModel" );
async function handleScheduleGet ( req, res )
{
    const userId = req.user._id;
    const { workoutName, yogaWorkoutName, dietPlanName, cardioWorkoutName, day } = req.query;
    try
    {
        const yogaScheduleData = await yogaSchedule.find( { userId: userId, workoutName: yogaWorkoutName, day: day } );
        const gymScheduleData = await gymSchedule.find( { userId: userId, workoutName: workoutName, day: day } );
        const dietScheduleData = await dietSchedule.find( { userId: userId, planName: dietPlanName, day: day } );
        const cardioScheduleData = await cardioSchedule.find( { userId: userId, workoutName: cardioWorkoutName, day: day } );
        return res.status( 200 ).json( { gymScheduleData, yogaScheduleData, dietScheduleData, cardioScheduleData } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch schedule" } );
    }
}

async function handleSchedulePost ( req, res )
{

}

module.exports = {
    handleScheduleGet,
    handleSchedulePost
}