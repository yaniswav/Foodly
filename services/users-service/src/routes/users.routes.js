const logsController = require("../controllers/users.controller");
const requiredFields = require('../middlewares/requiredFields.js');
const requiredArgs = require('../middlewares/requiredArgs.js');

module.exports = function (app) {
    app.post("/register", requiredFields(["firstname", "lastname", "email", "password", "role"]), logsController.register);
    app.patch("", logsController.update);
    app.get("", logsController.getById);
};