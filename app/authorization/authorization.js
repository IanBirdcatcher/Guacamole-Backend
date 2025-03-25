const db = require("../models");
const Session = db.session;
const Permission = db.permission;
const User = db.user;

authenticate = async (req, res, next) => {
  let token = null;
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.slice(7);

      await Session.findOne({ where: { token: token } })
        .then((data) => {
          let session = data;
          if (session != null) {
            if (session.expirationDate >= Date.now()) {
              next();
              return;
            } else
              return res.status(401).send({
                message: "Unauthorized! Expired Token, Logout and Login again",
              });
          }
          else{
            return res.status(401).send({
              message: "Unauthorized! Invalid Token, Logout and Login again",
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

function hasAccess(permType) { // Wrapper for hasAccess
  return async (req, res, next) => { // Actual has access
    let auth = req.get("authorization");
    if (auth != null) {
      if (
        auth.startsWith("Bearer ") &&
        (typeof require !== "string" || require === "token")
      ) {
        let token = auth.slice(7);
        let session = {};
        await Session.findOne({ where: { token: token } })
          .then((data) => {
            session = data;
          })
          .catch((error) => {
            console.log(error);
          });
        if (session != null) {
          let user = {};
          let permission = {};
          if (session.expirationDate >= Date.now()) {
            //find user
            await User.findOne({ where: { id: session.userId } })
              .then((data) => {
                user = data;
              })
              .catch((error) => {
                console.log(error);
              });
            //find permission
            await Permission.findOne({ where: { userId: user.id } })
              .then((data) => {
                userPerms = data;
                if (userPerms == null) {
                  return res.status(401).send({
                    message: "Unauthorized! Insufficient Permissions",
                  });
                }
              })
              .catch((error) => {
                console.log(error); 
              });
              try {
                if (userPerms[permType]) {
                  next();
                  return;
                } else {
                  return res.status(401).send({
                    message: "Unauthorized! Insufficient Permissions",
                  });
                }
              } catch (error) {
                console.log(error);
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
}



function isUserOrAdmin(data){
 
}
module.exports = { authenticate, hasAccess };
