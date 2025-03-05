module.exports = (app) => {
    const badge = require("../controllers/badge.controller.js");
    const { authenticate, hasAccess } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM");
    var router = require("express").Router();
  
    router.post("/", [authenticate],  hasAccess(ENUM.ADD_BADGE),  badge.create);
    router.get("/", [authenticate], badge.findAll);
    router.get("/:id", [authenticate], badge.findOne);
    router.put("/:id", [authenticate], hasAccess(ENUM.ADD_BADGE), badge.update);
    router.delete("/:id", [authenticate],  hasAccess(ENUM.REMOVE_BADGE), badge.delete);
  
    app.use("/flight-plan-t2/badge", router);
  };