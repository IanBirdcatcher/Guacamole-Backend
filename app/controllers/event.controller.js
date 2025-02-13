const db = require("../models");
const Event = db.event;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = (req, res) => {
  // Validate request
  validationMessage = "Must contain a "
  if (!req.body.name) {
    validationMessage += "name, "
  } else if (!req.body.type) {
    validationMessage += "type, "
  } else if (!req.body.attendanceType) {
    validationMessage += "attendanceType, "
  } else if (!req.body.completionType) {
    validationMessage += "completionType, "
  } else if (!req.body.registrationType) {
    validationMessage += "registrationType, "
  }   
  if (validationMessage != "Must contain a ") {
    res.status(400).send({
      message: validationMessage.substr(0, validationMessage.length - 2) + "."
    });
    return;
  }

  // Create a Event
  const event = {
    id: req.body.id,
    name: req.body.id,
    desc: req.body.desc,
    startDateTime: req.body.startDateTime,
    endDateTime: req.body.endDateTime,
    type: req.body.type,
    location: req.body.location,
    attendanceType: req.body.attendanceType,
    completionType: req.body.completionType,
    registrationType: req.body.registrationType,
  };

  // Save Event in the database
  Event.create(event)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Event.",
      });
    });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Event.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Events.",
      });
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Event with id=${id}.`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error retrieving Event with id=" + id,
      });
    });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Event with id=" + id,
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Event.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id,
      });
    });
};