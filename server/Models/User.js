const mongoose = require( "mongoose" );

const userModel = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    isGoogle: {
        type: Boolean,
        require: true,
        default: false,
    },
}, {timestamps: true} );

const user = mongoose.model( "User", userModel );

module.exports = user;