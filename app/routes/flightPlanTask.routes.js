module.exports = (app) => {
    const flightPlanTask = require("../controllers/flightPlanTask.controller.js");
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
      flightPlanTask.create
    );
    router.get(
      "/",
      [authenticate],
      flightPlanTask.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      flightPlanTask.findOne
    );
    router.get(
      "/byUser/:id",
      [authenticate],
      flightPlanTask.findOne
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlanTask.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlanTask.delete
    );
    app.use("/flight-plan-t2/flightPlanTask", router);
  };
  