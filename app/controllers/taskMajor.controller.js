const db = require("../models");
const TaskMajor = db.taskMajor;
const Op = db.Sequelize.Op;

// Create and Save a new TaskMajor entry
exports.create = (req, res) => {
  // Define the data object for the new TaskMajor entry
  const TaskMajorData = {
    majorId: req.body.majorId,
    taskId: req.body.taskId,
  };

  // Save the TaskMajor entry in the database
  TaskMajor.create(TaskMajorData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The eventTypeId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the TaskMajor entry.",
        });
      }
    });
};

// Retrieve all TaskMajor entries for an task
exports.findAll = (req, res) => {
  TaskMajor.findAll({
    where: { taskId: req.params.taskId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No TaskMajor entries found for taskId=${req.params.taskId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving TaskMajor entries.`,
      });
    });
};

// Retrieve a single TaskMajor entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  TaskMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No TaskMajor entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving TaskMajor entry with id=${id}.`,
      });
    });
};

exports.findAllForTask = (req, res) => {
  const taskId = req.params.taskId;
  TaskMajor.findAll({ where: { taskId: taskId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No TaskMajor entries found for taskId=${taskId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving TaskMajor entry with id=${id}.`,
      });
    });
};

exports.findAllTasksForMajor = (req, res) => {
  const majorId = req.params.majorId;
  TaskMajor.findAll({ where: { majorId: majorId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No TaskMajor entries found for majorId=${majorId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving TaskMajor entry with id=${id}.`,
      });
    });
};

// Update an TaskMajor entry by ID
exports.update = (req, res) => {
  const taskId = req.params.taskId;
  TaskMajor.update(req.body, {
    where: { taskId: taskId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "TaskMajor entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update TaskMajor entry with id=${taskId}.`,
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
            err.message || "Error updating the TaskMajor entry.",
        });
      }
    });
};

// Delete an TaskMajor entry by ID
exports.delete = (req, res) => {
  const taskId = req.params.taskId;
  TaskMajor.destroy({ where: { taskId: taskId } })
    .then(() => {
      res.send({
        message: "TaskMajor entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting TaskMajor entry with id=${taskId}.`,
      });
    });
};
