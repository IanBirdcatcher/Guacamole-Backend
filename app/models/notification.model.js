module.exports = (sequelize, Sequelize) => {
    const notification = sequelize.define("notification", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      goodNews: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  
    return notification;
  };
  