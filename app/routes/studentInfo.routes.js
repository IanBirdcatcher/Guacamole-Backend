module.exports = (app) => {
    const studentInfo = require("../controllers/studentInfo.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  
    router.post("/", [authenticate], studentInfo.create);
    router.get("/user/:userId", [authenticate], studentInfo.findAllByUserId);

    app.use("/flight-plan-t2/studentInfo", router);

  };