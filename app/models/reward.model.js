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
    requiredPoints: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    purchaseCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: Sequelize.BLOB("long"), // Store as BLOB
      allowNull: true,
      get() {
        const imageData = this.getDataValue("image");
        return imageData ? `data:image/png;base64,${imageData.toString("base64")}` : null;
      },
    },
  });

  return reward;
};
