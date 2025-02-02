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
    });
  
    return award;
  };
  