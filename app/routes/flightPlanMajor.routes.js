module.exports = (app) => {
    const flightPlanMajor = require("../controllers/flightPlanMajor.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    // Create a new flightPlanMajor
    router.post("/", [authenticate], flightPlanMajor.create);
  
    // Get all flightPlanMajors for a specific flightPlan
    router.get("/:flightPlanId", [authenticate], flightPlanMajor.findAllForFlightPlan);
  
    // Update a flightPlanMajor by ID
    router.put("/:id", [authenticate], flightPlanMajor.update);
  
    // Delete a flightPlanMajor by ID
    router.delete("/:flightPlanId", [authenticate], flightPlanMajor.delete);
  
    app.use("/flight-plan-t2/flightPlanMajors", router);
  };
  