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
        const cardioDailySchedule = await DailyCardio.find( { userId: userId, day } );
        const filteredCardioDailySchedule = cardioDailySchedule.filter( dailyExercise =>
        {
            return !cardioScheduleData.some( scheduleExercise => scheduleExercise.exercise === dailyExercise.exercise );
        } );
        const allCardioExercise = cardioScheduleData.concat( filteredCardioDailySchedule );
        const yogaDailySchedule = await DailyYoga.find( { userId: userId, day } );
        const filteredYogaDailySchedule = yogaDailySchedule.filter( dailyExercise =>
        {
            return !yogaScheduleData.some( scheduleExercise => scheduleExercise.exercise === dailyExercise.exercise );
        } );
        const allYogaExercise = yogaScheduleData.concat( filteredYogaDailySchedule );
        const dietDailySchedule = await DailyDiet.find( { userId, day } );
        const filteredDietDailySchedule = dietDailySchedule.filter( dailyFood =>
        {
            return !dietScheduleData.some( scheduleFood => scheduleFood.food === dailyFood.food );
        } );
        const allDietFood = dietScheduleData.concat( filteredDietDailySchedule );
        return res.status( 200 ).json( { allGymExercise, allYogaExercise, allDietFood, allCardioExercise } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch schedule" } );
    }
}

async function handleSchedulePost ( req, res )
{
    const userId = req.user._id;
    req.body.forEach( async ( { id, exercise,food, date, type, meal,dietPlanName,workoutName,yogaWorkoutName,cardioWorkoutName,isDone } ) =>
    {
        if ( type === "gym" )
        {
            try
            {
                const result = await DailyWorkout.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
                if(!result)
                {
                    const res = await gymSchedule.findOne( { userId, exercise, workoutName } );
                    await DailyWorkout.create( {
                        userId: userId,
                        exercise: exercise,
                        day: res.day,
                        date: date,
                        isDone: isDone,
                        weight: Array( res.sets ).fill( res.weight ),
                        sets: res.sets,
                        reps: Array( res.sets ).fill( res.reps ),
                        metric: Array( res.sets ).fill( res.metric ),
                    } );
                }
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update gym schedule" } );
            }
        } else if ( type === "yoga" )
        {
            try
            {
                const result = await DailyYoga.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
                if(!result)
                {
                    const res = await yogaSchedule.findOne( { userId, exercise, yogaWorkoutName } );
                    await DailyYoga.create( {
                        userId: userId,
                        exercise: exercise,
                        day: res.day,
                        date: date,
                        isDone: isDone,
                        sets: res.sets,
                        hr: Array( res.sets ).fill( res.hr ),
                        min: Array( res.sets ).fill( res.min ),
                        sec: Array( res.sets ).fill( res.sec ),
                    } );
                }
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update yoga schedule" } );
            }
        } else if ( type === "cardio" )
        {
            try
            {
                const result = await DailyCardio.findOneAndUpdate( { userId: userId, exercise, date }, { isDone: isDone } );
                if(!result)
                {
                    const res = await cardioSchedule.findOne( { userId, exercise, cardioWorkoutName } );
                    await DailyCardio.create( {
                        userId: userId,
                        exercise: exercise,
                        day: res.day,
                        date: date,
                        isDone: isDone,
                        hr: Array( res.sets ).fill( res.hr ),
                        min: Array( res.sets ).fill( res.min ),
                        sec: Array( res.sets ).fill( res.sec ),
                    } );
                }
            } catch ( err )
            {
                return res.status( 500 ).json( { message: "Cannot update cardio schedule" } );
            }
        } else
        {
            try
            {
                const result = await DailyDiet.findOneAndUpdate( { userId: userId, food, date, meal }, { isDone: isDone } );
                if(!result)
                {
                    const res = await dietSchedule.findOne( { userId, food, dietPlanName } );
                    await DailyDiet.create( {
                        userId: userId,
                        food: food,
                        meal: meal,
                        day: res.day,
                        date: date,
                        isDone: isDone,
                        quantity: res.quantity,
                        calorie: res.calorie,
                    } );
                }
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