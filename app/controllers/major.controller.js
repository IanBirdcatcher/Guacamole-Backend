const db = require("../models");
const Major = db.major;
const Op = db.Sequelize.Op;

// Create and Save a new Major entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "UserId cannot be empty!" });
    return;
  }

  // Define the data object for the new Major entry
  const MajorData = {
    id: req.body.id,
    name: req.body.name,
    dept: req.body.dept,
  };

  // Save the Major entry in the database
  Major.create(MajorData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("userId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the Major entry.",
        });
      }
    });
};

// Retrieve all Major entries
exports.findAll = (req, res) => {
  Major.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Major entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Major entries.`,
      });
    });
};

// Retrieve a single Major entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Major.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Major entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Major entry with id=${id}.`,
      });
    });
};

// Update an Major entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Major.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Major entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Major entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("userId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error updating the Major entry.",
        });
      }
    });
};

// Delete an Major entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Major.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Major entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Major entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Major entry with id=${id}.`,
      });
    });
};