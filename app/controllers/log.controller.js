const db = require("../models");
const Log = db.log;
const Session = db.session;
const Op = db.Sequelize.Op;

// Create and Save a new StudentInfo
exports.create = async (req, res) => {
    try {
      // Create a log
      const log = {
        name: req.body.name, 
        desc: req.body.desc,
        type: req.body.type,
        date: req.body.date,
        email: req.body.email,
      }; 
      // Save log in the database
      const data = await Log.create(log);
      res.status(201).send(data);
    } catch (err) {
      console.error("Error:", err);
  
    }
  };

// Retrieve all log entries 
exports.findAll = (req, res) => {
  Log.findAll()
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No log entries found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving log entries.`,
      });
    });
};


// Delete an log entry by ID
exports.delete = async (req, res) => {
  const id = req.params.id;
  
  let token = req.headers.authorization.replace("Bearer ", "") 

  let session = await Session.findOne({where: {token: token}})
  
  let log = await Log.findByPk(id)

  if (!log) {res.status(200); res.send({message: "No notification found"})}
  else {
      Log.destroy({ where: { id: id } })
        .then((num) => {
          if (num == 1) {
            res.send({ message: "log entry was deleted successfully!" });
          } else {
            res.status(404).send({
              message: `Could not delete log entry with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              `Error deleting log entry with id=${id}.`,
          });
        });
    
  }
};
