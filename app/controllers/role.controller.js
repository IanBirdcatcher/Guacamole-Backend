const db = require("../models");
const Role = db.role;
const Op = db.Sequelize.Op;

// Create a new role
exports.create = (req, res) => {

  // Create a role
  const roleData = {
    id: req.body.id,
    name: req.body.name,
  }; 

  // Save role in the database
  Role.create(roleData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating role.",
      });
    });
};

// Find a role by roleId
exports.findByRoleId = (req, res) => {
  const roleId = req.params.roleId; 

  Role.findByPk(roleId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with id=${roleId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving Role with id=" + roleId,
      });
    });
};

// Get all roles
exports.findAll = (req, res) => {
  Role.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

