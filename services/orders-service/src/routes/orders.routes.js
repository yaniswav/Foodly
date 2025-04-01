const ordersController = require("../controllers/orders.controller");
const requiredArgs = require('../middlewares/requiredArgs.js');

module.exports = function (app) {
  app.get("", requiredArgs(["id"]), ordersController.getById); // id is passed as a query parameter
  app.post("/order", ordersController.createOrder);
  app.delete("/:id", ordersController.deleteById); // id is passed as a query parameter
  app.get("/byUserId", requiredArgs(["id"]), ordersController.getAllByUserId); // userId is passed as a query parameter
  app.get("/byRestoId", requiredArgs(["id"]), ordersController.getAllByRestaurantId); // restaurantId is passed as a query parameter
  app.put("/status/:id", ordersController.updateStatus); // id is passed as a URL parameter
};
