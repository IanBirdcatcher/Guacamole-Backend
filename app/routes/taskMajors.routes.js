module.exports = (app) => {
    const taskMajor = require("../controllers/taskMajor.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new taskMajor
    router.post("/", [authenticate], taskMajor.create);
  
    // Get all taskMajors for a specific task
    router.get("/:taskId", [authenticate], taskMajor.findAllForTask);
  
    // Update a taskMajor by ID
    router.put("/:id", [authenticate], taskMajor.update);
  
    // Delete a taskMajor by ID
    router.delete("/:taskId", [authenticate], taskMajor.delete);
  
    app.use("/flight-plan-t2/taskMajors", router);
  };
  