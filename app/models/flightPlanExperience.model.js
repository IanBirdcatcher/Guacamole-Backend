module.exports = (sequelize, Sequelize) => {
  const flightPlanExperience = sequelize.define("flightPlanExperience", {
    reflection: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  return flightPlanExperience;
};
