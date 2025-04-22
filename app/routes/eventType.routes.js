module.exports = (app) => {
  const eventType = require("../controllers/eventType.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eventType
  router.post("/", [authenticate], eventType.create);

  // Find all eventType for a event
  router.get("/", [authenticate], eventType.findAll);

  // Find all eventType for a event
  router.get("/event/:id", [authenticate], eventType.findByEvent);

  // Find all events with a specific type ID
  router.get("/type/:typeId/events", [authenticate], eventType.findEventsByTypeId);

  // New route to get type information by event ID
  router.get("/typeInfo/:eventId", [authenticate], eventType.getTypeInfoByEventId);

  
  // New route to get EventType information by event ID
  router.get("/event/:eventId", [authenticate], eventType.getByEventId)

  // Update event type
  router.put("/:eventId/type", [authenticate], eventType.updateEventType); 
  
  // Update event type
  router.delete("/:id", [authenticate], eventType.deleteEventType); 

  // Update event type
  router.delete("/byEvent/:eventId", [authenticate], eventType.deleteAll);

  app.use("/flight-plan-t2/eventType", router);
};  
