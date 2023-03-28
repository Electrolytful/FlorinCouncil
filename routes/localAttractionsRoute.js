const { Router } = require('express');
const localAttractionsController = require('../controllers/localAttractionsController.js');
const router = Router();

// Shows a collection of location objects.
router.get('/', localAttractionsController.index);

module.exports = router;