const db = require("../models");
const StudentInfoMajor = db.studentInfoMajor;
const Op = db.Sequelize.Op;

// Create and Save a new StudentInfoMajor entry
exports.create = (req, res) => {
  // Define the data object for the new StudentInfoMajor entry
  const StudentInfoMajorData = {
    majorId: req.body.majorId,
    studentInfoId: req.body.studentInfoId,
  };

  // Save the StudentInfoMajor entry in the database
  StudentInfoMajor.create(StudentInfoMajorData)
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
            err.message || "Error creating the StudentInfoMajor entry.",
        });
      }
    });
};

// Retrieve all StudentInfoMajor entries for an studentInfo
exports.findAll = (req, res) => {
  StudentInfoMajor.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoMajor entries found for studentInfoId=${req.params.studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoMajor entries.`,
      });
    });
};

// Retrieve a single StudentInfoMajor entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentInfoMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoMajor entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoMajor entry with id=${id}.`,
      });
    });
};

exports.findAllForStudentInfo = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoMajor.findAll({ where: { studentInfoId: studentInfoId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoMajor entries found for studentInfoId=${studentInfoId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoMajor entry with id=${id}.`,
      });
    });
};

exports.findAllStudentInfosForMajor = (req, res) => {
  const majorId = req.params.majorId;
  StudentInfoMajor.findAll({ where: { majorId: majorId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoMajor entries found for majorId=${majorId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoMajor entry with id=${id}.`,
      });
    });
};

// Update an StudentInfoMajor entry by ID
exports.update = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoMajor.update(req.body, {
    where: { studentInfoId: studentInfoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfoMajor entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update StudentInfoMajor entry with id=${studentInfoId}.`,
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
            err.message || "Error updating the StudentInfoMajor entry.",
        });
      }
    });
};

// Delete an StudentInfoMajor entry by ID
exports.delete = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoMajor.destroy({ where: { studentInfoId: studentInfoId } })
    .then(() => {
      res.send({
        message: "StudentInfoMajor entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting StudentInfoMajor entry with id=${studentInfoId}.`,
      });
    });
};
