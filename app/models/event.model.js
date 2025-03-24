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
      startDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDateTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      attendanceType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      completionType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registrationType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      
    });
  
    return event;
  };
  