
const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const path = __dirname + '/app/views/';
const app = express();
app.use(express.static(path));

// set port, listen for requests

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nana's application." });
});

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
require("./app/routes/tutorial.routes")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

