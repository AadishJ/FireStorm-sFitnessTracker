const express = require( "express" );
const router = express.Router();
const {handleSignupGet, handleSignupPost} = require("../Controllers/Auth/SignupControl")
router
    .route( "/" )
    .get( ( req, res ) => handleSignupGet( req, res ) )
    .post( ( req, res ) => handleSignupPost( req, res ) );

module.exports = router;