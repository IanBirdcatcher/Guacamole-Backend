require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./app/models");

// Sync database
db.sequelize.sync();

// Configure CORS options
var corsOptions = {
  origin: "http://localhost:8081",  // Your frontend URL
};
app.use(cors(corsOptions));
app.options("*", cors());

// Parse requests with JSON payloads
app.use(express.json({ limit: '10mb' }));

// Parse requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Basic route for testing server functionality
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the flight plan application." });
});

// Import routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/reward.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/event.routes.js")(app);
require("./app/routes/type.routes.js")(app);
require("./app/routes/eventType.routes.js")(app);
require("./app/routes/experience.routes.js")(app);
require("./app/routes/experienceEvent.routes.js")(app);
require("./app/routes/leaderboard.routes.js")(app);

// Auth routes
require("./app/routes/auth.routes")(app);

// User control routes
require("./app/routes/role.routes")(app);
require("./app/routes/roleUser.routes")(app);
require("./app/routes/permission.routes")(app);
require("./app/routes/studentInfo.routes.js")(app);
require("./app/routes/studentInfoMajor.routes.js")(app);
require("./app/routes/studentInfoEvent.routes.js")(app);

require("./app/routes/user.routes")(app);

// Task routes
require("./app/routes/task.routes")(app);
require("./app/routes/taskMajors.routes")(app);
require("./app/routes/taskStrengths.routes")(app);
require("./app/routes/prerequisite.routes")(app);

// Experience Routes
require("./app/routes/experience.routes")(app);
require("./app/routes/experienceMajors.routes")(app);
require("./app/routes/experienceEventType.routes")(app);
require("./app/routes/experienceStrengths.routes")(app);

// Select item routes
require("./app/routes/category.routes")(app);
require("./app/routes/eventType.routes")(app);
require("./app/routes/major.routes")(app);
require("./app/routes/strength.routes")(app);

// Flight Plan Routes
require("./app/routes/flightPlan.routes.js")(app);
require("./app/routes/flightPlanTask.routes.js")(app);
require("./app/routes/flightPlanExperience.routes.js")(app);
require("./app/routes/semester.routes.js")(app);

// Badge Routes
require("./app/routes/badge.routes.js")(app);
require("./app/routes/badgeSpecificExperiences.routes.js")(app);
require("./app/routes/badgeSpecificTasks.routes.js")(app);
require("./app/routes/studentInfoBadge.routes.js")(app);

// Icon Routes
require("./app/routes/icon.routes.js")(app);

// Notification Routes
require("./app/routes/notification.routes.js")(app);

// Document routes
require("./app/routes/document.routes.js")(app);

// Student Purchase Routes
require("./app/routes/studentPurchase.routes.js")(app);

// Set the server to listen on a specified port
const PORT = process.env.PORT || 3032;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
