// import model here


function loadRegister(req, res) {
    res.render('register');
}

function loadLogin(req, res) {
    res.render('login');
}

function loadDashboard(req, res) {
    res.render('dashboard', {user: "User"});
}

function registerUser(req, res) {
    const { name, email, password, password2 } = req.body;

    console.log({
        name,
        email,
        password,
        password2
    });

    // error handling if form sent by user has any errors
    let errors = [];

    if(!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields" });
    }

    if(password.length < 6) {
        errors.push({ message: "Password should be at least 6 characters" });
    }

    if(password != password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if(errors) {
        res.render('register', { errors });
    }
}

module.exports = {
    loadRegister,
    loadLogin,
    loadDashboard,
    registerUser
}
