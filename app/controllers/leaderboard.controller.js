const { where } = require("sequelize");
const db = require("../models");
const User = db.user;
const Major = db.major;
const studentInfo = db.studentInfo;
const Op = db.Sequelize.Op;

// Retrieve leaderboard info based on student classification (e.g., Freshman, Sophomore, Junior, Senior)
exports.findAllLeaderboardInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch user-specific studentInfo to determine their classification
    const userStudentInfo = await studentInfo.findOne({ where: { userId: userId } });

    if (!userStudentInfo) {
      return res.status(404).send({ message: `No studentInfo entry found for userId: ${userId}.` });
    }

    // Determine classification based on semestersTillGraduation
    let classification = "";
    if (userStudentInfo.semestersTillGraduation <= 2) classification = "Senior";
    else if (userStudentInfo.semestersTillGraduation <= 4) classification = "Junior";
    else if (userStudentInfo.semestersTillGraduation <= 6) classification = "Sophomore";
    else classification = "Freshman";

    // Define semester range based on classification
    const semesterRanges = {
      Senior: { min: 0, max: 2 },
      Junior: { min: 3, max: 4 },
      Sophomore: { min: 5, max: 6 },
      Freshman: { min: 7, max: 8 },
    };
    const { min, max } = semesterRanges[classification];

    // Fetch studentInfo entries for users in the same classification range
    const studentInfos = await studentInfo.findAll({
      where: {
        semestersTillGraduation: { [Op.between]: [min, max] },
      },
      order: [["currentPoints", "DESC"]],
      attributes: ["userId", "earnedPoints", "currentPoints", "majorId"],
    });

    if (!studentInfos.length) {
      return res.status(404).send({ message: `No studentInfo entries found for classification: ${classification}.` });
    }
    
    // Fetch all users corresponding to the studentInfos
    const userIds = studentInfos.map((info) => info.userId);
    console.log("userIds: "+userIds);
    const users = await User.findAll({
      where: { id: { [Op.in]: userIds } },
      attributes: ["id", "fname", "lname"],
    });

    const userMap = users.reduce((map, user) => {
      map[user.id] = user.dataValues;
      return map;
    }, {});

    // Fetch all majors
    const majors = await Major.findAll();
    const majorMap = majors.reduce((map, major) => {
      map[major.id] = major.name;
      return map;
    }, {});

    // Build the leaderboard by combining studentInfo, user data, and major data
    const leaderboard = studentInfos.map((entry) => {
      const user = userMap[entry.userId] || {};
      return {
        userId: entry.userId,
        fname: user.fname || "Unknown",
        lname: user.lname || "Unknown",
        major: majorMap[entry.majorId] || "Undeclared",
        earnedPoints: entry.earnedPoints,
        currentPoints: entry.currentPoints,
        classification: classification,
      };
    });

    leaderboard.sort((a, b) => b.earnedPoints - a.earnedPoints);

    res.send(leaderboard);
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send({
      message: err.message || `Error retrieving leaderboard entries.`,
    });
  }
};
