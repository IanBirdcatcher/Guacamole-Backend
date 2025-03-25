module.exports = (app) => {
    const studentInfo = require("../controllers/studentInfo.controller.js");
    var router = require("express").Router();
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js"); 
    var router = require("express").Router();
  
    router.post("/", [authenticate],hasAccess(ENUM.CHANGE_STUDENT_INFO),studentInfo.create); 
    router.put("/:userId",studentInfo.update); 
    router.get("/user/:userId", [authenticate], studentInfo.findAllByUserId);

    app.use("/flight-plan-t2/studentInfo", router);
    
  }; 