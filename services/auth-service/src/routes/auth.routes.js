const authController = require("../controllers/auth.controller");
const requiredFields = require('../middlewares/requiredFields.js');

module.exports = function(app) {
  app.all("/authenticate", authController.authenticate);
  app.post("/login", requiredFields(["email", "password"]), authController.login);
};