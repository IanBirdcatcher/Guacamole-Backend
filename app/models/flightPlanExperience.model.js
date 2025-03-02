module.exports = (sequelize, Sequelize) => {
  const flightPlanExperience = sequelize.define("flightPlanExperience", {
    reflection: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }
  });

  return flightPlanExperience;
};
