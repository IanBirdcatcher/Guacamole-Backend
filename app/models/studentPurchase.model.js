module.exports = (sequelize, Sequelize) => {
    const StudentPurchase = sequelize.define("studentPurchase", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      studentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      rewardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      semester: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pointsSpent: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  
    return StudentPurchase;
  };
  