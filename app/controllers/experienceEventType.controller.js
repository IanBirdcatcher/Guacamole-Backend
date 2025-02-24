const db = require("../models");
const ExperienceEventType = db.experienceEventType;
const Op = db.Sequelize.Op;

// Create and Save a new ExperienceEventType entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "UserId cannot be empty!" });
    return;
  }

  // Define the data object for the new ExperienceEventType entry
  const ExperienceEventTypeData = {
    id: req.body.id,
    type: req.body.type,
  };

  // Save the ExperienceEventType entry in the database
  ExperienceEventType.create(ExperienceEventTypeData)
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
          message: err.message || "Error creating the ExperienceEventType entry.",
        });
      }
    });
};

// Retrieve all ExperienceEventType entries
exports.findAll = (req, res) => {
  ExperienceEventType.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No ExperienceEventType entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceEventType entries.`,
      });
    });
};

// Retrieve a single ExperienceEventType entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  ExperienceEventType.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No ExperienceEventType entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving ExperienceEventType entry with id=${id}.`,
      });
    });
};

// Update an ExperienceEventType entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  ExperienceEventType.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "ExperienceEventType entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update ExperienceEventType entry with id=${id}.`,
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
          message: err.message || "Error updating the ExperienceEventType entry.",
        });
      }
    });
};

// Delete an ExperienceEventType entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  ExperienceEventType.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "ExperienceEventType entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete ExperienceEventType entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting ExperienceEventType entry with id=${id}.`,
      });
    });
};