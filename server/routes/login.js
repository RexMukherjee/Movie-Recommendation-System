const express = require('express');
const router = express.Router();

const { userLogin } = require('../controllers/userLogin');
const { userRegister } = require('../controllers/userRegister');

router.post('/login', userLogin);
router.post('/register', userRegister); // Add register route


module.exports = router;