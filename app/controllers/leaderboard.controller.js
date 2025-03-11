const db = require("../models");
const User = db.user;
const Major = db.major;
const studentInfo = db.studentInfo;
const Op = db.Sequelize.Op;

// Retrieve all Major entries with specific fields for leaderboard
exports.findAllLeaderboardInfo = async (req, res) => {
  console.log("findAllLeaderboardInfo called");
  try {
    const studentInfos = await studentInfo.findAll({
      attributes: ['userId', 'earnedPoints', 'currentPoints'],
    });
    const users = await User.findAll({
      attributes: ['id', 'fname', 'lname'],
    });

    const userMap = users.reduce((map, user) => {
      map[user.id] = user.dataValues;
      return map;
    }, {});

    console.log("userMap:", userMap);

    if (studentInfos && studentInfos.length > 0) {
      const leaderboard = studentInfos.map(entry => {
        const user = userMap[entry.userId] || {};
        console.log("entry.userId:", entry.userId, "user:", user);
        return {
          userId: entry.userId,
          fname: user.fname || 'Unknown',
          lname: user.lname || 'Unknown',
          major: entry.major ? entry.major.name : 'Unknown',
          earnedPoints: entry.earnedPoints,
          currentPoints: entry.currentPoints
        };
      });

      res.send(leaderboard);
    } else {
      res.status(404).send({
        message: `No studentInfo's entries found.`,
      });
    }
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send({
      message: err.message || `Error retrieving Major entries.`,
    });
  }
};