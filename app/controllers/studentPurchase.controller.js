const db = require("../models");
const StudentInfoPurchase = db.studentPurchase;
const Op = db.Sequelize.Op;
const Session = db.session;
const StudentInfo = db.studentInfo;
const Reward = db.reward; // <-- Make sure reward model is loaded

// Create and Save a new StudentInfoPurchase entry
exports.create = (req, res) => {
  const StudentInfoPurchaseData = {
    rewardId: req.body.rewardId,
    studentInfoId: req.body.studentInfoId,
  };

  StudentInfoPurchase.create(StudentInfoPurchaseData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.message.includes("foreign key constraint fails")) {
        res.status(404).send({ message: `The purchaseId could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error creating the StudentInfoPurchase entry.",
        });
      }
    });
};

// Retrieve all StudentInfoPurchase entries for a studentInfo
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
        res.status(404).send({
          message: `No StudentInfoPurchase entry found with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoPurchase entry with id=${id}.`,
      });
    });
};

// ✅ Updated: Retrieve 3 most recent purchases, including reward details
exports.getRecentPurchases = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const session = await Session.findOne({ where: { token } });
    const studentInfo = await StudentInfo.findOne({ where: { userId: session.userId } });

    const purchases = await StudentInfoPurchase.findAll({
      where: { studentInfoId: studentInfo.id },
      include: [{
        model: Reward,
        as: 'reward',
        attributes: ['name', 'requiredPoints'],
        required: false,
      }],
      order: [['createdAt', 'DESC']],
      limit: 3,
    });

    console.log('Recent purchases:', JSON.stringify(purchases, null, 2));
    console.log('Returned purchases:', JSON.stringify(purchases, null, 2));



    res.send(purchases);
  } catch (err) {
    console.error("Error fetching recent purchases:", err);
    res.status(500).send({
      message: err.message || "Error retrieving StudentInfoPurchase entries.",
    });
  }
};

exports.findAllForStudentInfo = async (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  const session = await Session.findOne({ where: { token } });
  const studentInfo = await StudentInfo.findOne({ where: { userId: session.userId } });
  StudentInfoPurchase.findAll({ where: { studentInfoId: studentInfo.id } })
    .then((data) => {
      if (data && data.length > 0) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No StudentInfoPurchase entries found for studentInfoId=${studentInfo.id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoPurchase entry with id=${id}.`,
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
        res.status(404).send({
          message: `No StudentInfoPurchase entries found for purchaseId=${purchaseId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || `Error retrieving StudentInfoPurchase entry with id=${id}.`,
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
        res.status(404).send({ message: `The ${missingField} could not be found.` });
      } else {
        res.status(500).send({
          message: err.message || "Error updating the StudentInfoPurchase entry.",
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
        message: err.message || `Error deleting StudentInfoPurchase entry with id=${studentInfoId}.`,
      });
    });
};
