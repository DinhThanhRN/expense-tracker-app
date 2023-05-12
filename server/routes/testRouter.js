const express = require('express');
const controllers = require('../controllers/test');

const router = express.Router();

router.route('/:name').get(controllers.test);
router.route('/:name/:id').get(controllers.test);

module.exports = router;
