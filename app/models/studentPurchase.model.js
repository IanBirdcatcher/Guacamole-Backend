module.exports = (sequelize, Sequelize) => {
  const StudentPurchase = sequelize.define("studentPurchase", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rewardId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  });

  return StudentPurchase;
};
