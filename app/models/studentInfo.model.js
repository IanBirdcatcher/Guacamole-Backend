module.exports = (sequelize, Sequelize) => {
    const studentInfo = sequelize.define("studentInfo", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      earnedPoints: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      spentPoints: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      graduationSemester: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      initialSemester: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      SID: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      semesterTillGraduation: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

    });
  
    return studentInfo;
  };