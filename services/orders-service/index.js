require('./src/middlewares/mongo-connexion').main().catch(err => console.log(err));
const express = require('express');
const app = express()
const port = 3000

// Express middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options('', function (req, res) {
  res.status(200).json({ msg: "Welcome on order service" });
});

require('./src/routes/orders.routes')(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
