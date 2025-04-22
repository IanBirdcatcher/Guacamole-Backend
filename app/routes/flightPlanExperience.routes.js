module.exports = (app) => {
    const flightPlanExperience = require("../controllers/flightPlanExperience.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      hasAccess(ENUM.CHANGE_STUDENT_INFO),
      flightPlanExperience.create
    );
    router.post(
      "/approve/:id",
      [authenticate],
      hasAccess(ENUM.CHANGE_STUDENT_INFO),
      flightPlanExperience.approve
    );
    router.get(
      "/",
      [authenticate],
      flightPlanExperience.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      flightPlanExperience.findOne
    );
    router.put(
      "/byEventType/:type",
      [authenticate],
      flightPlanExperience.AttendByEventType
    );
    router.get(
      "/byUser/:id",
      [authenticate],
      flightPlanExperience.findByUser
    );
    
    router.get(
      "/pending/experiences",
      [authenticate],
      flightPlanExperience.findPending
    );
    router.get(
      "/events/byExperience/:id",
      [authenticate],
      flightPlanExperience.findEventsForExperience
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlanExperience.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlanExperience.delete
    );
    app.use("/flight-plan-t2/flightPlanExperience", router);
  };
  