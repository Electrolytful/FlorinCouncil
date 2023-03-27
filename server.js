// imports
const express = require('express');
const db = require('./database/dbConnect.js');
const usersRoute = require('./routes/usersRoute.js');
require('dotenv').config();

// setting port
const port = process.env.PORT;

// initialising server
const app = express();

app.use(express.static(__dirname + '/public'));

// allowing server to use ejs and get form data from the frontend view
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));


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
