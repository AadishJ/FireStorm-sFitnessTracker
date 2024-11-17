const cardioName = require( "../../Models/CardioName" );

async function handleCardioNameGet ( req, res )
{
    const userId = req.user._id;
    try
    {
        const allNames = await cardioName.find( { userId } );
        return res.status( 200 ).json( { allNames:allNames } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch workout Names" } );
    }
    }

async function handleCardioNamePost ( req, res )
{
    const userId = req.user._id;
    const name  = req.body.value;
    try {
        const reqName = await cardioName.create( { userId,name } );
        return res.status( 200 ).json({message:"Workout Created"});
    } catch ( err )
    {
        if ( err.status === 11000 )
        {
            return res.status( 409 ).json( { message: "Workout Name Already exists" } );
        }
        return res.status( 500 ).json( { message: "Cannot create workout Name" } );
    }
}

module.exports = { handleCardioNameGet,handleCardioNamePost };