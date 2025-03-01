const db = require("../models");
const TaskStrength = db.taskStrength;
const Op = db.Sequelize.Op;

// Create and Save a new TaskStrength entry
exports.create = (req, res) => {
  // Define the data object for the new TaskStrength entry
  const TaskStrengthData = {
    strengthId: req.body.strengthId,
    taskId: req.body.taskId,
  };

  // Save the TaskStrength entry in the database
  TaskStrength.create(TaskStrengthData)
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
            err.message || "Error creating the TaskStrength entry.",
        });
      }
    });
};

// Retrieve all TaskStrength entries for an task
exports.findAll = (req, res) => {
  TaskStrength.findAll({
    where: { taskId: req.params.taskId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No TaskStrength entries found for taskId=${req.params.taskId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving TaskStrength entries.`,
      });
    });
};

// Retrieve a single TaskStrength entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  TaskStrength.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No TaskStrength entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving TaskStrength entry with id=${id}.`,
      });
    });
};

exports.findAllForTask = (req, res) => {
  const taskId = req.params.taskId;
  TaskStrength.findAll({ where: { taskId: taskId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No TaskStrength entries found for taskId=${taskId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving TaskStrength entry with id=${id}.`,
      });
    });
};
// Update an TaskStrength entry by ID
exports.update = (req, res) => {
  const taskId = req.params.taskId;
  TaskStrength.update(req.body, {
    where: { taskId: taskId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "TaskStrength entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update TaskStrength entry with id=${taskId}.`,
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
            err.message || "Error updating the TaskStrength entry.",
        });
      }
    });
};

// Delete an TaskStrength entry by ID
exports.delete = (req, res) => {
  const taskId = req.params.taskId;
  TaskStrength.destroy({ where: { taskId: taskId } })
    .then(() => {
      res.send({
        message: "TaskStrength entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting TaskStrength entry with id=${taskId}.`,
      });
    });
};
