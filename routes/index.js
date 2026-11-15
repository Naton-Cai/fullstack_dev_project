const express = require('express');
const paintController = require('../controllers/paintController');

const router = express.Router();

/* GET home page. */
// eslint-disable-next-line no-unused-vars
router.get('/', paintController.paint_list);

module.exports = router;
