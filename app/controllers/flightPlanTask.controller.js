const db = require("../models");
const FlightPlanTask = db.flightPlanTask;
const StudentInfo = db.studentInfo;
const FlightPlan = db.flightPlan;
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new FlightPlanTask entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.taskId) {
    res.status(400).send({ message: "taskId cannot be empty" });
    return;
  } else if (!req.body.flightPlanTaskId) {
    res.status(400).send({ message: "flightPlanTaskId cannot be empty" });
    return;
  }

  // Define the data object for the new FlightPlanTask entry
  const FlightPlanTaskData = {
    id: req.body.id,
    taskId: req.body.taskId,
    flightPlanId: req.body.flightPlanId
  };

  // Save the FlightPlanTask entry in the database
  FlightPlanTask.create(FlightPlanTaskData)
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
          message: err.message || "Error creating the FlightPlanTask entry.",
        });
      }
    });
};

// Retrieve all FlightPlanTask entries
exports.findAll = (req, res) => {
  FlightPlanTask.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No FlightPlanTask entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving FlightPlanTask entries.`,
      });
    });
};

// Retrieve a single FlightPlanTask entry by ID
exports.findByUser = (req, res) => {
  const userId = req.params.id;
  let flightPlanTaskList = {flightPlanId: null, tasks: []}
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
      
      flightPlanTaskList.flightPlanId = flightPlanData[0].dataValues.id;
      // Get FlightPlanTask taskIds for flightplanId AND get task objects, 
        // return an object containing flightPlanId, taskId, and task object
      FlightPlanTask.findAll({ where: {flightPlanId: flightPlanData[0].dataValues.id}})
      .then(async (flightPlanTaskData) => {
        for (const fPT of flightPlanTaskData) {
          await Task.findByPk(fPT.taskId)
          .then((foundTask) => {
            flightPlanTaskList.tasks.push({ taskId: fPT.taskId, task: foundTask, fpTask: fPT })
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message || `Error retrieving Task entry with id=${fPT.taskId}.`,
            });
          });
        }
        res.send(flightPlanTaskList);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || `Error retrieving flightPlanTask entry with flightPlanId=${flightPlanData.id}.`,
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



// Retrieve a single FlightPlanTask entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  FlightPlanTask.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No FlightPlanTask entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving FlightPlanTask entry with id=${id}.`,
      });
    });
};

// Update an FlightPlanTask entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  FlightPlanTask.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlanTask entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update FlightPlanTask entry with id=${id}.`,
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
          message: err.message || "Error updating the FlightPlanTask entry.",
        });
      }
    });
};

// Delete an FlightPlanTask entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  FlightPlanTask.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "FlightPlanTask entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete FlightPlanTask entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting FlightPlanTask entry with id=${id}.`,
      });
    });
};