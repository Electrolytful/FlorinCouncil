const { Router } = require('express');
const libraryController = require('../controllers/libraryController.js');
const authenticator = require('../middleware/authenticator.js');
const router = Router();

router.get('/', authenticator, libraryController.index);

// Show loans for given user.
router.get('/mybooks', libraryController.showUserBooks);

router.get('/:book_name', libraryController.show);

// Create a new loan.
router.post('/:book_id', libraryController.create);

// Update loan to complete.
router.patch('/:loan_id', libraryController.update);


module.exports = router;
