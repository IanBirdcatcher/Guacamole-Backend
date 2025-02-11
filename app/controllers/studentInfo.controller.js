const db = require("../models");
const studentInfo = db.studentInfo;
const Op = db.Sequelize.Op;

// Create a new studentInfo
exports.create = async (req, res) => {
  try {
    console.log("Received request:", req.body); 

    const newStudentInfo = {
      id: req.body.id,  
      userId: req.body.userId,
    };

    const data = await StudentInfo.create(newStudentInfo);
    res.status(201).send(data);  
  } catch (err) {
    console.error("Error:", err); 

    if (err.message.includes("SQLSTATE: 23000")) { 
      res.status(404).send({
        message: `The user with an ID of ${req.body.userId} cannot be found.`,
      });
    } else {
      res.status(500).send({
        message: err.message || "Server Error",
      });
    }
  }
};




exports.findOne = (req, res) => {
    const id = req.params.id;
    studentInfo.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Resume with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving Resume with id=" + id,
        });
      });
};

