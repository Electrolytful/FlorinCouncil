const { Router } = require('express');
const recyclingController = require('../controllers/recyclingController.js');
const router = Router();

// Gets all items available for donation (only the ones that donationed = false).
router.get('/donations', recyclingController.index);

// Updates an item to donated = true.
router.post('/donations/:id', recyclingController.donateItem);

module.exports = router;