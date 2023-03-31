// imports
const bcrypt = require("bcrypt");
const User = require("../models/User.js");

// function to load the registration page when /users/register GET is requested, if user is logged in redirect to the dashboard
function loadRegister(req, res) {
  if (req.session.authenticated) {
    res.redirect("/users/dashboard");
  } else {
    res.render("register");
  }
}

// function to load the login page when /users/login GET is requested, if user is logged in redirect to the dashboard
function loadLogin(req, res) {
  if (req.session.authenticated) {
    res.redirect("/users/dashboard");
  } else {
    res.render("login");
  }
}

// function to load the dashboard when /users/dashboard GET is requested
function loadDashboard(req, res) {
  res.render("dashboard", { user: req.session.user.username });
}

// function to register the user
async function registerUser(req, res) {
  // destructure requests body to get user form data
  const { username, name, email, address, phone, dob, password, password2 } =
    req.body;

  // error handling if form sent by user has any errors, if so rerender the register page and display errors, otherwise create the new user in the database with a hashed password
  let errors = [];
  const currentYear = getCurrentYear();

  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }
  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (Number(dob.slice(0, 4)) > currentYear - 16) {
    errors.push({ message: "Current user is too young" });
  }
  if (errors.length) {
    res.render("register", { errors });
  } else {
    const checkUser = await User.showUserByEmail(email);
    if (checkUser) {
      errors.push({ message: "Email already registered" });
      res.render("register", { errors });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username,
        name,
        email,
        hashedPassword,
        address,
        phone,
        dob,
      };
      const result = await User.create(newUser);
      req.flash("success_msg", "Registered successfully!");
      res.redirect("/users/login");
    }
  }
}

// function to login the user
async function loginUser(req, res, next) {
  const data = req.body;

  try {
    // check if user with the specified email exists, if not rerender page and display the error message
    const user = await User.showUserByEmail(data.email);

    if (!user) {
      req.flash("no_email", "User with that email does not exist!");
      res.render("login");
      return;
    }

    // compare the password given and the hashed password stored in the database, if they dont match rerender login page and display error else set the user to be authenticated with cookie
    const passwordCheck = await bcrypt.compare(data.password, user.password);

    if (!passwordCheck) {
      req.flash("incorrect_password", "Incorrect password!");
      res.render("login");
      return;
    } else {
      if (req.session.authenticated) {
        return res.status(200).json(req.session);
      }

      user.password = null;
      req.session.authenticated = true;
      req.session.user = user;
      res.redirect("/users/dashboard");
    }
  } catch (err) {
    return res.status(403).json({ error: err.message });
  }
}

// function to logout the user, set session authentication to be false and the user stored in the cookie to be null, then redirect to the login page
async function logoutUser(req, res) {
  req.session.authenticated = false;
  req.session.user = null;
  req.flash("logged_out", "Logged out successfully!");
  res.redirect("/users/login");
}

// function to get the current year, used to validate date of birth entered by the user
function getCurrentYear() {
  // getting current year to use in error checking
  const year = new Date();
  let yyyy = year.getFullYear();

  return yyyy;
}

module.exports = {
  loadRegister,
  loadLogin,
  loadDashboard,
  registerUser,
  loginUser,
  logoutUser,
};
