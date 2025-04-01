const db = require("../models");
const icon = db.icon;
const Op = db.Sequelize.Op;
const path = require('path');
const multer = require('multer');
const fs = require('fs'); 

// Set up storage engine for multer to save the image in a directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // save the file in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // create a unique filename
  }
});

const upload = multer({ storage: storage });

// Create and Save a new icon
exports.create = (req, res) => {
  if (!req.file) {
    return res.status(400).send({
      message: "No image uploaded."
    });
  }

  const iconData = {
    image: `/uploads/${req.file.filename}`, // save the image URL path
    forBadge: req.body.forBadge || false,
  };

  icon.create(iconData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the icon.",
      });
    });
};

// Middleware to handle file upload
exports.uploadIcon = upload.single('image');  // Handle single image upload

// Retrieve all icons from the database
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  icon.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving icons.",
      });
    });
};

// Find a single icon with an id
exports.findOne = (req, res) => {
  const id = req.params.image;
  try {
    const iconPath = safeJoin(path.join(__dirname, '../../uploads'), id);
    if (iconPath) {
      if (fs.existsSync(iconPath)) {
        res.sendFile(iconPath);
      } else {
        res.status(404).send('File not found');
      }
    } else {
      throw new Error("Invalid icon path");
    }
  } catch (err) {
    res.status(500).send({
      message: "Some error occurred while retrieving icons.",
    });
  }
};

function safeJoin(base, userInput) {
  const targetPath = path.normalize(path.join(base, userInput));
  console.log(targetPath);
  if (targetPath.startsWith(base)) {
    return targetPath;
  }
  return null; // or throw an error, indicating an invalid path
}


// Update a icon by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  icon.update(updatedData, { where: { id } })
    .then((result) => {
      if (result[0] === 0) {
        return res.status(404).json({ message: "Icon not found" });
      }
      res.json({ message: "Icon updated successfully" });
    })
    .catch((err) => {
      console.error("Error updating icon:", err);
      res.status(500).json({ message: "Error updating icon" });
    });
};

// Delete a icon by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  icon.destroy({ where: { id } })
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({ message: "Icon not found" });
      }
      res.json({ message: "Icon deleted successfully" });
    })
    .catch((err) => {
      console.error("Error deleting icon:", err);
      res.status(500).json({ message: "Error deleting icon" });
    });
};
