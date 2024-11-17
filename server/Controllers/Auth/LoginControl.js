const user = require( "../../Models/User" );
const { setUser } = require( "../../Service/Authentication" );
const bcrypt = require( "bcrypt" );

async function handleLoginGet ( req, res )
{

}
async function handleLoginPost ( req, res )
{
    const { email, password, isGoogle } = req.body;
    try
    {
        const reqUser = await user.findOne( { email } );

        if ( !reqUser )
        {
            return res.status( 404 ).json( { message: "User Not Found" } );
        }
        if ( !isGoogle )
        {
            if ( !reqUser.isGoogle )
            {

                const isMatch = await bcrypt.compare( password, reqUser.password );
                if ( isMatch )
                {
                    const token = setUser( reqUser );
                    res.cookie("uid", token, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true,
                        secure: true, // Ensure this is true if you're using HTTPS
                        sameSite: 'None'
                    });                    return res.status( 200 ).json( { message: "Logged In Successfully", jwtToken: token, name: reqUser.name } );
                } else
                {
                    return res.status( 400 ).json( { message: "Wrong Password" } );
                }
            } else
            {
                return res.status( 400 ).json( { message: "Sign In using Google" } );
                }
        } else
        {
            const token = setUser( reqUser );
            res.cookie("uid", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true, // Ensure this is true if you're using HTTPS
                sameSite: 'None'
            });            return res.status( 200 ).json( { message: "Logged In Successfully", jwtToken: token, name: reqUser.name } );
        }
    } catch ( err )
    {
        return res.status( 500 ).json( { message: "Internal Server Error" } );
    }
}

module.exports = {
    handleLoginGet,
    handleLoginPost
}
