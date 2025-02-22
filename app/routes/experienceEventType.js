module.exports = (app) => {
  const experienceEventType = require("../controllers/experienceEventType.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new experienceEventType
  router.post("/", [authenticate], experienceEventType.create);

  // Find a experienceEventType by ID
  router.get("/:experienceEventTypeId", [authenticate], experienceEventType.findByEventTypeID);

  // Get all experienceEventTypes
  router.get("/experienceEventTypes", [authenticate], experienceEventType.findAll);

  app.use("/flight-plan-t2/experienceEventType", router);
};
