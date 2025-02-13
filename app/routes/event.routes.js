module.exports = (app) => {
  const event = require("../controllers/event.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM.js");
  var router = require("express").Router();

  router.post("/", [authenticate, hasAccess(ENUM.ADD_EVENT)], event.create);
  router.get("/", [authenticate], event.findAll);
  router.get("/:id", [authenticate], event.findOne);
  router.put("/:id", [authenticate, hasAccess(ENUM.CHANGE_EVENT)], event.update);
  router.delete("/:id", [authenticate, hasAccess(ENUM.REMOVE_EVENT)], event.delete);

  app.use("/flight-plan-t2/event", router);
};
