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
    },
    subtext: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    pending: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    }
  });

  return flightPlanTask;
};
