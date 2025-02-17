const db = require("../models");
const Permission = db.permission;
const Op = db.Sequelize.Op;

// Create a new permission
exports.create = (req, res) => {
  // Create a permission
  const permissionData = {
    id: req.body.id,
    readAttendance: req.body.readAttendance,
    writeAttendance: req.body.writeAttendance,
    addTask: req.body.addTask,
    removeTask: req.body.removeTask,
    addExperience: req.body.addExperience,
    removeExperience: req.body.removeExperience,
    changePermissions: req.body.changePermissions,
    readLogs: req.body.readLogs,
    readStudentInfo: req.body.readStudentInfo,
    changeStudentInfo: req.body.changeStudentInfo,
    addReward: req.body.addReward,
    removeReward: req.body.removeReward,
    redeemReward: req.body.redeemReward,
    readStrengths: req.body.readStrengths,
    userId: req.body.userId,
  };

  // Save permission in the database
  Permission.create(permissionData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating permission.",
      });
    });
};

exports.findByUser = (req, res) => {
  const userId = req.params.userId;

  Permission.findOne({ where: { userId: userId } })
    .then((data) => {
      if (data) { 
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Permission for userId with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Permission for user with id=" + userId,
      });
    });
};

// Update a permission by userId
exports.updateByUserId = (req, res) => {
  const userId = req.params.userId;

  Permission.update(req.body, {
    where: { userId: userId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Permission was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update Permission with userId=${userId}. Maybe Permission was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating Permission with userId=" + userId,
      });
    });
};

