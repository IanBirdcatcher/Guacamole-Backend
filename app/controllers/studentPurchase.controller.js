const db = require("../models");
const StudentPurchase = db.studentPurchases;
const Reward = db.reward;

// Get the last 3 purchases of a specific student with related reward details
exports.getRecentPurchases = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the last 3 purchases for the given userId, ordered by the most recent
    const purchases = await StudentPurchase.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 3,
      include: [{
        model: Reward,
        attributes: ['name', 'requiredPoints', 'purchaseCount'], // Include only the necessary fields from the Reward model
      }],
      attributes: ['createdAt'], // Include the createdAt field from the StudentPurchase model
    });

    if (purchases.length === 0) {
      return res.status(404).json({ message: "No purchases found for this user." });
    }

    // Format the response to include rewardName, requiredPoints, purchaseCount alongside createdAt
    const response = purchases.map(purchase => ({
      rewardName: purchase.reward.name,
      requiredPoints: purchase.reward.requiredPoints,
      purchaseCount: purchase.reward.purchaseCount,
      createdAt: purchase.createdAt,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching recent purchases:", error);
    res.status(500).json({ message: "Error fetching recent purchases." });
  }
};
