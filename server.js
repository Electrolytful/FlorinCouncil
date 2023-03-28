// imports
require('dotenv').config();

const express = require('express');
const db = require('./database/dbConnect.js');
const usersRoute = require('./routes/usersRoute.js');
const libraryRoute = require('./routes/libraryRoute.js');
const localAttractionsRoute = require('./routes/localAttractionsRoute.js');

const session = require('express-session');
const flash = require('express-flash');

// setting port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

// allowing server to use ejs and get form data from the frontend view
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // parse req.body to json.


app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());


// running the server on port
app.listen(port, () => {
    console.log(`Server running on Port: ${port}`);
});


// home route
app.get('/', (req, res) => {
    res.render('index');
});


// users route
app.use('/users', usersRoute);

// Library route.
app.use('/library', libraryRoute);

// Local attractions route.
app.use('/visit', localAttractionsRoute);

module.exports = app;
