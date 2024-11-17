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
    exercise: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    metric: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
}, {timestamps: true} );
const gymSchedule = mongoose.model( "WorkoutSchedule", scheduleModel );

module.exports = gymSchedule;