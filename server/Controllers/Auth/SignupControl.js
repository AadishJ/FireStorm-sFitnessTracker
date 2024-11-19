const user = require( "../../Models/User" );
const bcrypt = require( "bcrypt" );
const { setUser } = require( "../../Service/Authentication" );
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
            const token = setUser( reqUser );
            res.cookie( "uid", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true, // Ensure this is true if you're using HTTPS
                sameSite: 'None'
            } );
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