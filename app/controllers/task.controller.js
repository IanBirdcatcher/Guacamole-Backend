const db = require("../models");
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Task entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Name cannot be empty!" });
    return;
  }

  // Define the data object for the new Task entry
  const TaskData = {
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
  };

  // Save the Task entry in the database
  Task.create(TaskData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `An error occurred while creating the Task entry.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the Task entry.",
        });
      }
    });
};

// Retrieve all Task entries
exports.findAll = (req, res) => {
  Task.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Task entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Task entries.`,
      });
    });
};

// Retrieve all Task entries
exports.findTaskBySemesterFromGraduation = (req, res) => {
  Task.findAll({ where: { semestersFromGraduation: req.body.semestersFromGraduation }})
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Task entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Task entries.`,
      });
    });
};

// Retrieve a single Task entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Task entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Task entry with id=${id}.`,
      });
    });
};

// Update an Task entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Task.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Task entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Task entry with id=${id}.`,
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
          message: err.message || "Error updating the Task entry.",
        });
      }
    });
};

// Delete an Task entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Task.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Task entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Task entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Task entry with id=${id}.`,
      });
    });
};