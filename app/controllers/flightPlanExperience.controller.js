const db = require("../models");
const FlightPlanExperience = db.flightPlanExperience;
const StudentInfo = db.studentInfo;
const FlightPlan = db.flightPlan;
const Experience = db.experience;
const ExperienceEventType = db.experienceEventType;
const EventType = db.eventType;
const Event = db.event;
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

// Retrieve all FlightPlanTask entries
exports.findPending = (req, res) => {
  FlightPlanExperience.findAll({where: {reflection: {[Op.ne]: null}, pending: 1}})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanTask entries.`,
      });
    });
};

exports.findEventsForExperience = async (req, res) => {
  const experienceId = req.params.id
  let foundEvents = []
    try {
      const experienceEventTypes = await ExperienceEventType.findAll({ where: { experienceId } });      
      for (const eET of experienceEventTypes) {
        const eventTypes = await EventType.findAll({ where: { typeId: eET.eventTypeId } });
        for (const eT of eventTypes) {          
          const events = await Event.findAll({ where: { id: eT.eventId } });
          for (const e of events) {
            foundEvents.push(e);
          }
        }
      }
    } catch (err) {
      res.status(500).send({
        message: err.message || `Error retrieving ExperienceEventType entries.`,
      });
    } 
  
  let currDate = Date.now()
  let filteredData = foundEvents.map((event) => {
    if (Date.parse(event.startDateTime) >= currDate - 86400000) {
      return event
    }
  })
  sortedData = filteredData.sort((a, b) => {return Date.parse(a.startDateTime) - Date.parse(b.startDateTime)}).slice(0, 6)
  res.send(sortedData.filter((item) => {return item !== undefined}))
}


// Retrieve a single FlightPlanExperience entry by ID
exports.findByUser = (req, res) => {
  const userId = req.params.id;
  let flightPlanExperienceList = {flightPlanId: null, Experiences: []}
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
      // Get FlightPlanExperience ExperienceIds for flightplanId AND get Experience objects, 
        // return an object containing flightPlanId, ExperienceId, and Experience object`
      FlightPlanExperience.findAll({ where: {flightPlanId: flightPlanData[0].dataValues.id}})
      .then(async (flightPlanExperienceData) => {
        for (const fPT of flightPlanExperienceData) {
          await Experience.findByPk(fPT.experienceId)
          .then((foundExperience) => {
            flightPlanExperienceList.Experiences.push({ ExperienceId: fPT.experienceId, Experience: foundExperience, flightPlanExperience: fPT })
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || `Error retrieving Experience entry with id=${fPT.experienceId}.`,
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