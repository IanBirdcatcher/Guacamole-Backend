const db = require("../models");
const icon = db.icon;
const Op = db.Sequelize.Op;
const path = require('path');
const multer = require('multer');

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
  const id = req.params.id;
  icon.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find icon with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving icon with id=" + id,
      });
    });
};

// Update a icon by
