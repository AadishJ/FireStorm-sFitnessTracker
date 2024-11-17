const express = require( "express" );
const router = express.Router();
const { handleCardioGet, handleCardioPost } = require( "../Controllers/Cardio/CardioControl" )
const { handleCardioNameGet, handleCardioNamePost } = require( "../Controllers/Cardio/CardioNameControl" )
const { handleCardioSchedulerGet, handleCardioSchedulerPost } = require( "../Controllers/Cardio/CardioScheduleControl" )
router
    .route( "/" )
    .get( ( req, res ) => handleCardioGet( req, res ) )
    .post( ( req, res ) => handleCardioPost( req, res ) );
router
    .route( "/name" )
    .get( ( req, res ) => handleCardioNameGet( req, res ) )
    .post( ( req, res ) => handleCardioNamePost( req, res ) );
router
    .route( "/scheduler" )
    .get( ( req, res ) => handleCardioSchedulerGet( req, res ) )
    .post( ( req, res ) => handleCardioSchedulerPost( req, res ) );
module.exports = router;