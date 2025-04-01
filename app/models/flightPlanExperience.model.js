module.exports = (sequelize, Sequelize) => {
  const flightPlanExperience = sequelize.define("flightPlanExperience", {
    reflection: {
      type: Sequelize.TEXT('medium'),
      allowNull: true,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    attended: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    pending: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    subtext: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return flightPlanExperience;
};
