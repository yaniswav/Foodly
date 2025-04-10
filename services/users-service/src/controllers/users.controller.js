const User = require("../models/user.model");
const readId = require('../middlewares/readId.js');

exports.register = async (req, res) => {
    var newUser = new User(req.body);

    // Check if the user already exists
    User.testIfExists(newUser.id, newUser.email).then(async (result) => {
        if (result) {
            return res.status(409).json({
                "msg": "User already exists !"
            });
        }
        else {
            try {
                await newUser.save();
                return res.status(201).json({
                    "msg": "New User created !"
                });
            } catch (err) {
                return res.status(500).json({
                    "msg": "Error while creating user !",
                    "error": err
                });
            }
        }
    }).catch((err) => {
        return res.status(500).json({
            "msg": "Error while checking user existence !",
            "error": err
        });
    });
}

exports.getById = async (req, res) => {
    const userId = req.body.id || await readId(req, res);

    try {
        const user = await User.getById(userId);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({
            "msg": "Error while retrieving user: " + userId,
            "error": err
        });
    }
}

exports.update = async (req, res) => {
    const userId = req.body.id || await readId(req, res);

    const userData = req.body;

    try {
        const user = await User.getById(userId);
        if (!user) {
            return res.status(404).json({
                "msg": "User not found !"
            });
        }

        // Update the user data
        Object.assign(user, userData);

        // Save the updated user
        await user.update(userId, userData);

        return res.status(200).json({
            "msg": "User updated !",
            "user": user
        });
    } catch (err) {
        return res.status(500).json({
            "msg": "Error while updating user: " + userId,
            "error": err
        });
    }
}