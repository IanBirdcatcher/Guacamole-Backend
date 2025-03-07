const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.userId) {
    res.status(400).send({ message: "UserId cannot be empty!" });
    return;
  }

  // Define the data object for the new Category entry
  const CategoryData = {
    id: req.body.id,
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save the Category entry in the database
  Category.create(CategoryData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message.includes("userId");
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the Category entry.",
        });
      }
    });
};

// Retrieve all Category entries
exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Category entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Category entries.`,
      });
    });
};

// Retrieve a single Category entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Category.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Category entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Category entry with id=${id}.`,
      });
    });
};

// Update an Category entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Category.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Category entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Category entry with id=${id}.`,
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
          message: err.message || "Error updating the Category entry.",
        });
      }
    });
};

// Delete an Category entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Category.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Category entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Category entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Category entry with id=${id}.`,
      });
    });
};