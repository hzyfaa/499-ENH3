const express = require('express');
const router = express.Router();
const controller = require('../controllers/logout');

/* GET : log user out */
router.get('/', controller.logout);

module.exports = router;