const mongoose = require( "mongoose" );

const yogaNameModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    }, name: {
        type: String,
        required: true,
    }
}, { timestamps: true } );

const yogaName = mongoose.model( "YogaWorkoutName", yogaNameModel );

module.exports = yogaName;