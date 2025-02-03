module.exports = (sequelize, Sequelize) => {
    const project = sequelize.define("project", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      projectName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      projectDesc: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

    });
  
    return project;
  };
  