module.exports = (sequelize, Sequelize) => {
  const prerequisite = sequelize.define("prerequisite", {
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  });

  return prerequisite;
};
