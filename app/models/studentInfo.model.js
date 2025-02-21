module.exports = (sequelize, Sequelize) => {
  const studentInfo = sequelize.define("studentInfo", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    earnedPoints: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    currentPoints: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    studentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    startingSemester: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    semestersTillGraduation: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    graduationSemester: {
      type: Sequelize.INTEGER,
      allowNull: true,
    }
  });
  return studentInfo;
};