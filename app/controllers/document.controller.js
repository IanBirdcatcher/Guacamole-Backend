const db = require("../models");
const Document = db.document;
const multer = require("multer");
const path = require("path");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "studentUploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File upload limits and validation
const upload = multer({
  storage: storage,
}).single("file"); // Expecting a single file upload with the field name 'file'

// Create and Save a new Document
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.type) {
    return res.status(400).send({
      message: "Name and type are required fields.",
    });
  }

  // Create a Document
  const documentData = {
    name: req.body.name,
    type: req.body.type,
    data: req.body.data || null,
    comment: req.body.comment || null,
  };

  // Save Document in the database
  Document.create(documentData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Document.",
      });
    });
};

// Upload and Save a new Document
exports.uploadDocument = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }


    console.log("File uploaded:", req.file); 

    try {
      // Save file metadata to the database
      const documentData = {
        data:`/studentUploads/`,
        name: req.file.originalname,
        type: req.file.mimetype,
        comment: req.body.comment || null,
        flightPlanTaskId: req.body.flightplanTaskId, 
      };

      const newDocument = await Document.create(documentData);

      res.status(201).json({
        message: "File uploaded successfully",
        document: newDocument,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// Retrieve all Documents
exports.findAll = (req, res) => {
  Document.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving documents.",
      });
    });
};

// Retrieve a single Document by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Document.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Document with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Document with id=" + id,
      });
    });
};

// Update a Document by ID
exports.update = (req, res) => {
  const id = req.params.id;

  Document.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update Document with id=${id}. Maybe Document was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Document with id=" + id,
      });
    });
};

// Delete a Document by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Document.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Document was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Document with id=${id}. Maybe Document was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id,
      });
    });
};