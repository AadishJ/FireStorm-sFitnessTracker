const DietSchedule = require( '../../Models/DietScheduleModel' );
const DailyDiet = require( '../../Models/DailyDietModel' );
async function handleDietGet (req,res)
{
    const userId = req.user._id;
    const id = req.query.id;
    const date = req.query.date;
    const food = req.query.diet;
    try
    {
        const reqDiet1 = await DailyDiet.find( { userId: userId, date: date, food: food } );
        if ( reqDiet1.length === 0 )
        {
            const reqDiet = await DietSchedule.find( { userId: userId, _id: id } );
            return res.status( 200 ).json( { reqDiet: reqDiet, reqDiet1: false } );
        }
        else
        {
            return res.status( 200 ).json( { reqDiet1: reqDiet1, reqDiet: false } );
        }
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch diet schedule" } );
    }

}

async function handleDietPost (req,res)
{
    const { food, meal, day, date, quantity, calorie, isDone } = req.body;
    const userId = req.user._id;
    try
    {
        const reqDiet = await DailyDiet.find( { userId: userId, date: date, food: food, meal: meal } );
        if ( reqDiet.length === 0 )
        {
            const newDiet = await DailyDiet.create( {
                userId: userId,
                date: date,
                day: day,
                food: food,
                meal: meal,
                quantity: quantity,
                calorie: calorie,
                isDone: isDone,
            } );
        } else
        {
            const updateDiet = await DailyDiet.updateOne( { userId: userId, date: date, meal: meal }, {
                food: food,
                meal: meal,
                quantity: quantity,
                calorie: calorie,
                isDone: isDone,
            } );
        }
        return res.status( 200 ).json( { message: "Diet Updated successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot update diet" } );
    }
}
async function handleDietPut ( req, res )
{

    const userId = req.user._id;
    const { date, day, meal, food, quantity,calorie } = req.body;
    try
    {
        await DailyDiet.create( {
            userId,
            date,
            day,
            meal,
            food,
            quantity,
            calorie,
            isDone: false,
        } );
        return res.status( 200 ).json( { message: "Food Added successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot add Food" } );
    }
}

module.exports = {
    handleDietGet,
    handleDietPost,
    handleDietPut,
}