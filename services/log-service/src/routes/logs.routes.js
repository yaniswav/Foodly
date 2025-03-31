const logsController = require("../controllers/logs.controller");


module.exports = function(app) {
  app.get("/logsByUser", logsController.getAllByUserId);
  app.post("/logs", logsController.createLog);
};
