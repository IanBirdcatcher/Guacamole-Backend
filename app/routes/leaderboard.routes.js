module.exports = (app) => {
    const leaderboard = require("../controllers/leaderboard.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    var router = require("express").Router();
  

    // Get all experienceStrengths for a specific experience
    router.get("/leaderboard", [authenticate], leaderboard.findAllLeaderboardInfo);

    app.use("/flight-plan-t2/", router);
  };