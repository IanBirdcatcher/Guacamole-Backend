const db = require("../models");
const StudentInfoEvent = db.studentInfoEvent;
const Op = db.Sequelize.Op;

// Create and Save a new StudentInfoEvent entry
exports.create = (req, res) => {
  // Define the data object for the new StudentInfoEvent entry
  const StudentInfoEventData = {
    eventId: req.body.eventId,
    studentInfoId: req.body.studentInfoId,
  };

  // Save the StudentInfoEvent entry in the database
  StudentInfoEvent.create(StudentInfoEventData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The eventId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the StudentInfoEvent entry.",
        });
      }
    });
};

// Retrieve all StudentInfoEvent entries for an studentInfo
exports.findAll = (req, res) => {
  StudentInfoEvent.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoEvent entries found for studentInfoId=${req.params.studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoEvent entries.`,
      });
    });
};

// Retrieve a single StudentInfoEvent entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentInfoEvent.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoEvent entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoEvent entry with id=${id}.`,
      });
    });
};

exports.findAllForStudentInfo = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoEvent.findAll({ where: { studentInfoId: studentInfoId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoEvent entries found for studentInfoId=${studentInfoId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoEvent entry with id=${id}.`,
      });
    });
};

exports.findAllStudentInfosForEvent = (req, res) => {
  const eventId = req.params.eventId;
  StudentInfoEvent.findAll({ where: { eventId: eventId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoEvent entries found for eventId=${eventId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoEvent entry with id=${id}.`,
      });
    });
};

// Update an StudentInfoEvent entry by ID
exports.update = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoEvent.update(req.body, {
    where: { studentInfoId: studentInfoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfoEvent entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update StudentInfoEvent entry with id=${studentInfoId}.`,
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
            err.message || "Error updating the StudentInfoEvent entry.",
        });
      }
    });
};

// Delete an StudentInfoEvent entry by ID
exports.delete = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoEvent.destroy({ where: { studentInfoId: studentInfoId } })
    .then(() => {
      res.send({
        message: "StudentInfoEvent entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting StudentInfoEvent entry with id=${studentInfoId}.`,
      });
    });
};
