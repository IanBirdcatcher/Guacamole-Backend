module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM");
  var router = require("express").Router();

  router.post("/", [authenticate], user.create);
  router.get("/", [authenticate, hasAccess(ENUM.READ_STUDENT_INFO)], user.findAll);
  router.get("/:id", [authenticate], user.findOne);
  router.put("/:id", [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)], user.update);
  router.delete("/:id", [authenticate, hasAccess(ENUM.CHANGE_STUDENT_INFO)], user.delete);

  app.use("/flight-plan-t2/user", router);
};
