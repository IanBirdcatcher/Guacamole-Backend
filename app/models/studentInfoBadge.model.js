module.exports = (sequelize, Sequelize) => {
    const studentInfoBadge = sequelize.define("studentInfoBadge", {

        dateEarned: {
            type: Sequelize.DATE,
            allowNull: true,
        },


        
    });
  
    return studentInfoBadge;
  };