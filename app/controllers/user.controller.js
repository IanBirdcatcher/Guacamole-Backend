const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const roleUser = db.roleUser
const experience = db.experience
const studentInfo = db.studentInfo

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Must contain a first name", 
    });
    return;
  }

  // Create a User
  const user = {
    id: req.body.id,
    email: req.body.email,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving people.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
  };

exports.getwantToBeAdmin = async (req, res) => {
  try {
    // Step 1: Retrieve all userId values from roleUser where roleId = 5
    const roleUsers = await roleUser.findAll({
      where: { roleId: 5 },
      attributes: ['userId'], // Only select the userId field
    });

    // Step 2: Extract userId values from the result
    const userIds = roleUsers.map((roleUser) => roleUser.userId);

    const users = await User.findAll({
      where: { id: userIds }, 
      attributes: ['id','fName', 'lName', 'email'], 
    });

    res.send(users);
  } catch (error) {
    console.error("Error in getwantToBeAdmin:", error);
    res.status(500).send({
      message: "An error occurred while retrieving user details for roleId = 5.",
    });
  }
};

exports.getExperienceRequestsUsers = async (req, res) => {
  try {
    // Step 1: Retrieve all experience requests where requestedByStudent is true
    const experienceRequests = await experience.findAll({
      where: { requestedByStudent: true },
      attributes: ['id', 'studentInfoId', 'name', 'desc'],
    });

    if (!experienceRequests.length) {
      return res.send({ experienceRequests: [] });
    }

    // Step 2: Extract unique studentInfoIds from the experience requests
    const studentInfoIds = [...new Set(experienceRequests.map((request) => request.studentInfoId))];

    // Step 3: Retrieve studentInfo records for the extracted IDs
    const studentInfos = await studentInfo.findAll({
      where: { id: studentInfoIds },
      attributes: ['id','studentId', 'userId'], 
    });

    if (!studentInfos.length) {
      return res.send({ experienceRequests: [] });
    }

    // Step 4: Extract unique userIds from the studentInfo records
    const userIds = [...new Set(studentInfos.map((info) => info.userId))];

    // Step 5: Retrieve user records for the extracted IDs
    const users = await User.findAll({
      where: { id: userIds },
      attributes: ['id', 'fName', 'lName', 'email'],
    });

    // Step 6: Create maps for quick lookup
    const userMap = Object.fromEntries(users.map((user) => [user.id, user]));
    const studentInfoMap = Object.fromEntries(studentInfos.map((info) => [info.id, info]));

    // Step 7: Map experience requests to include user details
    const response = experienceRequests.map((request) => {
      const studentInfo = studentInfoMap[request.studentInfoId];
      const user = studentInfo ? userMap[studentInfo.userId] : null;
      return {
        ...request.dataValues,
        user: user || null,
      };
    });

    res.send({ experienceRequests: response });
  } catch (error) {
    console.error("Error in getExperienceRequestsUsers:", error);
    res.status(500).send({
      message: "An error occurred while retrieving user details for experience requests.",
    });
  }
};

// Retrieve the firstLogin attribute for a specific userId
exports.getFirstLogin = (req, res) => {
  const userId = req.params.userId;

  User.findOne({
    where: { id: userId },
    attributes: ['firstLogin'], 
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find firstLogin for userId=${userId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving firstLogin for userId=${userId}: ${err.message}`,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
