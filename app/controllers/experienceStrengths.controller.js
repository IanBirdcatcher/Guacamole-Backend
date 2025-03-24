const db = require("../models");
const ExperienceStrength = db.experienceStrength;
const Op = db.Sequelize.Op;

// Create and Save a new ExperienceStrength entry
exports.create = (req, res) => {
  // Define the data object for the new ExperienceStrength entry
  const ExperienceStrengthData = {
    strengthId: req.body.strengthId,
    experienceId: req.body.experienceId,
  };

  // Save the ExperienceStrength entry in the database
  ExperienceStrength.create(ExperienceStrengthData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The strengthId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the ExperienceStrength entry.",
        });
      }
    });
};

// Retrieve all ExperienceStrength entries for an experience
exports.findAll = (req, res) => {
  ExperienceStrength.findAll({
    where: { experienceId: req.params.experienceId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No ExperienceStrength entries found for experienceId=${req.params.experienceId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving ExperienceStrength entries.`,
      });
    });
};

// Retrieve a single ExperienceStrength entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  ExperienceStrength.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No ExperienceStrength entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceStrength entry with id=${id}.`,
      });
    });
};

exports.findAllForExperience = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceStrength.findAll({ where: { experienceId: experienceId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No ExperienceStrength entries found for experienceId=${experienceId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceStrength entry with id=${id}.`,
      });
    });
};

// Update an ExperienceStrength entry by ID
exports.update = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceStrength.update(req.body, {
    where: { experienceId: experienceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceStrength entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update ExperienceStrength entry with id=${experienceId}.`,
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
          message:
            err.message || "Error updating the ExperienceStrength entry.",
        });
      }
    });
};

// Delete an ExperienceStrength entry by ID
exports.delete = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceStrength.destroy({ where: { experienceId: experienceId } })
    .then(() => {
      res.send({
        message: "ExperienceStrength entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting ExperienceStrength entry with id=${experienceId}.`,
      });
    });
};
