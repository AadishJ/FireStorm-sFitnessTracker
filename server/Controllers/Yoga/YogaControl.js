const DailyYogaModel = require( "../../Models/DailyYogaModel" );
const YogaSchedule = require( "../../Models/YogaScheduleModel" );
async function handleYogaGet ( req, res )
{
    const userId = req.user._id;
    const id = req.query.id;
    const date = req.query.date;
    const exercise = req.query.exercise;
    try
    {
        const reqExercise1 = await DailyYogaModel.find( { userId: userId, date: date, exercise: exercise } );
        if ( reqExercise1.length === 0 )
        {
            const reqExercise = await YogaSchedule.find( { userId: userId, _id: id } );
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

async function handleYogaPost ( req, res )
{
    const { id, exercise, hr, min, sec, sets, day, date, isDone } = req.body;
    const userId = req.user._id;
    try
    {
        const reqExercise = await DailyYogaModel.find( { userId: userId, date: date, exercise: exercise } );
        if ( reqExercise.length === 0 )
        {
            const newExercise = await DailyYogaModel.create( {
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
            const updateExercise = await DailyYogaModel.updateOne( { userId: userId, date: date, exercise: exercise }, {
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
    handleYogaGet,
    handleYogaPost
}