module.exports = (sequelize, Sequelize) => {
    const resume = sequelize.define("resume", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      resumeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profSummary:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      jobTitle:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      templateName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      }

      
    });
  
    return resume;
  };
  