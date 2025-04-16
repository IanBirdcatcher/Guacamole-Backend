const db = require("../models");
const StudentInfoPurchase = db.studentPurchase;
const Op = db.Sequelize.Op;
const Session = db.session;
const StudentInfo = db.studentInfo; 

// Create and Save a new StudentInfoPurchase entry
exports.create = (req, res) => {
  // Define the data object for the new StudentInfoPurchase entry
  const StudentInfoPurchaseData = {
    rewardId: req.body.rewardId,
    studentInfoId: req.body.studentInfoId,
  }

  // Save the StudentInfoPurchase entry in the database
  StudentInfoPurchase.create(StudentInfoPurchaseData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res
          .status(404)
          .send({ message: `The purchaseId could not be found.` });
      } else {
        res.status(500).send({
          message:
            err.message || "Error creating the StudentInfoPurchase entry.",
        });
      }
    });
};

// Retrieve all StudentInfoPurchase entries for an studentInfo
exports.findAll = (req, res) => {
  StudentInfoPurchase.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoPurchase entries found for studentInfoId=${req.params.studentInfoId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoPurchase entries.`,
      });
    });
};

// Retrieve a single StudentInfoPurchase entry by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  StudentInfoPurchase.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoPurchase entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoPurchase entry with id=${id}.`,
      });
    });
};

exports.getRecentPurchases = async (req, res) => {
  
  
  let token = req.headers.authorization.replace("Bearer ", "")

  let session = await Session.findOne({where: {token: token}})
  let studentInfo = await StudentInfo.findOne({where: {userId: session.userId}})
  StudentInfoPurchase.findAll({ where: {studentInfoId: studentInfo.id}, order: [['createdAt', 'DESC']], limit: 3})
    .then((data) => {
      if (data) {

       console.log(`================================================================= ${data}`) 
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoPurchase entry found with id=${id}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
           err.message ||
          `Error retrieving StudentInfoPurchase entry with id=${id}.`,
      });
    });
};

exports.findAllForStudentInfo = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoPurchase.findAll({ where: { studentInfoId: studentInfoId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoPurchase entries found for studentInfoId=${studentInfoId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoPurchase entry with id=${id}.`,
      });
    });
};

exports.findAllStudentInfosForPurchase = (req, res) => {
  const purchaseId = req.params.purchaseId;
  StudentInfoPurchase.findAll({ where: { purchaseId: purchaseId } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res
          .status(404)
          .send({
            message: `No StudentInfoPurchase entries found for purchaseId=${purchaseId}.`,
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error retrieving StudentInfoPurchase entry with id=${id}.`,
      });
    });
};

// Update an StudentInfoPurchase entry by ID
exports.update = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoPurchase.update(req.body, {
    where: { studentInfoId: studentInfoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInfoPurchase entry was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Could not update StudentInfoPurchase entry with id=${studentInfoId}.`,
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
          message:
            err.message || "Error updating the StudentInfoPurchase entry.",
        });
      }
    });
};

// Delete an StudentInfoPurchase entry by ID
exports.delete = (req, res) => {
  const studentInfoId = req.params.studentInfoId;
  StudentInfoPurchase.destroy({ where: { studentInfoId: studentInfoId } })
    .then(() => {
      res.send({
        message: "StudentInfoPurchase entry was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Error deleting StudentInfoPurchase entry with id=${studentInfoId}.`,
      });
    });
};
