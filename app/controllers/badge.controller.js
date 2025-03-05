const db = require("../models");
const badge = db.badge;
const Op = db.Sequelize.Op;

// Create and Save a new badge
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Must contain a name",
    });
    return;
  }

  // Create a badge
  const badge = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save badge in the database
  badge.create(badge)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the badge.",
      });
    });
};

// Retrieve all badges from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  badge.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving badges.",
      });
    });
};

// Find a single badge with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  badge.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find badge with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving badge with id=" + id,
      });
    });
};


// Update a badge by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  badge.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "badge\ was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update badge\ with id=${id}. Maybe badge\ was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating badge\ with id=" + id,
      });
    });
};

// Delete a badge\ with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  badge.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "badge was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete badge with id=${id}. Maybe badge\ was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete badge with id=" + id,
      });
    });
};
