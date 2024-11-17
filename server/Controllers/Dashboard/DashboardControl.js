async function handleDashboardGet ( req, res )
{
    if ( !req.cookie.uid )
    {
        localStorage.removeItem( "userName" );
        res.redirect( "/" );
    }
}
async function handleDashboardPost ( req, res )
{
    res.clearCookie( 'uid', {
        httpOnly: true,
        secure: true, // Ensure this is true if you're using HTTPS
        sameSite: 'None'
    } );
    return res.status( 200 ).json( { message: "Logged out" } );
}

module.exports = {
    handleDashboardGet,
    handleDashboardPost,
}