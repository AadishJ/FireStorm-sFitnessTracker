const mongoose = require( "mongoose" );

const cardioNameModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    }, name: {
        type: String,
        required: true,
    }
}, { timestamps: true } );

const cardioName = mongoose.model( "CardioWorkoutName", cardioNameModel );

module.exports = cardioName;