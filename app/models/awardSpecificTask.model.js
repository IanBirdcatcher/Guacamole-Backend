module.exports = (sequelize, Sequelize) => {
    const awardSpecificTask = sequelize.define("awardSpecificTask", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return awardSpecificTask;
  };
  