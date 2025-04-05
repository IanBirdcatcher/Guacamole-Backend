module.exports = (app) => {
    const studentInfoEvent = require("../controllers/studentInfoEvent.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new studentInfoEvent
    router.post("/", [authenticate], studentInfoEvent.create);
  
    // Get all studentInfoEvents for a specific studentInfo
    router.get("/:studentInfoId", [authenticate], studentInfoEvent.findAllForStudentInfo);
  
    // Update a studentInfoEvent by ID
    router.put("/:id", [authenticate], studentInfoEvent.update);
  
    // Delete a studentInfoEvent by ID
    router.delete("/:studentInfoId", [authenticate], studentInfoEvent.delete);
  
    app.use("/flight-plan-t2/studentInfoEvent", router);
  };
  