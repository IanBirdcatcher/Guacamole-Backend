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
    imageUrl: {
      type: Sequelize.STRING,  
      allowNull: true,         
    },
  });

  return badge;
};
