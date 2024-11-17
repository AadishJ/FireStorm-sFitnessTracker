const schedule = require( "../../Models/CardioScheduleModel" );

async function handleCardioSchedulerGet ( req, res )
{
    const userId = req.user._id;
    const workoutName = req.query.name;
    try
    {
        const reqSchedule = await schedule.find( { userId:userId,workoutName: workoutName } );
        return res.status( 200 ).json({reqSchedule:reqSchedule});
    }catch(err)
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout schedule" } );
    }
}

async function handleCardioSchedulerPost ( req, res )
{
    const userId = req.user._id;
    const { name, day,types, exercise, hr, min, sec, sets } = req.body;
    const workoutName = name;
    try
    {
        const reqSchedule = await schedule.create( {userId, workoutName, day,types, exercise, hr, min, sec, sets } );
        return res.status( 200 ).json({message:"Exercise Added Successfully"});
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot add exercise" } );
    }
}

module.exports = {
    handleCardioSchedulerGet,
    handleCardioSchedulerPost
};