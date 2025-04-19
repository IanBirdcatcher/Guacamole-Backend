const db = require("../models");
const Permission = db.permission;
const Session = db.session;
const User = db.user;
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
    addEvent: req.body.addEvent,
    changeEvent: req.body.changeEvent,
    removeEvent: req.body.removeEvent,
    addBadge: req.body.addBadge,
    removeBadge: req.body.removeBadge,
    addNotification: req.body.addNotification,
    userId: req.body.userId,
  };
  

  // Save permission in the database
  Permission.create(permissionData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating permission.",
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
        message:
          err.message ||
          "Error retrieving Permission for user with id=" + userId,
      });
    });
};

//finds user by auth token then check their permissions
exports.findByAuthToken = async (req, res) => {
  const permType = req.params.permType;
  let token = null;
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);
      await Session.findOne({ where: { token: token } })
        .then((data) => {
          let session = data;
          if (session != null) {
            if (session.expirationDate >= Date.now()) {
              Permission.findOne({ where: { userId: session.userId } })
                .then((data) => {
                  try {
                    if (data[permType])
                      res.status(200).send({ message: "User is authorized" });
                    else
                      res
                        .status(401)
                        .send({ message: "User is not authorized" });
                  } catch (err) {
                    res.status(401).send({ message: "User is not authorized" });
                  }
                })
                .catch((err) => {
                  res.status(500).send({
                    message:
                      err.message ||
                      "Error retrieving Permission for user with id=" +
                        session.userId,
                  });
                });
              return;
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          } else {
            return res.status(401).send({
              message: "Unauthorized! Invalid Token, Logout and Login again",
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

// Update a permission by userId
exports.updateByUserId = (req, res) => {
  const userId = req.params.userId;

  Permission.update(req.body, {
    where: { userId: userId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Permission was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Permission with userId=${userId}. Maybe Permission was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating Permission with userId=" + userId,
      });
    });
};
