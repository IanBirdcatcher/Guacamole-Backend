module.exports = (app) => {
  const roleUser = require("../controllers/roleUser.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new roleUser
  router.post("/", [authenticate], roleUser.create);

  // Find all roleUser for a user
  router.get("/user/:id", [authenticate], roleUser.findByUser);

  // Find all users with a specific role ID
  router.get("/role/:roleId/users", [authenticate], roleUser.findUsersByRoleId);

  app.use("/flight-plan-t2/roleUser", router);
};