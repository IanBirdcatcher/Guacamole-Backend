module.exports = (app) => {
    const studentInfo = require("../controllers/studentInfo.controller.js");
    var router = require("express").Router();
    const {
      authenticate,
      hasAccess,
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js"); 
    var router = require("express").Router();
  
    router.post("/",studentInfo.create); 
    router.get("/user/:userId", [authenticate],hasAccess(ENUM.READ_STUDENT_INFO), studentInfo.findAllByUserId);

    app.use("/flight-plan-t2/studentInfo", router);
    
  }; 