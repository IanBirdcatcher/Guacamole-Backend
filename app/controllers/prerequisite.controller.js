const db = require("../models");
const Prerequisite = db.prerequisite;
const Op = db.Sequelize.Op;

// Create and Save a new Prerequisite entry
exports.create = (req, res) => {
  // Define the data object for the new Prerequisite entry
  const PrerequisiteData = {
    itemId: req.body.itemId,
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
          .send({ message: `The itemId could not be found.` });
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
  Prerequisite.findAll({
    where: { prerequisiteId: req.params.prerequisiteId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Prerequisite entries found for prerequisiteId=${req.params.prerequisiteId}.`,
        });
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
  const prerequisiteId = req.params.prerequisiteId;
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

exports.findAllPrerequisitesForItem = (req, res) => {
  const itemId = req.params.itemId;
  Prerequisite.findAll({ where: { itemId: itemId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No Prerequisite entries found for itemId=${itemId}.`,
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
  const prerequisiteId = req.params.prerequisiteId;
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
  const prerequisiteId = req.params.prerequisiteId;
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
