const profileModel = require( '../../Models/ProfileModel' );
async function handleProfileGet ( req, res )
{
    const userId = req.user._id;
    try
    {
        const profile = await profileModel.findOne( { userId } );
        return res.status( 200 ).json( { profile } );
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Error occured in fetching data" } );
    }

}

async function handleProfilePost ( req, res )
{
    const userId = req.user._id;
    const { name, gender, age, height, weight, goal, activityLevel } = req.body;
    try
    {
        const profile = await profileModel.create( { userId, name, gender, age, height, weight, goal, activityLevel } );
        return res.status( 200 ).json( { message: "Profile Created" } );
    } catch ( err )
    {
        if ( err.code === 11000 )
        {
            try
            {
                const profile = await profileModel.findOneAndUpdate( { userId }, {name, gender, age, height, weight, goal, activityLevel},{new:true,upsert:true} );
                return res.status( 200 ).json( { message: "Profile Updated" } );
            }
            catch ( err )
            {
                return res.status( 409 ).json( { message: "Profile Already exists" } );
            }
        }
        return res.status( 500 ).json( { message: "Cannot create Profile" } );
    }
}

module.exports = {
    handleProfileGet,
    handleProfilePost,
}