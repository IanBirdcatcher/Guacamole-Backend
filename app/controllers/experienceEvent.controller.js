const db = require("../models");
const ExperienceEvent = db.experienceEvent;
const Op = db.Sequelize.Op;
// Create and Save a new ExperienceEvent
exports.create = (req, res) => {
  // Validate request
  if (!req.body.eventId) {
    res.status(400).send({
      message: "eventId can not be empty!",
    });
    return;
  }
  if (!req.body.experienceId) {
    res.status(400).send({
      message: "experienceId can not be empty!",
    });
    return;
  }


  // Create a ExperienceEvent
  const experienceEvent = {
    experienceId: req.body.experienceId,
    eventId: req.body.eventId
  };
  // Save ExperienceEvent in the database
  ExperienceEvent.create(experienceEvent)  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`events`.`experienceevents`, CONSTRAINT `experienceevents_ibfk_2` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`)")) {
        res.status(404).send({
          message:
            `The experience with an id of ${req.body.experienceId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`events`.`experienceevents`, CONSTRAINT `experienceevents_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`)")) {
        res.status(404).send({
          message:
            `The event with an id of ${req.body.eventId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experiences.",
        });
      }     
    });
};

// Find all ExperienceEvents given an eventId
exports.findByEvent = (req, res) => {
  const eventId = req.params.id;
  ExperienceEvent.findAll({ where: { eventId: eventId } })
    .then((data) => {
      if (data + " " != " ") {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find ExperienceEvents for event with id=${eventId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Error retrieving ExperienceEvents for event with id=" + eventId,
      });
    });
};

// Find all ExperienceEvents given an experienceId
exports.findByExperience = (req, res) => {
    const experienceId = req.params.id;
    ExperienceEvent.findAll({ where: { experienceId: experienceId } })
      .then((data) => {
        if (data + " " != " ") {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ExperienceEvents for event with id=${experienceId}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Error retrieving ExperienceEvents for event with id=" + experienceId,
        });
      });
  };


// Update a ExperienceEvent by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  ExperienceEvent.update(req.body, {
    where: { id : id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceEvent was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update ExperienceEvent with id=${id}. Maybe ExperienceEvent was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`events`.`experienceEvents`, CONSTRAINT `experienceEvents_ibfk_1` FOREIGN KEY (`experienceId`) REFERENCES `experiences` (`experienceId`)")) {
        res.status(404).send({
          message:
            `The experience with an id of ${req.body.experienceId} cannot be found.`
        
        });
      } else if (err.message.includes("no: 1452, SQLState: 23000) Cannot add or update a child row: a foreign key constraint fails (`events`.`experienceEvents`, CONSTRAINT `experienceEvents_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`)")) {
        res.status(404).send({
          message:
            `The event with an id of ${req.body.eventId} cannot be found.`
        
        });
      } else { 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving experienceEvents.",
        });
      }     
    });
};
// Delete a ExperienceEvent with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  ExperienceEvent.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "ExperienceEvent was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete ExperienceEvent with id=${id}, it could not be found`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Could not delete ExperienceEvent with id=" + id,
      });
    });
};