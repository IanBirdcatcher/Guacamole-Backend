module.exports = (sequelize, Sequelize) => {
    const document = sequelize.define("document", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      comment: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  
    return document;
  };
  