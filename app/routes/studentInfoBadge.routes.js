module.exports = (app) => {
    const studentInfoBadge = require("../controllers/studentInfoBadge.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new studentInfoBadge
    router.post("/", [authenticate], studentInfoBadge.create);
    //che
    router.get("/checkUserBadges/:studentInfoId", [authenticate], studentInfoBadge.checkUserBadges);
    
    // Get all studentInfoBadges for a specific studentInfo
    router.get("/:studentInfoId", [authenticate], studentInfoBadge.findAllForStudentInfo);
  
    // Update a studentInfoBadge by ID
    router.put("/:id", [authenticate], studentInfoBadge.update);
  
    // Delete a studentInfoBadge by ID
    router.delete("/:studentInfoId", [authenticate], studentInfoBadge.delete);
  
    app.use("/flight-plan-t2/studentInfoBadge", router);
  };

  