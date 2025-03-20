const { where } = require("sequelize");
const db = require("../models");
const FlightPlan = db.flightPlan;
const FlightPlanTask = db.flightPlanTask;
const FlightPlanExperience = db.flightPlanExperience;
const StudentInfoMajor = db.studentInfoMajor;
const StudentInfo = db.studentInfo;
const Op = db.Sequelize.Op;


const Task = db.task;
const Experience = db.experience;
const Major = db.major;
const TaskMajor = db.taskMajor;
const ExperienceMajor = db.experienceMajor;

async function findTaskBySemesterFromGraduation(semestersFromGraduation) {
  return await Task.findAll({ where: { semestersFromGraduation: semestersFromGraduation }})
}

async function findExperienceBySemesterFromGraduation(semestersFromGraduation) {
  return await Experience.findAll({ where: { semestersFromGraduation: semestersFromGraduation }})
}

async function findAllTasksForMajor(majorId) {
  return await TaskMajor.findAll({ where: { majorId: majorId } })
}

async function findAllExperiencesForMajor(majorId) {
  return await ExperienceMajor.findAll({ where: { majorId: majorId } })
}



let flightPlanId = null;

// Create and Save a new FlightPlan entry
exports.create = async (req, res) => {
  // Validate request, studentInfoId, majors, and semestersToGrad are the three required fields
  if (!req.body.studentInfoId) { // Expects integer
    res.status(400).send({ message: "studentInfoId cannot be empty" });
    return;
  }

  let studentInfo = await StudentInfo.findAll({where: {id: req.body.studentInfoId}})
  console.log(`=========================================================== ${studentInfo[0].dataValues}`)
  console.log(`=========================================================== ${studentInfo.dataValues}`)
  let semestersToGrad = studentInfo[0].dataValues.semestersTillGraduation

  // Define the data object for the new FlightPlan entry
  const FlightPlanData = {
    id: req.body.id,
    studentInfoId: req.body.studentInfoId,
    semestersToGrad: semestersToGrad
  };

  // Save the FlightPlan entry in the database
  FlightPlan.create(FlightPlanData)
    .then((data) => {
      res.send(data);
      flightPlanId = data.id
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("usestudentInfoId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the FlightPlan entry.",
        });
      }
    });


    // Get the current semesters from graduation based on the graduation semester and the date

    let studentInfoMajors = await StudentInfoMajor.findAll({where: {studentInfoId: req.body.studentInfoId}})
    let majorIds = studentInfoMajors.map((sm) => {return sm.majorId})
    console.log(majorIds)

    // Get all taskMajors and experienceMajors for each given major
    let tMajors = []
    let eMajors = [] 

    function pushUnique(array, value, type) {
      let idArray = array.map((i) => {return eval(`i.${type}Id`)})
      if (idArray.indexOf(eval(`value.${type}Id`)) === -1) {
        array.push(value);
      }
    }

    let unparsedTMajors = await Promise.all(majorIds.map(majorId => findAllTasksForMajor(majorId)));
    let unparsedEMajors = await Promise.all(majorIds.map(majorId => findAllExperiencesForMajor(majorId)));


    unparsedTMajors.forEach((tM) => {
      tM.forEach((task) => {pushUnique(tMajors, task, "task")})
    })

    unparsedEMajors.forEach((eM) => {
      eM.forEach((experience) => pushUnique(eMajors, experience, "experience"))
    })

    // get all tasks by major and semester from grad calculated above
      // get all tasks by semestersToGrad
      let tasks = await findTaskBySemesterFromGraduation(semestersToGrad)


      // filter our tasks by the found taskIds from the taskMajors call
      tasks.forEach((t) => {
        tMajors.forEach((tm) => {
          if (tm.taskId == t.id) {
            let FlightPlanTaskData = {
              taskId: t.id,
              flightPlanId: flightPlanId
            };

            FlightPlanTask.create(FlightPlanTaskData)
          }
        })
      })

      // Add all these tasks to the flightPlanTasks for this flight plan

    // get all experiences by major and semester from grad calculated above
      // get all experiences by semestersToGrad
      let experiences = await findExperienceBySemesterFromGraduation(semestersToGrad)

      // filter our experiences by the found experienceIds from the experienceMajors call
      experiences.forEach((e) => {
        eMajors.forEach((em) => {
          if (em.experienceId == e.id) {
            let FlightPlanExperienceData = {
              experienceId: e.id,
              flightPlanId: flightPlanId
            };

            FlightPlanExperience.create(FlightPlanExperienceData)
          }
        })
      })

      // Add all these experiences to the flightPlanExperience for this flight plan

  };

// Retrieve all FlightPlan entries
exports.findAll = (req, res) => {
  FlightPlan.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No FlightPlan entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlan entries.`,
      });
    });
};

// Retrieve a single FlightPlan entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  FlightPlan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No FlightPlan entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving FlightPlan entry with id=${id}.`,
      });
    });
};

// Update an FlightPlan entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  FlightPlan.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlan entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update FlightPlan entry with id=${id}.`,
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
          message: err.message || "Error updating the FlightPlan entry.",
        });
      }
    });
};

// Delete an FlightPlan entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  FlightPlan.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlan entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete FlightPlan entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting FlightPlan entry with id=${id}.`,
      });
    });
};