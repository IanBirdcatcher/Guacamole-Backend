module.exports = (app) => {
  const eventType = require("../controllers/eventType.controller.js");
  const {
    authenticate,
    hasAccess,
  } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM.js");
  var router = require("express").Router();

  router.post(
    "/",
    [authenticate],
    eventType.create
  );
  router.get(
    "/",
    [authenticate],
    eventType.findAll
  );
  router.get(
    "/:id",
    [authenticate, ],
    eventType.findOne
  );
  router.put(
    "/:id",
    [authenticate, ],
    eventType.update
  );
  router.delete(
    "/:id",
    [authenticate, ],
    eventType.delete
  );

  app.use("/flight-plan-t2/eventType", router);
};
