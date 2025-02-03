const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models (user and resume know about all of the resume items)-----------
db.user = require("./user.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);

db.session = require("./session.model.js")(sequelize, Sequelize);

// resume items 
db.award = require("./award.model.js")(sequelize, Sequelize);
db.contactInfo = require("./contactInfo.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);


// bridge tables

db.awardResume = require("./awardResume.model.js")(sequelize, Sequelize);
db.contactInfoResume = require("./contactInfoResume.model.js")(sequelize, Sequelize);
db.educationResume = require("./educationResume.model.js")(sequelize, Sequelize);
db.experienceResume = require("./experienceResume.model.js")(sequelize, Sequelize);
db.interestResume = require("./interestResume.model.js")(sequelize, Sequelize);
db.linkResume = require("./linkResume.model.js")(sequelize, Sequelize);
db.projectResume = require("./projectResume.model.js")(sequelize, Sequelize);
db.skillResume = require("./skillResume.model.js")(sequelize, Sequelize);

// Relations

// studentInfo and Resume
db.studentInfo.hasMany(db.resume, {
  as: "resumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

// studentInfo and Resume Items --------------------

//awards ----------------------------------
db.studentInfo.hasMany(db.award, {
  as: "awards",
  foreignKey:  "id", sourceKey: "id",
  onDelete: "CASCADE",
});
db.award.belongsTo(db.studentInfo, {
  foreignKey: "id", // Use id
  allowNull: false,
  onDelete: "CASCADE",
});

// Contact Info------------------------------
db.studentInfo.hasMany(db.contactInfo, {
  as: "contactInfos",
  foreignKey: "id", // Use id
  allowNull: false,
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.studentInfo, {
  foreignKey: "id", // Use id
  allowNull: false,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.education, {
  as: "educations",
  foreignKey: "id", targetKey: "id", 
  onDelete: "CASCADE",
});
db.education.belongsTo(db.studentInfo, {
  foreignKey: "id", targetKey: "id", 
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.experience, {
  as: "experiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.studentInfo, {
  foreignKey: "id", targetKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.interest, {
  as: "interests",
  foreignKey: "id", // Use id
  allowNull: false,
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.studentInfo, {
  foreignKey: "id", // Use id
  allowNull: false,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.link, {
  as: "links",
  foreignKey: "id", sourceKey: "id",
  allowNull: false,
  onDelete: "CASCADE",
});
db.link.belongsTo(db.studentInfo, {
  foreignKey: "id", targetKey: "id",
  allowNull: false,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.project, {
  as: "projects",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.project.belongsTo(db.studentInfo, {
  foreignKey: "id", targetKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.skill, {
  as: "skills",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.studentInfo, {
  foreignKey: "id", targetKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});


// Resume and Resume Bridge Tables ----------------------
db.resume.hasMany(db.awardResume, {
  as: "awardResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.contactInfoResume, {
  as: "contactInfoResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.educationResume, {
  as: "educationResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.experienceResume, {
  as: "experienceResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceResume.belongsTo(db.resume, {
  foreignKey: "id", targetKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.interestResume, {
  as: "interestResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.linkResume, {
  as: "linkResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.projectResume, {
  as: "projectResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.resume, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.skillResume, {
  as: "skillResumes",
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.resume, {
  foreignKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});


// Resume Bridge Tables and Resume Items ----------------------
db.award.hasMany(db.awardResume, {
  as: "awardResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.award, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.contactInfo.hasMany(db.contactInfoResume, {
  as: "contactInfoResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.contactInfo, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.education.hasMany(db.educationResume, {
  as: "educationResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.education, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceResume, {
  as: "experienceResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.experienceResume.belongsTo(db.experience, {
  foreignKey: "id", targetKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.interest.hasMany(db.interestResume, {
  as: "interestResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.interest, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.link.hasMany(db.linkResume, {
  as: "linkResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.link, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.project.hasMany(db.projectResume, {
  as: "projectResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.project, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

db.skill.hasMany(db.skillResume, {
  as: "skillResumes",
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.skill, {
  foreignKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});

module.exports = db;