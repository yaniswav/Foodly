const logsController = require("../controllers/logs.controller");
const requiredFields = require('../middlewares/requiredFields.js');
const requiredArgs = require('../middlewares/requiredArgs.js');

module.exports = function(app) {
  app.get("/byUserId", requiredArgs(["id"]), logsController.getAllByUserId);
  app.post("/log", requiredFields(["user_id", "event_type", "details"]),logsController.createLog);
};
