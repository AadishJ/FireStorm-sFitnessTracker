const mongoose = require( 'mongoose' );

const DailyDietModel = new mongoose.Schema( {
    userId: {
        type: String,
        required: true,
    },
    date: {
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
    isDone: {
        type: Boolean,
        required: true,
    },
} );

const DailyDiet = mongoose.model( 'DailyDiet', DailyDietModel );
module.exports = DailyDiet;

