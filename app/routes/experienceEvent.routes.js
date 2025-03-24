module.exports = (app) => {
  const experienceEvent = require("../controllers/experienceEvent.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM.js");
  var router = require("express").Router();

  router.post("/", [authenticate], experienceEvent.create);
  router.get("/byExperience/:id", [authenticate], experienceEvent.findByExperience);
  router.get("/byEvent/:id", [authenticate], experienceEvent.findByEvent);
  router.put("/:id", [authenticate], experienceEvent.update);
  router.delete("/:id", [authenticate], experienceEvent.delete);

  app.use("/flight-plan-t2/experienceEvent", router);
};
