const db = require("../models");
const Prerequisite = db.prerequisite;
const Task = db.task;
const Op = db.Sequelize.Op;

// Create and Save a new Prerequisite entry
exports.create = (req, res) => {
  // Define the data object for the new Prerequisite entry
  const PrerequisiteData = {
    taskId: req.body.taskId,
    prerequisiteId: req.body.prerequisiteId,
  };

  // Save the Prerequisite entry in the database
  Prerequisite.create(PrerequisiteData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The taskId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the Prerequisite entry.",
        });
      }
    });
};

// Retrieve all Prerequisite entries for an prerequisite
exports.findAll = (req, res) => {
  Prerequisite.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving Prerequisite entries.`,
      });
    });
};

// Retrieve a single Prerequisite entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Prerequisite.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No Prerequisite entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Prerequisite entry with id=${id}.`,
      });
    });
};

exports.findAllForPrerequisite = (req, res) => {
  const prerequisiteId = req.params.id;
  Prerequisite.findAll({ where: { prerequisiteId: prerequisiteId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No Prerequisite entries found for prerequisiteId=${prerequisiteId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Prerequisite entry with id=${id}.`,
      });
    });
};

exports.findAllPrerequisitesForTask = (req, res) => {
  const taskId = req.params.id;
  let allPrereqs = []
  let pData = {prereq: null, task: null}
  Prerequisite.findAll({ where: { taskId: taskId } })
    .then((prereqData) => {
      if (prereqData && prereqData.length > 0) {
        Promise.all(
          prereqData.map(async (p) => {
            let tData = await Task.findByPk(p.dataValues.prerequisiteId)
              pData = {prereq: p.dataValues, task: tData.dataValues};
              console.log(pData)
              return pData
          })
        ).then((allPrereqs) => {
          console.log(`allPrereqs ============= ${allPrereqs}`)
          console.log(`allPrereqs ============= ${Object.keys(allPrereqs)}`)
          console.log(`allPrereqs ============= ${allPrereqs.dataValues}`)
          res.send(allPrereqs)
        })
      } else {
        res
          .status(404)
          .send({
            message: `No Prerequisite entries found for taskId=${taskId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Prerequisite entry with id=${id}.`,
      });
    });
};

// Update an Prerequisite entry by ID
exports.update = (req, res) => {
  const prerequisiteId = req.params.id;
  Prerequisite.update(req.body, {
    where: { prerequisiteId: prerequisiteId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Prerequisite entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update Prerequisite entry with id=${prerequisiteId}.`,
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
            err.message || "Error updating the Prerequisite entry.",
        });
      }
    });
};

// Delete an Prerequisite entry by ID
exports.delete = (req, res) => {
  const prerequisiteId = req.params.id;
  Prerequisite.destroy({ where: { prerequisiteId: prerequisiteId } })
    .then(() => {
      res.send({
        message: "Prerequisite entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Prerequisite entry with id=${prerequisiteId}.`,
      });
    });
};
