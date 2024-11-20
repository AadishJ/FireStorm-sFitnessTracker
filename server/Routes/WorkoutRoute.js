const express = require( "express" );
const router = express.Router();
const { handleWorkoutGet, handleWorkoutPost, handleWorkoutPut } = require( "../Controllers/Workout/WorkoutControl" )
const { handleWorkoutNameGet, handleWorkoutNamePost } = require( "../Controllers/Workout/WorkoutNameControl" )
const { handleWorkoutSchedulerGet, handleWorkoutSchedulerPost,handleWorkoutSchedulerDelete } = require( "../Controllers/Workout/WorkoutScheduleControl" )
router
    .route( "/" )
    .get( ( req, res ) => handleWorkoutGet( req, res ) )
    .post( ( req, res ) => handleWorkoutPost( req, res ) )
    .put((req,res)=>handleWorkoutPut(req,res));
router
    .route( "/name" )
    .get( ( req, res ) => handleWorkoutNameGet( req, res ) )
    .post( ( req, res ) => handleWorkoutNamePost( req, res ) );
router
    .route( "/scheduler" )
    .get( ( req, res ) => handleWorkoutSchedulerGet( req, res ) )
    .post( ( req, res ) => handleWorkoutSchedulerPost( req, res ) )
    .delete((req,res)=>handleWorkoutSchedulerDelete(req,res));
module.exports = router;