const express = require("express");
const router = express.Router();
const documentController = require("../controllers/document.controller");

module.exports = (app) => {
    // Create a new Document
    router.post("/", documentController.create);

    // Retrieve all Documents
    router.get("/", documentController.findAll);

    // Retrieve a single Document by ID
    router.get("/:id", documentController.findOne);

    // Update a Document by ID
    router.put("/:id", documentController.update);

    // Delete a Document by ID
    router.delete("/:id", documentController.delete);

    // Upload a Document 
    router.post("/upload", documentController.uploadDocument);

    app.use("/flight-plan-t2/documents", router);
};