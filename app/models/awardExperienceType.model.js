module.exports = (sequelize, Sequelize) => {
    const awardExperienceType = sequelize.define("awardExperienceType", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return awardExperienceType;
  };
  