module.exports = (sequelize, Sequelize) => {
    const icon = sequelize.define("icon", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      forBadge: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  
    return icon;
  };
  