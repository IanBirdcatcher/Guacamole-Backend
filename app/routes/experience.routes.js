module.exports = (app) => {
  const experience = require("../controllers/experience.controller.js");
  const {
    authenticate,
    hasAccess,
  } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM.js");
  var router = require("express").Router();

  router.post(
    "/",
    [authenticate],
    experience.create
  );
  router.get(
    "/",
    [authenticate],
    experience.findAll
  );
  router.get(
    "/:id",
    [authenticate, hasAccess(ENUM.READ_EXPERIENCE)],
    experience.findOne
  );
  router.put(
    "/:id",
    [authenticate, hasAccess(ENUM.ADD_EXPERIENCE)],
    experience.update
  );
  router.delete(
    "/:id",
    [authenticate],
    experience.delete
  );

  app.use("/flight-plan-t2/experience", router);
};
