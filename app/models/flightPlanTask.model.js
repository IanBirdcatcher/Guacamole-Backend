module.exports = (sequelize, Sequelize) => {
  const flightPlanTask = sequelize.define("flightPlanTask", {
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

  return flightPlanTask;
};
