module.exports = (app) => {
  const experienceEventType = require("../controllers/experienceEventType.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new experienceEventType
  router.post("/", [authenticate], experienceEventType.create);

  // Get all experienceEventTypes
  router.get("/", [authenticate], experienceEventType.findAll);

  // Find a experienceEventType by ID
  router.get("/:id", [authenticate], experienceEventType.findOne); 

  router.put("/:id", [authenticate], experienceEventType.update)
  // Delete a experienceEventType by ID
  router.delete("/:id", [authenticate], experienceEventType.delete);

  app.use("/flight-plan-t2/experienceEventType", router);
};
