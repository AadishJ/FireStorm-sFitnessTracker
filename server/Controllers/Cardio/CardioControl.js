const CardioSchedule = require( "../../Models/CardioScheduleModel" );
const DailyCardioModel = require( "../../Models/DailyCardioModel" );
async function handleCardioGet (req,res)
{

    const userId = req.user._id;
    const id = req.query.id;
    const date = req.query.date;
    const exercise = req.query.exercise;
    try
    {
        const reqExercise1 = await DailyCardioModel.find( { userId: userId, date: date, exercise: exercise } );
        if ( reqExercise1.length === 0 )
        {
            const reqExercise = await CardioSchedule.find( { userId: userId, _id: id } );
            return res.status( 200 ).json( { reqExercise: reqExercise, reqExercise1: false } );
        }
        else
        {
            return res.status( 200 ).json( { reqExercise1: reqExercise1, reqExercise: false } );
        }
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout schedule" } );
    }
}

async function handleCardioPost (req,res)
{
    const { exercise, hr, min, sec, sets, day, date, isDone } = req.body;
    const userId = req.user._id;
    try
    {
        const reqExercise = await DailyCardioModel.find( { userId: userId, date: date, exercise: exercise } );
        if ( reqExercise.length === 0 )
        {
            const newExercise = await DailyCardioModel.create( {
                userId: userId,
                date: date,
                day: day,
                exercise: exercise,
                hr: hr,
                min: min,
                sec: sec,
                sets: sets,
                isDone: isDone,
            } );
        } else
        {
            const updateExercise = await DailyCardioModel.updateOne( { userId: userId, date: date, exercise: exercise }, {
                hr: hr,
                min: min,
                sec: sec,
                sets: sets,
                isDone: isDone,
            } );
        }
        return res.status( 200 ).json( { message: "Exercise Updated successfully" } );
    }
    catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot update exercise" } );
    }
}

module.exports = {
    handleCardioGet,
    handleCardioPost
}