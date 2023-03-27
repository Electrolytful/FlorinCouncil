// imports
const express = require('express');
const db = require('./database/dbConfig.js');
const usersRoute = require('./routes/usersRoute.js');
const libraryRoute = require('./routes/libraryRoute.js');

// setting port
const port = process.env.PORT || 4000;

// initialising server
const app = express();

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

// Library route.
app.use('/library', libraryRoute);
