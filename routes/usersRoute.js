const { Router } = require('express');
const usersController = require('../controllers/usersController.js');
const authenticator = require('../middleware/authenticator.js');
const router = Router();

// routes
router.get('/register', usersController.loadRegister);
router.get('/login', usersController.loadLogin);
router.get('/dashboard', authenticator, usersController.loadDashboard);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);
router.get('/logout', authenticator, usersController.logoutUser);

module.exports = router;
