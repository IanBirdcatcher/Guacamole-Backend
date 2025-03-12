const db = require("../models");
const StudentInfo = db.studentInfo;

// Create and Save a new StudentInfo
exports.create = async (req, res) => {
  try {
    // Validate request


    // Create a StudentInfo
    const studentInfo = {
      userId: req.body.userId, 
      earnedPoints: req.body.earnedPoints,
      currentPoints: req.body.spentPoints,
      studentId: req.body.studentId,
      startingSemester: req.body.startingSemester, 
      semestersTillGraduation: req.body.semestersTillGraduation,
      graduationSemester: req.body.graduationSemester,

    };

    // Save StudentInfo in the database
    const data = await StudentInfo.create(studentInfo);
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
    StudentInfo.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find studentInfo with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error retrieving studentInfo with id=" + id,
        });
      });
};

exports.findAllByUserId = (req, res) => {
  const userId = req.params.userId;

  StudentInfo.findAll({ where: { userId: userId } })
    .then((data) => {
      if (data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find StudentInfo records with userId=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ 
        message: "Error retrieving StudentInfo records with userId=" + userId,
      });
    });
};