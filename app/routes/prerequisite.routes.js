module.exports = (app) => {
    const prerequisite = require("../controllers/prerequisite.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      hasAccess(ENUM.ADD_TASK),
      prerequisite.create
    );
    router.get(
      "/",
      [authenticate],
      prerequisite.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      prerequisite.findOne
    );
    router.get(
      "/byTask/:id/:flightPlanId",
      [authenticate],
      prerequisite.findAllPrerequisitesForTask
    );
    router.get(
      "/byPrerequisite/:id",
      [authenticate],
      prerequisite.findAllForPrerequisite
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_TASK)],
      prerequisite.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.REMOVE_TASK)],
      prerequisite.delete
    );
    app.use("/flight-plan-t2/prerequisite", router);
  };
  