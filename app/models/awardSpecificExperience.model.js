module.exports = (sequelize, Sequelize) => {
    const awardSpecificExperience = sequelize.define("awardSpecificExperience", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return awardSpecificExperience;
  };
  