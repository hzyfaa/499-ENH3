const express = require('express');
const router = express.Router();
const controller = require('../controllers/login');

/* GET : login auth page. */
router.get('/', controller.getLoginPage);

/* POST : authenticate user */
router.post('/', controller.userLogin);

module.exports = router;