module.exports = (sequelize, Sequelize) => {
    const badgeTaskType = sequelize.define("badgeTaskType", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return badgeTaskType;
  };
  