const db = require("../models");
const StudentInfoPurchase = db.studentPurchase;
const Session = db.session;
const StudentInfo = db.studentInfo;
const Reward = db.reward;
const Op = db.Sequelize.Op;

// Create a new StudentInfoPurchase
exports.create = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.status(401).send({ message: "No token provided." });

    const session = await Session.findOne({ where: { token } });
    if (!session) return res.status(401).send({ message: "Invalid session." });

    const studentInfo = await StudentInfo.findOne({ where: { userId: session.userId } });
    if (!studentInfo) return res.status(404).send({ message: "Student info not found." });

    const purchase = await StudentInfoPurchase.create({
      rewardId: req.body.rewardId,
      studentInfoId: studentInfo.id,
    });

    res.send(purchase);
  } catch (err) {
    const isFKError = err.message?.includes("foreign key constraint fails");
    res.status(isFKError ? 404 : 500).send({
      message: isFKError ? "Invalid rewardId." : err.message || "Error creating purchase.",
    });
  }
};

// Retrieve all purchases for a given studentInfo
exports.findAll = (req, res) => {
  StudentInfoPurchase.findAll({
    where: { studentInfoId: req.params.studentInfoId },
  })
    .then(data => data.length ? res.send(data) : res.status(404).send({
      message: `No purchases found for studentInfoId=${req.params.studentInfoId}.`
    }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Retrieve one purchase by ID
exports.findOne = (req, res) => {
  StudentInfoPurchase.findByPk(req.params.id)
    .then(data => data ? res.send(data) : res.status(404).send({
      message: `Purchase not found with id=${req.params.id}.`
    }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Get 3 most recent purchases (with reward info)
exports.getRecentPurchases = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
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

    res.send(purchases);
  } catch (err) {
    res.status(500).send({ message: err.message || "Error retrieving recent purchases." });
  }
};

// Find all purchases by studentInfoId
exports.findAllForStudentInfo = (req, res) => {
  StudentInfoPurchase.findAll({ where: { studentInfoId: req.params.studentInfoId } })
    .then(data => data.length ? res.send(data) : res.status(404).send({
      message: `No purchases found for studentInfoId=${req.params.studentInfoId}.`
    }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Find all studentInfo entries for a specific purchaseId
exports.findAllStudentInfosForPurchase = (req, res) => {
  StudentInfoPurchase.findAll({ where: { purchaseId: req.params.purchaseId } })
    .then(data => data.length ? res.send(data) : res.status(404).send({
      message: `No entries found for purchaseId=${req.params.purchaseId}.`
    }))
    .catch(err => res.status(500).send({ message: err.message }));
};

// Update a purchase by studentInfoId
exports.update = (req, res) => {
  StudentInfoPurchase.update(req.body, { where: { studentInfoId: req.params.studentInfoId } })
    .then(num => num == 1
      ? res.send({ message: "Purchase updated successfully." })
      : res.status(400).send({ message: `Update failed for studentInfoId=${req.params.studentInfoId}.` }))
    .catch(err => {
      const isFKError = err.message?.includes("foreign key constraint fails");
      res.status(isFKError ? 404 : 500).send({
        message: isFKError ? "Referenced field not found." : err.message || "Update error.",
      });
    });
};

// Delete a purchase by studentInfoId
exports.delete = (req, res) => {
  StudentInfoPurchase.destroy({ where: { studentInfoId: req.params.studentInfoId } })
    .then(() => res.send({ message: "Purchase deleted successfully." }))
    .catch(err => res.status(500).send({ message: err.message }));
};
