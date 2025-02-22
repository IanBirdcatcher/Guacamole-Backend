module.exports = (app) => {
    const eventType = require("../controllers/eventType.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new eventType
    router.post("/", [authenticate], eventType.create);
  
    // Find a eventType by ID
    router.get("/:eventTypeId", [authenticate], eventType.findByEventTypeID);
  
    // Get all eventTypes
    router.get("/eventTypes", [authenticate], eventType.findAll);
   
    app.use("/flight-plan-t2/eventType", router);
  };
  