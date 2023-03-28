const { Router } = require('express');
const recyclingController = require('../controllers/recyclingController.js');
const router = Router();

// Gets all items available for donation.
router.get('/donations', recyclingController.index);

// Updates an item to donated = true.
router.patch('/donations/:id', recyclingController.update);

module.exports = router;