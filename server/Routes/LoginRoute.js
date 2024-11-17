const express = require( "express" );
const router = express.Router();
const {handleLoginGet, handleLoginPost} = require("../Controllers/Auth/LoginControl")
router
    .route( "/" )
    .get( ( req, res ) => handleLoginGet( req, res ) )
    .post( ( req, res ) => handleLoginPost( req, res ) );

module.exports = router;