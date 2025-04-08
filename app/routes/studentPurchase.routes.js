module.exports = (app) => {
  const studentPurchases = require("../controllers/studentPurchase.controller.js");
  const router = require("express").Router();

  // Route to get recent purchases for a specific user
  router.get("/recent/:userId", studentPurchases.getRecentPurchases);

  // Route to create a new purchase for a student
  router.post("/", studentPurchases.createPurchase);
  
  app.use("/api/studentPurchases", router);
};
