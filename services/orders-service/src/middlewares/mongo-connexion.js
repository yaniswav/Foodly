const mongoose = require('mongoose');
require('dotenv').config()

async function main() {
    await mongoose.connect(process.env.MONGO_URI + process.env.MONGO_DB_NAME);
    console.log("MongoDB connection established.");
}

async function closeConnection() {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
}

exports.main = main;
exports.closeConnection = closeConnection;
exports.mongoose = mongoose;