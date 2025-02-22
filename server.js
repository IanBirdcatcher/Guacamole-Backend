require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

// Sync database
db.sequelize.sync();

// Configure CORS options
var corsOptions = {
  origin: "http://localhost:8081",
};
app.use(cors(corsOptions));
app.options("*", cors());

// Parse requests with JSON payloads
app.use(express.json());

// Parse requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Basic route for testing server functionality
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the flight plan application." });
});

// Import routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
<<<<<<< HEAD
require("./app/routes/experience.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/category.routes")(app);
=======
require("./app/routes/role.routes")(app);
require("./app/routes/roleUser.routes")(app);
require("./app/routes/permission.routes")(app);

>>>>>>> 7a0c5daf3855a2d9a4c42dd83819bff2f20659ee


// Set the server to listen on a specified port
const PORT = process.env.PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
