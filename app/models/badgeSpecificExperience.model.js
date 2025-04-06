module.exports = (sequelize, Sequelize) => {
    const badgeSpecificExperience = sequelize.define("badgeSpecificExperience", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return badgeSpecificExperience;
  };
  