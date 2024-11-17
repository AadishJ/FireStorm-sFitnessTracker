const mongoose = require( "mongoose" );
const { MongoClient } = require('mongodb');

async function connectMongoDB (url)
{
    return mongoose.connect( url );
}

module.exports = connectMongoDB;