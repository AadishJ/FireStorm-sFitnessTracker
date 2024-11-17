const express = require( "express" );
const router = express.Router();
const { handleProfileGet, handleProfilePost } = require( "../Controllers/Profile/ProfileControl" )

router
    .route( "/" )
    .get( ( req, res ) => handleProfileGet( req, res ) )
    .post( ( req, res ) => handleProfilePost( req, res ) );

module.exports = router;