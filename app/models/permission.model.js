module.exports = (sequelize, Sequelize) => {
    const permission = sequelize.define("permission", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      readAttendance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      writeAttendance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addTask: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      removeTask: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addExperience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      removeExperience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      changePermissions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      readLogs: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      readStudentInfo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      changeStudentInfo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addReward: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      removeReward: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      redeemReward: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      readStrengths: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addEvent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      changeEvent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      removeEvent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      addNotification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  
    return permission;
  };
  