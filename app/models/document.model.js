module.exports = (sequelize, Sequelize) => {
    const document = sequelize.define("document", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      comment: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  
    return document;
  };
  