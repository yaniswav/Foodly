const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LogSchema = new Schema({
    user_id: String,
    event_type: Number,
    timestamp: {
        type: Date,
        default: Date.now,
    },
    details: String
});

const Log = model('logs', LogSchema);
module.exports = Log;