const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/home');

/* GET : home page */
router.get('/', ctrlMain.home);

module.exports = router;