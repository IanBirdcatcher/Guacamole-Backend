module.exports = (sequelize, Sequelize) => {
    const award = sequelize.define("award", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      awardName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awardDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      awardDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      allCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      taskCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      experienceCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      awardSpecificTaskAND: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      awardSpecificExperienceAND: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  
    return award;
  };
  