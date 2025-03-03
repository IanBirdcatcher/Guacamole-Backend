const db = require("../models");
const EventType = db.eventType; 
const Event = db.event; 
const Type = db.type;
const Op = db.Sequelize.Op;

// Create and Save a new type
exports.create = (req, res) => {
  // Create a eventType
  const eventTypeData = {
    eventId: req.body.eventId,
    typeId: req.body.typeId
  };

  // Save eventType in the database
  EventType.create(eventTypeData)
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
          message: err.message || "Some error occurred while retrieving eventType.",
        });
      }
    });
};

// Find all eventTypes
exports.findAll = (req, res) => {
  
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  EventType.findAll({ where: condition })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find eventTypes`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving eventTypes."
      });
    });
};

// Find all eventType for a event
exports.findByEvent = (req, res) => {
  const eventId= req.params.id;
  EventType.findAll({ where: { eventId: eventId } })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find eventType for eventId with id=${eventId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving eventType for event with id=" + eventId,
      });
    });
};

// Find all events with a specific type ID
exports.findEventsByTypeId = (req, res) => {
  const typeId = req.params.typeId;

  EventType.findAll({
    where: { typeId: typeId },
    include: [{
      model: Event,
      as: 'event'
    }]
  })
    .then((data) => {
      if (data.length > 0) {
        res.send(data.map(eventType => eventType.event));
      } else {
        res.status(404).send({
          message: `Cannot find events with typeId=${typeId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving events with typeId=" + typeId,
      });
    });
};

// New method to get types information by event ID
exports.getTypeInfoByEventId = (req, res) => {
  const eventId = req.params.eventId;

  EventType.findAll({
    where: { eventId: eventId },
    include: [{
      model: Type,
      as: 'type'
    }]
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find type information for eventId=${eventId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving type information for event with id=" + eventId,
      });
    });
};

// Update event type
exports.updateEventType = (req, res) => {
  const eventId = req.params.eventId;
  const typeId = req.body.typeId;

  EventType.update({ typeId: typeId }, {
    where: { eventId: eventId }
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event type was updated successfully." 
        });
      } else {
        res.status(404).send({
          message: `Cannot update event type with eventId=${eventId}. Maybe event type was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating event type with eventId=" + eventId,
      });
    }); 
};


// Delete a Event with the specified id in the request
exports.deleteEventType = (req, res) => {
  const id = req.params.id;

  EventType.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventType was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete EventType with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete EventType with id=" + id,
      });
    });
};



// Delete all EventTypes from the database.
exports.deleteAll = (req, res) => {
  console.log(`EventId: ${req.params.eventId}`)
  EventType.destroy({
    where: {eventId: req.params.eventId},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} eventTypes were deleted successfully!` });
      console.log(`${nums} were deleted`)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
