const gymSchedule = require( "../../Models/ScheduleModel" );
const yogaSchedule = require( "../../Models/YogaScheduleModel" );
const cardioSchedule = require( "../../Models/CardioScheduleModel" );
const dietSchedule = require( "../../Models/DietScheduleModel" );
const DailyWorkout = require( "../../Models/DailyWorkoutModel" );
const DailyDiet = require( "../../Models/DailyDietModel" );
const DailyYoga = require( "../../Models/DailyYogaModel" );
const DailyCardio = require( "../../Models/DailyCardioModel" );
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
        const gymDailySchedule = await DailyWorkout.find( { userId: userId, day } );
        const filteredGymDailySchedule = gymDailySchedule.filter( dailyExercise =>
        {
            return !gymScheduleData.some( scheduleExercise => scheduleExercise.exercise === dailyExercise.exercise );
        } );
        const allGymExercise = gymScheduleData.concat( filteredGymDailySchedule );
        return res.status( 200 ).json( { allGymExercise, yogaScheduleData, dietScheduleData, cardioScheduleData } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch schedule" } );
    }
}

async function handleSchedulePost ( req, res )
{
    const userId = req.user._id;
    req.body.forEach( async ( { id, exercise,food, date, type, meal,isDone } ) =>
    {
        if ( type === "gym" )
        {
            try
            {
                const res = await DailyWorkout.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update gym schedule" } );
            }
        } else if ( type === "yoga" )
        {
            try
            {
                await DailyYoga.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update yoga schedule" } );
            }
        } else if ( type === "cardio" )
        {
            try
            {
                await DailyCardio.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update cardio schedule" } );
            }
        } else
        {
            try
            {
                await DailyDiet.findOneAndUpdate( { userId: userId, food, date, meal }, { isDone: isDone } );
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update diet schedule" } );
            }
        }
    } )
    return res.status( 200 ).json( { message: "Schedule Updated Successfully" } );
}

module.exports = {
    handleScheduleGet,
    handleSchedulePost
}