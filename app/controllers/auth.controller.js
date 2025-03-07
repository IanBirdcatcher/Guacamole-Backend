const db = require("../models");
const authconfig = require("../config/auth.config");
const User = db.user;
const Role = db.role; // Assuming you have a Role model
const RoleUser = db.roleUser; // Assuming you have a RoleUser model
const Session = db.session;
const Op = db.Sequelize.Op;

const { google } = require("googleapis");

var jwt = require("jsonwebtoken");

let googleUser = {};

const google_id = process.env.CLIENT_ID;

const roles = [
  { id: 1, name: 'student' },
  { id: 2, name: 'student worker' },
  { id: 3, name: 'admin' },
  { id: 4, name: 'professor' }
];

const createRolesIfNotExist = async () => {
  const rolePromises = roles.map(async (role) => {
    try {
      const existingRole = await Role.findByPk(role.id);
      if (!existingRole) {
        await Role.create(role);
      }
    } catch (err) {
      console.error(`Error creating role ${role.name}: ${err.message}`);
    }
  });
  await Promise.all(rolePromises);
};

const assignDefaultRoleToUser = async (userId) => {
  const defaultRoleId = 1; 
  try {
    await RoleUser.create({ userId, roleId: defaultRoleId });
    console.log(`Assigned default role ${defaultRoleId} to user ${userId}`);
  } catch (err) {
    console.error(`Error assigning default role to user ${userId}: ${err.message}`);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);

  var googleToken = req.body.credential;

  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(google_id); 
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: google_id,
    });
    googleUser = ticket.getPayload();
    console.log("Google payload is " + JSON.stringify(googleUser));
  }
  await verify().catch(console.error);

  let email = googleUser.email;
  let firstName = googleUser.given_name;
  let lastName = googleUser.family_name;
  let profilePicture = googleUser.picture; 

  if (
    (email === undefined ||
      firstName === undefined ||
      lastName === undefined) &&
    req.body.accessToken !== undefined
  ) {
    let oauth2Client = new OAuth2Client(google_id);
    oauth2Client.setCredentials({ access_token: req.body.accessToken });
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    let { data } = await oauth2.userinfo.get();
    console.log(data);
    email = data.email;
    firstName = data.given_name;
    lastName = data.family_name;
    profilePicture = data.picture;  
  }

  console.log(lastName);

  let user = {};
  let session = {};

  try {
    const data = await User.findOne({ where: { email: email } });
    if (data != null) {
      user = data.dataValues;
    } else {
      user = {
        fName: firstName,
        lName: lastName,
        email: email,
        profilePicture: profilePicture,
      };
    }
  } catch (err) {
    return res.status(500).send({ message: "user not found 80 " + err.message });
  }

  if (user.id === undefined) {
    console.log("need to get user's id");
    console.log(user);
    try {
      const data = await User.create(user);
      console.log("user was registered"); 
      user = data.dataValues;
      await createRolesIfNotExist();
      await assignDefaultRoleToUser(user.id); 
      return res.send({ message: "User was registered successfully!" }); 
    } catch (err) {
      return res.status(500).send({ message: "user not created 94 " + err.message });
    }
  } else {
    console.log(user);
    user.fName = firstName;
    user.lName = lastName;
    user.profilePicture = profilePicture;
    console.log(user);
    try {
      const num = await User.update(user, { where: { id: user.id } });
      if (num == 1) {
        console.log("updated user's name and profile picture");
      } else {
        console.log(`Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`);
      }
    } catch (err) {
      console.log("Error updating User with id=" + user.id + " " + err);
    }
  }

  try {
    const data = await Session.findOne({
      where: {
        email: email,
        token: { [Op.ne]: "" },
      },
    });
    if (data !== null) {
      session = data.dataValues;
      if (session.expirationDate < Date.now()) {
        session.token = "";
        await Session.destroy(session, { where: { id: session.id } });
        console.log("successfully logged out");
        session = {};
      } else {
        let userInfo = {
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          profilePicture: user.profilePicture,
          id: user.id,
          token: session.token,
        };
        console.log("found a session, don't need to make another one");
        console.log(userInfo);
        return res.send(userInfo);
      }
    }
  } catch (err) {
    return res.status(500).send({
      message: " Line 170 " + err.message || "Some error occurred while retrieving sessions.",
    });
  }

  if (session.id === undefined) {
    let token = jwt.sign({ id: email }, authconfig.secret, {
      expiresIn: 86400,
    });
    let tempExpirationDate = new Date();
    tempExpirationDate.setDate(tempExpirationDate.getDate() + 1);
    const session = {
      token: token,
      email: email,
      expirationDate: tempExpirationDate,
      userId: user.id,
    };

    console.log("making a new session");
    console.log(session);

    try {
      await Session.create(session);
      let userInfo = {
        email: user.email,
        fName: user.fName,
        lName: user.lName,
        profilePicture: user.profilePicture,
        id: user.id,
        token: token,
      };
      return res.send(userInfo);
    } catch (err) {
      return res.status(500).send({ message: "Cant create session " + err.message });
    }
  }
};

exports.authorize = async (req, res) => {
  console.log("authorize client");
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "postmessage"
  );

  console.log("authorize token");
  // Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(req.body.code);
  oauth2Client.setCredentials(tokens);

  let user = {};
  console.log("findUser");

  await User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data != null) {
        user = data.dataValues;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Can't find user 238 " + err.message });
      return;
    });
  console.log("user");
  console.log(user);
  user.refresh_token = tokens.refresh_token;
  let tempExpirationDate = new Date();
  tempExpirationDate.setDate(tempExpirationDate.getDate() + 100);
  user.expiration_date = tempExpirationDate;

  await User.update(user, { where: { id: user.id } })
    .then((num) => {
      if (num == 1) {
        console.log("updated user's google token stuff");
      } else {
        console.log(
          `Cannot update User with id=${user.id}. Maybe User was not found or req.body is empty!`
        );
      }
      let userInfo = {
        refresh_token: user.refresh_token,
        expiration_date: user.expiration_date,
      };
      console.log(userInfo);
      res.send(userInfo);
    })
    .catch((err) => {
      res.status(500).send({ message: "Can't update user 265" + err.message });
    });

  console.log(tokens);
  console.log(oauth2Client);
};

exports.logout = async (req, res) => {
  console.log(req.body);
  if (req.body === null) {
    res.send({
      message: "User has already been successfully logged out!",
    });
    return;
  }

  // invalidate session -- delete token out of session table
  let session = {};
  await Session.destroy({ where: { token: req.body.token } })
    .then(() => {
      console.log("session destroyed")
    })
    .catch(() => {
      console.log("session not destroyed")
    })

  // await Session.findAll({ where: { token: req.body.token } })
  //   .then((data) => {
  //     if (data[0] !== undefined) session = data[0].dataValues;
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving sessions.",
  //     });
  //     return;
  //   });
  // session won't be null but the id will if no session was found
};
