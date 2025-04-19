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
    },
    documentName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    link: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // 👇 Add these two fields if not already added via association
    flightPlanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['flightPlanId', 'taskId'] // 👈 Enforce uniqueness
      }
    ]
  });

  return flightPlanTask;
};
