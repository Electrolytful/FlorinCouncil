const User = require('../models/User.js');

async function authenticator(req, res, next) {

    if(!req.session.authenticated) {
        res.redirect('/users/login');
    } else {
        next();
    }
}

module.exports = authenticator;
