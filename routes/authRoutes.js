const express = require('express');
const { registerController, loginController } = require('../controllers/authController');

const router = express.Router();

// REGISTER || POST
router.post('/register', registerController); // Corrected route path

// Login || POST
router.post('/login', loginController);

module.exports = router;
