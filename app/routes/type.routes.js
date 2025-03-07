module.exports = (app) => {
  const type = require("../controllers/type.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM.js");
  var router = require("express").Router();

  router.post("/", [authenticate, hasAccess(ENUM.ADD_EVENT)], type.create);
  router.get("/", [authenticate], type.findAll);
  router.get("/:id", [authenticate], type.findOne);
  router.put("/:id", [authenticate, hasAccess(ENUM.CHANGE_EVENT)], type.update);
  router.delete("/:id", [authenticate, hasAccess(ENUM.REMOVE_EVENT)], type.delete);

  app.use("/flight-plan-t2/type", router);
};
