const MenuItem = require("../models/menuItem.model");

exports.getById = async (req, res) => {
    try {
        const menu = await MenuItem.getById(req.query.id);
        res.json(menu);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getAllFromRestaurant = async (req, res) => {
    try {
        const menus = await MenuItem.getByRestaurantId(req.query.id);
        res.json(menus);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.create = async (req, res) => {
    try {
        const menu = await MenuItem.create(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.update = async (req, res) => {
    const menuItemId = req.body.id;
    const menuItemData = req.body;

    try {
        const menuItem = await MenuItem.getById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({
                "msg": "Item not found !"
            });
        }

        // Update the menuItem data
        Object.assign(menuItem, menuItemData);

        // Save the updated menuItem
        await menuItem.update(menuItem).then((updatedItem) => {
            if (!updatedItem) {
                return res.status(404).json({
                    "msg": "Item not found !"
                });
            }
            res.status(200).json(updatedItem);
        });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

exports.deleteItem = async (req, res) => {
    const menuItemId = req.body.id;
    try {
        await MenuItem.delete(menuItemId);
        res.status(200).json({message: "Item deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}