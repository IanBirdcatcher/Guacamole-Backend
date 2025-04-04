const db = require("../models");
const BadgeSpecificTask = db.badgeSpecificTask;
const Op = db.Sequelize.Op;

// Create and Save a new BadgeSpecificTask entry
exports.create = (req, res) => {
  // Define the data object for the new BadgeSpecificTask entry
  const BadgeSpecificTaskData = {
    badgeId: req.body.badgeId,
    taskId: req.body.taskId,
  };

  // Save the Badge Specific Task entry in the database
  BadgeSpecificTask.create(BadgeSpecificTaskData)
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
            err.message || "Error creating the BadgeSpecificTask entry.",
        });
      }
    });
};

// Retrieve all BadgeSpecificTask entries for a badge
exports.findAllForBadge= (req, res) => {
  const badgeId = req.params.badgeId;
  BadgeSpecificTask.findAll({ where: { badgeId: badgeId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No BadgeSpecificTask entries found for badgeId=${badgeId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving BadgeSpecificTask entry with id=${id}.`,
      });
    });
};

// Delete an BadgeSpecificTask entry by ID
exports.deleteForBadgeId = (req, res) => {
  const badgeId = req.params.badgeId;
  BadgeSpecificTask.destroy({ where: { badgeId: badgeId } })
    .then(() => {
      res.send({
        message: "BadgeSpecificTask entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting all BadgeSpecificTask entries for badgeId=${badgeId}.`,
      });
    });
};
