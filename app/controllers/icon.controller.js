const db = require("../models");
const icon = db.icon;
const Op = db.Sequelize.Op;

// Create and Save a new icon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Must contain a name",
    });
    return;
  }

  // Create a icon
  const icon = {
    id: req.body.id,
    name: req.body.name,
    link: req.body.link,
    forBadge: req.body.forBadge
  };

  // Save icon in the database
  icon.create(icon)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the icon.",
      });
    });
};

// Retrieve all icons from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  icon.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving icons.",
      });
    });
};

// Find a single icon with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  icon.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find icon with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving icon with id=" + id,
      });
    });
};


// Update a icon by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  icon.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "icon was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update icon with id=${id}. Maybe icon was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating icon with id=" + id,
      });
    });
};

// Delete a icon with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  icon.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "icon was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete icon with id=${id}. Maybe icon was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete icon with id=" + id,
      });
    });
};
