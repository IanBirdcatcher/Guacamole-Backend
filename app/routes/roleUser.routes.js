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

  // New route to get role information by user ID
  router.get("/roleInfo/:userId", [authenticate], roleUser.getRoleInfoByUserId);

  // Update user role
  router.put("/:userId/role", [authenticate], roleUser.updateUserRole); 

  app.use("/flight-plan-t2/roleUser", router);
};  