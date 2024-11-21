const express = require( "express" );
const router = express.Router();
const { handleYogaGet, handleYogaPost,handleYogaPut } = require( "../Controllers/Yoga/YogaControl" )
const { handleYogaNameGet, handleYogaNamePost } = require( "../Controllers/Yoga/YogaNameControl" )
const { handleYogaSchedulerGet, handleYogaSchedulerPost,handleYogaSchedulerDelete } = require( "../Controllers/Yoga/YogaScheduleControl" )
router
    .route( "/" )
    .get( ( req, res ) => handleYogaGet( req, res ) )
    .post( ( req, res ) => handleYogaPost( req, res ) )
    .put((req,res)=>handleYogaPut(req,res));
router
    .route( "/name" )
    .get( ( req, res ) => handleYogaNameGet( req, res ) )
    .post( ( req, res ) => handleYogaNamePost( req, res ) );
router
    .route( "/scheduler" )
    .get( ( req, res ) => handleYogaSchedulerGet( req, res ) )
    .post( ( req, res ) => handleYogaSchedulerPost( req, res ) )
    .delete( ( req, res ) => handleYogaSchedulerDelete( req, res ) );
module.exports = router;