module.exports = (sequelize, Sequelize) => {
  const badge = sequelize.define("badge", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    byCount: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
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
    allCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    taskCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    experienceCount: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    badgeSpecificTaskAND: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    badgeSpecificExperienceAND: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });

  return badge;
};
