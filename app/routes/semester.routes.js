module.exports = (app) => {
    const semester = require("../controllers/semester.controller.js");
    const {
      authenticate
    } = require("../authorization/authorization.js");
    const ENUM = require("../config/PermisionsENUM.js");
    var router = require("express").Router();
  
    router.post(
      "/",
      [authenticate],
      semester.create
    );
    router.get(
      "/",
      [authenticate],
      semester.findAll
    );
    router.get(
      "/byDate/",
      [authenticate],
      semester.getByDate
    );  
    router.get(
      "/:id",
      [authenticate],
      semester.findOne
    );
    router.put(
      "/:id",
      [authenticate],
      semester.update
    );
    router.delete(
      "/:id",
      [authenticate],
      semester.delete
    );
  
    app.use("/flight-plan-t2/semester", router);
  };
  