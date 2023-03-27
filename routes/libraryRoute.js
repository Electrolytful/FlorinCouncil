const { Router } = require('express');
const libraryController = require('../controllers/libraryController.js');
const router = Router();

router.get('/books')
router.get('/:book_id')
// Create a new loan.
router.post('/:book_id')
// Update loan to complete.
router.patch('/:book_id')


module.exports = router;
