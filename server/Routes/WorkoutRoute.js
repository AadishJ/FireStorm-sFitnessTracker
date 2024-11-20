const express = require( "express" );
const router = express.Router();
const { handleWorkoutGet, handleWorkoutPost } = require( "../Controllers/Workout/WorkoutControl" )
const { handleWorkoutNameGet, handleWorkoutNamePost } = require( "../Controllers/Workout/WorkoutNameControl" )
const { handleWorkoutSchedulerGet, handleWorkoutSchedulerPost } = require( "../Controllers/Workout/WorkoutScheduleControl" )
router
    .route( "/" )
    .get( ( req, res ) => handleWorkoutGet( req, res ) )
    .post( ( req, res ) => handleWorkoutPost( req, res ) )
router
    .route( "/name" )
    .get( ( req, res ) => handleWorkoutNameGet( req, res ) )
    .post( ( req, res ) => handleWorkoutNamePost( req, res ) );
router
    .route( "/scheduler" )
    .get( ( req, res ) => handleWorkoutSchedulerGet( req, res ) )
    .post( ( req, res ) => handleWorkoutSchedulerPost( req, res ) );
module.exports = router;