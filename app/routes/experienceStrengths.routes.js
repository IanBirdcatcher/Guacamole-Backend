module.exports = (app) => {
    const experienceStrength = require("../controllers/experienceStrengths.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new experienceStrength
    router.post("/", [authenticate], experienceStrength.create);
  
    // Get all experienceStrengths for a specific experience
    router.get("/:experienceId", [authenticate], experienceStrength.findAllForExperience);
  
    // Update a experienceStrength by ID
    router.put("/:id", [authenticate], experienceStrength.update);
  
    // Delete a experienceStrength by ID
    router.delete("/:experienceId", [authenticate], experienceStrength.delete);
  
    app.use("/flight-plan-t2/experienceStrengths", router);
  };
  