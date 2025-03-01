module.exports = (app) => {
    const taskStrength = require("../controllers/taskStrengths.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new taskStrength
    router.post("/", [authenticate], taskStrength.create);
  
    // Get all taskStrengths for a specific task
    router.get("/:taskId", [authenticate], taskStrength.findAllForTask);
  
    // Find a taskStrength by ID
    router.get("/:id", [authenticate], taskStrength.findOne); 
  
    // Update a taskStrength by ID
    router.put("/:id", [authenticate], taskStrength.update);
  
    // Delete a taskStrength by ID
    router.delete("/:taskId", [authenticate], taskStrength.delete);
  
    app.use("/flight-plan-t2/taskStrengths", router);
  };
  