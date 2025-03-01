const db = require("../models");
const Experience = db.experience;
const Op = db.Sequelize.Op;

// Create and Save a new Experience entry
exports.create = (req, res) => {
  // Define the data object for the new Experience entry
  const ExperienceData = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
    points: req.body.points,
    type: req.body.type,
    subtext: req.body.subtext,
    priority: req.body.priority,
    reflectionRequired: req.body.reflectionRequired,
    semestersFromGraduation: req.body.semestersFromGraduation,
    documentRequired: req.body.documentRequired,
    userId: req.body.userId,
  };
  // Save the Experience entry in the database
  Experience.create(ExperienceData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error creating the Experience entry.",
      });
    });
};

// Retrieve all Experience entries
exports.findAll = (req, res) => {
  Experience.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Experience entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Experience entries.`,
      });
    });
};

// Retrieve a single Experience entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Experience.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Experience entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Experience entry with id=${id}.`,
      });
    });
};

// Update an Experience entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Experience.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Experience entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Experience entry with id=${id}.`,
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
          message: err.message || "Error updating the Experience entry.",
        });
      }
    });
};

// Delete an Experience entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Experience.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Experience entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Experience entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error deleting Experience entry with id=${id}.`,
      });
    });
};
