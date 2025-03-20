const { Where } = require("sequelize/lib/utils");
const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;

// Create and Save a new Semester entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.startDate || !req.body.endDate) {
    res.status(400).send({ message: "Dates cannot be empty!" });
    return;
  }

  // Define the data object for the new Semester entry
  const SemesterData = {
    id: req.body.id,
    name: req.body.name,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  };

  // Save the Semester entry in the database
  Semester.create(SemesterData)
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
          message: err.message || "Error creating the Semester entry.",
        });
      }
    });
};

// Retrieve all Semester entries
exports.findAll = (req, res) => {
  Semester.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Semester entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Semester entries.`,
      });
    });
};

// Retrieve a single Semester entry by date
exports.getByDate = (req, res) => {
  if (!req.body.date) {
    res.status(400).send({ message: "date cannot be empty!" });
    return;
  }
  const date = new Date(req.body.date);
  Semester.findAll({
    where: {
      startDate: {
        [Op.lte]: date.toISOString(),
      },
      endDate: {
        [Op.gte]: date.toISOString(),
      }
    }
  })
  .then((data) => {
    if (data && data.length > 0) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `No Semester entries found.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message ||
        `Error retrieving Semester entries.`,
    });
  });
};

// Retrieve a single Semester entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Semester entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Semester entry with id=${id}.`,
      });
    });
};

// Update an Semester entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Semester entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Semester entry with id=${id}.`,
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
          message: err.message || "Error updating the Semester entry.",
        });
      }
    });
};

// Delete an Semester entry by ID
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Semester entry was deleted successfully!" });
      } else {
        res.status(404).send({
          message: `Could not delete Semester entry with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting Semester entry with id=${id}.`,
      });
    });
};