const user = require( "../../Models/User" );
const bcrypt = require( "bcrypt" );
async function handleSignupGet ( req, res )
{
    return res.status( 200 );
}
async function handleSignupPost ( req, res )
{
    const { name, email, password, isGoogle } = req.body;
    if ( !isGoogle )
    {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash( password, saltRounds );
        try
        {
            const reqUser = await user.create( { name, email, password: hashedPassword } );
            return res.status( 201 ).json( { message: "Signed Up Successfully." } );
        } catch ( err )
        {
            if ( err.code === 11000 )
            {
                return res.status( 409 ).json( { message: "User Already exists" } );
            } else
            {
                return res.status( 500 ).json( { message: "Internal Server Error" } );
            }
        }
    } else
    {
        try
        {
            const reqUser = await user.create( { name, email, isGoogle } );
            return res.status( 201 ).json( { message: "Signed Up Successfully." } );
        } catch ( err )
        {
            if ( err.code === 11000 )
            {
                return res.status( 404 ).json( { message: "User Already exists" } );
            } else
            {
                return res.status( 500 ).json( { message: "Internal Server Error" } );
            }
        }

    }
}
    module.exports = {
        handleSignupGet,
        handleSignupPost
    }