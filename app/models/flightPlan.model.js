module.exports = (sequelize, Sequelize) => {
    const flightPlan = sequelize.define("flightPlan", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      
      semestersToGrad: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return flightPlan;
  };
  