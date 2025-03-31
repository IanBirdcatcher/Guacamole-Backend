module.exports = (sequelize, Sequelize) => {
  const reward = sequelize.define("reward", {
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
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    requiredPoints: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    purchaseCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return reward;
};
