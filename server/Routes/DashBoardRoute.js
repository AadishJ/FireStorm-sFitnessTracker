const express = require( "express" );
const router = express.Router();
const {handleDashboardGet, handleDashboardPost} = require("../Controllers/Dashboard/DashboardControl")
router
    .route( "/" )
    .get( ( req, res ) => handleDashboardGet( req, res ) )
    .post( ( req, res ) => handleDashboardPost( req, res ) );

module.exports = router;