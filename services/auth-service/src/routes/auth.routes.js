const authController = require("../controllers/auth.controller");

module.exports = function(app) {
  app.all("/authenticate", authController.authenticate);
  app.post("/register", authController.register);
  app.post("/login", authController.login);
  app.post("/refresh", authController.refresh);
};


/**
 * @api {post} /register Register User
 * @apiName Register
 * @apiGroup Auth
 * @apiDescription Register a new user with the provided details.
 * 
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * 
 * @apiSuccess {String} message Registration successful message.
 * @apiError {String} error Error message.
 */

/**
 * @api {post} /login Login User
 * @apiName Login
 * @apiGroup Auth
 * @apiDescription Log in a user with the provided credentials.
 * 
 * @apiParam {String} username User's username.
 * @apiParam {String} password User's password.
 * 
 * @apiSuccess {String} token Authentication token.
 * @apiError {String} error Error message.
 */

/**
 * @api {post} /refresh Refresh Token
 * @apiName Refresh
 * @apiGroup Auth
 * @apiDescription Refresh the authentication token.
 * 
 * @apiParam {String} token Current authentication token.
 * 
 * @apiSuccess {String} token New authentication token.
 * @apiError {String} error Error message.
 */