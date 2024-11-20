const CardioSchedule = require( "../../Models/CardioScheduleModel" );
const DailyCardioModel = require( "../../Models/DailyCardioModel" );
const DailyDiet = require( "../../Models/DailyDietModel" );
const DailyWorkout = require( "../../Models/DailyWorkoutModel" );
const DailyYogaModel = require( "../../Models/DailyYogaModel" );
const DietSchedule = require( "../../Models/DietScheduleModel" );
const gymModel = require( "../../Models/ScheduleModel" );
const YogaSchedule = require( "../../Models/YogaScheduleModel" );
async function handleDailyScheduleGet ( req, res )
{

}

async function handleDailySchedulePost ( req, res )
{
    const userId = req.user._id;
    const { exercise, date, day, type, isDone, meal, food, workoutName, planName } = req.body;
    try
    {
        if ( type === "gym" )
        {
            const result = await DailyWorkout.findOne( { userId: userId, exercise, date } );
            if ( !res )
            {
                const resGym = await gymModel.findOne( { userId: userId, exercise, day, workoutName } );
                const result2 = await DailyWorkout.create( {
                    userId: userId,
                    exercise: exercise,
                    day: day,
                    date: date,
                    isDone: isDone,
                    sets: resGym.sets,
                    reps: Array(resGym.sets).fill( resGym.reps ),
                    metric: Array(resGym.sets).fill( resGym.metric ),
                } );
                return res.status( 200 ).json( { message: "Added to daily schedule" } );
            } else
            {
                return res.status( 200 ).json( { message: "Already exists" } );
            }
        }
        else if ( type === "yoga" )
        {
            const resYoga = await DailyYogaModel.findOne( { userId: userId, exercise, date } );
            if ( !resYoga )
            {
                const resYoga2 = await YogaSchedule.findOne( { userId: userId, exercise, day, workoutName } );
                const resYoga3 = await DailyYogaModel.create( {
                    userId: userId,
                    date: date,
                    day: day,
                    exercise: exercise,
                    sets: resYoga2.sets,
                    isDone: isDone,
                    hr: Array( resYoga2.sets ).fill( resYoga2.hr ),
                    min: Array( resYoga2.sets ).fill( resYoga2.min ),
                    sec: Array( resYoga2.sets ).fill( resYoga2.sec ),
                } );
                return res.status( 200 ).json( { message: "Added to daily Schedule" } );
            } else
            {
                return res.status( 200 ).json( { message: "Already Exists" } );
            }
        }
        else if ( type === "cardio" )
        {
            const resCardio = await DailyCardioModel.findOne( { userId, exercise, date } );
            if ( !resCardio )
            {
                console.log(userId,exercise,day,workoutName);
                const resCardio2 = await CardioSchedule.findOne( { userId: userId, exercise, day, workoutName } );
                console.log(resCardio2);
                const resCardio3 = await DailyCardioModel.create( {
                    userId: userId,
                    date: date,
                    day: day,
                    exercise: exercise,
                    sets: resCardio2.sets,
                    isDone: isDone,
                    hr: Array( resCardio2.sets ).fill( resCardio2.hr ),
                    min: Array( resCardio2.sets ).fill( resCardio2.min ),
                    sec: Array( resCardio2.sets ).fill( resCardio2.sec ),
                } );
                return res.status( 200 ).json( { message: "Added to daily Schedule" } );
            } else
            {
                return res.status( 200 ).json( { message: "Already Exists" } );
            }
        }
        else if ( type === "diet" )
        {
            const resDiet = await DailyDiet.findOne( { userId, food, meal, date } );
            if ( !resDiet )
            {
                const resDiet2 = await DietSchedule.findOne( { userId, food, meal, day, planName } );
                const resDiet3 = await DailyDiet.create( {
                    userId,
                    date,
                    day,
                    meal: meal,
                    food: food,
                    quantity: resDiet2.quantity,
                    calorie: resDiet2.calorie,
                    isDone: isDone,
                } )
            }
        } else
        {
            return res.status( 401 ).json( { message: "Type Not Found" } );
        }
    }
    catch ( err )
    {
        console.log(err);
        return res.status( 500 ).json( { message: "Cannot update daily schedule" } );
    }
}

module.exports = {
    handleDailyScheduleGet,
    handleDailySchedulePost
}