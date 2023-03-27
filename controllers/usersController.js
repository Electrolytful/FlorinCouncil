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
    console.log(req.session);
    res.render('dashboard', {user: req.session.user.username});
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
            const newUser = { username, name, email, hashedPassword, address, phone, dob };
            const result = await User.create(newUser);
            req.flash('success_msg', "Registered successfully!");
            res.redirect('/users/login');
        }
    }
}

async function loginUser(req, res) {
    const data = req.body;

    if(!data.email || !data.password) {
        return res.status(422).json({ error: "Incorrect input" });
    }

    try {
        const user = await User.showUserByEmail(data.email);

        if(!user) {
            throw Error("No user with that email");
        }

        if(req.session.authenticated) {
            return res.status(200).json(req.session);
        }

        const passwordCheck = await bcrypt.compare(data.password, user.password);

        if(!passwordCheck) {
            throw Error("Incorrect password");
        }

        user.password = null;
        req.session.authenticated = true;
        req.session.user = user;
        res.render('dashboard', { user: req.session.user.username });
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }
}

async function logoutUser(req, res) {
    req.session.authenticated = false;
    req.session.user = null;
    req.flash('logged_out', "Logged out successfully!")
    res.redirect('/users/login');
}



module.exports = {
    loadRegister,
    loadLogin,
    loadDashboard,
    registerUser,
    loginUser,
    logoutUser
}
