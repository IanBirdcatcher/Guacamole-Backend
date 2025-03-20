const db = require("../models");
const FlightPlanExperience = db.flightPlanExperience;
const StudentInfo = db.studentInfo;
const FlightPlan = db.flightPlan;
const Experience = db.experience;
const Op = db.Sequelize.Op;

// Create and Save a new FlightPlanExperience entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.experienceId) {
    res.status(400).send({ message: "experienceId cannot be empty" });
    return;
  } else if (!req.body.flightPlanExperienceId) {
    res.status(400).send({ message: "flightPlanExperienceId cannot be empty" });
    return;
  }

  // Define the data object for the new FlightPlanExperience entry
  const FlightPlanExperienceData = {
    id: req.body.id,
    experienceId: req.body.experienceId,
    flightPlanId: req.body.flightPlanId
  };

  // Save the FlightPlanExperience entry in the database
  FlightPlanExperience.create(FlightPlanExperienceData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("usestudentInfoId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the FlightPlanExperience entry.",
        });
      }
    });
};

// Retrieve all FlightPlanExperience entries
exports.findAll = (req, res) => {
  FlightPlanExperience.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No FlightPlanExperience entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanExperience entries.`,
      });
    });
};


// Retrieve a single FlightPlanExperience entry by ID
exports.findByUser = (req, res) => {
  const userId = req.params.id;
  let flightPlanExperienceList = {flightPlanId: null, experiences: []}
  // Get studentInfoId for userId
  StudentInfo.findAll({ where: {userId: userId}})
  .then((studentInfoData) => {
    console.log(`Found studentInfo ${studentInfoData[0].dataValues.id}   ${studentInfoData[0].dataValues.semestersTillGraduation}`)
  // Get current flightplanId for studentInfoId and semestersToGraduation
    FlightPlan.findAll({ where: {studentInfoId: studentInfoData[0].dataValues.id, semestersToGrad: studentInfoData[0].dataValues.semestersTillGraduation}})
    .then((flightPlanData) => {
      if (!flightPlanData) {
        res
          .status(404)
          .send({ message: `No FlightPlan entry found with id=${userId}.` });
      }
      
      flightPlanExperienceList.flightPlanId = flightPlanData[0].dataValues.id;
      // Get FlightPlanExperience experienceIds for flightplanId AND get experience objects, 
        // return an object containing flightPlanId, experienceId, and experience object
      FlightPlanExperience.findAll({ where: {flightPlanId: flightPlanData[0].dataValues.id}})
      .then(async (flightPlanExperienceData) => {
        for (const fPE of flightPlanExperienceData) {
          await Experience.findByPk(fPE.experienceId)
          .then((foundExp) => {
            flightPlanExperienceList.experiences.push({ experienceId: fPE.experienceId, experience: foundExp })
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || `Error retrieving Experience entry with id=${fPE.experienceId}.`,
            });
          });
        }
        res.send(flightPlanExperienceList);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Error retrieving flightPlanExperience entry with flightPlanId=${flightPlanData.id}.`,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving flightPlan entry with studentInfoId=${studentInfoData.id} and ${studentInfoData.semestersTillGraduation} semesters till graduation.`,
      });
    });
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || `Error retrieving studentInfo entry with userId=${userId}.`,
    });
  });
};

// Retrieve a single FlightPlanExperience entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  FlightPlanExperience.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No FlightPlanExperience entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving FlightPlanExperience entry with id=${id}.`,
      });
    });
};

// Update an FlightPlanExperience entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  FlightPlanExperience.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlanExperience entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update FlightPlanExperience entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("studentInfoId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error updating the FlightPlanExperience entry.",
        });
      }
    });
};

// Delete an FlightPlanExperience entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  FlightPlanExperience.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlanExperience entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete FlightPlanExperience entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting FlightPlanExperience entry with id=${id}.`,
      });
    });
};