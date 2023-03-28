// imports
require("dotenv").config();
const express = require("express");
const usersRoute = require("./routes/usersRoute.js");
const libraryRoute = require("./routes/libraryRoute.js");
const localAttractionsRoute = require("./routes/localAttractionsRoute.js");
const recyclingRoute = require('./routes/recyclingRoute.js');
const session = require("express-session");
const flash = require("express-flash");
const store = new session.MemoryStore();

// setting port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

// setting middleware and view engine for server side rendering of client views
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store,
  })
);

// running the server on the specified port
app.listen(port, () => {
  console.log(`Server running on Port: ${port}`);
});

// home route
app.get("/", (req, res) => {
  res.render("index");
});

// users route
app.use("/users", usersRoute);

// Library route.
app.use("/library", libraryRoute);

// Local attractions route.
app.use("/visit", localAttractionsRoute);

// Recycling donations route.
app.use('/recycling', recyclingRoute);

module.exports = app;
