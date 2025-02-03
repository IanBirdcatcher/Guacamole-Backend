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

// flight plan

db.badge = require("./badge.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.document = require("./document.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.experienceMajor = require("./experienceMajor.model.js")(sequelize, Sequelize);
db.flightPlan = require("./flightPlan.model.js")(sequelize, Sequelize);
db.flightPlanExperience = require("./flightPlanExperience.model.js")(sequelize, Sequelize);
db.flightPlanTask = require("./flightPlanTask.model.js")(sequelize, Sequelize);
db.icon = require("./icon.model.js")(sequelize, Sequelize);
db.major = require("./major.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model.js")(sequelize, Sequelize);
db.reward = require("./reward.model.js")(sequelize, Sequelize);
db.rewardStudentInfo = require("./rewardStudentInfo.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.strength = require("./strength.model.js")(sequelize, Sequelize);
db.studentInfo = require("./strength.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.taskMajor = require("./taskMajor.model.js")(sequelize, Sequelize);

// resume items 
db.award = require("./award.model.js")(sequelize, Sequelize);
db.contactInfo = require("./contactInfo.model.js")(sequelize, Sequelize);
db.education = require("./education.model.js")(sequelize, Sequelize);
db.jobExperience = require("./jobExperience.model.js")(sequelize, Sequelize);
db.interest = require("./interest.model.js")(sequelize, Sequelize);
db.link = require("./link.model.js")(sequelize, Sequelize);
db.project = require("./project.model.js")(sequelize, Sequelize);
db.skill = require("./skill.model.js")(sequelize, Sequelize);


// bridge tables

db.awardResume = require("./awardResume.model.js")(sequelize, Sequelize);
db.contactInfoResume = require("./contactInfoResume.model.js")(sequelize, Sequelize);
db.educationResume = require("./educationResume.model.js")(sequelize, Sequelize);
db.jobExperienceResume = require("./jobExperienceResume.model.js")(sequelize, Sequelize);
db.interestResume = require("./interestResume.model.js")(sequelize, Sequelize);
db.linkResume = require("./linkResume.model.js")(sequelize, Sequelize);
db.projectResume = require("./projectResume.model.js")(sequelize, Sequelize);
db.skillResume = require("./skillResume.model.js")(sequelize, Sequelize);

// Relations

// flight plan

db.studentInfo.hasMany(db.rewardStudentInfo, {
  as: "rewardStudentInfo",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.rewardStudentInfo.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.document.hasOne(db.resume, {
  as: "resumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.document, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.reward.hasMany(db.rewardStudentInfo, {
  as: "rewardStudentInfos",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.rewardStudentInfo.belongsTo(db.reward, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.studentInfo, {
  as: "studentInfos",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.studentInfo.belongsTo(db.user, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.document, {
  as: "documents",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.document.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.semester, {
  as: "semesters",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasOne(db.user, {
  as: "users",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.user.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.flightPlan, {
  as: "flightPlans",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.flightPlan.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.major, {
  as: "majors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.major.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.strength, {
  as: "strengths",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.badge, {
  as: "badges",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.studentInfo, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.notification, {
  as: "notifications",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.notification.belongsTo(db.user, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.permission, {
  as: "permissions",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.permission.belongsTo(db.user, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.semester, {
  as: "semesters",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.user, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.semester.hasMany(db.event, {
  as: "events",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.event.belongsTo(db.semester, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

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

db.event.hasMany(db.semester, {
  as: "semesters",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.event, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasMany(db.major, {
  as: "majors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.major.belongsTo(db.event, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasMany(db.experience, {
  as: "experiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.event, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasMany(db.badge, {
  as: "badges",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.event, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasOne(db.flightPlanExperience, {
  as: "flightPlanExperiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanExperience.belongsTo(db.event, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.flightPlan.hasMany(db.badge, {
  as: "badges",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.flightPlan, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.flightPlan.hasMany(db.flightPlanExperience, {
  as: "flightPlanExperiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanExperience.belongsTo(db.flightPlan, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.flightPlan.hasMany(db.flightPlanTask, {
  as: "flightPlanTasks",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanTask.belongsTo(db.flightPlan, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.major.hasMany(db.experienceMajor, {
  as: "experienceMajors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceMajor.belongsTo(db.major, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.major.hasMany(db.taskMajor, {
  as: "taskMajors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.taskMajor.belongsTo(db.major, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.category.hasMany(db.task, {
  as: "tasks",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.task.belongsTo(db.category, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.icon, {
  as: "icons",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.badge, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.task, {
  as: "tasks",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.task.belongsTo(db.badge, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.experience, {
  as: "experiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.badge, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.flightPlan, {
  as: "flightPlans",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlan.belongsTo(db.badge, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.event, {
  as: "events",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.event.belongsTo(db.badge, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.event, {
  as: "events",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.event.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.badge, {
  as: "badges",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.strength, {
  as: "strengths",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.icon, {
  as: "icons",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.category, {
  as: "categories",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.category.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceMajor, {
  as: "experienceMajors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceMajor.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.flightPlanExperience, {
  as: "flightPlanExperiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanExperience.belongsTo(db.experience, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.badge, {
  as: "badges",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.strength, {
  as: "strengths",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.icon, {
  as: "icons",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.category, {
  as: "categories",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.category.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.taskMajor, {
  as: "taskMajors",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.taskMajor.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.flightPlanTask, {
  as: "flightPlanTasks",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanTask.belongsTo(db.task, {
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.task, {
  as: "tasks",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.task.belongsTo(db.task, {
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

db.studentInfo.hasMany(db.jobExperience, {
  as: "jobExperiences",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.jobExperience.belongsTo(db.studentInfo, {
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

db.resume.hasMany(db.jobExperienceResume, {
  as: "jobExperienceResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: true,
  onDelete: "CASCADE",
});
db.jobExperienceResume.belongsTo(db.resume, {
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

db.jobExperience.hasMany(db.jobExperienceResume, {
  as: "jobExperienceResumes",
  foreignKey: "id", sourceKey: "id", 
  allowNull: false,
  onDelete: "CASCADE",
});
db.jobExperienceResume.belongsTo(db.jobExperience, {
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