const Restaurant = require("../models/restaurants.model");
const readId = require('../middlewares/readId.js');

exports.getByRestaurantId = async (req, res) => {
    try {
        const restaurant = await Restaurant.getById(req.query.id);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
}

exports.getByUserId = async (req, res) => {
    const userId = req.body.id || await readId(req, res);

    if (userId) {
        try {
            const restaurants = await Restaurant.getByUserId(userId);
            if (restaurants.length === 0) {
                return res.status(404).json({ message: "No restaurants found for this user" });
            }
            res.status(200).json(restaurants);
        } catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }
}

exports.getByKeywords = async (req, res) => {
    try {
        const { keywords, page, limit } = req.body;

        const restaurants = await Restaurant.getByKeywords(keywords, page, limit);
        if (restaurants.length === 0) {
            return res.status(404).json({ message: "No restaurants found" });
        }

        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        const createdRestaurant = await restaurant.save();

        res.status(201).json(createdRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.update = async (req, res) => {
    const restaurantId = req.body.id;
    const restaurantData = req.body;

    try {
        const restaurant = await Restaurant.getById(restaurantId);
        if (!restaurant) {
            return res.status(404).json({
                "msg": "Restaurant not found !"
            });
        }

        // Update the restaurant data
        Object.assign(restaurant, restaurantData);

        // Save the updated restaurant
        await restaurant.save(restaurantId, restaurantData).then((updatedRestaurant) => {
            if (!updatedRestaurant) {
                return res.status(404).json({
                    "msg": "Restaurant not found !"
                });
            }
            res.status(200).json(restaurant);
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
