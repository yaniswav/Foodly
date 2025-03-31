const logsController = require("../controllers/logs.controller");


module.exports = function(app) {
  app.get("/byUserId", logsController.getAllByUserId);
  app.post("/log", logsController.createLog);
};
