module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    fName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    lName:{
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING, 
      allowNull: false,
    },
    darkMode: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaulValue: 0,
    },
    profilePicture: {
      type: Sequelize.STRING, 
      allowNull: true,
    }
  });

  return User;
};
