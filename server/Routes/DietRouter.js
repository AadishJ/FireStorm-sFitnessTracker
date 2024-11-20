const express = require( "express" );
const router = express.Router();
const { handleDietGet, handleDietPost } = require( "../Controllers/Diet/DietControl" )
const { handleDietNameGet, handleDietNamePost } = require( "../Controllers/Diet/DietNameControl" )
const { handleDietSchedulerGet, handleDietSchedulerPost,handleDietSchedulerDelete } = require( "../Controllers/Diet/DietScheduleControl" )
router
    .route( "/" )
    .get( ( req, res ) => handleDietGet( req, res ) )
    .post( ( req, res ) => handleDietPost( req, res ) );
router
    .route( "/name" )
    .get( ( req, res ) => handleDietNameGet( req, res ) )
    .post( ( req, res ) => handleDietNamePost( req, res ) );
router
    .route( "/scheduler" )
    .get( ( req, res ) => handleDietSchedulerGet( req, res ) )
    .post( ( req, res ) => handleDietSchedulerPost( req, res ) )
    .delete( ( req, res ) => handleDietSchedulerDelete( req, res ) );
module.exports = router;