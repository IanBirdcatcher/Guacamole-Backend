module.exports = (app) => {
    const experienceMajor = require("../controllers/experienceMajor.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new experienceMajor
    router.post("/", [authenticate], experienceMajor.create);
  
    // Get all experienceMajors for a specific experience
    router.get("/:experienceId", [authenticate], experienceMajor.findAllForExperience);
  
    // Update a experienceMajor by ID
    router.put("/:id", [authenticate], experienceMajor.update);
  
    // Delete a experienceMajor by ID
    router.delete("/:experienceId", [authenticate], experienceMajor.delete);
  
    app.use("/flight-plan-t2/experienceMajors", router);
  };
  