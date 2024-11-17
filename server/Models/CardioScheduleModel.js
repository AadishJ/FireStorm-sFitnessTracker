const mongoose = require( "mongoose" );

const scheduleModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },
    workoutName: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    types: {
        type: String,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    hr: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: true,
    },
    sec: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
}, { timestamps: true } );
const CardioSchedule = mongoose.model( "CardioSchedule", scheduleModel );

module.exports = CardioSchedule;