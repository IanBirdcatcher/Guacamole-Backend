module.exports = (app) => {
  const role = require("../controllers/role.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new role
  router.post("/", [authenticate], role.create);

  // Find a role by ID
  router.get("/:roleId", [authenticate], role.findByRoleId);

  // Get all roles
  router.get("/roles", [authenticate], role.findAll);
 
  app.use("/flight-plan-t2/role", router);
};
