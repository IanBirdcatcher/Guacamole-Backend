module.exports = (sequelize, Sequelize) => {
    const awardTaskType = sequelize.define("awardTaskType", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return awardTaskType;
  };
  