/**
 * @api {get} /byRestaurantId Retrieve restaurants by restaurant ID
 * @apiName GetRestaurantsByRestaurantId
 * @apiGroup Restaurants
 *
 * @apiParam {String} id The ID of the restaurant (required).
 *
 * @apiSuccess {Object[]} restaurants List of restaurants matching the ID.
 */

/**
 * @api {get} /byUserId Retrieve restaurants by user ID
 * @apiName GetRestaurantsByUserId
 * @apiGroup Restaurants
 *
 * @apiParam {String} id The ID of the user (required).
 *
 * @apiSuccess {Object[]} restaurants List of restaurants associated with the user.
 */

/**
 * @api {post} /research Search for restaurants based on keywords
 * @apiName SearchRestaurants
 * @apiGroup Restaurants
 *
 * @apiParam {String} keywords Keywords for the search (required).
 * @apiParam {Number} page The page number for pagination (required).
 * @apiParam {Number} limit The number of results per page (required).
 *
 * @apiSuccess {Object[]} restaurants List of restaurants matching the search criteria.
 */

/**
 * @api {post} / Create a new restaurant
 * @apiName CreateRestaurant
 * @apiGroup Restaurants
 *
 * @apiParam {String} restaurant_name The name of the restaurant (required).
 * @apiParam {String} location The location of the restaurant (required).
 * @apiParam {String} siret The SIRET number of the restaurant (required).
 * @apiParam {String} keywords Keywords associated with the restaurant (required).
 * @apiParam {String} user_id The ID of the user creating the restaurant (required).
 *
 * @apiSuccess {Object} restaurant The newly created restaurant.
 */

/**
 * @api {patch} / Update an existing restaurant
 * @apiName UpdateRestaurant
 * @apiGroup Restaurants
 *
 * @apiParam {String} id The ID of the restaurant to update (required).
 *
 * @apiSuccess {Object} restaurant The updated restaurant.
 */

/**
 * @api {get} /menu Retrieve all menu items from a restaurant
 * @apiName GetMenuItems
 * @apiGroup MenuItems
 *
 * @apiParam {String} id The ID of the restaurant (required).
 *
 * @apiSuccess {Object[]} menuItems List of menu items from the restaurant.
 */

/**
 * @api {get} /menuItem Retrieve a menu item by its ID
 * @apiName GetMenuItemById
 * @apiGroup MenuItems
 *
 * @apiParam {String} id The ID of the menu item (required).
 *
 * @apiSuccess {Object} menuItem The menu item details.
 */

/**
 * @api {post} /menuItem Create a new menu item
 * @apiName CreateMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {String} restaurant_id The ID of the restaurant the menu item belongs to (required).
 * @apiParam {String} item_name The name of the menu item (required).
 * @apiParam {Number} price The price of the menu item (required).
 * @apiParam {String} img The image URL of the menu item (required).
 *
 * @apiSuccess {Object} menuItem The newly created menu item.
 */

/**
 * @api {patch} /menuItem Update an existing menu item
 * @apiName UpdateMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {String} id The ID of the menu item to update (required).
 *
 * @apiSuccess {Object} menuItem The updated menu item.
 */

/**
 * @api {delete} /menuItem Delete a menu item
 * @apiName DeleteMenuItem
 * @apiGroup MenuItems
 *
 * @apiParam {String} id The ID of the menu item to delete (required).
 *
 * @apiSuccess {String} message Confirmation message of deletion.
 */
const restaurantsController = require("../controllers/restaurants.controller.js");
const menuItemsController = require("../controllers/menuItems.controller.js");
const requiredFields = require('../middlewares/requiredFields.js');
const requiredArgs = require('../middlewares/requiredArgs.js');

module.exports = function (app) {
    app.get("/byRestaurantId", requiredArgs(["id"]), restaurantsController.getByRestaurantId);
    app.get("/byUserId", restaurantsController.getByUserId);
    app.post("/research", requiredFields(["page", "limit"]), restaurantsController.getByKeywords);
    app.post("/", requiredFields(["restaurant_name", "location", "siret", "keywords", "user_id"]), restaurantsController.create);
    app.patch("", requiredFields(["id"]), restaurantsController.update);
    app.get("/menu", requiredArgs(["id"]), menuItemsController.getAllFromRestaurant);

    app.get("/menuItem", requiredArgs(["id"]), menuItemsController.getById);
    app.post("/menuItem", requiredFields(["restaurant_id", "item_name", "price", "img"]), menuItemsController.create);
    app.patch("/menuItem", requiredFields(["id"]), menuItemsController.update);
    app.delete("/menuItem", requiredFields(["id"]), menuItemsController.deleteItem);
};

