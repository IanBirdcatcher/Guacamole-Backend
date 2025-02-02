module.exports = (sequelize, Sequelize) => {
  const task = sequelize.define("task", {
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
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subtext: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    priority: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    semestersFromGraduation: {
      type: Sequelize.TINYBLOB,
      allowNull: false,
    },
    documentRequired: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return task;
};
