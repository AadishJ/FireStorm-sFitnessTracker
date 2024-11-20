const schedule = require( "../../Models/DietScheduleModel" );

async function handleDietSchedulerGet ( req, res )
{
    const userId = req.user._id;
    const planName = req.query.name;
    try
    {
        const reqSchedule = await schedule.find( { userId: userId, planName: planName } );
        return res.status( 200 ).json( { reqSchedule: reqSchedule } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch plan schedule" } );
    }
}

async function handleDietSchedulerPost ( req, res )
{
    const userId = req.user._id;
    const { name, day, meal, food, quantity, calorie } = req.body;
    const planName = name;
    try
    {

        const reqSchedule = await schedule.create( { userId, planName, day, meal, food, quantity, calorie } );
        return res.status( 200 ).json( { message: "Food Added Successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot add food" } );
    }
}
async function handleDietSchedulerDelete ( req, res )
{
    const userId = req.user._id;
    const { food, day, scheduleName } = req.body;
    try
    {
        const reqDel = await schedule.deleteOne( { userId, food, day, planName: scheduleName } );
        return res.status( 200 ).json( { message: "Food Deleted Successfully" } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot delete food" } );
    }
}

module.exports = {
    handleDietSchedulerGet,
    handleDietSchedulerPost,
    handleDietSchedulerDelete,
};