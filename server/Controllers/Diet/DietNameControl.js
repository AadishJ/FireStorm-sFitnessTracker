const dietName = require( "../../Models/DietName" );

async function handleDietNameGet ( req, res )
{
    const userId = req.user._id;
    try
    {
        const allNames = await dietName.find( { userId } );
        return res.status( 200 ).json( { allNames: allNames } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Cannot fetch plan Names" } );
    }
}

async function handleDietNamePost ( req, res )
{
    const userId = req.user._id;
    const name = req.body.value;
    try
    {
        const reqName = await dietName.create( { userId, name } );
        return res.status( 200 ).json( { message: "Plan Created" } );
    } catch ( err )
    {
        if ( err.status === 11000 )
        {
            return res.status( 409 ).json( { message: "Plan Name Already exists" } );
        }
        return res.status( 500 ).json( { message: "Cannot create plan Name" } );
    }
}

module.exports = { handleDietNameGet, handleDietNamePost };