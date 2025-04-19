module.exports = (app) => {
  const studentPurchase = require("../controllers/studentPurchase.controller.js");
  const router = require("express").Router();

  // Route to get recent purchases for a specific user
  router.get("/recent/:userId", studentPurchase.getRecentPurchases);


  // Route to create a new purchase for a student
  router.post("/", studentPurchase.create);
  
  app.use("/flight-plan-t2/studentPurchase", router);
};
