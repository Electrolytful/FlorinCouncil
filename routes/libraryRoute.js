const { Router } = require('express');
const libraryController = require('../controllers/libraryController.js');
const router = Router();

router.get('/', libraryController.index);
router.get('/:book_id', libraryController.show);
// Create a new loan.
router.post('/:book_id')
// Update loan to complete.
router.patch('/:book_id')


module.exports = router;
