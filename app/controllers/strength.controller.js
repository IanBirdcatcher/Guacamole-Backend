const db = require("../models");
const Strength = db.strength;
const Op = db.Sequelize.Op;

// Create and Save a new Strength entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }
  // Define the data object for the new Strength entry
  const StrengthData = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save the Strength entry in the database
  Strength.create(StrengthData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `An error occurred while creating the Strength entry.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the Strength entry.",
        });
      }
    });
};

// Retrieve all Strength entries
exports.findAll = (req, res) => {
  Strength.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Strength entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Strength entries.`,
      });
    });
};

// Retrieve a single Strength entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Strength.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Strength entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Strength entry with id=${id}.`,
      });
    });
};

// Update an Strength entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Strength.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Strength entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Strength entry with id=${id}.`,
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
          message: err.message || "Error updating the Strength entry.",
        });
      }
    });
};

// Delete an Strength entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Strength.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Strength entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Strength entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Strength entry with id=${id}.`,
      });
    });
};