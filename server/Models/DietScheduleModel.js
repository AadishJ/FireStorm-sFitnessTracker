const mongoose = require( "mongoose" );

const scheduleModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },
    planName: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    meal: {
        type: String,
        required: true,
    },
    food: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    calorie: {
        type: Number,
        required: true,
    },
}, { timestamps: true } );
const DietSchedule = mongoose.model( "DietSchedule", scheduleModel );

module.exports = DietSchedule;