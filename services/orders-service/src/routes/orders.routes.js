const ordersController = require("../controllers/orders.controller");


module.exports = function(app) {
  app.get("/orders", ordersController.getById); // id is passed as a query parameter
  app.post("/orders", ordersController.createOrder);
  app.delete("/orders/:id", ordersController.deleteById); // id is passed as a query parameter
  app.get("/ordersByUserId", ordersController.getAllByUserId); // userId is passed as a query parameter
  app.get("/ordersByRestoId", ordersController.getAllByRestaurantId); // restaurantId is passed as a query parameter
  app.put("/orders/status/:id", ordersController.updateStatus); // id is passed as a URL parameter
};
