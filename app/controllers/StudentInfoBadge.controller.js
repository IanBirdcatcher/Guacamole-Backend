const db = require("../models");
const StudentInfoBadge = db.studentInfoBadge;
const Op = db.Sequelize.Op;

// Create and Save a new StudentInfoBadge entry
exports.create = (req, res) => {
  // Define the data object for the new StudentInfoBadge entry
  const StudentInfoBadgeData = {
    badgeId: req.body.badgeId,
    studentInfoId: req.body.studentInfoId,
    dateEarned: req.body.dateEarned,
  };

  // Save the StudentInfoBadge entry in the database
  StudentInfoBadge.create(StudentInfoBadgeData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The badgeId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the StudentInfoBadge entry.",
        });
      }
    });
};

// Retrieve all StudentInfoBadge entries for an studentInfo
exports.findAll = (req, res) => {
  StudentInfoBadge.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoBadge entries found for studentInfoId=${req.params.studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoBadge entries.`,
      });
    });
};

// Retrieve a single StudentInfoBadge entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentInfoBadge.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoBadge entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoBadge entry with id=${id}.`,
      });
    });
};

exports.findAllForStudentInfo = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.findAll({ where: { studentInfoId: studentInfoId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoBadge entries found for studentInfoId=${studentInfoId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoBadge entry with id=${id}.`,
      });
    });
};

exports.findAllStudentInfosForBadge = (req, res) => {
  const badgeId = req.params.badgeId;
  StudentInfoBadge.findAll({ where: { badgeId: badgeId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoBadge entries found for badgeId=${badgeId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoBadge entry with id=${id}.`,
      });
    });
};

// Update an StudentInfoBadge entry by ID
exports.update = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.update(req.body, {
    where: { studentInfoId: studentInfoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfoBadge entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update StudentInfoBadge entry with id=${studentInfoId}.`,
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
            err.message || "Error updating the StudentInfoBadge entry.",
        });
      }
    });
};

// Delete an StudentInfoBadge entry by ID
exports.delete = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.destroy({ where: { studentInfoId: studentInfoId } })
    .then(() => {
      res.send({
        message: "StudentInfoBadge entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting StudentInfoBadge entry with id=${studentInfoId}.`,
      });
    });
};
