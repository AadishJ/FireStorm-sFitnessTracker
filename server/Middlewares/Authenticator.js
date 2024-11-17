const {getUser} = require("../Service/Authentication")
async function checkAuth ( req, res, next )
{
    const userId = req.cookies.uid;
    const user = await getUser( userId );
    if ( user )
    {
        req.user = user;
        next();
    } else if(!user)
    {  
        res.status( 404 ).json( { message: "Session Expired" } );
    }else
        res.status( 500 ).json( { message: "Unexpected Error Occured" } );
}

module.exports = {
    checkAuth
}