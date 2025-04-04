module.exports = (sequelize, Sequelize) => {
    const badgeExperienceType = sequelize.define("badgeExperienceType", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    });
    return badgeExperienceType;
  };
  