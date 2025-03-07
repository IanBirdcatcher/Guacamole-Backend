module.exports = (app) => {
    const major = require("../controllers/major.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      hasAccess(ENUM.ADD_EXPERIENCE),
      major.create
    );
    router.get(
      "/",
      [authenticate],
      major.findAll
    );
    router.get(
      "/:id",
      [authenticate, hasAccess(ENUM.READ_EXPERIENCE)],
      major.findOne
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_EXPERIENCE)],
      major.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_EXPERIENCE)],
      major.delete
    );
  
    app.use("/flight-plan-t2/major", router);
  };
  