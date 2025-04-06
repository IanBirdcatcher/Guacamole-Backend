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
    byCount:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    allCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    taskCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    experienceCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    badgeSpecificTaskAND: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    badgeSpecificExperienceAND: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return badge;
};
