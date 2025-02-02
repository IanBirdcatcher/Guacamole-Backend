module.exports = (sequelize, Sequelize) => {
    const major = sequelize.define("major", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dept: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  
    return major;
  };
  