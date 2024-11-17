const mongoose = require( "mongoose" );

const workoutNameModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },name: {
        type: String,
        required: true,
    }
}, {timestamps: true} );

const workoutName = mongoose.model( "WorkoutName", workoutNameModel );

module.exports = workoutName;