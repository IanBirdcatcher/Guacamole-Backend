module.exports = (app) => {
    const badgeSpecificTask = require("../controllers/badgeSpecificTask.controller.js");
    const { authenticate , hasAccess } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    // Create a new badgeSpecificTask
    router.post("/", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificTask.create);
  
    // Get all badgeSpecificTasks for a specific badge
    router.get("/:badgeId", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificTask.findAllForBadge);
  
    // Delete a badgeSpecificTask by ID
    router.delete("/:badgeId", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificTask.deleteForBadgeId);
  
    app.use("/flight-plan-t2/badgeSpecificTask", router);
  };
