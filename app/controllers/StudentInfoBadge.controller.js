const db = require("../models");
const StudentInfoBadge = db.studentInfoBadge;
const flightPlanTask = db.flightPlanTask;
const flightPlanExperience = db.flightPlanExperience;
const flightPlan = db.flightPlan;
const badge = db.badge;
const Op = db.Sequelize.Op;

// Create and Save a new StudentInfoBadge entry
exports.create = (req, res) => {
  // Define the data object for the new StudentInfoBadge entry
  const StudentInfoBadgeData = {
    badgeId: req.body.badgeId,
    studentInfoId: req.body.studentInfoId,
    dateEarned: req.body.dateEarned,
  };

  // Save the StudentInfoBadge entry in the database
  StudentInfoBadge.create(StudentInfoBadgeData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res.status(404).send({ message: `The badgeId could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the StudentInfoBadge entry.",
        });
      }
    });
};

// Retrieve all StudentInfoBadge entries for an studentInfo
exports.findAll = (req, res) => {
  StudentInfoBadge.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoBadge entries found for studentInfoId=${req.params.studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoBadge entries.`,
      });
    });
};

exports.checkUserBadges = async (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  let responseData = {
    studentInfoId,
    badges: [],
  };

  try {
    const flightplan = await flightPlan.findOne({
      where: { studentInfoId },
    });

    if (!flightplan) {
      return res.status(404).send({
        message: `Flight plan not found for studentInfoId=${studentInfoId}.`,
      });
    }

    const flightplanId = flightplan.id;

    const earnedBadges = await StudentInfoBadge.findAll({
      where: { studentInfoId },
    });

    const earnedBadgeIds = earnedBadges.map((b) => b.badgeId);

    const userCompletedTasks = await flightPlanTask.count({
      where: { flightPlanId: flightplanId, completed: 1 },
    });

    const userCompletedExperiences = await flightPlanExperience.count({
      where: { flightPlanId: flightplanId, completed: 1 },
    });

    const allCount = userCompletedTasks + userCompletedExperiences;

    const allBadges = await badge.findAll();

    // Only check badges the user hasn't earned yet
    const unearnedBadges = allBadges.filter(
      (b) => !earnedBadgeIds.includes(b.id)
    );

    unearnedBadges.forEach((badge) => {
      let meetsAllCriteria = true;

      if (badge.allCount && allCount < badge.allCount) meetsAllCriteria = false;
      if (badge.experiencesCount && userCompletedExperiences < badge.experiencesCount) meetsAllCriteria = false;
      if (badge.tasksCount && userCompletedTasks < badge.tasksCount) meetsAllCriteria = false;

      if (meetsAllCriteria) {
        responseData.badges.push({
          badgeId: badge.id,
          badgeName: badge.name,
          badgeEarned: true,
        });
      }
    });

    if (responseData.badges.length > 0) {
      responseData.badges.forEach((badge) => {
        StudentInfoBadge.create({
          studentInfoId: studentInfoId,
          badgeId: badge.badgeId,
        })
      })
      res.send(responseData);
    } else {
      res.status(404).send({
        message: `No new badges earned for studentInfoId=${studentInfoId}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: `Error checking badges earned for studentInfoId=${studentInfoId}. ${err.message}`,
    });
  }
};



exports.findAllForStudentInfo = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.findAll({ where: { studentInfoId: studentInfoId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoBadge entries found for studentInfoId=${studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Error retrieving StudentInfoBadge entry with id=${id}.`,
      });
    });
};

exports.findAllStudentInfosForBadge = (req, res) => {
  const badgeId = req.params.badgeId;
  StudentInfoBadge.findAll({ where: { badgeId: badgeId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoBadge entries found for badgeId=${badgeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoBadge entry with id=${id}.`,
      });
    });
};

// Update an StudentInfoBadge entry by ID
exports.update = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.update(req.body, {
    where: { studentInfoId: studentInfoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfoBadge entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update StudentInfoBadge entry with id=${studentInfoId}.`,
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
          message: err.message || "Error updating the StudentInfoBadge entry.",
        });
      }
    });
};

// Delete an StudentInfoBadge entry by ID
exports.delete = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoBadge.destroy({ where: { studentInfoId: studentInfoId } })
    .then(() => {
      res.send({
        message: "StudentInfoBadge entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting StudentInfoBadge entry with id=${studentInfoId}.`,
      });
    });
};
