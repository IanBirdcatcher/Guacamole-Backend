module.exports = (sequelize, Sequelize) => {
    const strength = sequelize.define("strength", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return strength;
  };
  