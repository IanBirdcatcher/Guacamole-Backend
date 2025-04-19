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
    

    // 👇 Add these two fields if not already added via association
    flightPlanId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    experienceId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['flightPlanId', 'experienceId'] // 👈 Enforce uniqueness
      }
    ]
  });

  return flightPlanExperience;
};
