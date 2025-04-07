module.exports = app => {
    const studentPurchases = require("../controllers/studentPurchase.controller.js");
    const router = require("express").Router();
  
    // New route: Get recent purchases
    router.get("/recent/:userId", studentPurchases.getRecentPurchases);
  
    // Add other routes as needed (e.g., create, delete, getAll, etc.)
  
    app.use('/api/studentPurchases', router);
  };
  