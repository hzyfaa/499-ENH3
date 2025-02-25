const express = require('express');
const router = express.Router();
const controller = require('../controllers/register');

/* GET : get registration page */
router.get('/', controller.getRegisterPage);
/* POST : register user */
router.post('/', controller.userRegister);

module.exports = router;