module.exports = (sequelize, Sequelize) => {
    const badgeSpecificTask = sequelize.define("badgeSpecificTask", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return badgeSpecificTask;
  };
  