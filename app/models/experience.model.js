module.exports = (sequelize, Sequelize) => {
    const experience = sequelize.define("experience", {
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
      requestedByStudent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      approved: {
        type: Sequelize.BOOLEAN,
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
        type: Sequelize.BLOB,
        allowNull: false,
      },
      documentRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  
    return experience;
  };
  