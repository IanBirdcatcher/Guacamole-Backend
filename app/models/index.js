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
sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models (user and resume know about all of the resume items)-----------
db.user = require("./user.model.js")(sequelize, Sequelize);
db.resume = require("./resume.model.js")(sequelize, Sequelize);

db.session = require("./session.model.js")(sequelize, Sequelize);

// flight plan
db.roleUser = require("./roleUser.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.badge = require("./badge.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.document = require("./document.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.type = require("./type.model.js")(sequelize, Sequelize);
db.eventType = require("./eventType.model.js")(sequelize, Sequelize);
db.experience = require("./experience.model.js")(sequelize, Sequelize);
db.experienceMajor = require("./experienceMajor.model.js")(
  sequelize,
  Sequelize
);
db.flightPlan = require("./flightPlan.model.js")(sequelize, Sequelize);
db.flightPlanExperience = require("./flightPlanExperience.model.js")(
  sequelize,
  Sequelize
);
db.flightPlanTask = require("./flightPlanTask.model.js")(sequelize, Sequelize);
db.icon = require("./icon.model.js")(sequelize, Sequelize);
db.major = require("./major.model.js")(sequelize, Sequelize);
db.notification = require("./notification.model.js")(sequelize, Sequelize);
db.permission = require("./permission.model.js")(sequelize, Sequelize);
db.reward = require("./reward.model.js")(sequelize, Sequelize);
db.rewardStudentInfo = require("./rewardStudentInfo.model.js")(
  sequelize,
  Sequelize
);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.strength = require("./strength.model.js")(sequelize, Sequelize);
db.studentInfo = require("./studentInfo.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);
db.taskMajor = require("./taskMajor.model.js")(sequelize, Sequelize);
db.eventType = require("./eventType.model.js")(sequelize, Sequelize);
db.experienceEventType = require("./experienceEventType.model.js")(
  sequelize,
  Sequelize
);
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
db.contactInfoResume = require("./contactInfoResume.model.js")(
  sequelize,
  Sequelize
);
db.educationResume = require("./educationResume.model.js")(
  sequelize,
  Sequelize
);
db.jobExperienceResume = require("./jobExperienceResume.model.js")(
  sequelize,
  Sequelize
);
db.experienceStrength = require("./experienceStrength.model.js")(
  sequelize,
  Sequelize
);
db.taskStrength = require("./taskStrength.model.js")(sequelize, Sequelize);
db.interestResume = require("./interestResume.model.js")(sequelize, Sequelize);
db.linkResume = require("./linkResume.model.js")(sequelize, Sequelize);
db.projectResume = require("./projectResume.model.js")(sequelize, Sequelize);
db.skillResume = require("./skillResume.model.js")(sequelize, Sequelize);

// Relations

// flight plan

db.studentInfo.hasMany(db.rewardStudentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.rewardStudentInfo.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.document.hasOne(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.document, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.reward.hasMany(db.rewardStudentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.rewardStudentInfo.belongsTo(db.reward, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.studentInfo.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.document, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.document.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.semester, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasOne(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.user.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.flightPlan, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlan.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.major.hasMany(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.studentInfo.belongsTo(db.major, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.strength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.notification, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.notification.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.permission, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.permission.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.semester, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.semester.hasMany(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.event.belongsTo(db.semester, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.resume.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasMany(db.semester, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.semester.belongsTo(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.eventType.hasMany(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.event.hasMany(db.eventType, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.eventType.belongsTo(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.type.hasMany(db.eventType, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.eventType.belongsTo(db.type, {
  allowNull: true,
  onDelete: "CASCADE",
});

// db.event.hasMany(db.major, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.major.belongsTo(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });

// db.event.hasMany(db.experience, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.experience.belongsTo(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.event.hasMany(db.major, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.major.belongsTo(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });

// db.event.hasMany(db.experience, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.experience.belongsTo(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });

db.event.hasMany(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});

// db.event.hasOne(db.flightPlanExperience, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.flightPlanExperience.belongsTo(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });

db.flightPlan.hasMany(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.flightPlan, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.flightPlan.hasMany(db.flightPlanExperience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanExperience.belongsTo(db.flightPlan, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.flightPlan.hasMany(db.flightPlanTask, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanTask.belongsTo(db.flightPlan, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceEventType, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceEventType.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceEventType, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceEventType.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.eventType.hasMany(db.experienceEventType, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experienceEventType.belongsTo(db.eventType, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.major.hasMany(db.experienceMajor, {
  allowNull: true,
  onDelete: "CASCADE",
});

// db.experienceMajor.belongsTo(db.major, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.experienceMajor.belongsTo(db.major, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
db.experience.hasMany(db.experienceStrength, {
  allowNull: true,
  onDelete: "CASCADE",
})
db.experienceStrength.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.hasMany(db.experienceStrength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceStrength.belongsTo(db.strength, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.taskStrength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.taskStrength.belongsTo(db.task, {
  allowNull: false,
  onDelete: "CASCADE",
});
db.strength.hasMany(db.taskStrength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.taskStrength.belongsTo(db.strength, {
  allowNull: false,
  onDelete: "CASCADE",
});

db.major.hasMany(db.taskMajor, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.category.hasMany(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.task.belongsTo(db.category, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.icon, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.task.belongsTo(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experience.belongsTo(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.flightPlan, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlan.belongsTo(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.badge.hasMany(db.event, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.event.belongsTo(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});

// db.experience.hasMany(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.event.belongsTo(db.experience, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.experience.hasMany(db.event, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });
// db.event.belongsTo(db.experience, {
//   allowNull: true,
//   onDelete: "CASCADE",
// });

db.experience.hasMany(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.strength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.icon, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.category, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.category.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.experienceMajor, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.experienceMajor.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.experience.hasMany(db.flightPlanExperience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanExperience.belongsTo(db.experience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.badge, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.badge.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.strength, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.strength.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.icon, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.icon.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.category, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.category.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.taskMajor, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.taskMajor.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.task.hasMany(db.flightPlanTask, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.flightPlanTask.belongsTo(db.task, {
  allowNull: true,
  onDelete: "CASCADE",
});

// studentInfo and Resume Items --------------------

//awards ----------------------------------
db.studentInfo.hasMany(db.award, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.award.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

// Contact Info------------------------------
db.studentInfo.hasMany(db.contactInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.contactInfo.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.education, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.education.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.jobExperience, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.jobExperience.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.interest, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.interest.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.link, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.link.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.project, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.project.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.studentInfo.hasMany(db.skill, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.skill.belongsTo(db.studentInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

// Resume and Resume Bridge Tables ----------------------
db.resume.hasMany(db.awardResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.contactInfoResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.educationResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.jobExperienceResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.jobExperienceResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.interestResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.linkResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.projectResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.resume.hasMany(db.skillResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.resume, {
  allowNull: true,
  onDelete: "CASCADE",
});

// Resume Bridge Tables and Resume Items ----------------------
db.award.hasMany(db.awardResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.awardResume.belongsTo(db.award, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.contactInfo.hasMany(db.contactInfoResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.contactInfoResume.belongsTo(db.contactInfo, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.education.hasMany(db.educationResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.educationResume.belongsTo(db.education, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.jobExperience.hasMany(db.jobExperienceResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.jobExperienceResume.belongsTo(db.jobExperience, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.interest.hasMany(db.interestResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.interestResume.belongsTo(db.interest, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.link.hasMany(db.linkResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.linkResume.belongsTo(db.link, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.project.hasMany(db.projectResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.projectResume.belongsTo(db.project, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.skill.hasMany(db.skillResume, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.skillResume.belongsTo(db.skill, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.user.hasMany(db.session, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.session.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});
// User and RoleUser
db.user.hasMany(db.roleUser, {
  allowNull: true,
  onDelete: "CASCADE",
});
db.roleUser.belongsTo(db.user, {
  allowNull: true,
  onDelete: "CASCADE",
});

// RoleUser and Role
db.role.hasMany(db.roleUser, {
  allowNull: true,
  onDelete: "CASCADE",
});

db.roleUser.belongsTo(db.role, {
  allowNull: true,
  onDelete: "CASCADE",
});

module.exports = db;
