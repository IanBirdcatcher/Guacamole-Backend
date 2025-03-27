module.exports = (sequelize, Sequelize) => {
  const icon = sequelize.define("icon", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    forBadge: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return icon;
};
