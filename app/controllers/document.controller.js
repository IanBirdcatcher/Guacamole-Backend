const db = require("../models");
const Document = db.document;
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "studentUploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `temp-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

// Upload and Save a new Document
exports.uploadDocument = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    console.log("File uploaded:", req.file);

    try {
      // Check if a document with the same flightPlanTaskId and name already exists
      const existingDocument = await Document.findOne({
        where: {
          flightPlanTaskId: req.body.flightplanTaskId,
        },
      });

      let document;
      if (existingDocument) {
        // Overwrite the existing document
        console.log("Overwriting existing document:", existingDocument.id);

        // Generate the old file path
        const oldFilePath = path.join(
          __dirname,
          "../../studentUploads",
          `${existingDocument.id}-${existingDocument.name}`
        );

        // Delete the old file so no duplicate files are left
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
          console.log("Deleted old file:", oldFilePath);
        }

        // Generate the new file path
        const newFileName = `${existingDocument.id}-${req.file.originalname}`;
        const newFilePath = `studentUploads/${newFileName}`;

        // Rename the uploaded file
        fs.renameSync(req.file.path, newFilePath);

        // Update the existing document's data
        existingDocument.name = req.file.originalname;
        existingDocument.data = `/studentUploads/${newFileName}`;
        existingDocument.type = req.file.mimetype;
        existingDocument.comment = req.body.comment || null;
        await existingDocument.save();

        document = existingDocument;
      } else {
        // Create a new document
        const documentData = {
          data: `/studentUploads/`, // Placeholder path
          name: req.file.originalname,
          type: req.file.mimetype,
          comment: req.body.comment || null,
          flightPlanTaskId: req.body.flightplanTaskId,
        };

        const newDocument = await Document.create(documentData);

        // Generate the new file path
        const newFileName = `${newDocument.id}-${req.file.originalname}`;
        const newFilePath = `studentUploads/${newFileName}`;

        // Rename the uploaded file
        fs.renameSync(req.file.path, newFilePath);

        // Update the new document's data
        newDocument.data = `/studentUploads/${newFileName}`;
        await newDocument.save();

        document = newDocument;
      }

      res.status(201).json({
        message: "File uploaded successfully",
        document: document,
        filePath: document.data,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

// Find a single document by flightPlanTaskId
exports.findOne = (req, res) => {
  const flightPlanTaskId = req.params.id;
  

  Document.findOne({
    where: { flightPlanTaskId: flightPlanTaskId },
  })
    .then((document) => {
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      const documentId= document.id.toString();
      const filePath = path.join(__dirname, '../../studentUploads', `${documentId}-${document.name}`);
      console.log("File path:", filePath);
      try {
        if (filePath) {
          if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
          } else {
            res.status(404).send('File not found');
          }
        } else {
          throw new Error("Invalid File path");
        }
      } catch (err) {
        res.status(500).send({
          message: "Some error occurred while retrieving file.",
        });
      }
    });
};

function safeJoin(base, userInput) {
  const targetPath = path.normalize(path.join(base, userInput));
  console.log(targetPath);
  if (targetPath.startsWith(base)) {
    return targetPath;
  }
  return null; // or throw an error, indicating an invalid path
}

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