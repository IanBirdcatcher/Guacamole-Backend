const db = require("../models");
const StudentPurchase = db.studentPurchase;
const Reward = db.reward;
const User = db.user;
const { Op } = require("sequelize");

// Create a new purchase
exports.createPurchase = async (req, res) => {
  try {
    const { userId, rewardId, requiredPoints } = req.body;

    // Check if user and reward exist
    const student = await User.findByPk(userId);
    const rewardItem = await Reward.findByPk(rewardId);

    if (!student || !rewardItem) {
      return res.status(400).json({ message: "Invalid user or reward." });
    }

    // Check if user has enough points
    if (student.currentPoints < requiredPoints) {
      return res.status(400).json({ message: "Not enough points." });
    }

    // Deduct points and save user
    student.currentPoints -= requiredPoints;
    await student.save();

    // Dynamically calculate the semester
    const now = new Date();
    const month = now.getMonth() + 1;
    const semester =
      month >= 1 && month <= 5
        ? `Spring ${now.getFullYear()}`
        : month >= 6 && month <= 8
        ? `Summer ${now.getFullYear()}`
        : `Fall ${now.getFullYear()}`;

    // Create purchase
    const purchase = await StudentPurchase.create({
      userId,
      rewardId,
      pointsSpent: requiredPoints,
      semester,
    });

    // Update reward's purchase count
    rewardItem.purchaseCount += 1;
    await rewardItem.save();

    res.status(200).json({ message: "Purchase successful.", purchase });
  } catch (error) {
    console.error("Error completing purchase:", error);
    res.status(500).json({ message: "Error completing purchase." });
  }
};

// Get recent 3 purchases per semester for a specific user
exports.getRecentPurchases = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Get all purchases for the user, include reward info
    const purchases = await StudentPurchase.findAll({
      where: { userId },
      include: [
        {
          model: Reward,
          as: "reward",
          attributes: ["id", "name", "desc", "requiredPoints"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Group purchases by semester, limit to 3 per semester
    const groupedBySemester = {};
    purchases.forEach((purchase) => {
      const semester = purchase.semester || "Unknown";
      if (!groupedBySemester[semester]) {
        groupedBySemester[semester] = [];
      }
      if (groupedBySemester[semester].length < 3) {
        groupedBySemester[semester].push(purchase);
      }
    });

    res.status(200).json({ recentPurchases: groupedBySemester });
  } catch (error) {
    console.error("Error fetching recent purchases:", error);
    res.status(500).json({ message: "Error fetching recent purchases." });
  }
};
