module.exports = (app) => {
    const category = require("../controllers/category.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      hasAccess(ENUM.ADD_TASK) || hasAccess(ENUM.ADD_EXPERIENCE),
      category.create
    );
    router.get(
      "/",
      [authenticate],
      category.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      category.findOne
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_TASK) || hasAccess(ENUM.ADD_EXPERIENCE)],
      category.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.DELETE_TASK) || hasAccess(ENUM.DELETE_EXPERIENCE)],
      category.delete
    );
    app.use("/flight-plan-t2/category", router);
  };
  