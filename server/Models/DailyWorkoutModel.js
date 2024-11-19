const mongoose = require( 'mongoose' );

const dailyWorkoutModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },
    weight: {
        type: Array,
        required: true,
    },
    metric: {
        type: Array,
        required: true,
    },
    reps: {
        type: Array,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true } );

const DailyWorkout = mongoose.model( "DailyWorkout", dailyWorkoutModel );

module.exports = DailyWorkout;