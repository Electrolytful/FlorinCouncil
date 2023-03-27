// imports
require('dotenv').config();
const express = require('express');

const session = require('express-session');
const flash = require('express-flash');
const usersRoute = require('./routes/usersRoute.js');
require('dotenv').config();


// setting port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

app.use(express.static(__dirname + '/public'));

// allowing server to use ejs and get form data from the frontend view
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


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
