module.exports = (sequelize, Sequelize) => {
    const jobExperience = sequelize.define("jobExperience", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      jobTitle: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dateRange: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });
  
    return jobExperience;
  };
  