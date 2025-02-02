module.exports = (sequelize, Sequelize) => {
    const event = sequelize.define("event", {
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
        allowNull: true,
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attendanceType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      completionType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      
    });
  
    return event;
  };
  