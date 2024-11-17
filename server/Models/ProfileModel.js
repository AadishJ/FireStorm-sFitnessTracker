const mongoose = require( "mongoose" );

const profileModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    goal: {
        type: Number,
        required: true,
    },
    activityLevel: {
        type: String,
        required: true,
    },
}, { timestamps: true } );

const userProfile = mongoose.model( "UserProfile", profileModel );

module.exports = userProfile;