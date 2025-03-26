module.exports = (app) => {
    const notification = require("../controllers/notification.controller.js");
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      hasAccess(ENUM.ADD_NOTIFICATION),
      notification.create
    );
    router.get(
      "/",
      [authenticate],
      notification.findAll
    );
    router.get(
      "/:id",
      [authenticate],
      notification.findOne
    );
    router.get(
      "/by/user/",
      [authenticate],
      notification.getByUser
    );
    router.put(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_NOTIFICATION)],
      notification.update
    );
    router.delete(
      "/:id",
      [authenticate, hasAccess(ENUM.ADD_NOTIFICATION)],
      notification.delete
    );
  
    app.use("/flight-plan-t2/notification", router);
  };
  