const db = require("../models");
const ExperienceMajor = db.experienceMajor;
const Op = db.Sequelize.Op;
const StudentInfo = db.studentInfo;
const Session = db.session;
const StudentInfoMajor = db.studentInfoMajor;
const FlightPlan = db.flightPlan;
const FlightPlanExperience = db.flightPlanExperience;

// Create and Save a new ExperienceMajor entry
exports.create = (req, res) => {
  // Define the data object for the new ExperienceMajor entry
  const ExperienceMajorData = {
    majorId: req.body.majorId,
    experienceId: req.body.experienceId,
  };

  // Save the ExperienceMajor entry in the database
  ExperienceMajor.create(ExperienceMajorData)
  .then(async (data) => {
    let token = req.headers.authorization.replace("Bearer ", "");
    let session = await Session.findOne({ where: { token: token } });
    let currStudent = await StudentInfo.findOne({ where: { userId: session.userId } });
    let studentInfos = await StudentInfo.findAll({
      where: { semestersTillGraduation: currStudent.dataValues.semestersTillGraduation },
    });
    let studentInfoMajors = await StudentInfoMajor.findAll({ where: { majorId: req.body.majorId } });
    for (const si of studentInfos) {
      for (const sim of studentInfoMajors) {
        if (si.dataValues.id === sim.dataValues.studentInfoId) {
          const flightPlan = await FlightPlan.findOne({ where: { studentInfoId: si.dataValues.id } });
          const check = await FlightPlanExperience.findOne({
            where: {
              flightPlanId: flightPlan.dataValues.id,
              experienceId: req.body.experienceId,
            },
          });

          if (!check) {
            await FlightPlanExperience.create({
              flightPlanId: flightPlan.dataValues.id,
              experienceId: req.body.experienceId,
            });
          }
        }
      }
    }

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
            err.message || "Error creating the ExperienceMajor entry.",
        });
      }
    });
};

// Retrieve all ExperienceMajor entries for an experience
exports.findAll = (req, res) => {
  ExperienceMajor.findAll({
    where: { experienceId: req.params.experienceId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No ExperienceMajor entries found for experienceId=${req.params.experienceId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving ExperienceMajor entries.`,
      });
    });
};

// Retrieve a single ExperienceMajor entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  ExperienceMajor.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No ExperienceMajor entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceMajor entry with id=${id}.`,
      });
    });
};

exports.findAllForExperience = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceMajor.findAll({ where: { experienceId: experienceId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No ExperienceMajor entries found for experienceId=${experienceId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceMajor entry with id=${id}.`,
      });
    });
};

exports.findAllExperiencesForMajor = (req, res) => {
  const majorId = req.params.majorId;
  ExperienceMajor.findAll({ where: { majorId: majorId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No ExperienceMajor entries found for majorId=${majorId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving ExperienceMajor entry with id=${id}.`,
      });
    });
};

// Update an ExperienceMajor entry by ID
exports.update = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceMajor.update(req.body, {
    where: { experienceId: experienceId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceMajor entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update ExperienceMajor entry with id=${experienceId}.`,
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
            err.message || "Error updating the ExperienceMajor entry.",
        });
      }
    });
};

// Delete an ExperienceMajor entry by ID
exports.delete = (req, res) => {
  const experienceId = req.params.experienceId;
  ExperienceMajor.destroy({ where: { experienceId: experienceId } })
    .then(() => {
      res.send({
        message: "ExperienceMajor entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting ExperienceMajor entry with id=${experienceId}.`,
      });
    });
};