const db = require("../models");
const FlightPlanMajor = db.flightPlanMajor;
const Op = db.Sequelize.Op;

// Create and Save a new FlightPlanMajor entry
exports.create = (req, res) => {
  // Define the data object for the new FlightPlanMajor entry
  const FlightPlanMajorData = {
    majorId: req.body.majorId,
    flightPlanId: req.body.flightPlanId,
  };

  // Save the FlightPlanMajor entry in the database
  FlightPlanMajor.create(FlightPlanMajorData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The majorId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the FlightPlanMajor entry.",
        });
      }
    });
};

// Retrieve all FlightPlanMajor entries for an flightPlan
exports.findAll = (req, res) => {
  FlightPlanMajor.findAll({
    where: { flightPlanId: req.params.flightPlanId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No FlightPlanMajor entries found for flightPlanId=${req.params.flightPlanId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving FlightPlanMajor entries.`,
      });
    });
};

// Retrieve a single FlightPlanMajor entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  FlightPlanMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No FlightPlanMajor entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanMajor entry with id=${id}.`,
      });
    });
};

exports.findAllForFlightPlan = (req, res) => {
  const flightPlanId = req.params.flightPlanId;
  FlightPlanMajor.findAll({ where: { flightPlanId: flightPlanId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No FlightPlanMajor entries found for flightPlanId=${flightPlanId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanMajor entry with id=${id}.`,
      });
    });
};

exports.findAllFlightPlansForMajor = (req, res) => {
  const majorId = req.params.majorId;
  FlightPlanMajor.findAll({ where: { majorId: majorId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No FlightPlanMajor entries found for majorId=${majorId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanMajor entry with id=${id}.`,
      });
    });
};

// Update an FlightPlanMajor entry by ID
exports.update = (req, res) => {
  const flightPlanId = req.params.flightPlanId;
  FlightPlanMajor.update(req.body, {
    where: { flightPlanId: flightPlanId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "FlightPlanMajor entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update FlightPlanMajor entry with id=${flightPlanId}.`,
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
            err.message || "Error updating the FlightPlanMajor entry.",
        });
      }
    });
};

// Delete an FlightPlanMajor entry by ID
exports.delete = (req, res) => {
  const flightPlanId = req.params.flightPlanId;
  FlightPlanMajor.destroy({ where: { flightPlanId: flightPlanId } })
    .then(() => {
      res.send({
        message: "FlightPlanMajor entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting FlightPlanMajor entry with id=${flightPlanId}.`,
      });
    });
};
