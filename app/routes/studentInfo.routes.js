module.exports = (app) => {
    const studentInfo = require("../controllers/studentInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], studentInfo.create);
    router.get("/:id", [authenticate], studentInfo.findOne);

    app.use("/flight-plan-t2/studentInfo", router);

  };