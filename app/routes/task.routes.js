module.exports = (app) => {
    const task = require("../controllers/task.controller.js");
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
      task.create
    );
    router.get(
      "/",
      [authenticate],
      task.findAll
    );
    router.get(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_TASK)],
      task.findOne
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_TASK)],
      task.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_TASK)],
      task.delete
    );
    app.use("/flight-plan-t2/task", router);
  };
  