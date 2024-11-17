const workoutName = require( "../../Models/WorkoutName" );

async function handleWorkoutNameGet ( req, res )
{
    const userId = req.user._id;
    try
    {
        const allNames = await workoutName.find( { userId } );
        return res.status( 200 ).json( { allNames:allNames } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout Names" } );
    }
    }

async function handleWorkoutNamePost ( req, res )
{
    const userId = req.user._id;
    const name = req.body.value;
    const result = await workoutName.findOne( { userId, name } );
    if ( result )
    {
        return res.status( 409 ).json( { message: "Workout Name Already exists" } );
    }
    try {
        const reqName = await workoutName.create( { userId,name } );
        return res.status( 200 ).json({message:"Workout Createdsss"});
    } catch ( err )
    {
        if ( err.status === 11000 )
        {
            return res.status( 409 ).json( { message: "Workout Name Already exists" } );
        }
        return res.status( 500 ).json( { message: "Cannot create workout Name" } );
    }
}

module.exports = { handleWorkoutNameGet, handleWorkoutNamePost };