const authController = require("../controllers/auth.controller");

module.exports = function(app) {
  app.all("/authenticate", authController.authenticate);
  app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.post("/refresh", authController.refresh);
};

/**
 * @api {post} /auth/login Request Login 
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */