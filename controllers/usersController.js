// imports
const bcrypt = require('bcrypt');
const User = require('../models/User.js');

function loadRegister(req, res) {
    res.render('register');
}

function loadLogin(req, res) {
    res.render('login');
}

function loadDashboard(req, res) {
    res.render('dashboard', {user: "User"});
}

async function registerUser(req, res) {
    const { username, name, email, address, phone, dob, password, password2 } = req.body;

    // error handling if form sent by user has any errors
    let errors = [];

    if(!username || !name || !email || !address || !phone || !dob || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if(password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }

    if(password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if(errors.length) {
        res.render('register', { errors });
    } else {
        const checkUser = await User.showUserByEmail(email);
        if(checkUser) {
            errors.push({ message: "Email already registered"})
            res.render('register', { errors });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = { username, name, email, hashedPassword, address, phone, dob }
            const result = await User.create(newUser);
            req.flash('success_msg', "Registered successfully!");
            res.redirect('/users/login');
        }
    }
}

async function loginUser(req, res) {
    
}



module.exports = {
    loadRegister,
    loadLogin,
    loadDashboard,
    registerUser,
    loginUser
}
