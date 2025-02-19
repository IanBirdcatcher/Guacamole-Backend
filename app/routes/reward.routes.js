module.exports = (app) => {
    const reward = require("../controllers/reward.controller.js");
    const { authenticate, hasAccess } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM");
    var router = require("express").Router();
  
    router.post("/", [authenticate],  hasAccess(ENUM.ADD_REWARD),  reward.create);
    router.get("/", [authenticate], reward.findAll);
    router.get("/:id", [authenticate], reward.findOne);
    router.put("/:id", [authenticate], hasAccess(ENUM.ADD_REWARD), reward.update);
    router.delete("/:id", [authenticate],  hasAccess(ENUM.REMOVE_REWARD), reward.delete);
  
    app.use("/flight-plan-t2/reward", router);
  };