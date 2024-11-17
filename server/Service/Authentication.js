const jwt = require( "jsonwebtoken" );
const skey = process.env.SECRET;
function setUser ( user )
{
    return jwt.sign( {
        _id: user._id,
        email: user.email,
    }, skey, { expiresIn: "24h" } );
}
function getUser ( token )
{
    if ( !token )
    {
        return null;
    } else
    {
        try
        {
            return jwt.verify( token, skey );
        }
        catch (error)
        {
            return null;
        }
    }
}

module.exports = {
    setUser,
    getUser,
}