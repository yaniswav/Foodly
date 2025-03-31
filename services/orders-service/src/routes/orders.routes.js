const ordersController = require("../controllers/orders.controller");


module.exports = function(app) {
  app.get("", ordersController.getById); // id is passed as a query parameter
  app.post("/order", ordersController.createOrder);
  app.delete("/:id", ordersController.deleteById); // id is passed as a query parameter
  app.get("/byUserId", ordersController.getAllByUserId); // userId is passed as a query parameter
  app.get("/byRestoId", ordersController.getAllByRestaurantId); // restaurantId is passed as a query parameter
  app.put("/status/:id", ordersController.updateStatus); // id is passed as a URL parameter
};
