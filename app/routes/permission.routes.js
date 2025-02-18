module.exports = (app) => {
    const permission = require("../controllers/permission.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], permission.create);
    router.get("/:userId", [authenticate], permission.findByUser);
    router.put("/:userId", [authenticate], permission.updateByUserId);


    app.use("/flight-plan-t2/permission", router);
};