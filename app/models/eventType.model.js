module.exports = (sequelize, Sequelize) => {    
  const eventType = sequelize.define("eventType", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
  return eventType;
};
