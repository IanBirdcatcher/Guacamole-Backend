const multer = require("multer");
const path = require("path");
const fs = require("fs");
const express = require("express");

module.exports = (app) => {
  const icon = require("../controllers/icon.controller.js");
  const { authenticate, hasAccess } = require("../authorization/authorization.js");
  const ENUM = require("../config/PermisionsENUM");

  var router = express.Router();

  // Ensure the 'uploads' folder exists
  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Multer setup for file uploads
  const storage = multer.diskStorage({
    destination: "./uploads/", // Ensure this folder exists!
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Only image files are allowed.'));
      }
      cb(null, true);
    },
  });

  
  router.post("/upload", upload.single("image"), (req, res) => {
    // Log the incoming file to check if it's being received
    console.log('Uploaded file:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Check file size
    if (req.file.size > 10 * 1024 * 1024) {
      return res.status(400).json({ error: "File size exceeds 10MB" });
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ error: "Only image files are allowed." });
    }

    // Respond with the image URL
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  });


  router.post("/", [authenticate, icon.uploadIcon], hasAccess(ENUM.ADD_icon), icon.create);
  router.get("/", [authenticate], icon.findAll);
  router.get("/:image", [authenticate], icon.findOne);
  router.put("/:id", [authenticate], hasAccess(ENUM.ADD_icon), icon.update);
  router.delete("/:id", [authenticate], hasAccess(ENUM.REMOVE_icon), icon.delete);


  app.use("/flight-plan-t2/icon", router);

 
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
};
