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
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      requestedByStudent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      denied: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
      },
      pastRequested: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true,
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
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reflectionRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      documentRequired: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  
    return experience;
  };
  