const express = require( "express" );
const router = express.Router();
const { handleScheduleGet, handleSchedulePost } = require( "../Controllers/Schedule/ScheduleControl" )

router
    .route( "/" )
    .get( ( req, res ) => handleScheduleGet( req, res ) )
    .post( ( req, res ) => handleSchedulePost( req, res ) );

module.exports = router;