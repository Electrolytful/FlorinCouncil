const User = require("../models/User.js");

async function authenticator(req, res, next) {
  // if the user is not authenticated then redirect to the login screen, otherwise continue
  if (!req.session.authenticated) {
    res.redirect("/users/login");
  } else {
    next();
  }
}

module.exports = authenticator;
