module.exports = (app) => {
  const icon = require("../controllers/icon.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM");
  var router = require("express").Router();

  // POST route for creating a new icon with image upload handling
  router.post("/", [authenticate, icon.uploadIcon], hasAccess(ENUM.ADD_icon), icon.create);

  // GET routes
  router.get("/", [authenticate], icon.findAll);
  router.get("/:id", [authenticate], icon.findOne);

  // PUT route to update an icon
  router.put("/:id", [authenticate], hasAccess(ENUM.ADD_icon), icon.update);

  // DELETE route to remove an icon
  router.delete("/:id", [authenticate], hasAccess(ENUM.REMOVE_icon), icon.delete);

  // Use the routes under '/flight-plan-t2/icon' path
  app.use("/flight-plan-t2/icon", router);
};
