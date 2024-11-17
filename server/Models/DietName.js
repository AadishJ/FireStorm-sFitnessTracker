const mongoose = require( "mongoose" );

const dietNameModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    }, name: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true } );

const dietName = mongoose.model( "DietPlanName", dietNameModel );

module.exports = dietName;