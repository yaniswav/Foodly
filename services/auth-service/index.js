const express = require("express");
const app = express();
const PORT = 3000;

require("dotenv").config();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./src/routes/auth.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});