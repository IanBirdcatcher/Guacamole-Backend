module.exports = (app) => {
    const role = require("../controllers/role.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], role.create);
    router.get("/:roleId", [authenticate], role.findByRoleId);


    app.use("/flight-plan-t2/role", router);
  };
  