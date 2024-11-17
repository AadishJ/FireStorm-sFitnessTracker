const gymSchedule = require( "../../Models/ScheduleModel" );

async function handleWorkoutSchedulerGet ( req, res )
{
    const userId = req.user._id;
    const workoutName = req.query.name;
    try
    {
        const reqSchedule = await gymSchedule.find( { userId: userId, workoutName: workoutName } );
        return res.status( 200 ).json( { reqSchedule: reqSchedule } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout schedule" } );
    }
}

async function handleWorkoutSchedulerPost ( req, res )
{
    const userId = req.user._id;
    const { name, day, bodyPart, exercise, weight, metric, reps, sets } = req.body;
    const workoutName = name;
    try
    {
        const reqSchedule = await gymSchedule.create( { userId, workoutName, day, bodyPart, exercise, weight, metric, reps, sets } );
        return res.status( 200 ).json( { message: "Exercise Added Successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot add exercise" } );
    }
}

module.exports = {
    handleWorkoutSchedulerGet,
    handleWorkoutSchedulerPost,
};