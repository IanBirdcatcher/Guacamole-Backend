module.exports = (sequelize, Sequelize) => {
    const skill = sequelize.define("skill", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      skill: {
        type: Sequelize.STRING,
        allowNull: false,
      },

    });
  
    return skill;
  };
  