module.exports = (app) => {
    const Strength = require("../controllers/strength.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      Strength.create
    );
    router.get(
      "/",
      [authenticate],
      Strength.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      Strength.findOne
    );
    router.put(
      "/:id",
      [authenticate],
      Strength.update
    );
    router.delete(
      "/:id",
      [authenticate],
      Strength.delete
    );
    app.use("/flight-plan-t2/strength", router);
  };
  