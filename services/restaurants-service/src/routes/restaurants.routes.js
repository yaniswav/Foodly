const restaurantsController = require("../controllers/restaurants.controller.js");
const menuItemsController = require("../controllers/menuItems.controller.js");
const requiredFields = require('../middlewares/requiredFields.js');
const requiredArgs = require('../middlewares/requiredArgs.js');

module.exports = function (app) {
    app.get("/byRestaurantId", requiredArgs(["id"]), restaurantsController.getByRestaurantId);
    app.get("/byUserId", requiredArgs(["id"]), restaurantsController.getByUserId);
    app.post("/research", requiredFields(["keywords", "page", "limit"]), restaurantsController.getByKeywords);
    app.post("/", requiredFields(["restaurant_name", "location", "siret", "keywords", "user_id"]), restaurantsController.create);
    app.patch("", requiredFields(["id"]), restaurantsController.update);
    app.get("/menu", requiredArgs(["id"]), menuItemsController.getAllFromRestaurant);

    app.get("/menuItem", requiredArgs(["id"]), menuItemsController.getById);
    app.post("/menuItem", requiredFields(["restaurant_id", "item_name", "price", "img"]), menuItemsController.create);
    app.patch("/menuItem", requiredFields(["id"]), menuItemsController.update);
    app.delete("/menuItem", requiredFields(["id"]), menuItemsController.deleteItem);

    app.delete("/metrics", menuItemsController.test);
};
