const db = require("../models");
const UserRole = db.roleUser; 
const User = db.user; 
const Op = db.Sequelize.Op;

// Create and Save a new role
exports.create = (req, res) => {
  // Create a userRole
  const userRoleData = {
    userId: req.body.contactInfoId,
    roleId: req.body.resumeId
  };

  // Save userRole in the database
  UserRole.create(userRoleData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("problem with foreign key")) {
        res.status(404).send({
          message: `problem`
        });
      } else if (err.message.includes("big problem")) {
        res.status(404).send({
          message: `cannot be found.`
        });
      } else {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving userRole.",
        });
      }
    });
};

// Find all userRole for a user
exports.findByUser = (req, res) => {
  const userId= req.params.id;
  UserRole.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find userRole for userId with id=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving userRole for user with id=" + userId,
      });
    });
};

// Find all users with a specific role ID
exports.findUsersByRoleId = (req, res) => {
  const roleId = req.params.roleId;

  UserRole.findAll({
    where: { roleId: roleId },
    include: [{
      model: User,
      as: 'user'
    }]
  })
    .then((data) => {
      if (data.length > 0) {
        res.send(data.map(userRole => userRole.user));
      } else {
        res.status(404).send({
          message: `Cannot find users with roleId=${roleId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving users with roleId=" + roleId,
      });
    });
};

// New method to get role information by user ID
exports.getRoleInfoByUserId = (req, res) => {
  const userId = req.params.userId;

  UserRole.findOne({
    where: { userId: userId },
    include: [{
      model: User,
      as: 'user'
    }]
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find role information for userId=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving role information for user with id=" + userId,
      });
    });
};

// Update user role
exports.updateUserRole = (req, res) => {
  const userId = req.params.userId;
  const roleId = req.body.roleId;

  UserRole.update({ roleId: roleId }, {
    where: { userId: userId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User role was updated successfully." 
        });
      } else {
        res.status(404).send({
          message: `Cannot update user role with userId=${userId}. Maybe user role was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating user role with userId=" + userId,
      });
    }); 
};


