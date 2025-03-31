const db = require("../models");
const Reward = db.reward;
const Op = db.Sequelize.Op;

// Create and Save a new reward
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Must contain a name",
    });
    return;
  }

  // Create a reward
  const reward = {
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    desc: req.body.desc,
    requiredPoints: req.body.requiredPoints,
  };

  // Save reward in the database
  Reward.create(reward)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the reward.",
      });
    });
};

// Retrieve all rewards from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  Reward.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving rewards.",
      });
    });
};

// Find a single reward with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Reward.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find reward with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving reward with id=" + id,
      });
    });
};


// Update a reward by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Reward.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "reward was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update reward with id=${id}. Maybe reward was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating reward with id=" + id,
      });
    });
};

// Delete a reward with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Reward.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "reward was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete reward with id=${id}. Maybe reward was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete reward with id=" + id,
      });
    });
};
