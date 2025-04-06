const db = require("../models");
const fs = require("fs");
const path = require("path");
const safeJoin = require('../safeJoinFunction');
const badge = db.badge;
const Op = db.Sequelize.Op;

const baseURL = path.join(__dirname, "../../uploads")
// Create and Save a new badge
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Must contain a name",
    });
    return;
  }
  console.log(req.body.id);
  console.log(req.body.name);
  console.log(req.body.desc);
  // Create a badge object with the image URL
  const badgeData = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    image: req.body.image,
    allCount: req.body.allCount,
    taskCount: req.body.taskCount,
    experienceCount: req.body.experienceCount,
    badgeSpecificTaskAND: req.body.badgeSpecificTaskAND,
    badgeSpecificExperienceAND: req.body.badgeSpecificExperienceAND
  };

  console.log(badgeData);

  // Save badge in the database

  badge
    .create(badgeData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the badge.",
      });
    });
};

// Retrieve all badges from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  badge
    .findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badges.",
      });
    });
};

// Find a single badge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  badge
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find badge with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving badge with id=" + id,
      });
    });
};

// Update a badge by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  const imagePath = safeJoin(baseURL, req.body.image);
  // Check image URL
  try{
  const oldBadgeData = await safeJoin(baseURL, (await badge.findByPk(id)).image)
  if( oldBadgeData.image != imagePath) {
    if (fs.existsSync(oldBadgeData)) {
      fs.unlinkSync(oldBadgeData);
      console.log("File deleted!");
    }
  }
  badge.update(req.body, {
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "badge was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update badge with id=${id}. Maybe badge was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating badge with id=" + id,
      });
    });
  }
  catch(err){
    return res.status(500).send({
      message: "Error updating badge with id=" + err,
    });
  }
};

// Delete a badge with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    // First, find the badge to get the image path
    const badgeToDelete = await badge.findByPk(id);
    if (!badgeToDelete) {
      return res.status(404).send({
        message: `Badge with id=${id} not found!`,
      });
    }
    // If there's an image, try to delete it
    if (badgeToDelete.image) {
      const imagePath = path.join(
        __dirname,
        "../../uploads",
        badgeToDelete.image
      );
      // Check if file exists before trying to delete
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        console.log("File deleted!");
      }
    }
    // Now destroy the badge record
    const num = await badge.destroy({
      where: { id: id },
    });

    if (num == 1) {
      res.send({
        message: "Badge was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete badge with id=${id}.`,
      });
    }
  } catch (error) {
    console.error("Error deleting badge:", error);
    res.status(500).send({
      message: "Error deleting badge with id=" + id,
      error: error.message,
    });
  }
};
