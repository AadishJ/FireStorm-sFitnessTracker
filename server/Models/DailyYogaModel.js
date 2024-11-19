const mongoose = require( 'mongoose' );

const dailyYogaSchema = new mongoose.Schema( {
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
    exercise: {
        type: String,
        required: true,
    },
    hr: {
        type: Array,
        required: true,
    },
    min: {
        type: Array,
        required: true,
    },
    sec: {
        type: Array,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true } );

const DailyYogaModel = mongoose.model( "DailyYoga", dailyYogaSchema );

module.exports = DailyYogaModel;