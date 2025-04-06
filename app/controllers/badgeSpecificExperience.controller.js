const db = require("../models");
const BadgeSpecificExperience = db.badgeSpecificExperience;
const Op = db.Sequelize.Op;

// Create and Save a new BadgeSpecificExperience entry
exports.create = (req, res) => {
  // Define the data object for the new BadgeSpecificExperience entry
  const BadgeSpecificExperienceData = {
    badgeId: req.body.badgeId,
    experienceId: req.body.experienceId,
  };

  // Save the Badge Specific Experience entry in the database
  BadgeSpecificExperience.create(BadgeSpecificExperienceData)
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
            err.message || "Error creating the BadgeSpecificExperience entry.",
        });
      }
    });
};

// Retrieve all BadgeSpecificExperience entries for a badge
exports.findAllForBadge= (req, res) => {
  const badgeId = req.params.badgeId;
  BadgeSpecificExperience.findAll({ where: { badgeId: badgeId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No BadgeSpecificExperience entries found for badgeId=${badgeId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving BadgeSpecificExperience entry with id=${id}.`,
      });
    });
};

// Delete an BadgeSpecificExperience entry by ID
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
          `Error deleting all BadgeSpecificExperience entries for badgeId=${badgeId}.`,
      });
    });
};
