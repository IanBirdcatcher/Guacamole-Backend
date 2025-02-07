const db = require("../models");
const Session = db.session;
const Permission = db.permission;
const User = db.user;

authenticate = async (req, res, next) => {
  let token = null;
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      await Session.findAll({ where: { token: token } })
        .then((data) => {
          let session = data[0];
          console.log(session.expirationDate);
          if (session != null) {
            if (session.expirationDate >= Date.now()) {
              next();
              return;
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};

hasAccess= async (req, res, next) => {
  console.log(permType);
  let auth = req.get("authorization");
 
  if (auth != null) {
    if (
      auth.startsWith("Bearer ") &&
      (typeof require !== "string" || require === "token")
    ) {
      let token = auth.slice(7);
      let session = {};
      await Session.findAll({ where: { token: token } })
        .then((data) => {
          session = data[0];
        })
        .catch((error) => {
          console.log(error);
        });
      if (session != null) {
        let user = {};
        let permission = {};
        if (session.expirationDate >= Date.now()) {
          //find user
          await User.findAll({ where: { id: session.userId } })
          .then((data) => { 
            user = data[0];
          })
          .catch((error) => {
            console.log(error);
          })
          //find permission
          await Permission.findAll({ where: { id: user.roleId } })
          .then((data) => {
            if(!data) return res.status(401).send({
              message: "Unauthorized! Insufficient Permissios",
            });
            permission = data;
          })
          .catch((error) => {
            console.log(error);
          })
          if(permission[permType]){
              next();
              return;
          }
            else {
              return res.status(401).send({
                message: "Unauthorized! Insufficient Permissios",
              });
            }
        } else {
          return res.status(401).send({
            message: "Unauthorized! Expired Token, Logout and Login again",
          });
        }
      } else {
        return res.status(401).send({
          message: "Unauthorized! Expired Token, Logout and Login again",
        });
      }
    }
  } else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header",
    });
  }
};


module.exports = {authenticate , hasAccess};
