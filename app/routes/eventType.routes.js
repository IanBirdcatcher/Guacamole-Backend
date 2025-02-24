module.exports = (app) => {
  const eventType = require("../controllers/eventType.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eventType
  router.post("/", [authenticate], eventType.create);

  // Find a eventType by ID
  router.get("/", [authenticate], eventType.findOne);
  // Update a eventType by ID
  router.put("/:id", [authenticate], eventType.update);

  // Delete a eventType by ID
  router.delete("/:id", [authenticate], eventType.delete);

  app.use("/flight-plan-t2/eventType", router);
};
