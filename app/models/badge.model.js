module.exports = (sequelize, Sequelize) => {
  const badge = sequelize.define("badge", {
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
      allowNull: true,
    },
    badgeSpecificExperienceAND: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
  });

  return badge;
};
