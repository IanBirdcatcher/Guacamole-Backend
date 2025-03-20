module.exports = (app) => {
    const studentInfoMajor = require("../controllers/studentInfoMajor.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new studentInfoMajor
    router.post("/", [authenticate], studentInfoMajor.create);
  
    // Get all studentInfoMajors for a specific studentInfo
    router.get("/:studentInfoId", [authenticate], studentInfoMajor.findAllForStudentInfo);
  
    // Update a studentInfoMajor by ID
    router.put("/:id", [authenticate], studentInfoMajor.update);
  
    // Delete a studentInfoMajor by ID
    router.delete("/:studentInfoId", [authenticate], studentInfoMajor.delete);
  
    app.use("/flight-plan-t2/studentInfoMajor", router);
  };
  