module.exports = (app) => {
    const flightPlan = require("../controllers/flightPlan.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate], hasAccess(ENUM.CHANGE_STUDENT_INFO),
      flightPlan.create
    );
    router.get(
      "/",
      [authenticate],
      flightPlan.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      flightPlan.findOne
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlan.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)],
      flightPlan.delete
    );
    app.use("/flight-plan-t2/flightPlan", router);
  };
  