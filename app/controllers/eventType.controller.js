const db = require("../models");
const EventType = db.eventType;
const Op = db.Sequelize.Op;

// Create and Save a new EventType entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "UserId cannot be empty!" });
    return;
  }

  // Define the data object for the new EventType entry
  const EventTypeData = {
    id: req.body.id,
    type: req.body.type,
  };

  // Save the EventType entry in the database
  EventType.create(EventTypeData)
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
          message: err.message || "Error creating the EventType entry.",
        });
      }
    });
};

// Retrieve all EventType entries
exports.findAll = (req, res) => {
  EventType.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No EventType entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving EventType entries.`,
      });
    });
};

// Retrieve a single EventType entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  EventType.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No EventType entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving EventType entry with id=${id}.`,
      });
    });
};

// Update an EventType entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  EventType.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "EventType entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update EventType entry with id=${id}.`,
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
          message: err.message || "Error updating the EventType entry.",
        });
      }
    });
};

// Delete an EventType entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  EventType.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "EventType entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete EventType entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting EventType entry with id=${id}.`,
      });
    });
};