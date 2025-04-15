module.exports = (app) => {
    const log = require("../controllers/log.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  

    router.get(
      "/",
      [authenticate], 
      log.findAll 
    );
    router.post(
      "/",
      [authenticate], 
      log.create
    );

    router.delete(
      "/:id",
      [authenticate],
      log.delete
    );
  
    app.use("/flight-plan-t2/log", router);
  };
  