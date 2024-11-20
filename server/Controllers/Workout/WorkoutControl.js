const dailyWorkoutModel = require( '../../Models/DailyWorkoutModel' );
const gymSchedule = require( '../../Models/ScheduleModel' );
async function handleWorkoutGet ( req, res )
{
    const userId = req.user._id;
    const id = req.query.id;
    const date = req.query.date;
    const exercise = req.query.exercise;
    try
    {
        const reqExercise1 = await dailyWorkoutModel.find( { userId: userId, date: date, exercise:exercise } );
        if ( reqExercise1.length === 0 )
        {
            const reqExercise = await gymSchedule.find( { userId: userId, _id: id } );
            return res.status( 200 ).json( { reqExercise: reqExercise,reqExercise1:false } );
        } 
        else
        {
            return res.status( 200 ).json( { reqExercise1: reqExercise1,reqExercise:false } );
        }
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout schedule" } );
    }
}

async function handleWorkoutPost (req,res)
{
    const userId = req.user._id;
    const { weight, metric, reps, sets, day, exercise, date,isDone } = req.body;
    try
    {
        const reqExercise = await dailyWorkoutModel.find( { userId: userId, date: date, exercise: exercise } );
        if ( reqExercise.length === 0 )
        {
            const newWorkout = await dailyWorkoutModel.create( {
                userId,
                weight,
                metric,
                reps,
                sets,
                day,
                exercise,
                date,
                isDone,
            } );
        } else
        { 
            const updateWorkout = await dailyWorkoutModel.updateOne( { userId: userId, date: date, exercise: exercise }, {
                weight,
                metric,
                reps,
                sets,
                day,
                exercise,
                date,
                isDone,
            } );
        }  
        return res.status( 200 ).json( { message: "Workout Updated successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot add workout" } );
    }
}
async function handleWorkoutPut ( req, res )
{
    const userId = req.user._id;
    const { date, day, bodyPart, exercise, weight, metric, reps, sets } = req.body;
    const setsInt = parseInt( sets, 10 );
    try {
        await dailyWorkoutModel.create( {
            userId,
            date,
            day,
            exercise,
            sets:setsInt,
            reps: Array( setsInt ).fill( reps ),
            metric: Array( setsInt ).fill( metric ),
            weight: Array( setsInt ).fill( weight ),
            isDone: false,
        } );
        return res.status( 200 ).json( { message: "Exercise Added successfully" } );
    } catch (err) {
        return res.status( 500 ).json( { message: "Cannot add exercise" } );
    }
}
module.exports = {
    handleWorkoutGet,
    handleWorkoutPost,
    handleWorkoutPut
}