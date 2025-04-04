module.exports = (app) => {
    const badgeSpecificExperience = require("../controllers/badgeSpecificExperience.controller.js");
    const { authenticate , hasAccess } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM");
    var router = require("express").Router();
  
    // Create a new badgeSpecificExperience
    router.post("/", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificExperience.create);
  
    // Get all badgeSpecificExperiences for a specific badge
    router.get("/:badgeId", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificExperience.findAllForBadge);
  
    // Delete a badgeSpecificExperience by ID
    router.delete("/:badgeId", [authenticate, hasAccess(ENUM.ADD_BADGE)], badgeSpecificExperience.deleteForBadgeId);
  
    app.use("/flight-plan-t2/badgeSpecificExperience", router);
  };
