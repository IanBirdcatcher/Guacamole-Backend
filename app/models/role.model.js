module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("role", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "student",

      },
    });
  
    return role;
  };
  