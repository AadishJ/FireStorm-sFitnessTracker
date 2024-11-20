const express = require( "express" );
const router = express.Router();
const { handleScheduleGet, handleSchedulePost } = require( "../Controllers/Schedule/ScheduleControl" )
const { handleDailyScheduleGet, handleDailySchedulePost } = require( "../Controllers/Schedule/DailyScheduleControl" )
const { handleScheduleNamesGet, handleScheduleNamesPost } = require( "../Controllers/Schedule/ScheduleNamesControl" )

router
    .route( "/" )
    .get( ( req, res ) => handleScheduleGet( req, res ) )
    .post( ( req, res ) => handleSchedulePost( req, res ) );
router
    .route( "/daily" )
    .get( ( req, res ) => handleDailyScheduleGet( req, res ) )
    .post( ( req, res ) => handleDailySchedulePost( req, res ) );
router
    .route( "/names" )
    .get( ( req, res ) => handleScheduleNamesGet( req, res ) )
    .post((req,res)=>handleScheduleNamesPost(req,res));

module.exports = router;