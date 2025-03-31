const Log = require("../models/logs.model");

const getAllByUserId = async (req, res) => {
    try {
        const logs = await Log.find({ user_id: req.query.id });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createLog = async (req, res) => {
    try {
        const log = new Log(req.body);
        const savedLog = await log.save();
        res.status(201).json(savedLog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllByUserId = getAllByUserId;
exports.createLog = createLog;