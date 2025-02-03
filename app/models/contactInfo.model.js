module.exports = (sequelize, Sequelize) => {
    const contactInfo = sequelize.define("contactInfo", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address:{
        type: Sequelize.STRING,
        allowNull: true,
      }
    });
  
    return contactInfo;
  };
  