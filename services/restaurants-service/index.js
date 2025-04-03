const express = require('express');
const app = express()
const port = 3000

// Express middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./src/middlewares/postgre-connexion').postgreConnect().catch((err) => {
  console.error('Error connecting to PostgreSQL', err.stack);
});

app.options('/', function (req, res) {
  res.status(200).json({ msg: "Welcome on restaurants service" });
});

require('./src/routes/restaurants.routes')(app);

app.listen(port, () => {
  console.log(`Users service listening on port ${port}`)
})
