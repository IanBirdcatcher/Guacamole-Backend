module.exports = (app) => {
    const icon = require("../controllers/icon.controller.js");
    const { authenticate, hasAccess } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM");
    var router = require("express").Router();
  
    router.post("/", [authenticate],  hasAccess(ENUM.ADD_icon),  icon.create);
    router.get("/", [authenticate], icon.findAll);
    router.get("/:id", [authenticate], icon.findOne);
    router.put("/:id", [authenticate], hasAccess(ENUM.ADD_icon), icon.update);
    router.delete("/:id", [authenticate],  hasAccess(ENUM.REMOVE_icon), icon.delete);
  
    app.use("/flight-plan-t2/icon", router);
  };