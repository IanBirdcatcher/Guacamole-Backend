const db = require("../models");
const Notification = db.notification;
const Session = db.session;
const Op = db.Sequelize.Op;

// Create and Save a new Notification entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.desc) {
    res.status(400).send({ message: "desc cannot be empty!" });
    return;
  }

  // Define the data object for the new Notification entry
  const NotificationData = {
    id: req.body.id,
    title: req.body.title,
    desc: req.body.desc,
    path: req.body.path,
    goodNews: req.body.goodNews
  };

  // Save the Notification entry in the database
  Notification.create(NotificationData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        const missingField = err.message;
        res
          .status(404)
          .send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the Notification entry.",
        });
      }
    });
};

// Retrieve all Notification entries
exports.findAll = (req, res) => {
  Notification.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Notification entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Notification entries.`,
      });
    });
};

// Retrieve all Notification entries
exports.getByUser = async (req, res) => {
  
  let token = req.headers.authorization.replace("Bearer ", "")

  let session = await Session.findOne({where: {token: token}})

  Notification.findAll({where: {userId: session.userId}})
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No Notification entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving Notification entries.`,
      });
    });
};

// Retrieve a single Notification entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  Notification.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({ message: `No Notification entry found with id=${id}.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || `Error retrieving Notification entry with id=${id}.`,
      });
    });
};

// Update an Notification entry by ID
exports.update = (req, res) => {
  const id = req.params.id;
  Notification.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Notification entry was updated successfully." });
      } else {
        res.status(400).send({
          message: `Could not update Notification entry with id=${id}.`,
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
          message: err.message || "Error updating the Notification entry.",
        });
      }
    });
};

// Delete an Notification entry by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  let token = req.headers.authorization.replace("Bearer ", "")

  let session = await Session.findOne({where: {token: token}})
  
  let notification = await Notification.findByPk(id)


  if (notification.userId != session.userId) {
    res.status(401); res.send({message: "Unauthorized to delete this notification"})}
  else {
    Notification.destroy({ where: { id: id } })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Notification entry was deleted successfully!" });
        } else {
          res.status(404).send({
            message: `Could not delete Notification entry with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            `Error deleting Notification entry with id=${id}.`,
        });
      });
  }
};