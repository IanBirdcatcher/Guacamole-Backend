module.exports = (sequelize, Sequelize) => {
    const link = sequelize.define("link", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      linkName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return link;
  };
  