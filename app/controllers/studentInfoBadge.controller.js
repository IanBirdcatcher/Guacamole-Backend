const db = require("../models");
const StudentInfoBadge = db.studentInfoBadge;
const flightPlanTask = db.flightPlanTask;
const flightPlanExperience = db.flightPlanExperience;
const flightPlan = db.flightPlan;
const badgeSpecificExperience = db.badgeSpecificExperience;
const badgeSpecificTask = db.badgeSpecificTask;
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

  try {
    const fp = await flightPlan.findOne({ where: { studentInfoId } });
    if (!fp) {
      return res.status(404).json({
        message: `Flight plan not found for studentInfoId=${studentInfoId}.`,
      });
    }
    const flightPlanId = fp.id;

    const earned = await StudentInfoBadge.findAll({ where: { studentInfoId } });
    const earnedIds = earned.map((e) => e.badgeId);

    const tasksDone = await flightPlanTask.findAll({
      where: { flightPlanId, completed: 1 },
    });
    const expsDone = await flightPlanExperience.findAll({
      where: { flightPlanId, completed: 1 },
    });
    const allBadges = await badge.findAll();
    const toCheck = allBadges.filter((b) => !earnedIds.includes(b.id));

    const newlyEarned = [];
    for (const b of toCheck) {
      let ok = true;

      if (b.byCount) {
        const totalDone = tasksDone.length + expsDone.length;
        if (b.allCount && totalDone < b.allCount) ok = false;
        if (b.tasksCount && tasksDone.length < b.tasksCount) ok = false;
        if (b.experiencesCount && expsDone.length < b.experiencesCount)
          ok = false;
      } else {
        const specExps = await badgeSpecificExperience.findAll({
          where: { badgeId: b.id },
        });
        const specTasks = await badgeSpecificTask.findAll({
          where: { badgeId: b.id },
        });

        if (specExps.length) {
          if (b.badgeSpecificExperienceAND) {
            for (const se of specExps) {
              if (!expsDone.some((e) => e.experienceId === se.experienceId)) {
                ok = false;
                break;
              }
            }
          } else {
            const needed = b.experienceCount || 1;
            const have = specExps.filter((se) =>
              expsDone.some((e) => e.experienceId === se.experienceId)
            ).length;
            if (have < needed) ok = false;
          }
        }

        if (specTasks.length) {
          if (b.badgeSpecificTaskAND) {
            for (const st of specTasks) {
              if (!tasksDone.some((t) => t.taskId === st.taskId)) {
                ok = false;
                break;
              }
            }
          } else {
            const needed = b.taskCount || 1;
            const have = specTasks.filter((st) =>
              tasksDone.some((t) => t.taskId === st.taskId)
            ).length;
            if (have < needed) ok = false;
          }
        }

        if (!specExps.length && !specTasks.length) {
          const totalDone = tasksDone.length + expsDone.length;
          if (b.allCount && totalDone < b.allCount) ok = false;
          if (b.tasksCount && tasksDone.length < b.tasksCount) ok = false;
          if (b.experiencesCount && expsDone.length < b.experiencesCount)
            ok = false;
        }
      }

      if (ok) newlyEarned.push(b);
    }

    if (!newlyEarned.length) {
      return res.status(404).json({
        message: `No new badges earned for studentInfoId=${studentInfoId}.`,
      });
    }

    await Promise.all(
      newlyEarned.map((b) =>
        StudentInfoBadge.create({ studentInfoId, badgeId: b.id })
      )
    );

    res.json({
      studentInfoId,
      badges: newlyEarned.map((b) => ({
        badgeId: b.id,
        badgeName: b.name,
        badgeEarned: true,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: `Error checking badges for studentInfoId=${studentInfoId}: ${err.message}`,
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
