module.exports = (sequelize, Sequelize) => {
    const type = sequelize.define("type", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  
    return type;
  };
  