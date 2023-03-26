const { Router } = require('express');
const usersController = require('../controllers/usersController.js');
const router = Router();

// routes
router.get('/register', usersController.loadRegister);
router.get('/login', usersController.loadLogin);
router.get('/dashboard', usersController.loadDashboard);
router.post('/register', usersController.registerUser);

module.exports = router;
